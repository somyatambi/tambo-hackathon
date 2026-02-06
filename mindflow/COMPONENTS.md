# 🧩 MindFlow Component Registry

## Overview

This document catalogs all 10 therapeutic components in MindFlow, their triggers, purposes, and technical details.

---

## Component Catalog

### 1. 🫁 Breathing Exercise

**File**: `src/components/generative/BreathingExercise.tsx`

**Triggers**:
- "anxious", "anxiety", "panic", "stressed", "overwhelmed"
- "breathe", "breathing", "calm down"

**Purpose**: Guides users through timed breathing exercises to activate parasympathetic nervous system

**Props**:
```typescript
{
  duration?: number;      // Seconds per phase (default: 4)
  instruction?: string;   // Custom instruction text
}
```

**Features**:
- Animated breathing circle (scales in/out)
- 3-phase cycle: Inhale → Hold → Exhale
- Cycle counter
- Customizable duration
- Play/pause controls

**UX Notes**:
- Circle scales up during inhale (1.3x)
- Circle holds during hold phase
- Circle scales down during exhale (0.8x)
- Smooth easing for calming effect

---

### 2. 📖 Journal Prompt

**File**: `src/components/generative/JournalPrompt.tsx`

**Triggers**:
- "journal", "write", "reflect", "thoughts"
- "sad", "depressed" (paired with reframe)
- "grateful", "happy" (gratitude style)

**Purpose**: Provides structured or free-form journaling with contextual prompts

**Props**:
```typescript
{
  prompt?: string;           // AI-generated prompt
  style?: 'gratitude' | 'stream' | 'structured';
  mood?: string;            // Current mood for context
}
```

**Features**:
- 3 journaling styles
- Auto-saves to localStorage
- Character counter
- Sparkle prompt indicator
- Privacy reminder

**Styles**:
1. **Gratitude**: Focus on positive aspects
2. **Stream**: Free-flowing consciousness
3. **Structured**: What-How-Learn framework

---

### 3. 😊 Mood Tracker

**File**: `src/components/generative/MoodTracker.tsx`

**Triggers**:
- "mood", "feeling", "emotion", "check-in"
- "how am I", "track"
- Default fallback if no other match

**Purpose**: Visual mood logging with intensity scale

**Features**:
- 8 mood options with icons
- 1-10 intensity slider
- Saves to mood history
- Elegant grid layout
- Color-coded moods

**Mood Options**:
- 🌞 Joyful (yellow)
- ☁️ Calm (calm green)
- 💜 Peaceful (lavender)
- ⚡ Stressed (orange)
- 🔴 Anxious (red)
- 😢 Sad (blue)
- 🔥 Angry (red-600)
- 🌀 Overwhelmed (purple)

**Data Structure**:
```typescript
{
  timestamp: string;
  mood: MoodType;
  intensity: number;  // 1-10
  activities?: string[];
  notes?: string;
}
```

---

### 4. 🧠 Cognitive Reframe

**File**: `src/components/generative/CognitiveReframe.tsx`

**Triggers**:
- "negative thought", "thinking", "reframe"
- "sad", "depressed" (paired with journal)
- "challenge"

**Purpose**: Guides cognitive behavioral therapy (CBT) reframing technique

**Features**:
- 2-step process
- 4 guiding questions
- Visual before/after comparison
- Encouraging feedback
- Reset capability

**Process**:
1. **Step 1**: User writes negative thought
2. **Step 2**: System shows CBT questions → User writes balanced thought
3. **Feedback**: Positive reinforcement

**CBT Questions**:
1. Is this thought based on facts or feelings?
2. What would I tell a friend thinking this?
3. What evidence contradicts this thought?
4. What's a more balanced way to see this?

---

### 5. ✨ Meditation Guide

**File**: `src/components/generative/MeditationGuide.tsx`

**Triggers**:
- "meditate", "meditation", "calm", "peace"
- "sleep" (paired with wind-down)
- "relax"

**Purpose**: Timed guided meditation with visual cues

**Props**:
```typescript
{
  duration?: number;  // Minutes (default: 5)
  type?: 'breath' | 'body-scan' | 'loving-kindness';
}
```

**Types**:

1. **Breath Awareness** (8 phases, ~280s):
   - Find comfortable position → Close eyes → Notice breath → Deep breathing → Let thoughts pass → Return to breath → Gratitude → Open eyes

2. **Body Scan** (8 phases, ~280s):
   - Lie down → Feet/toes → Legs → Core → Chest/shoulders → Neck/face → Whole body → Return

3. **Loving Kindness** (8 phases, ~280s):
   - Think of loved one → Wishes for them → Self-compassion → Extend to all beings

**Features**:
- Phase-based progression
- Visual progress dots
- Pause/resume
- Timer countdown
- Smooth phase transitions

---

### 6. ⚓ Anxiety Grounding

**File**: `src/components/generative/AnxietyGrounding.tsx`

**Triggers**:
- "anxious", "panic", "overwhelmed"
- "grounding", "present"

**Purpose**: Interactive 5-4-3-2-1 grounding technique for anxiety attacks

**Technique**:
- 5 things you can SEE
- 4 things you can TOUCH
- 3 things you can HEAR
- 2 things you can SMELL
- 1 thing you can TASTE

**Features**:
- Interactive bubble completion
- Color-coded categories
- Progress bar
- Completion celebration
- Can restart anytime

**UX Flow**:
1. User clicks bubbles in sequence
2. Each sense has colored circles
3. Completed circles show checkmark
4. Next circle highlights (ring effect)
5. Completion shows success message

---

### 7. 📊 Mood Dashboard

**File**: `src/components/generative/MoodDashboard.tsx`

**Triggers**:
- "progress", "track", "stats", "dashboard"
- "patterns", "history", "how am I doing"

**Purpose**: Visualize mood patterns and provide insights

**Features**:
- Time range selector (7/14/30 days)
- Key metrics cards
- Trend analysis
- Personalized insights
- Entry count tracking

**Metrics Displayed**:
1. **Check-ins**: Total mood logs in period
2. **Trend**: Improving/Stable/Declining with icon
3. **Avg Intensity**: 0-10 scale average

**Insights Algorithm**:
- Trend based on first-half vs second-half comparison
- Dominant mood from frequency count
- Contextual suggestions based on patterns
- Encouragement for consistent tracking

---

### 8. 🚨 Crisis Resources

**File**: `src/components/generative/CrisisResources.tsx`

**Triggers**:
- "suicide", "self-harm", "kill myself", "end it all"
- "crisis", "emergency", "need help"
- **HIGHEST PRIORITY** - overrides other components

**Purpose**: Immediate access to professional crisis support

**Features**:
- Emergency banner (911 reminder)
- 3 primary crisis lines
- Additional resources list
- Click-to-call formatting
- Compassionate messaging
- Prominent red styling

**Resources Included**:
1. **988 Lifeline**: 24/7 suicide prevention
2. **Crisis Text Line**: Text-based support
3. **SAMHSA**: Treatment referral
4. Additional: Trevor Project, Veterans, RAINN

**Critical Design**:
- Red border for urgency
- Large, readable contact info
- No distractions
- Multiple contact methods (call/text)

---

### 9. ✨ Affirmations

**File**: `src/components/generative/Affirmations.tsx`

**Triggers**:
- "grateful", "happy", "joyful", "great", "good"
- "affirmation", "positive"

**Purpose**: Generate and display positive affirmations

**Features**:
- 15+ affirmation bank
- Random generation
- Save to favorites (localStorage)
- Large, readable display
- Refresh button
- Practice reminders

**Affirmations Examples**:
- "I am worthy of love and respect"
- "My feelings are valid and important"
- "I am growing and learning every day"
- "I choose peace over perfection"
- "I am enough, exactly as I am"

**Visual Design**:
- Gradient background (lavender → calm)
- Large display font
- Sparkle icon
- Quotation marks for emphasis

---

### 10. 🌙 Sleep Wind-Down

**File**: `src/components/generative/SleepWindDown.tsx`

**Triggers**:
- "sleep", "insomnia", "tired", "can't sleep"
- "bedtime", "wind down"

**Purpose**: Guided bedtime routine checklist

**Routine Steps**:
1. 📱 **Put away screens** (30 min before bed)
2. ☕ **Have herbal tea** (chamomile, lavender, peppermint)
3. 🎵 **Calming sounds** (soft music, nature sounds)
4. 📖 **Quick journal** (3 things from today)

**Features**:
- Interactive checklist
- Progress bar
- Completion celebration
- Color-coded icons
- Strike-through completed items
- Expandable descriptions

**UX Flow**:
1. User clicks each routine item
2. Item marks complete with checkmark
3. Progress bar fills
4. All complete → Success message

---

## Component Pairing Logic

### Anxiety Relief
```
Triggers: "anxious", "panic", "overwhelmed"
Components: BreathingExercise + AnxietyGrounding
Rationale: Immediate physiological + cognitive grounding
```

### Sleep Issues
```
Triggers: "can't sleep", "insomnia"
Components: SleepWindDown + MeditationGuide
Rationale: Structured routine + relaxation
```

### Sadness/Depression
```
Triggers: "sad", "depressed", "down"
Components: JournalPrompt + CognitiveReframe
Rationale: Expression + cognitive restructuring
```

### Positive Mood
```
Triggers: "happy", "joyful", "grateful"
Components: Affirmations + JournalPrompt (gratitude)
Rationale: Reinforce positive state + capture moment
```

### Progress Review
```
Triggers: "progress", "stats", "patterns"
Components: MoodDashboard
Rationale: Visual insights and trends
```

### Crisis
```
Triggers: "crisis", "suicide", "self-harm"
Components: CrisisResources ONLY
Rationale: Immediate professional help access
```

---

## Technical Patterns

### Common Props
All components accept these for consistency:
```typescript
interface BaseComponentProps {
  key?: string;           // For React rendering
  className?: string;     // Additional Tailwind classes
}
```

### Animation Pattern
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="glass-card p-8 space-y-6"
>
  {/* Component content */}
</motion.div>
```

### Glass Card Style
```css
.glass-card {
  @apply bg-white/70 dark:bg-sage-900/70 
         backdrop-blur-xl rounded-2xl 
         shadow-lg border 
         border-white/20 dark:border-sage-700/20;
}
```

---

## Adding New Components

### Checklist:
1. Create component in `src/components/generative/`
2. Add trigger patterns to `analyzeInput()` in `page.tsx`
3. Add component to `renderComponent()` map
4. Update this registry
5. Test with various input phrases
6. Verify mobile responsiveness
7. Check dark mode appearance

### Template:
```typescript
'use client';

import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';

export default function ComponentName() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      {/* Component UI */}
    </motion.div>
  );
}
```

---

## Performance Notes

- All components lazy-load via dynamic imports
- LocalStorage limited to 100 most recent entries
- No external API calls (privacy-first)
- Framer Motion animations use GPU acceleration
- Components unmount when scrolled out of view

---

**Last Updated**: February 2026
