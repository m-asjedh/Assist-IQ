export const stats = [
  { label: "Total Conversations", value: "12,847", change: "+18%", icon: "MessageSquare" },
  { label: "Documents Uploaded", value: "34", change: "+3", icon: "FileText" },
  { label: "Chatbot Status", value: "Active", change: "Online", icon: "Bot" },
  { label: "Monthly Usage", value: "8,240", change: "Conversations this month", icon: "BarChart3" },
];

export const recentConversations = [
  { id: 1, customer: "Sarah Johnson", email: "sarah@example.com", lastMessage: "How do I reset my password?", time: "2 min ago", status: "open" },
  { id: 2, customer: "Michael Chen", email: "m.chen@acme.com", lastMessage: "What's your refund policy?", time: "15 min ago", status: "resolved" },
  { id: 3, customer: "Emily Rodriguez", email: "emily.r@gmail.com", lastMessage: "I can't find my order history", time: "1 hr ago", status: "waiting" },
  { id: 4, customer: "James Wilson", email: "jwilson@corp.com", lastMessage: "Need help with API integration", time: "3 hrs ago", status: "open" },
  { id: 5, customer: "Aisha Patel", email: "aisha@startup.io", lastMessage: "Thanks, that solved my issue!", time: "5 hrs ago", status: "resolved" },
];

export const documents = [
  { id: 1, name: "Company FAQ.pdf", type: "PDF", size: "2.4 MB", uploaded: "Jun 28, 2025", status: "trained" },
  { id: 2, name: "Refund Policy.docx", type: "DOCX", size: "340 KB", uploaded: "Jun 25, 2025", status: "trained" },
  { id: 3, name: "Product Guide.pdf", type: "PDF", size: "5.1 MB", uploaded: "Jun 20, 2025", status: "trained" },
  { id: 4, name: "Support Terms.txt", type: "TXT", size: "78 KB", uploaded: "Jun 18, 2025", status: "processing" },
];

export const chatMessages = [
  { id: 1, role: "bot", text: "Hi! I'm SupportMind, your AI assistant. How can I help you today?" },
  { id: 2, role: "user", text: "What is your return policy?" },
  { id: 3, role: "bot", text: "Our return policy allows returns within 30 days of purchase. Items must be unused and in original packaging. You can initiate a return from your account dashboard or contact our support team." },
  { id: 4, role: "user", text: "How long does the refund take?" },
  { id: 5, role: "bot", text: "Refunds are typically processed within 5–7 business days after we receive your return. You'll receive an email confirmation once your refund has been issued." },
];

export const suggestedQuestions = [
  "What is your refund policy?",
  "How do I reset my password?",
  "What are your business hours?",
  "How do I track my order?",
];

export const conversations = [
  { id: 1, customer: "Sarah Johnson", avatar: "SJ", lastMessage: "How do I reset my password?", time: "2 min ago", status: "open", messages: 4 },
  { id: 2, customer: "Michael Chen", avatar: "MC", lastMessage: "What's your refund policy?", time: "15 min ago", status: "resolved", messages: 8 },
  { id: 3, customer: "Emily Rodriguez", avatar: "ER", lastMessage: "I can't find my order history", time: "1 hr ago", status: "waiting", messages: 3 },
  { id: 4, customer: "James Wilson", avatar: "JW", lastMessage: "Need help with API integration", time: "3 hrs ago", status: "open", messages: 12 },
  { id: 5, customer: "Aisha Patel", avatar: "AP", lastMessage: "Thanks, that solved my issue!", time: "5 hrs ago", status: "resolved", messages: 6 },
  { id: 6, customer: "Tom Bradley", avatar: "TB", lastMessage: "How do I export my chat history?", time: "1 day ago", status: "waiting", messages: 2 },
  { id: 7, customer: "Nina Clarke", avatar: "NC", lastMessage: "Can I add more team members?", time: "1 day ago", status: "resolved", messages: 9 },
];

export const topQuestions = [
  { question: "How do I reset my password?", count: 342, percent: 85 },
  { question: "What is your refund policy?", count: 289, percent: 72 },
  { question: "How do I track my order?", count: 210, percent: 52 },
  { question: "What are your business hours?", count: 187, percent: 47 },
  { question: "How do I add the widget to my site?", count: 143, percent: 36 },
];

export const testimonials = [
  {
    name: "Rachel Kim",
    role: "Head of Customer Success",
    company: "TechFlow Inc.",
    avatar: "RK",
    text: "SupportMind AI cut our support ticket volume by 60% in the first month. Our team can now focus on complex cases.",
  },
  {
    name: "David Torres",
    role: "Founder",
    company: "ShopEase",
    avatar: "DT",
    text: "Setting up the chatbot took less than 30 minutes. We uploaded our FAQs and it was live. Absolutely magical.",
  },
  {
    name: "Laura Bennett",
    role: "Operations Manager",
    company: "CloudBase",
    avatar: "LB",
    text: "The analytics are incredibly detailed. We now know exactly what our customers struggle with and can proactively fix it.",
  },
];

export const faqs = [
  {
    question: "How does SupportMind AI train on my documents?",
    answer: "Simply upload your PDFs, Word documents, or text files. Our AI processes them automatically and your chatbot is ready to answer questions within minutes.",
  },
  {
    question: "Can I customize how the chatbot looks on my website?",
    answer: "Yes! You can customize the bot name, welcome message, colors, and avatar to match your brand. The widget setup page walks you through everything.",
  },
  {
    question: "Is SupportMind AI free to use?",
    answer: "Yes! SupportMind AI is completely free. Upload your documents, train your chatbot, and embed it on your website at no cost.",
  },
  {
    question: "What file formats are supported?",
    answer: "We support PDF, DOCX, TXT, and CSV files. Support for HTML and Notion pages is coming soon.",
  },
  {
    question: "Can I see what customers are asking?",
    answer: "Absolutely. The Conversations and Analytics pages give you full visibility into every interaction and the most common questions.",
  },
];
