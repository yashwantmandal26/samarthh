# Samarth Jharkhand Connect

**Samarth Jharkhand Connect** is a sophisticated, AI-powered citizen assistance platform specifically engineered to simplify access to Jharkhand government services. By leveraging advanced Natural Language Processing (NLP) and a modern frontend stack, it provides a bridge between complex bureaucratic processes and the everyday needs of Jharkhand's citizens.

---

## 1. Project Overview & Architecture

### Purpose
The project serves as a comprehensive portal for Jharkhand citizens to discover, understand, and apply for state and central government schemes. It addresses the digital divide by providing an intuitive, conversational interface that explains complex requirements in simple, step-by-step instructions.

### Architecture
The application follows a modern **Serverless & Event-Driven Architecture**:
- **Frontend**: A high-performance Single Page Application (SPA) built with React and Vite.
- **Backend (BaaS)**: Powered by Supabase, utilizing PostgreSQL for persistence and Edge Functions for server-side logic.
- **AI Engine**: Integrates with LLM gateways (via Supabase Edge Functions) to provide real-time, context-aware assistance.
- **State Management**: Uses TanStack Query (React Query) for efficient data fetching, caching, and synchronization.

---

## 2. Detailed Features

### 🚀 Conversational AI Assistant (Samarth)
- **Technical Implementation**: Implemented using **Supabase Edge Functions** (Deno) which acts as a secure proxy to LLM APIs. It utilizes Server-Sent Events (SSE) for real-time response streaming.
- **Capabilities**: Expert knowledge in JharSewa, Jharbhoomi, e-District portals, and central schemes like PM Awas Yojana.

### 📊 Dynamic Scheme Discovery
- **Technical Implementation**: A modular component system built with **Framer Motion** for interactive animations. Data is structured as strongly-typed objects in TypeScript.
- **Capabilities**: Categorized view of schemes (Housing, Health, Agriculture) with instant metadata display (benefits, eligibility, required documents).

### 🌐 Multilingual Support
- **Technical Implementation**: The AI engine is configured via a comprehensive **System Prompt** to detect and respond in English, Hindi, and Santhali.
- **Capabilities**: Seamless transition between languages based on user input.

### 📱 Responsive Citizen Portal
- **Technical Implementation**: Developed using **Tailwind CSS** with a mobile-first approach. UI components are derived from **shadcn/ui** (Radix UI primitives).

---

## 3. Technology Stack

### Frontend
- **React 18.3.1**: UI Library.
- **Vite 5.4.19**: Build tool and dev server.
- **TypeScript 5.8.3**: Static type checking.
- **Tailwind CSS 3.4.17**: Utility-first styling.
- **Framer Motion 12.36.0**: Animation library.
- **Lucide React 0.462.0**: Iconography.

### Backend & Database
- **Supabase**: Backend-as-a-Service.
- **PostgreSQL**: Relational database.
- **Deno (Edge Functions)**: Server-side logic.

### Utilities & Testing
- **Zod 3.25.76**: Schema validation.
- **Vitest 3.2.4**: Unit testing.
- **Playwright 1.57.0**: End-to-end testing.
- **ESLint 9.32.0**: Linting.

---

## 4. Installation & Setup

### Prerequisites
- Node.js (v18.x or higher)
- npm or bun
- Supabase CLI (for backend development)

### Step-by-Step Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd samarth-jharkhand-connect-main
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

---

## 5. Configuration

### Environment Variables
| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | URL of your Supabase project | - |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public API key for Supabase | - |
| `SAMARTH_AI_API_KEY` | Secret key for AI Gateway (Edge Function) | - |

---

## 6. API Documentation

### Samarth Chat Edge Function
**Endpoint**: `POST /functions/v1/samarth-chat`

**Description**: Handles conversational queries and returns a streamed response.

**Request Body**:
```json
{
  "messages": [
    { "role": "user", "content": "How to apply for Ration Card?" }
  ]
}
```

**Response**: `text/event-stream` delivering chunks of the AI response.

---

## 7. Database Schema

The database consists of two main tables with a one-to-many relationship:

### `conversations`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Unique conversation identifier |
| `session_id` | TEXT | Identifier for the user session |
| `created_at` | TIMESTAMPTZ | Creation timestamp |

### `chat_messages`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID (PK) | Unique message identifier |
| `conversation_id` | UUID (FK) | Reference to `conversations.id` |
| `role` | TEXT | 'user' or 'assistant' |
| `content` | TEXT | The message text |

---

## 8. Testing

### Unit Tests
The project uses **Vitest** for testing business logic and component rendering.
```bash
npm run test
```

### End-to-End (E2E) Tests
**Playwright** is used to simulate user flows across the portal.
```bash
npx playwright test
```

---

## 9. Deployment

### Frontend (Static)
1. Build the production assets:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to Vercel, Netlify, or GitHub Pages.

### Backend (Supabase)
1. Link your Supabase project:
   ```bash
   supabase link --project-ref your_project_ref
   ```
2. Deploy functions and migrations:
   ```bash
   supabase functions deploy samarth-chat
   supabase db push
   ```

---

## 10. Contributing & Standards

### Code Standards
- **Component Design**: Follow the Atomic Design pattern within `src/components`.
- **Type Safety**: Avoid using `any`; always define interfaces for props and data models.
- **Naming Conventions**: Use PascalCase for components and camelCase for functions/variables.

### Workflow
1. Create a feature branch.
2. Ensure `npm run lint` passes.
3. Submit a Pull Request with a detailed description of changes.
