from pydantic import BaseModel
from typing import List

from google import genai
from google.genai import types

import os
from dotenv import load_dotenv


load_dotenv()

USE_MOCK_REPORT = os.getenv(
    "USE_MOCK_REPORT",
    "false"
).lower() == "true"

print("USE_MOCK_REPORT =", USE_MOCK_REPORT)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(
    api_key=GEMINI_API_KEY
)

MODEL_NAME = "gemini-3.6-flash"


class ResearchReport(BaseModel):
    title: str
    summary: str
    key_findings: List[str]
    sources: List[str]
    conclusion: str


def generate_research_report(
    question: str,
    context: str = ""
) -> ResearchReport:

    if USE_MOCK_REPORT:

        return ResearchReport(
            title=f"Research Report: {question}",
            summary=(
                f"This is a mock research report generated "
                f"for the question: {question}"
            ),
            key_findings=[
                f"The research question is: {question}",
                "Relevant information would be collected from uploaded documents.",
                "Current web information would be collected when required.",
                "The final answer would combine the collected research context."
            ],
            sources=[
                "Uploaded documents (mock)",
                "Web research (mock)"
            ],
            conclusion=(
                f"The research workflow completed successfully "
                f"for the question: {question}."
            )
        )

    prompt = f"""
You are ResearchPilot, an AI research assistant.

Generate a structured research report for the user's question.

User question:
{question}

Additional context:
{context}

The report must contain:


1. title
2. summary
3. key_findings
4. sources
5. conclusion

Rules:
- Keep the title short and clear.
- Give a concise but useful summary.
- Provide 3 to 5 important key findings.
- Give a clear conclusion.
- Do not invent facts.
- List the important sources used from the provided context.
- Use only sources that actually appear in the provided context.
- Do not invent source names or URLs.
"""


    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=ResearchReport
        )
    )


    return ResearchReport.model_validate_json(
        response.text
    )