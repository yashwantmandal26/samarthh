# Samarth Jharkhand Connect

**Samarth Jharkhand Connect** is a **Neuro-Symbolic Multi-Agent System** that simplifies access to Jharkhand government services. It uses a local AI model (Ollama Gemma 3 4B) for natural language understanding and a deterministic symbolic rule engine for scheme matching — all **fully offline**.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│              React + Vite SPA               │
│  ┌────────┐  ┌──────────┐  ┌─────────────┐ │
│  │ Chat   │  │ Landing  │  │ Scheme      │ │
│  │ Page   │  │ Page     │  │ Detail Modal│ │
│  └───┬────┘  └──────────┘  └─────────────┘ │
│      │                                      │
│  ┌───▼──────────────────────────────────┐   │
│  │       Orchestrator Agent             │   │
│  │   (State Machine & Field Tracking)   │   │
│  └───┬──────────────┬──────────────┘    │   │
│      │              │                   │   │
│  ┌───▼────┐    ┌────▼─────────────┐     │   │
│  │Extract.│    │ Reasoning Agent  │     │   │
│  │Agent   │    │ (Symbolic Rules) │     │   │
│  │(LLM)   │    │ + Schemes DB     │     │   │
│  └───┬────┘    └──────────────────┘     │   │
│      │                                  │   │
│  ┌───▼────────────────────────────┐     │   │
│  │   Offline DB (localStorage)   │     │   │
│  └────────────────────────────────┘     │   │
└─────────────────────────────────────────────┘
         │ (Vite Proxy)
    ┌────▼────────────┐
    │  Ollama Server  │
    │  gemma3:4b      │
    │  localhost:11434 │
    └─────────────────┘
```

### Multi-Agent System
- **Extraction Agent** (Neural): Uses Ollama `gemma3:4b` to parse natural language, extract user facts (age, income, category, etc.)
- **Reasoning Agent** (Symbolic): Deterministic TypeScript engine with 25+ schemes, knockout-based eligibility scoring
- **Orchestrator Agent**: State machine managing the profiling flow, field tracking, and agent coordination

### Offline by Design
- **No cloud database** — all data (conversations, messages, profiles) stored in browser `localStorage`
- **No API keys needed** — Ollama runs locally on your machine
- **No internet required** — once dependencies are installed

---

## Quick Start

### Prerequisites
- **Node.js** v18+
- **Ollama** installed and running

### Setup
```bash
# 1. Clone & install
git clone <repository-url>
cd samarth-jharkhand-connect
npm install

# 2. Pull the AI model
ollama pull gemma3:4b

# 3. Start Ollama (if not already running)
ollama serve

# 4. Start the app
npm run dev
```

Open `http://localhost:8080` in your browser.

---

## Project Structure

```
src/
├── agents/
│   ├── ExtractionAgent.ts    # LLM integration (Ollama streaming)
│   ├── ReasoningAgent.ts     # Symbolic rule engine + schemes DB
│   └── useOrchestrator.ts    # Profiling state machine
├── components/
│   ├── ui/                   # Base UI components (shadcn/ui)
│   ├── HeroSection.tsx       # Landing page hero
│   ├── CategoriesSection.tsx # Service categories
│   ├── SchemesSection.tsx    # Popular schemes
│   ├── FeaturesSection.tsx   # Feature highlights
│   ├── SchemeDetailModal.tsx # Scheme detail overlay
│   ├── EligibleSchemesCard.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── offlineDb.ts          # localStorage persistence layer
│   └── utils.ts
├── pages/
│   ├── Index.tsx             # Landing page
│   ├── Chat.tsx              # Main chat interface
│   └── NotFound.tsx
└── hooks/
    ├── use-mobile.tsx
    └── use-toast.ts
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, Radix UI primitives |
| AI Model | Ollama (gemma3:4b) — local |
| Persistence | localStorage (fully offline) |
| Animations | Framer Motion |

---

## Features

- **Conversational AI**: Chat in English, Hindi, Santhali, or Hinglish
- **Scheme Matching**: 25+ Jharkhand & Central government schemes
- **Two Modes**: "Find My Schemes" (profiling) and "Ask a Question" (general assistance)
- **Scheme Details**: Documents required, step-by-step process, official links
- **Text-to-Speech**: Listen to scheme information
- **Fully Offline**: No cloud, no API keys, no internet after setup

---

## Testing

```bash
npm run test        # Run unit tests
npm run lint        # Run ESLint
npm run build       # Production build
```

---

## License

Built for Jharkhand citizens. © 2026 Samarth.
