export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  industry: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CompanyRole = "OWNER";

export type ChatbotStatus = "ACTIVE" | "INACTIVE";

export type Chatbot = {
  id: string;
  companyId: string;
  name: string;
  welcomeMessage: string;
  tone: string;
  primaryColor: string;
  status: ChatbotStatus;
  createdAt: string;
  updatedAt: string;
};

export type DocumentStatus =
  | "UPLOADED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export type Document = {
  id: string;
  companyId: string;
  uploadedById: string;
  fileName: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  storageBucket: string;
  storagePath: string;
  publicUrl: string | null;
  status: DocumentStatus;
  extractedText: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ConversationStatus = "OPEN" | "RESOLVED" | "WAITING";

export type MessageRole = "USER" | "ASSISTANT" | "SYSTEM";

export type Message = {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  sources: unknown;
  createdAt: string;
};

export type Conversation = {
  id: string;
  chatbotId: string;
  companyId: string;
  visitorName: string | null;
  visitorEmail: string | null;
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
  chatbot?: { id: string; name: string };
  _count?: { messages: number };
};

export type AnalyticsOverview = {
  totalConversations: number;
  totalMessages: number;
  totalDocuments: number;
  totalDocumentChunks: number;
  chatbotStatus: { id: string; name: string; status: ChatbotStatus }[];
  monthlyUsage: { type: string; count: number }[];
};

export type TopQuestion = {
  question: string;
  count: number;
};

export type AuthSession = {
  token: string;
  user: User;
  company: Company | null;
  companyRole: CompanyRole | null;
  chatbot?: Chatbot;
};
