from app.tools.rag_tool import search_documents


query = "What is artificial intelligence?"

result = search_documents(query)

print("\nRAG TOOL RESULT:\n")
print(result)