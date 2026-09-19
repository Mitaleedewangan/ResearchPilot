from app.services.web_search_service import web_search


result = web_search(
    "What are the latest developments in artificial intelligence?"
)

print("\nWEB SEARCH RESULT:\n")
print(result)