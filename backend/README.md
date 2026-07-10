# Assist IQ Backend API

Production-style NestJS backend for the Assist IQ AI customer support SaaS platform.

## Tech Stack

- NestJS + TypeScript
- Supabase PostgreSQL (with pgvector)
- Supabase Storage
- Prisma ORM
- JWT authentication (custom, not Supabase Auth)
- OpenRouter (OpenAI-compatible SDK) for embeddings + chat
- Swagger docs at `/api/docs`

## Setup

### 1. Environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Required variables:

- `DATABASE_URL` — Supabase pooled PostgreSQL connection string
- `DIRECT_URL` — Supabase direct connection string (for migrations)
- `JWT_SECRET` — strong random secret
- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (backend only)
- `OPENROUTER_API_KEY` — OpenRouter API key
- `OPENROUTER_BASE_URL` — optional, defaults to `https://openrouter.ai/api/v1`
- `OPENROUTER_CHAT_MODEL` — optional, defaults to `openai/gpt-4o-mini`
- `OPENROUTER_EMBEDDING_MODEL` — optional, defaults to `openai/text-embedding-3-small`

### 2. Enable pgvector in Supabase

In the Supabase SQL editor, run:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Seed demo data (optional)

```bash
npm run seed
```

Demo credentials:

- Email: `demo@assistiq.com`
- Password: `password123`

### 6. Start the API

```bash
npm run start:dev
```

API runs on `http://localhost:4000` by default.

Swagger docs: `http://localhost:4000/api/docs`

## Scripts

| Script | Description |
|--------|-------------|
| `npm run start:dev` | Start in watch mode |
| `npm run build` | Compile TypeScript |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Apply migrations |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run seed` | Seed demo data |

## API Overview

### Auth
- `POST /auth/register` — register user + company + default chatbot
- `POST /auth/login` — login
- `GET /auth/me` — current user (JWT required)

### Company
- `GET /companies/me`
- `PATCH /companies/me`

### Chatbots
- `GET /chatbots`
- `GET /chatbots/:id`
- `PATCH /chatbots/:id`
- `PATCH /chatbots/:id/status`

### Documents
- `POST /documents/upload` — multipart file upload (PDF, TXT, DOCX)
- `GET /documents`
- `GET /documents/:id`
- `DELETE /documents/:id`
- `POST /documents/:id/process` — extract text, chunk, embed

### Conversations (dashboard)
- `POST /conversations/start`
- `POST /conversations/:id/messages`
- `GET /conversations`
- `GET /conversations/:id`
- `PATCH /conversations/:id/status`

### Public widget APIs (no auth)
- `GET /public/chatbots/:chatbotId`
- `POST /public/chatbots/:chatbotId/conversations`
- `POST /public/conversations/:conversationId/messages`

### Analytics
- `GET /analytics/overview`
- `GET /analytics/conversations`
- `GET /analytics/top-questions`

## Architecture

```
src/
├── auth/           JWT auth, register/login
├── companies/      Company profile
├── chatbots/       Chatbot settings
├── documents/      Upload + processing pipeline
├── embeddings/     OpenRouter embeddings
├── rag/            Vector search + LLM answers
├── conversations/  Chat + public widget endpoints
├── analytics/      Usage metrics
├── supabase/       Storage client (service role)
├── prisma/         Database access
└── common/         Shared utilities, filters, interceptors
```

## Document processing flow

1. Upload file → Supabase Storage (`assist-iq-documents` bucket)
2. Call `POST /documents/:id/process`
3. Text extracted (PDF/TXT/DOCX)
4. Text split into ~900 char chunks with 150 char overlap
5. Embeddings created via OpenRouter
6. Chunks stored in PostgreSQL with pgvector
7. RAG queries use cosine similarity to find top 5 chunks

## Response format

```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {}
}
```

## Security notes

- Passwords hashed with bcrypt
- JWT required for all dashboard endpoints
- Company-scoped data access enforced on every query
- Supabase service role key used only on backend
- Public APIs only expose active chatbot widget data
