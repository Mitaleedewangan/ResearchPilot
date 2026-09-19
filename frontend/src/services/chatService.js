

import axios from "axios";
import { getToken } from "../utils/auth";

const API_BASE_URL = "https://researchpilot-backend-0f0d.onrender.com";

const getAuthHeaders = () => {
  const token = getToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};


// Normal Chat
export const sendMessage = async (message) => {
  const response = await axios.post(
    `${API_BASE_URL}/chat/`,
    {
      message,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};


// Streaming Chat
export const streamMessage = async (message, sessionId, onChunk) => {
  const response = await fetch(
    `${API_BASE_URL}/chat/stream`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },

      body: JSON.stringify({
        message,
        session_id: sessionId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Streaming request failed");
  }

  if (!response.body) {
    throw new Error("Streaming is not supported");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value, {
      stream: true,
    });

    if (chunk) {
      onChunk(chunk);
    }
  }
};


// Upload Document
export const uploadDocument = async (file) => {
  const formData = new FormData();

  formData.append("files", file);

  const response = await fetch(
    `${API_BASE_URL}/documents/upload`,
    {
      method: "POST",

      headers: {
        ...getAuthHeaders(),
      },

      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Document upload failed");
  }

  return await response.json();
};


// Get Documents
export const getDocuments = async () => {
  const response = await fetch(
    `${API_BASE_URL}/documents/`,
    {
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }

  return await response.json();
};


// Generate Research Report
export const generateResearchReport = async (question) => {
  const response = await fetch(
    `${API_BASE_URL}/reports/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },

      body: JSON.stringify({
        question,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate research report");
  }

  return await response.json();
};


export const getChatHistory = async (sessionId) => {
  const response = await fetch(
    `${API_BASE_URL}/chat/history/${sessionId}`,
    {
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chat history");
  }

  return await response.json();
};


export const getChatSessions = async () => {
  const response = await fetch(
    `${API_BASE_URL}/chat/sessions`,
    {
      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch chat sessions");
  }

  return await response.json();
};