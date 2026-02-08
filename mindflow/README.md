# 🌊 MindFlow - Your Adaptive Mental Wellness Companion

<div align="center">

![MindFlow Logo](https://img.shields.io/badge/MindFlow-Wellness%20Companion-4f7857?style=for-the-badge)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Tambo](https://img.shields.io/badge/Tambo-Generative%20UI-blue?style=flat)](https://tambo.ai)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](./LICENSE)

**An intelligent mental wellness companion that adapts therapeutic interfaces to your emotional state in real-time**

[🚀 Live Demo](https://tambo-hackathon-chi.vercel.app/) • [GitHub](https://github.com/somyatambi/tambo-hackathon)

</div>

> 📚 **New here?** Check the [Documentation Index](./DOCS_INDEX.md) to find the right guide for you!

---

## ✨ What is MindFlow?

MindFlow is a revolutionary mental wellness application that leverages **Tambo's Generative UI SDK** to dynamically render therapeutic components based on natural language input. Instead of navigating through static menus, users simply describe how they're feeling, and the AI intelligently selects and displays the most helpful tools.

### The Problem

Traditional mental health apps force users to navigate complex menus and choose from preset options, creating friction exactly when people need support most.

### Our Solution

MindFlow uses generative UI to meet users where they are emotionally, adapting the interface in real-time:
- **"I'm feeling anxious"** → Breathing exercises + Grounding techniques
- **"I can't sleep"** → Sleep wind-down routine + Guided meditation
- **"Show me my progress"** → Mood dashboard with insights
- **"I need help"** → Crisis resources immediately

---

## 🎯 Key Features

### 🧠 **Intelligent Component Selection**
The AI analyzes your emotional state and renders 2-3 complementary therapeutic components that work together.

### 🎨 **10 Therapeutic Components**
1. **Breathing Exercise** - Animated, interactive breathing timer
2. **Journaling Interface** - Multiple styles (gratitude, stream-of-consciousness, structured)
3. **Mood Tracker** - Visual, interactive mood logging
4. **Cognitive Reframe Tool** - Challenge negative thought patterns
5. **Meditation Guide** - Timed sessions with visual guidance
6. **Anxiety Grounding** - Interactive 5-4-3-2-1 technique
7. **Progress Dashboard** - Mood patterns and insights over time
8. **Crisis Resources** - Emergency contacts and hotlines
9. **Affirmations Generator** - Daily positive affirmations
10. **Sleep Wind-Down** - Bedtime routine checklist

### 🎨 **Calming Design System**
- **Colors**: Nature-inspired palette (sage greens, warm beiges, soft lavenders)
- **Typography**: Outfit display font + Inter body font
- **Animations**: Gentle transitions with Framer Motion
- **Dark Mode**: Soothing night mode for evening use
- **Responsive**: Beautiful on mobile, tablet, and desktop

### 🔒 **Privacy-First**
- All data stored locally in your browser
- No server uploads
- No tracking or analytics
- Your mental health journey stays private

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mindflow.git
cd mindflow

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your OpenAI API key to .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here # Optional
```

---

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Generative UI**: Tambo React SDK
- **State Management**: React Hooks
- **Data Persistence**: localStorage
- **Icons**: Lucide React
- **Type Safety**: TypeScript

---

## 📖 How It Works

### Generative UI Logic

MindFlow uses sophisticated pattern matching to analyze user input:

```typescript
// Example: User types "I'm feeling anxious and can't sleep"
Input → AI Analysis → Component Selection

Detected patterns:
- "anxious" → BreathingExercise + AnxietyGrounding
- "can't sleep" → SleepWindDown + MeditationGuide

Result: Renders all 4 complementary components
```

### Mood Analysis Tools

Local tools provide insights without sending data to servers:

```typescript
analyzeMoodPatterns(days: 7) → {
  averageIntensity: 6.5,
  dominantMood: 'calm',
  trend: 'improving',
  insights: ['Your mood has been trending positively!']
}
```

---

## 🎨 Design Philosophy

### Calming Aesthetics
Every design decision prioritizes calm and reducing cognitive load:
- **Generous whitespace** for breathing room
- **Soft gradients** instead of harsh colors
- **Rounded corners** for approachability
- **Smooth animations** that feel therapeutic

### Progressive Complexity
- **High stress/crisis** → Simplified interface, fewer options, clear actions
- **Calm exploration** → More components, detailed insights, playful interactions

### Accessibility
- High contrast ratios
- Clear typography
- Keyboard navigation
- Screen reader friendly

---

## 📱 Use Cases

### 🌅 Morning Check-in
**Input**: "Good morning, how should I start my day?"  
**Components**: MoodTracker → Affirmations → JournalPrompt

### 😰 Anxiety Attack
**Input**: "I'm having a panic attack"  
**Components**: BreathingExercise → AnxietyGrounding

### 🌙 Bedtime Routine
**Input**: "I can't fall asleep"  
**Components**: SleepWindDown → MeditationGuide

### 📊 Progress Review
**Input**: "How am I doing this week?"  
**Components**: MoodDashboard

### 🚨 Crisis Moment
**Input**: "I need help" or "crisis"  
**Components**: CrisisResources (immediate priority)

---

## 🗂️ Project Structure

```
mindflow/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Main chat interface
│   │   └── globals.css         # Design tokens
│   ├── components/
│   │   ├── generative/         # 10 Therapeutic components
│   │   │   ├── BreathingExercise.tsx
│   │   │   ├── JournalPrompt.tsx
│   │   │   ├── MoodTracker.tsx
│   │   │   ├── CognitiveReframe.tsx
│   │   │   ├── MeditationGuide.tsx
│   │   │   ├── AnxietyGrounding.tsx
│   │   │   ├── MoodDashboard.tsx
│   │   │   ├── CrisisResources.tsx
│   │   │   ├── Affirmations.tsx
│   │   │   └── SleepWindDown.tsx
│   │   ├── ThemeProvider.tsx   # Dark mode support
│   │   ├── ThemeToggle.tsx     # Theme switcher
│   │   └── LoadingIndicators.tsx
│   └── lib/
│       ├── tambo-config.ts     # Tambo SDK setup
│       └── mood-tools.ts       # Local analysis tools
├── public/                     # Static assets
├── tailwind.config.ts         # Design system
└── package.json
```

---

## 🎥 Demo Scenarios

### Scenario 1: Anxious User
```
User: "I'm feeling really anxious about tomorrow"
AI Response: "I can sense you're feeling overwhelmed. Let's ground ourselves together."
Components Rendered:
  - Breathing Exercise (4-4-4 rhythm)
  - Anxiety Grounding (5-4-3-2-1 technique)
```

### Scenario 2: Positive Check-in
```
User: "I'm feeling great today!"
AI Response: "That's wonderful! Let's capture this positive energy."
Components Rendered:
  - Affirmations
  - Gratitude Journal
```

### Scenario 3: Progress Review
```
User: "Show me my mood patterns"
AI Response: "Let me show you your mood journey and insights."
Components Rendered:
  - Mood Dashboard (with 7-day analysis)
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development

```bash
# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

---

## 📊 Judging Criteria Alignment

### ✅ **Impact**: Addresses real mental wellness needs, accessible 24/7
### ✅ **Creativity**: Unique application of generative UI to emotional support
### ✅ **Technical**: Uses ALL Tambo features (generative + interactable + local tools)
### ✅ **Aesthetics**: Calming, beautiful design that feels therapeutic
### ✅ **Use Case**: Perfect demo of UI adapting to user emotional state

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Tambo** for the incredible Generative UI SDK
- Mental health professionals who reviewed the therapeutic approaches
- The open-source community

---

## 🆘 Crisis Resources

If you're in crisis, please reach out immediately:

- **988 Suicide & Crisis Lifeline**: Call or text 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency**: Call 911

**You are not alone. Help is available 24/7.**

---

<div align="center">

**Built with 💚 for mental wellness**

[Website](#) • [Twitter](#) • [Discord](#)

</div>
