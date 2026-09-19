import os

from dotenv import load_dotenv
from google import genai
from google.genai import types


load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(
    api_key=GEMINI_API_KEY
)


response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents="What are the latest developments in artificial intelligence?",
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                google_search=types.GoogleSearch()
            )
        ]
    )
)


print("\nWEB SEARCH RESULT:\n")
print(response.text)