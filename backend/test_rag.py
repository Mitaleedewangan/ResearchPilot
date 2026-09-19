from app.rag.loader import load_pdf
from app.rag.splitter import split_documents
from app.rag.vector_store import create_vector_store


pdf_path = "RAG_PDF.pdf"


documents = load_pdf(pdf_path)

print("Pages:", len(documents))


chunks = split_documents(documents)

print("Chunks:", len(chunks))


vector_db = create_vector_store(chunks)

print("FAISS index created successfully!")
print("Total chunks in FAISS:", vector_db.index.ntotal)