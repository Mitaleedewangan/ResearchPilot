from app.rag.vector_store import search_vector_store

results = search_vector_store("artificial intelligence", k=10)

print("Number of results:", len(results))

for i, doc in enumerate(results, start=1):
    print("\nRESULT", i)
    print("Source:", doc.metadata.get("source"))
    print("Page:", doc.metadata.get("page"))
    print(doc.page_content[:200])