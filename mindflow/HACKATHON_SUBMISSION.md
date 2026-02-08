# 🌊 MindFlow - Hackathon Submission

## 📝 Project Description

**MindFlow** is an intelligent mental wellness companion that revolutionizes how people interact with therapeutic tools. Instead of navigating through complex menus and choosing from preset options, users simply describe how they're feeling in natural language, and the AI intelligently selects and displays the most helpful therapeutic components.

### The Problem We're Solving

Traditional mental health apps create friction exactly when people need support most. When you're anxious, overwhelmed, or in crisis, the last thing you want to do is navigate through multiple screens and options. It's like asking someone drowning to choose their preferred life preserver design.

### Our Solution

MindFlow uses **Tambo's Generative UI SDK** to dynamically render therapeutic components based on the user's emotional state. The interface adapts in real-time:

- **"I'm feeling anxious"** → Breathing exercises + Grounding techniques
- **"I can't sleep"** → Sleep wind-down routine + Guided meditation  
- **"Show me my progress"** → Mood dashboard with insights
- **"I need help right now"** → Crisis resources immediately

### Key Innovation

The power lies in **contextual component selection**. Instead of showing all 10 therapeutic tools at once (overwhelming), or forcing users to choose (cognitive load), our AI intelligently selects 2-3 complementary components that work together based on:
- Current emotional state
- Conversation history
- Time of day
- Previous interactions
- Crisis detection

---

## 🎯 How We Use Tambo in MindFlow

MindFlow is built on **Tambo's React SDK** and demonstrates the true power of generative UI for mental wellness. Here's exactly how we integrate Tambo:

### 1. Component Registry System (`src/lib/tambo-registry.tsx`)

We register all 10 therapeutic components with Tambo's component registry:

```typescript
registerComponent({
  name: 'BreathingExercise',
  description: 'Interactive breathing exercise with animated timer',
  keywords: ['breathe', 'anxiety', 'panic', 'calm', 'stress'],
  category: 'calming',
  props: breathingExerciseSchema,
  interactive: true,
  urgent: false
});
```

Each component includes:
- **Rich metadata** - Description, keywords, categories
- **Zod schemas** - Type-safe props validation
- **Behavioral flags** - Interactive, urgent, priority levels
- **Semantic keywords** - Help AI understand when to use each component

### 2. AI-Driven Component Selection (`src/app/page.tsx`)

Instead of manual pattern matching, we leverage Claude Sonnet 4.5 through Tambo to intelligently select components:

```typescript
const result = await selectComponentsWithAI(userMessage, chatHistory);
```

The AI analyzes:
- User's emotional language ("anxious" vs "sad" vs "can't focus")
- Conversation context (what was shown before)
- Urgency level (crisis keywords trigger immediate action)
- Component compatibility (which tools work well together)

### 3. Local Tools Integration (`src/lib/tambo-tools.ts`)

We provide the AI with tools to enhance responses:

- **`analyzeMoodPatterns`** - Analyzes 7/14/30 day mood trends from localStorage
- **`getJournalPrompts`** - Returns mood-specific journal prompts
- **`getEmergencyResources`** - Provides crisis hotlines and resources
- **`getMoodContext`** - Retrieves recent mood history
- **`trackInteraction`** - Logs component usage patterns

These tools allow the AI to provide **personalized, context-aware support** without sending user data to external servers (privacy-first).

### 4. Enhanced System Prompt (`src/lib/tambo-config.ts`)

We crafted a detailed system prompt that teaches Tambo's AI:
- Mental wellness best practices (validation before solutions)
- Crisis detection rules (always prioritize safety)
- Component combination strategies (1-3 complementary tools)
- Empathetic conversation style (warm, non-judgmental)
- Professional boundaries (never diagnose, encourage real help)

### 5. Conversation Memory

MindFlow maintains chat history so Tambo's AI builds context over the conversation:

```typescript
const [chatHistory, setChatHistory] = useState<Array<{
  role: 'user' | 'assistant';
  content: string;
}>>([]);
```

This enables progressive understanding of the user's emotional journey, avoiding repetitive suggestions and building rapport.

### 6. Streaming Responses

We use Tambo's streaming capabilities for real-time feel:

```typescript
streaming: true  // In tambo-config.ts
```

Components render progressively as the AI makes decisions, creating a responsive, conversational experience.

---

## 🛠️ Tech Stack & Architecture

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### AI & Generative UI
- **Tambo React SDK** (`@tambo-ai/react`) - Core generative UI framework
- **Claude Sonnet 4.5** - AI model (via OpenRouter)
- **OpenRouter API** - Model routing and access
- **Zod** - Schema validation for component props

### State Management
- **React Hooks** - useState, useEffect, useCallback
- **localStorage** - Client-side persistence (privacy-first)
- **Effect-TS** - Functional programming utilities

### UI Components & Icons
- **Lucide React** - Beautiful, consistent icons
- **Custom Components** - 10 therapeutic components built from scratch

### Developer Experience
- **ESLint** - Code quality
- **TypeScript strict mode** - Type safety
- **Vercel** - Deployment platform

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│         (Natural language input + Chat display)          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Tambo AI Engine (Claude 4.5)                │
│  • Analyzes emotional context from user message          │
│  • Considers conversation history                        │
│  • Invokes local tools (mood patterns, journal prompts)  │
│  • Selects 1-3 optimal therapeutic components            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           Component Registry (Tambo Registry)            │
│  • 10 therapeutic components registered                  │
│  • Each with metadata, keywords, schemas                 │
│  • Categories: calming, expressive, analytical, etc.     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          Dynamic UI Rendering (Tambo Provider)           │
│  • Components render with AI-selected props              │
│  • Smooth animations via Framer Motion                   │
│  • Responsive, mobile-first design                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│            Local Storage (Privacy-First)                 │
│  • Mood logs (dates, emotions, notes)                    │
│  • Journal entries                                       │
│  • Component interaction history                         │
│  • NO external tracking or uploads                       │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Input** → User types natural language message
2. **Context Building** → App packages message + chat history
3. **AI Analysis** → Tambo/Claude analyzes emotional state
4. **Tool Invocation** → AI calls local tools for mood patterns
5. **Component Selection** → AI picks 2-3 optimal components
6. **UI Rendering** → Tambo renders components with props
7. **User Interaction** → User engages with therapeutic tools
8. **Local Persistence** → Data saved to localStorage
9. **Feedback Loop** → Next message has richer context

### Directory Structure

```
mindflow/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main chat interface with Tambo integration
│   │   ├── layout.tsx            # Root layout with TamboProvider
│   │   └── globals.css           # Global styles
│   │
│   ├── components/
│   │   ├── therapeutic/          # 10 therapeutic components
│   │   │   ├── BreathingExercise.tsx
│   │   │   ├── JournalPrompt.tsx
│   │   │   ├── MoodTracker.tsx
│   │   │   ├── CognitiveReframe.tsx
│   │   │   ├── MeditationGuide.tsx
│   │   │   ├── AnxietyGrounding.tsx
│   │   │   ├── MoodDashboard.tsx
│   │   │   ├── CrisisResources.tsx
│   │   │   ├── AffirmationsGenerator.tsx
│   │   │   └── SleepWindDown.tsx
│   │   │
│   │   ├── DemoMode.tsx          # Interactive demo showcase
│   │   └── TherapeuticContainer.tsx # Wrapper with animations
│   │
│   └── lib/
│       ├── tambo-config.ts       # Tambo provider configuration
│       ├── tambo-registry.tsx    # Component registration with Tambo
│       ├── tambo-tools.ts        # Local AI tools (mood analysis, etc.)
│       ├── openrouter.ts         # OpenRouter API client
│       └── mood-storage.ts       # localStorage utilities
│
├── public/                       # Static assets
├── package.json                  # Dependencies
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

### Key Design Decisions

1. **Privacy-First**: All data in localStorage, no external calls except AI inference
2. **Crisis Safety**: Always prioritize crisis resources when keywords detected
3. **Progressive Complexity**: Start simple, add complexity based on engagement
4. **Mobile-First**: Design for phone usage (when people actually need support)
5. **Generative UI Core**: Tambo isn't optional - it's the architectural foundation
6. **Type Safety**: Zod schemas ensure component props are always valid
7. **Conversational**: Chat interface reduces cognitive load vs. navigation menus

---

## 🎨 Innovation Highlights

1. **Contextual AI**: Not just keyword matching - true understanding of emotional nuance
2. **Complementary Components**: AI selects tools that work together (breathing + grounding)
3. **Conversation Memory**: Builds context over time, like a real therapist
4. **Local Tools**: AI can analyze mood patterns without compromising privacy
5. **Crisis Detection**: Immediate safety prioritization with smart keyword detection
6. **Demo Mode**: Interactive examples teaching users how to interact with AI

---

## 🚀 What Makes This Special

**MindFlow proves Tambo's generative UI is perfect for adaptive interfaces where the right tool at the right time matters.** Mental wellness isn't one-size-fits-all - what helps with anxiety doesn't help with insomnia. By letting AI dynamically compose the interface, we create a truly personalized experience.

This isn't just a mental health app with generative UI bolted on. **Tambo is the architecture** - every interaction, every component, every transition is driven by AI understanding of human emotion. That's the future of adaptive UX.

---

## 📦 Setup & Installation

```bash
cd mindflow
npm install
cp .env.example .env.local
# Add your OPENROUTER_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📄 License

MIT License - See [LICENSE](./LICENSE)

---

## 👥 Team

Built with ❤️ for the Tambo Hackathon

**Keywords**: mental health, generative UI, Tambo SDK, Claude AI, adaptive interfaces, therapeutic tools, Next.js, TypeScript
