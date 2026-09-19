from app.services.agent_service import decide_research_tools
from app.tools.rag_tool import search_documents
from app.services.web_search_service import web_search
import os



USE_MOCK_PLANNER = os.getenv(
    "USE_MOCK_PLANNER",
    "false"
).lower() == "true"

USE_MOCK_WEB_SEARCH = os.getenv(
    "USE_MOCK_WEB_SEARCH",
    "false"
).lower() == "true"


def collect_research_context(question: str, user_id: str):

    if USE_MOCK_PLANNER:
        decision = "BOTH"
        print("Research decision: BOTH (MOCK)")
    else:
        decision = decide_research_tools(question)
        print("Research decision:", decision)

    contexts = []

    if decision in ["RAG", "BOTH"]:

        rag_result = search_documents(
            query=question,
            user_id=user_id
        )

        contexts.append(
            "Information from uploaded documents:\n"
            + rag_result
        )

    if decision in ["WEB", "BOTH"]:

        if USE_MOCK_WEB_SEARCH:
            web_result = (
                "Latest RAG approaches commonly include "
                "hybrid retrieval, query rewriting, reranking, "
                "agentic RAG, adaptive retrieval, GraphRAG, "
                "and improved RAG evaluation."
            )
            print("Web search: MOCK")
        else:
            web_result = web_search(question)

        contexts.append(
            "Information from web search:\n"
            + web_result
        )

    if not contexts:

        contexts.append(
            "No external research sources were required."
        )

    combined_context = "\n\n".join(contexts)

    return {
        "decision": decision,
        "context": combined_context
    }

if __name__ == "__main__":

    question = input("Enter research question: ")

    result = collect_research_context(question)

    print("\nDecision:")
    print(result["decision"])

    print("\nResearch Context:")
    print(result["context"])
