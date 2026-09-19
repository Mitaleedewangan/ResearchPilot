


import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.database import get_chat_history
from app.services.agent_service import get_tools, execute_tool
from google.genai import errors

load_dotenv()

USE_MOCK_CHAT = os.getenv(
    "USE_MOCK_CHAT",
    "false"
).lower() == "true"

# Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


# Gemini Client
client = genai.Client(
    api_key=GEMINI_API_KEY
)


# Gemini Model
MODEL_NAME = "gemini-3.6-flash"


def ask_gemini(question: str, user_id: str) -> str:

    

    tools = get_tools()

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=question,
        config=types.GenerateContentConfig(
            tools=[tools]
        )
    )

    for part in response.candidates[0].content.parts:

        if part.function_call:

            function_call = part.function_call

            print(
                "Tool selected:",
                function_call.name
            )

            print(
                "Arguments:",
                function_call.args
            )

            result = execute_tool(function_call)

            print(
                "Tool result:",
                result
            )

            tool_response = types.Part.from_function_response(
                name=function_call.name,
                response={
                    "result": result
                }
            )

            final_prompt = f"""
Provide the final answer to the user's question.

Use the tool result to answer accurately.

If the tool was search_documents, answer only
using the information found in the uploaded documents.

Do not invent information.

If the tool was calculator, use the calculated result.

If the tool was web_search, use the information
returned by the web search.

Formatting rules:
- Use plain text only.
- Do not use Markdown.
- Do not use ** for bold.
- Do not use # headings.
- Keep the answer concise and natural.

User question:
{question}
"""

            final_response = client.models.generate_content(
                model=MODEL_NAME,
                contents=[
                    final_prompt,
                    response.candidates[0].content,
                    tool_response
                ],
                config=types.GenerateContentConfig(
                    tools=[tools]
                )
            )

            return final_response.text

    return response.text


def stream_gemini(
    question: str,
    session_id: str,
    user_id: str
):

    # --------------------------------------------------
    # MOCK CHAT - DEVELOPMENT ONLY
    # --------------------------------------------------

    # --------------------------------------------------
# MOCK CHAT - DEVELOPMENT ONLY
# --------------------------------------------------

    if USE_MOCK_CHAT:

        question_lower = question.lower()

        if "html" in question_lower:

            mock_answer = (
                "HTML stands for HyperText Markup Language. "
                "It is used to structure the content of web pages. "
                "HTML is used to create headings, paragraphs, links, "
                "images, forms, tables, and other elements of a webpage."
            )

        elif "rag" in question_lower:

            mock_answer = (
                "RAG stands for Retrieval-Augmented Generation. "
                "It combines information retrieval with a Large Language Model. "
                "The system first retrieves relevant information from documents "
                "and then provides that information to the language model to "
                "generate a more context-aware answer."
            )

        elif "machine learning" in question_lower:

            mock_answer = (
                "Machine Learning is a branch of Artificial Intelligence "
                "that allows computers to learn patterns from data and make "
                "predictions or decisions without being explicitly programmed "
                "for every task."
            )

        elif "python" in question_lower:

            mock_answer = (
                "Python is a high-level programming language known for its "
                "simple syntax and wide range of applications. It is commonly "
                "used for web development, data analysis, automation, and AI."
            )

        else:

            mock_answer = (
                f"You asked: {question}\n\n"
                "This is a mock ResearchPilot response used during development. "
                "Once the Gemini API is enabled, ResearchPilot will generate "
                "a real AI-powered answer for this question."
            )

        print("Chat response: MOCK")

        for word in mock_answer.split():
            yield word + " "

        return

        mock_answer = (
            "HTML stands for HyperText Markup Language. "
            "It is used to structure the content of web pages. "
            "HTML is used to create headings, paragraphs, "
            "links, images, forms, tables, and other elements "
            "of a webpage."
        )

        print("Chat response: MOCK")

        for word in mock_answer.split():
            yield word + " "

        return

    # Get available tools
    tools = get_tools()


    # --------------------------------------------------
    # GET CONVERSATION HISTORY
    # --------------------------------------------------

    history = get_chat_history(
        user_id=user_id,
        session_id=session_id
    )

    history_text = ""

    for message in history:
        history_text += (
            f"{message['role']}: {message['content']}\n"
        )


    # --------------------------------------------------
    # FIRST PROMPT
    # Gemini decides whether a tool is required
    # --------------------------------------------------

    prompt = f"""
You are ResearchPilot, an AI research and knowledge assistant.

You must decide whether the user's question requires a tool.

Tool selection rules:

1. Use the calculator tool when the user asks for
mathematical calculations.

2. Use the search_documents tool when the user asks about
information that may exist inside uploaded documents.

3. Use the web_search tool when the user asks for current,
latest, recent, real-time, or internet-based information.

4. If the question does not require a tool, answer directly.

5. Never invent information from uploaded documents.

6. After receiving a tool result, use that result to
generate the final answer.

Conversation history:
{history_text}

Formatting rules:
- Use plain text only.
- Do not use Markdown.
- Do not use ** for bold.
- Do not use # headings.
- Keep the answer clear and concise.

User question:
{question}
"""


    # --------------------------------------------------
    # FIRST GEMINI CALL
    # --------------------------------------------------

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            tools=[tools]
        )
    )


    # --------------------------------------------------
    # CHECK IF GEMINI SELECTED A TOOL
    # --------------------------------------------------

    for part in response.candidates[0].content.parts:

        if part.function_call:

            function_call = part.function_call


            print(
                "Tool selected:",
                function_call.name
            )

            print(
                "Arguments:",
                function_call.args
            )


            # --------------------------------------------------
            # EXECUTE TOOL
            # --------------------------------------------------

            result = execute_tool(
                function_call,
                user_id
            )


            print(
                "Tool result:",
                result
            )


            # --------------------------------------------------
            # CREATE TOOL RESPONSE
            # --------------------------------------------------

            tool_response = types.Part.from_function_response(
                name=function_call.name,
                response={
                    "result": result
                }
            )


            # --------------------------------------------------
            # FINAL PROMPT
            # --------------------------------------------------

            final_prompt = f"""
You are ResearchPilot, an AI research and knowledge assistant.

Provide the final answer to the user's question.

Use the tool result to answer accurately.

If the tool was search_documents, answer only
using the information found in the uploaded documents.

Do not invent information.

If the tool was calculator, use the calculated result.

If the tool was web_search, use the information
returned by the web search.

Conversation history:
{history_text}

Formatting rules:
- Use plain text only.
- Do not use Markdown.
- Do not use ** for bold.
- Do not use # headings.
- Keep the answer clear and natural.

User question:
{question}
"""


            # --------------------------------------------------
            # STREAM FINAL ANSWER
            # --------------------------------------------------

            final_response = client.models.generate_content_stream(
                model=MODEL_NAME,
                contents=[
                    final_prompt,
                    response.candidates[0].content,
                    tool_response
                ]
            )


            # Send chunks to frontend
            for chunk in final_response:

                if chunk.text:
                    yield chunk.text


            return


    # --------------------------------------------------
    # NO TOOL REQUIRED
    # DIRECT STREAMING RESPONSE
    # --------------------------------------------------

    stream_prompt = f"""
You are ResearchPilot, an AI research and knowledge assistant.

Answer the user's question clearly and naturally.

Use the conversation history when it is relevant.

Conversation history:
{history_text}

Formatting rules:
- Use plain text only.
- Do not use Markdown.
- Do not use ** for bold.
- Do not use # headings.
- Keep the answer clear and concise.

User question:
{question}
"""


    # --------------------------------------------------
    # STREAM DIRECT ANSWER
    # --------------------------------------------------

    stream_response = client.models.generate_content_stream(
        model=MODEL_NAME,
        contents=stream_prompt
    )


    for chunk in stream_response:

        if chunk.text:
            yield chunk.text