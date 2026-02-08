# 📋 Hackathon Submission Info

## 1. Project Description

**MindFlow** is an intelligent mental wellness companion that uses **Tambo's Generative UI SDK** to dynamically render therapeutic tools based on your emotional state in real-time.

**The Problem:** Traditional mental health apps force users to navigate complex menus when they need support most - creating friction exactly when people are anxious, overwhelmed, or in crisis.

**Our Solution:** Users simply describe how they're feeling in natural language, and our AI intelligently selects 2-3 complementary therapeutic components that work together. No menus, no navigation, just immediate support.

**Examples:**
- "I'm feeling anxious" → Breathing Exercise + Grounding Techniques
- "I can't sleep" → Sleep Wind-Down + Guided Meditation
- "Show my progress" → Mood Dashboard with insights
- "I need help" → Crisis Resources (immediate)

**Key Innovation:** Contextual component selection - the AI considers your emotional language, conversation history, time of day, and previous interactions to create a personalized, adaptive interface that evolves with your needs.

---

## 2. How We Use Tambo

MindFlow is built on **Tambo's React SDK** - it's not just using Tambo, **Tambo is the architectural foundation**.

### Component Registry
All 10 therapeutic components (Breathing Exercise, Journal Prompt, Mood Tracker, Cognitive Reframe, Meditation, Anxiety Grounding, Progress Dashboard, Crisis Resources, Affirmations, Sleep Wind-Down) are registered with Tambo's component registry with rich metadata, keywords, Zod schemas, and behavioral flags.

```typescript
registerComponent({
  name: 'BreathingExercise',
  description: 'Interactive breathing exercise with animated timer',
  keywords: ['breathe', 'anxiety', 'panic', 'calm', 'stress'],
  category: 'calming',
  props: breathingExerciseSchema,
  interactive: true
});
```

### AI-Driven Selection
Instead of manual pattern matching, we use **Claude Sonnet 4.5** through Tambo to intelligently select components:

```typescript
const result = await selectComponentsWithAI(userMessage, chatHistory);
```

The AI analyzes:
- Emotional language ("anxious" vs "sad" vs "can't focus")
- Conversation context (what was shown before)
- Urgency level (crisis keywords = immediate action)
- Component compatibility (which tools work well together)

### Local Tools Integration
We provide the AI with 5 local tools:
- `analyzeMoodPatterns` - 7/14/30 day mood trend analysis
- `getJournalPrompts` - Mood-specific prompts
- `getEmergencyResources` - Crisis hotlines
- `getMoodContext` - Recent mood history
- `trackInteraction` - Usage pattern logging

This allows **personalized, context-aware support** without sending user data to external servers (privacy-first).

### Enhanced System Prompt
We crafted a 50+ line system prompt that teaches Tambo's AI:
- Mental wellness best practices
- Crisis detection rules (always prioritize safety)
- Component combination strategies
- Empathetic conversation style
- Professional boundaries

### Conversation Memory
MindFlow maintains chat history so Tambo's AI builds context:

```typescript
const [chatHistory, setChatHistory] = useState<Array<{
  role: 'user' | 'assistant';
  content: string;
}>>([]);
```

This enables progressive understanding of the user's emotional journey.

### Streaming Responses
We use Tambo's streaming for real-time feel - components render progressively as the AI makes decisions.

**Bottom Line:** Every interaction, every component, every transition is driven by Tambo's AI understanding human emotion. This isn't a mental health app with generative UI bolted on - it's a generative UI app purpose-built for mental wellness.

---

## 3. Tech Stack & Architecture

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### AI & Generative UI
- **Tambo React SDK** (`@tambo-ai/react`) - Core generative UI framework
- **Claude Sonnet 4.5** - AI model for emotional understanding
- **OpenRouter API** - Model routing and access
- **Zod** - Schema validation for component props

### State & Storage
- **React Hooks** - useState, useEffect, useCallback
- **localStorage** - Client-side persistence (privacy-first)
- **Effect-TS** - Functional programming utilities

### UI & Icons
- **Lucide React** - Beautiful icons
- **Custom Components** - 10 therapeutic tools built from scratch

### Architecture Flow

```
User Input (natural language)
    ↓
Context Building (message + history)
    ↓
Tambo AI (Claude 4.5 via OpenRouter)
├─ Analyzes emotional context
├─ Considers conversation history
├─ Invokes local tools (mood patterns)
└─ Selects 1-3 optimal components
    ↓
Component Registry (10 registered components)
    ↓
Dynamic UI Rendering (Tambo Provider)
    ↓
Local Storage (privacy-first)
    ↓
Next interaction has richer context
```

### Key Directory Structure

```
mindflow/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main chat + Tambo integration
│   │   └── layout.tsx        # TamboProvider wrapper
│   │
│   ├── components/
│   │   └── therapeutic/      # 10 therapeutic components
│   │
│   └── lib/
│       ├── tambo-config.ts   # Tambo configuration
│       ├── tambo-registry.tsx # Component registration
│       ├── tambo-tools.ts    # Local AI tools
│       ├── openrouter.ts     # API client
│       └── mood-storage.ts   # localStorage utils
│
└── package.json
```

### Design Decisions

1. **Privacy-First**: All data in localStorage, no external calls except AI
2. **Crisis Safety**: Always prioritize crisis resources when detected
3. **Progressive Complexity**: Start simple, add based on engagement
4. **Mobile-First**: Design for phone usage (when people need support)
5. **Generative UI Core**: Tambo isn't optional - it's the foundation
6. **Type Safety**: Zod schemas ensure valid component props
7. **Conversational**: Chat interface reduces cognitive load

---

## 🚀 Repository

**GitHub:** https://github.com/somyatambi/tambo-hackathon

**Main Project:** `mindflow/` directory

**Full Details:** See [HACKATHON_SUBMISSION.md](mindflow/HACKATHON_SUBMISSION.md)

---

Built with ❤️ for the Tambo Hackathon
