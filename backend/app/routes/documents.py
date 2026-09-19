import os
from typing import Annotated

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends

from app.rag.loader import load_pdf
from app.rag.splitter import split_documents
from app.rag.vector_store import create_vector_store
from app.database import documents_collection
from app.auth.security import get_current_user


router = APIRouter(
    prefix="/api/documents",
    tags=["Documents"]
)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_documents(
    files: Annotated[list[UploadFile], File(...)],
    current_user: dict = Depends(get_current_user)
):

    uploaded_files = []

    for file in files:

        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail=f"Only PDF files are allowed: {file.filename}"
            )

        file_path = os.path.join(
            UPLOAD_DIR,
            file.filename
        )

        file_content = await file.read()

        with open(file_path, "wb") as f:
            f.write(file_content)

        documents = load_pdf(file_path)

        chunks = split_documents(documents)

        create_vector_store(
            chunks,
            current_user["user_id"]
        )

        documents_collection.insert_one({
           
            "user_id": current_user["user_id"],
            "filename": file.filename,
            "pages": len(documents),
            "chunks": len(chunks)
        })
        

        uploaded_files.append({
            "filename": file.filename,
            "pages": len(documents),
            "chunks": len(chunks)
        })

    return {
        "success": True,
        "message": "PDFs uploaded and indexed successfully.",
        "files": uploaded_files
    }


@router.get("/")
async def get_documents(
    current_user: dict = Depends(get_current_user)
):
    documents = list(
    documents_collection.find(
        {
            "user_id": current_user["user_id"]
        },
        {
            "_id": 0
        }
    ).sort("_id", -1)
)

    return {
        "success": True,
        "documents": documents
    }
