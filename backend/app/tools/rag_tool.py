

from app.rag.vector_store import search_vector_store


def search_documents(query: str, user_id: str) -> str:

    results = search_vector_store(
        query=query,
        user_id=user_id,
        k=3
    )

    if not results:
        return "No relevant information was found in the documents."

    context = []

    for i, doc in enumerate(results, start=1):

        context.append(
            f"Document Result {i}:\n"
            f"{doc.page_content}\n"
            f"Source: {doc.metadata.get('source', 'Unknown')}\n"
            f"Page: {doc.metadata.get('page', 'Unknown')}"
        )

    return "\n\n".join(context)