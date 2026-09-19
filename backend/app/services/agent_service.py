


from google.genai import types

from app.tools.calculator import calculator
from app.tools.rag_tool import search_documents
from app.services.web_search_service import web_search

import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(
    api_key=GEMINI_API_KEY
)

MODEL_NAME = "gemini-3.6-flash"


def decide_research_tools(question: str) -> str:

    prompt = f"""
You are a strict research planning agent.

Your job is to decide which information source is needed
to answer the user's question.

Available sources:

RAG
- Use RAG ONLY when the answer should come from the user's
  uploaded documents, PDFs, resume, notes, or files.
- Examples:
  "What skills are mentioned in my resume?"
  "Summarize my uploaded PDF."
  "What projects are mentioned in the document?"

WEB
- Use WEB ONLY when the question requires current,
  latest, recent, real-time, or internet information.
- Examples:
  "What are the latest developments in RAG?"
  "What is the latest version of FastAPI?"

BOTH
- Use BOTH ONLY when the question explicitly requires
  information from uploaded documents AND current/latest
  internet information.
- Example:
  "Compare the RAG approach in my uploaded document
   with the latest RAG approaches."

NONE
- Use NONE when the question can be answered without
  uploaded documents or current internet information.
- Examples:
  "What is RAG?"
  "What is Python?"

IMPORTANT RULES:

1. If the question mentions "my resume", "my PDF",
   "uploaded document", "uploaded files", "my notes",
   or asks what is contained in a document,
   choose RAG.

2. If the question asks for latest/current/recent
   internet information, choose WEB.

3. Choose BOTH only if BOTH document information
   AND current internet information are explicitly required.

4. Do not choose BOTH just because the question is
   a research question.

5. Return ONLY one word:
   RAG
   WEB
   BOTH
   NONE

User question:
{question}
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    decision = response.text.strip().upper()

    if decision not in ["RAG", "WEB", "BOTH", "NONE"]:
        return "NONE"

    return decision

# Calculator tool
calculator_tool = {
    "name": "calculator",
    "description": (
        "Use this tool when the user asks for a mathematical calculation "
        "such as addition, subtraction, multiplication, or division."
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "operation": {
                "type": "string",
                "enum": [
                    "add",
                    "subtract",
                    "multiply",
                    "divide"
                ],
                "description": "The mathematical operation to perform."
            },
            "a": {
                "type": "number",
                "description": "The first number."
            },
            "b": {
                "type": "number",
                "description": "The second number."
            }
        },
        "required": [
            "operation",
            "a",
            "b"
        ]
    }
}


# RAG / Document Search tool
rag_tool = {
    "name": "search_documents",
    "description": (
        "Use this tool when the user's question requires information "
        "from the documents uploaded by the user. "
        "Search the uploaded PDFs for relevant information."
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": (
                    "The search query that describes the information "
                    "needed from the uploaded documents."
                )
            }
        },
        "required": [
            "query"
        ]
    }
}

web_search_tool = {
    "name": "web_search",
    "description": (
        "Use this tool when the user asks for current, latest, "
        "recent, real-time, or internet-based information."
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "The search query to use for web search."
            }
        },
        "required": ["query"]
    }
}


def get_tools():
    return types.Tool(
        function_declarations=[
            calculator_tool,
            rag_tool,
            web_search_tool
        ]
    )


def execute_tool(function_call, user_id: str):

    if function_call.name == "calculator":

        return calculator(
            operation=function_call.args["operation"],
            a=function_call.args["a"],
            b=function_call.args["b"]
        )

    elif function_call.name == "search_documents":

        return search_documents(
            query=function_call.args["query"],
            user_id=user_id
        )

    elif function_call.name == "web_search":

        return web_search(
            question=function_call.args["query"]
        )

    else:

        return "Unknown tool"


if __name__ == "__main__":

    question = input("Enter research question: ")

    decision = decide_research_tools(question)

    print("Agent Decision:", decision)