
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from fastapi.responses import StreamingResponse

from app.services.gemini_service import (
    ask_gemini,
    stream_gemini
)
from app.auth.security import get_current_user

from app.database import (
    chat_history_collection,
    get_chat_history,
    get_chat_sessions
)


router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    message: str
    session_id: str


@router.post("/")
async def chat(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):

    answer = ask_gemini(
        request.message,
        current_user["user_id"]
    )

    chat_history_collection.insert_many([
        {
            "user_id": current_user["user_id"],
            "session_id": request.session_id,
            "role": "user",
            "content": request.message
        },
        {
            "user_id": current_user["user_id"],
            "session_id": request.session_id,
            "role": "assistant",
            "content": answer
        }
    ])

    return {
        "success": True,
        "answer": answer
    }


@router.get("/history/{session_id}")
async def get_history(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    history = get_chat_history(
        user_id=current_user["user_id"],
        session_id=session_id
    )

    return {
        "success": True,
        "messages": history
    }


@router.get("/sessions")
async def get_sessions(
    current_user: dict = Depends(get_current_user)
):
    sessions = get_chat_sessions(
        user_id=current_user["user_id"]
    )

    return {
        "success": True,
        "sessions": sessions
    }


@router.post("/stream")
async def stream_chat(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user)
):

    async def generate():

        full_answer = ""

        for chunk in stream_gemini(
            request.message,
            request.session_id,
            current_user["user_id"]
        ):

            full_answer += chunk

            yield chunk

        chat_history_collection.insert_many([
        {
            "user_id": current_user["user_id"],
            "session_id": request.session_id,
            "role": "user",
            "content": request.message
        },
        {
            "user_id": current_user["user_id"],
            "session_id": request.session_id,
            "role": "assistant",
            "content": full_answer
        }
    ])

    return StreamingResponse(
        generate(),
        media_type="text/plain"
    )