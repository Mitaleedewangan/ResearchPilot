from app.services.gemini_service import stream_gemini

result = stream_gemini(
    "Explain what artificial intelligence is in simple words."
)

for chunk in result:
    print(chunk, end="", flush=True)