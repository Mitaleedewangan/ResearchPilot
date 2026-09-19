from app.rag.vector_store import search_vector_store


query = "What is artificial intelligence?"

results = search_vector_store(query)

print("\nRetrieved Documents:\n")

for i, doc in enumerate(results, start=1):
    print(f"--- Result {i} ---")
    print(doc.page_content)
    print("Metadata:", doc.metadata)
    print()