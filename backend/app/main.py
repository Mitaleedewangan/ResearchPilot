# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware

# # from app.routes.chat import router as chat_router


# # app = FastAPI(
# #     title="ResearchPilot API",
# #     description="AI Research & Knowledge Agent",
# #     version="1.0.0"
# # )


# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:5173"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )


# # app.include_router(chat_router)


# # @app.get("/")
# # async def root():

# #     return {
# #         "message": "ResearchPilot API is running"
# #     }


# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware

# from app.routes.chat import router as chat_router
# from app.routes.documents import router as documents_router


# app = FastAPI(
#     title="ResearchPilot API",
#     description="AI Research & Knowledge Agent",
#     version="1.0.0"
# )


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# app.include_router(chat_router)
# app.include_router(documents_router)


# @app.get("/")
# async def root():
#     return {
#         "message": "ResearchPilot API is running"
#     }




from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from app.routes.chat import router as chat_router
from app.routes.reports import router as reports_router
from app.routes.documents import router as documents_router
from app.routes import auth


app = FastAPI(
    title="ResearchPilot API",
    description="AI Research & Knowledge Agent",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chat_router)
app.include_router(reports_router)
app.include_router(documents_router)
app.include_router(auth.router)


@app.get("/")
async def root():
    return {
        "message": "ResearchPilot API is running"
    }


def custom_openapi():

    if app.openapi_schema:
        return app.openapi_schema

    schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )

    components = schema.get("components", {}).get("schemas", {})

    for schema_data in components.values():

        properties = schema_data.get("properties", {})

        for property_data in properties.values():

            # Multiple file upload
            if property_data.get("type") == "array":

                items = property_data.get("items", {})

                if items.get("contentMediaType") == "application/octet-stream":

                    items.pop("contentMediaType", None)

                    items["type"] = "string"
                    items["format"] = "binary"

            # Single file upload
            elif property_data.get("type") == "string":

                if property_data.get("contentMediaType") == "application/octet-stream":

                    property_data.pop("contentMediaType", None)

                    property_data["format"] = "binary"

    app.openapi_schema = schema

    return app.openapi_schema


app.openapi = custom_openapi