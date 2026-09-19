

# import os

# from langchain_community.vectorstores import FAISS
# from langchain_core.embeddings import Embeddings

# from app.rag.embeddings import embedding_model


# class SentenceTransformerEmbeddings(Embeddings):

#     def embed_documents(self, texts):
#         return embedding_model.encode(
#             texts,
#             normalize_embeddings=True
#         ).tolist()

#     def embed_query(self, text):
#         return embedding_model.encode(
#             text,
#             normalize_embeddings=True
#         ).tolist()


# def create_vector_store(chunks):

#     embeddings = SentenceTransformerEmbeddings()

#     texts = [chunk.page_content for chunk in chunks]
#     metadatas = [chunk.metadata for chunk in chunks]

#     # Create FAISS index for the new PDF
#     new_vector_db = FAISS.from_texts(
#         texts,
#         embeddings,
#         metadatas=metadatas
#     )

#     # If FAISS index already exists
#     if os.path.exists("faiss_index/index.faiss"):

#         vector_db = FAISS.load_local(
#             "faiss_index",
#             embeddings,
#             allow_dangerous_deserialization=True
#         )

#         # Merge new PDF index with existing index
#         vector_db.merge_from(new_vector_db)

#     else:

#         # First PDF
#         vector_db = new_vector_db

#     # Save updated FAISS index
#     vector_db.save_local("faiss_index")

#     return vector_db


# def search_vector_store(query: str, k: int = 3):

#     embeddings = SentenceTransformerEmbeddings()

#     # Check whether FAISS index exists
#     if not os.path.exists("faiss_index/index.faiss"):
#         return []

#     vector_db = FAISS.load_local(
#         "faiss_index",
#         embeddings,
#         allow_dangerous_deserialization=True
#     )

#     # Semantic search
#     return vector_db.similarity_search(query, k=k)



import os

from langchain_community.vectorstores import FAISS
from langchain_core.embeddings import Embeddings

from app.rag.embeddings import embedding_model


class SentenceTransformerEmbeddings(Embeddings):

    def embed_documents(self, texts):
        return embedding_model.encode(
            texts,
            normalize_embeddings=True
        ).tolist()

    def embed_query(self, text):
        return embedding_model.encode(
            text,
            normalize_embeddings=True
        ).tolist()


def create_vector_store(chunks, user_id: str):

    embeddings = SentenceTransformerEmbeddings()

    texts = [chunk.page_content for chunk in chunks]

    metadatas = []

    for chunk in chunks:
        metadata = chunk.metadata.copy()
        metadata["user_id"] = user_id
        metadatas.append(metadata)

    # User-specific FAISS directory
    user_faiss_dir = os.path.join(
        "faiss_index",
        user_id
    )

    os.makedirs(
        user_faiss_dir,
        exist_ok=True
    )

    # Create FAISS index for the new PDF
    new_vector_db = FAISS.from_texts(
        texts,
        embeddings,
        metadatas=metadatas
    )

    index_file = os.path.join(
        user_faiss_dir,
        "index.faiss"
    )

    # If user's FAISS index already exists
    if os.path.exists(index_file):

        vector_db = FAISS.load_local(
            user_faiss_dir,
            embeddings,
            allow_dangerous_deserialization=True
        )

        # Add new PDF chunks to user's existing index
        vector_db.merge_from(new_vector_db)

    else:

        # First PDF for this user
        vector_db = new_vector_db

    # Save user's FAISS index
    vector_db.save_local(
        user_faiss_dir
    )

    return vector_db


def search_vector_store(
    query: str,
    user_id: str,
    k: int = 3
):

    embeddings = SentenceTransformerEmbeddings()

    # User-specific FAISS directory
    user_faiss_dir = os.path.join(
        "faiss_index",
        user_id
    )

    index_file = os.path.join(
        user_faiss_dir,
        "index.faiss"
    )

    # Check whether user's FAISS index exists
    if not os.path.exists(index_file):
        return []

    vector_db = FAISS.load_local(
        user_faiss_dir,
        embeddings,
        allow_dangerous_deserialization=True
    )

    # Search only this user's vector store
    return vector_db.similarity_search(
        query,
        k=k
    )