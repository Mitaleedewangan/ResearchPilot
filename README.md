# 🚀 ResearchPilot – AI Research & Knowledge Agent

ResearchPilot is an AI-powered research assistant that combines **Generative AI, Retrieval-Augmented Generation (RAG), document retrieval, AI tool calling, web search, and conversational memory** to help users research topics, ask questions from uploaded documents, perform calculations, and generate structured research reports.

The application uses **Google Gemini** as the LLM with an interactive **React** frontend and **FastAPI** backend.

---

## ✨ Features

- 🤖 AI-powered conversational assistant using Google Gemini
- 📄 Upload and query PDF documents
- 🔍 Retrieval-Augmented Generation (RAG)
- 🧠 Semantic document search using Sentence Transformers
- ⚡ FAISS vector search for fast retrieval
- 🛠️ AI tool calling
- 🧮 Calculator tool for mathematical operations
- 🌐 Web search integration for research tasks
- 💬 Conversational chat memory
- 🔄 Streaming AI responses
- 🔐 JWT-based authentication
- 👤 User-specific document and chat data
- 📚 Research history and chat sessions
- 📊 Structured research report generation
- 🎨 Modern React-based dashboard
- 🌙 Dark SaaS-style UI

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │   Chat / Dashboard   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      FastAPI         │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     AI Agent         │
                    │    Google Gemini     │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌───────────┐    ┌───────────┐    ┌───────────┐
        │ RAG Tool  │    │ Web Search│    │ Calculator│
        │           │    │           │    │   Tool    │
        └─────┬─────┘    └───────────┘    └───────────┘
              │
              ▼
        ┌────────────────┐
        │ FAISS Vector   │
        │     Store      │
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │ PDF Documents  │
        └────────────────┘


                    ┌──────────────────────┐
                    │       MongoDB        │
                    │ Users / Chats /      │
                    │ Research History     │
                    └──────────────────────┘
```

---

## 🔄 RAG Workflow

ResearchPilot uses **Retrieval-Augmented Generation (RAG)** to answer questions using information from uploaded PDF documents.

```text
┌──────────────────────┐
│     PDF Upload       │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   Text Extraction    │
│     PyPDFLoader      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    Text Splitting    │
│   Chunk Size: 500    │
│    Overlap: 50       │
└──────────┬───────────┘
           ↓
┌────────────────────────────┐
│    Sentence Transformer    │
│      all-MiniLM-L6-v2      │
└────────────┬───────────────┘
             ↓
┌──────────────────────┐
│    FAISS Vector      │
│        Store         │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    Semantic Search   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   Relevant Context   │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│      Gemini LLM      │
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   Context-Aware      │
│       Answer         │
└──────────────────────┘
```

### RAG Components

- **PDF Loader:** Extracts text from uploaded PDF documents using `PyPDFLoader`.
- **Text Splitter:** Divides documents into smaller chunks for efficient retrieval.
- **Embeddings:** Converts text chunks into vector representations using `all-MiniLM-L6-v2`.
- **FAISS:** Stores and searches document embeddings using semantic similarity.
- **Retriever:** Retrieves the most relevant document chunks for the user's query.
- **Gemini:** Uses the retrieved context to generate the final answer.

---

## 🧠 AI Agent & Tool Calling

ResearchPilot uses Gemini to determine which tool is required for a user's request.

```text
User Question
      ↓
Gemini AI Agent
      ↓
Tool Selection
      │
      ├── RAG Search
      │
      ├── Web Search
      │
      ├── Calculator
      │
      └── No Tool
      ↓
Tool Execution
      ↓
Retrieved Information
      ↓
Gemini Reasoning
      ↓
Final Response
```

For research questions, the system can combine **document retrieval and web search** before generating the final response.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- JavaScript
- React Router
- Fetch API

### Backend

- Python
- FastAPI
- Uvicorn
- Pydantic

### AI / Generative AI

- Google Gemini
- Google GenAI SDK
- Prompt Engineering
- Function / Tool Calling

### RAG

- LangChain
- PyPDF
- Sentence Transformers
- FAISS
- `all-MiniLM-L6-v2`

### Database

- MongoDB
- PyMongo

### Authentication

- JWT
- bcrypt
- HTTP Bearer Authentication

### Development Tools

- Git
- GitHub
- Postman
- Swagger / OpenAPI

---

## 📁 Project Structure

```text
ResearchPilot/
│
├── backend/
│   │
│   ├── app/
│   │   ├── auth/
│   │   │   └── security.py
│   │   │
│   │   ├── rag/
│   │   │   ├── embeddings.py
│   │   │   ├── loader.py
│   │   │   ├── splitter.py
│   │   │   └── vector_store.py
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── chat.py
│   │   │   ├── documents.py
│   │   │   └── reports.py
│   │   │
│   │   ├── services/
│   │   │   ├── agent_service.py
│   │   │   ├── gemini_service.py
│   │   │   ├── report_service.py
│   │   │   ├── research_service.py
│   │   │   └── web_search_service.py
│   │   │
│   │   ├── tools/
│   │   │   ├── calculator.py
│   │   │   └── rag_tool.py
│   │   │
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── test_*.py
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔐 Authentication

ResearchPilot uses **JWT-based authentication** for securing protected API routes.

```text
Signup
  ↓
Password Hashing
  ↓
MongoDB
  ↓
Login
  ↓
JWT Token
  ↓
Protected API Routes
```

Protected functionality includes:

- Chat
- Chat history
- Documents
- Research sessions
- Research reports

---

## 💬 Conversational Memory

ResearchPilot stores conversation history in MongoDB.

Each conversation is associated with:

```text
user_id
session_id
message
role
timestamp
```

This allows users to:

- Continue previous conversations
- View research history
- Switch between chat sessions
- Maintain contextual conversations

---

## ⚡ Streaming Responses

ResearchPilot supports streaming AI responses using FastAPI's `StreamingResponse`.

```text
React UI
   ↓
POST /api/chat/stream
   ↓
FastAPI
   ↓
Gemini
   ↓
StreamingResponse
   ↓
React UI
```

This allows AI responses to appear progressively in the chat interface instead of waiting for the complete response.

---

## 📊 Research Reports

ResearchPilot can generate structured research reports using information collected during the research workflow.

The workflow can combine:

- User questions
- Uploaded document context
- Retrieved information
- AI reasoning
- Research tools
- Web search results

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### Chat

```text
POST /api/chat/
POST /api/chat/stream
GET  /api/chat/history/{session_id}
GET  /api/chat/sessions
```

### Documents

```text
POST /api/documents/upload
GET  /api/documents/
```

### Research Reports

```text
POST /api/reports/
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Mitaleedewangan/ResearchPilot.git

cd ResearchPilot
```

---

# 🐍 Backend Setup

## 2. Create a Virtual Environment

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

---

## 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create the following file:

```text
backend/.env
```

Use `.env.example` as a reference.

Example:

```env
GEMINI_API_KEY=your_gemini_api_key

MONGO_URI=your_mongodb_connection_string

DATABASE_NAME=researchpilot

SECRET_KEY=your_secret_key

ALGORITHM=HS256
```

⚠️ **Never commit `.env` to GitHub.**

---

## 5. Start the Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger API Documentation:

```text
http://localhost:8000/docs
```

---

# ⚛️ Frontend Setup

## 6. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend

npm install
```

---

## 7. Start the Frontend

```bash
npm run dev
```

The frontend will run on the Vite development server:

```text
http://localhost:5173
```

---

## 🧪 Testing

The backend contains test scripts for major components:

```text
test_rag.py
test_rag_tool.py
test_faiss.py
test_search.py
test_stream.py
test_webSearch.py
test_web_service.py
```

Example:

```bash
python test_rag.py
```

---

## 🔒 Security

The following files and directories are intentionally excluded from Git:

```text
.env
venv/
__pycache__/
faiss_index/
uploads/
node_modules/
dist/
```

API keys, database credentials, and other sensitive information should always be stored in environment variables.

---

## 🚀 Future Improvements

- Persistent cloud vector database
- Advanced web search integration
- Improved source citations
- Multi-document research workflows
- Background research jobs
- Research report export to PDF
- Advanced document metadata filtering
- Additional AI tools
- Docker support
- Production deployment
- CI/CD pipeline

---

## 👩‍💻 Author

**Mitalee Dewangan**

B.Tech – Computer Science & Engineering

GitHub:

https://github.com/Mitaleedewangan

---

## 📌 Project Status

ResearchPilot is an AI research assistant project demonstrating practical implementation of:

- Generative AI
- Retrieval-Augmented Generation (RAG)
- Agentic workflows
- AI tool calling
- Semantic search
- Vector search
- Conversational AI
- Full-stack development
- FastAPI
- React
- MongoDB
