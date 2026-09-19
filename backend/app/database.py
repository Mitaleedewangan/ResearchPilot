import os

from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

DATABASE_NAME = os.getenv("DATABASE_NAME", "researchpilot")

client = MongoClient(MONGO_URI)

db = client[DATABASE_NAME]

documents_collection = db["documents"]

chat_history_collection = db["chat_history"]

users_collection = db["users"]




def get_chat_history(
    user_id: str,
    session_id: str,
    limit: int = 10
):
    messages = list(
        chat_history_collection
        .find(
            {
                "user_id": user_id,
                "session_id": session_id
            },
            {
                "_id": 0,
                "role": 1,
                "content": 1
            }
        )
        .sort("_id", -1)
        .limit(limit)
    )

    messages.reverse()

    return messages


def get_chat_sessions(user_id: str):
    sessions = chat_history_collection.aggregate([
        {
            "$match": {
                "user_id": user_id
            }
        },
        {
            "$sort": {
                "_id": 1
            }
        },
        {
            "$group": {
                "_id": "$session_id",
                "messages": {
                    "$push": {
                        "role": "$role",
                        "content": "$content"
                    }
                }
            }
        }
    ])

    result = []

    for session in sessions:
        user_messages = [
            message["content"]
            for message in session["messages"]
            if message["role"] == "user"
        ]

        last_question = user_messages[-1] if user_messages else "New Research"

        result.append({
            "session_id": session["_id"],
            "last_message": last_question
        })

    return result