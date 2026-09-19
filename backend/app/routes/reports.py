from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.services.research_service import collect_research_context
from app.services.report_service import generate_research_report
from app.auth.security import get_current_user


router = APIRouter(
    prefix="/api/reports",
    tags=["Research Reports"]
)


class ReportRequest(BaseModel):
    question: str
    context: str = ""

@router.post("/")
async def create_report(
    request: ReportRequest,
    current_user: dict = Depends(get_current_user)
):

    research = collect_research_context(
        question=request.question,
        user_id=current_user["user_id"]
    )

    report = generate_research_report(
        question=request.question,
        context=research["context"]
    )

    return {
        "success": True,
        "decision": research["decision"],
        "report": report.model_dump()
    }