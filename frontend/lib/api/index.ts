import { apiRequest } from "@/lib/api/client";
import type {
  AnalyticsOverview,
  AuthSession,
  Chatbot,
  ChatbotStatus,
  Company,
  Conversation,
  ConversationStatus,
  Document,
  Message,
  TopQuestion,
  User,
} from "@/lib/api/types";

export const api = {
  register(body: {
    fullName: string;
    companyName: string;
    email: string;
    password: string;
  }) {
    return apiRequest<AuthSession>("/auth/register", {
      method: "POST",
      body,
      auth: false,
    });
  },

  login(body: { email: string; password: string }) {
    return apiRequest<AuthSession>("/auth/login", {
      method: "POST",
      body,
      auth: false,
    });
  },

  me() {
    return apiRequest<{
      user: User;
      company: Company | null;
      companyRole: string | null;
    }>("/auth/me");
  },

  getCompany() {
    return apiRequest<Company>("/companies/me");
  },

  updateCompany(body: {
    name?: string;
    website?: string;
    industry?: string;
  }) {
    return apiRequest<Company>("/companies/me", {
      method: "PATCH",
      body,
    });
  },

  listChatbots() {
    return apiRequest<Chatbot[]>("/chatbots");
  },

  getChatbot(id: string) {
    return apiRequest<Chatbot>(`/chatbots/${id}`);
  },

  updateChatbot(
    id: string,
    body: {
      name?: string;
      welcomeMessage?: string;
      tone?: string;
      primaryColor?: string;
      status?: ChatbotStatus;
    },
  ) {
    return apiRequest<Chatbot>(`/chatbots/${id}`, {
      method: "PATCH",
      body,
    });
  },

  updateChatbotStatus(id: string, status: ChatbotStatus) {
    return apiRequest<Chatbot>(`/chatbots/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
  },

  listDocuments() {
    return apiRequest<Document[]>("/documents");
  },

  uploadDocument(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return apiRequest<Document>("/documents/upload", {
      method: "POST",
      formData,
    });
  },

  processDocument(id: string) {
    return apiRequest<Document>(`/documents/${id}/process`, {
      method: "POST",
    });
  },

  deleteDocument(id: string) {
    return apiRequest<{ id: string }>(`/documents/${id}`, {
      method: "DELETE",
    });
  },

  listConversations() {
    return apiRequest<Conversation[]>("/conversations");
  },

  getConversation(id: string) {
    return apiRequest<Conversation>(`/conversations/${id}`);
  },

  startConversation(body: {
    chatbotId: string;
    visitorName?: string;
    visitorEmail?: string;
  }) {
    return apiRequest<{ conversation: Conversation; welcomeMessage: string }>(
      "/conversations/start",
      { method: "POST", body },
    );
  },

  sendMessage(conversationId: string, content: string) {
    return apiRequest<Message>(`/conversations/${conversationId}/messages`, {
      method: "POST",
      body: { content },
    });
  },

  updateConversationStatus(id: string, status: ConversationStatus) {
    return apiRequest<Conversation>(`/conversations/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
  },

  analyticsOverview() {
    return apiRequest<AnalyticsOverview>("/analytics/overview");
  },

  analyticsConversations() {
    return apiRequest<Conversation[]>("/analytics/conversations");
  },

  analyticsTopQuestions() {
    return apiRequest<TopQuestion[]>("/analytics/top-questions");
  },
};
