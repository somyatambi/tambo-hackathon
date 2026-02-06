# 🎬 MindFlow Demo Script

## 2-3 Minute Demo Flow

### Opening (15 seconds)
**Screen**: Landing page  
**Narration**: 
> "This is MindFlow - an adaptive mental wellness companion that uses generative UI to meet users exactly where they are emotionally. Instead of navigating menus, users simply describe how they're feeling."

---

### Demo 1: Anxiety Relief (30 seconds)
**Action**: Type "I'm feeling really anxious about my presentation tomorrow"

**Narration**:
> "Watch what happens when someone expresses anxiety..."

**Result**: 
- AI responds with empathetic message
- Renders Breathing Exercise + Anxiety Grounding components
- Show interactive breathing circle
- Click through 5-4-3-2-1 grounding technique

**Key Point**: *"Notice how the UI adapted with calming exercises specifically for anxiety"*

---

### Demo 2: Sleep Troubles (25 seconds)
**Action**: Type "I can't fall asleep and it's 2am"

**Narration**:
> "Now let's see how it handles sleep issues..."

**Result**:
- Renders Sleep Wind-Down Routine + Meditation Guide
- Show bedtime checklist
- Display meditation timer

**Key Point**: *"Different problem, different therapeutic components"*

---

### Demo 3: Positive Mood (20 seconds)
**Action**: Type "I'm feeling amazing today!"

**Narration**:
> "It also celebrates positive emotions..."

**Result**:
- Renders Affirmations + Gratitude Journal
- Show random affirmation generation
- Display journal interface

**Key Point**: *"The UI adapts to positive states too, reinforcing joy"*

---

### Demo 4: Progress Tracking (25 seconds)
**Action**: Type "Show me my mood patterns this week"

**Narration**:
> "Users can track their mental wellness journey..."

**Result**:
- Renders Mood Dashboard
- Show trend analysis (improving/stable/declining)
- Display insights and suggestions

**Key Point**: *"Local analysis provides insights without sending data anywhere"*

---

### Demo 5: Crisis Detection (20 seconds)
**Action**: Type "I need help, I'm in crisis"

**Narration**:
> "Most importantly, it detects crisis situations..."

**Result**:
- Immediately renders Crisis Resources
- Shows 988 Lifeline, Crisis Text Line
- Emergency contacts prominent

**Key Point**: *"Crisis keywords trigger immediate access to professional help"*

---

### Design Showcase (15 seconds)
**Action**: Toggle dark mode, scroll through components

**Narration**:
> "Every design choice prioritizes calm - nature-inspired colors, generous whitespace, smooth animations. It even has a soothing dark mode for evening use."

**Visual**: Show theme toggle, demonstrate smooth transitions

---

### Technical Highlight (10 seconds)
**Screen**: Code editor showing component registry

**Narration**:
> "Built with Tambo's Generative UI SDK, featuring 10 therapeutic components, local mood analysis tools, and intelligent pattern matching."

---

### Closing (10 seconds)
**Screen**: Return to landing page

**Narration**:
> "MindFlow - where AI meets mental wellness. The interface you need, exactly when you need it."

**Text on screen**: 
- 🔒 Privacy-first (local storage only)
- 🎨 10 therapeutic components
- 🧠 Intelligent adaptation
- 🌙 24/7 available

---

## 🎥 Camera Angles

### For Video Recording:
1. **Wide shot**: Full browser window showing landing page
2. **Medium shot**: Focus on chat interface during typing
3. **Close-up**: Component interactions (breathing circle, mood tracker)
4. **Split screen**: Show multiple components rendered together

---

## 🎨 Visual Effects (Optional)

### Transitions:
- Smooth fade between demos
- Highlight AI responses with subtle glow
- Zoom in on key interactions

### Text Overlays:
- Component names as they appear
- Feature callouts (e.g., "Intelligent Pattern Matching")
- Privacy messaging

---

## 📝 Quick Demo (1 minute version)

**For time constraints:**

1. **Show landing page** (5s): "AI-powered mental wellness"
2. **Type anxious message** (15s): Show breathing + grounding
3. **Type sleep message** (15s): Show wind-down routine
4. **Type progress** (15s): Show mood dashboard
5. **Toggle dark mode** (5s): Show design quality
6. **Closing** (5s): "Adaptive UI for mental wellness"

---

## 🗣️ Key Talking Points

### For Q&A or Presentation:

**Impact**:
- Mental health apps have high abandonment rates due to complexity
- MindFlow reduces friction by adapting to user's state
- Available 24/7 when professional help might not be

**Technical**:
- Uses ALL Tambo features: generative components, interactable elements, local tools
- 10+ therapeutic components with smooth orchestration
- Privacy-first architecture (no server uploads)

**Design**:
- Calming aesthetic reduces cognitive load during distress
- Progressive complexity: simpler in crisis, richer when calm
- Micro-interactions feel therapeutic themselves

**Differentiation**:
- First mental wellness app with true generative UI
- Combines multiple therapeutic modalities intelligently
- Real-time adaptation based on language analysis

---

## 🎯 Demo Tips

### Do's:
✅ Speak slowly and clearly  
✅ Pause to let components load  
✅ Highlight the AI's empathetic responses  
✅ Emphasize privacy and local storage  
✅ Show mobile responsive design  

### Don'ts:
❌ Rush through component interactions  
❌ Skip the crisis detection demo (it's important!)  
❌ Forget to mention privacy  
❌ Use overly technical jargon  
❌ Neglect the design/UX aspects  

---

## 📊 Backup Demo Data

If starting fresh, seed some mood history:

```javascript
// Open browser console on localhost:3000
const seedData = [
  { timestamp: new Date(Date.now() - 86400000).toISOString(), mood: 'anxious', intensity: 7 },
  { timestamp: new Date(Date.now() - 172800000).toISOString(), mood: 'calm', intensity: 5 },
  { timestamp: new Date(Date.now() - 259200000).toISOString(), mood: 'joyful', intensity: 8 },
  { timestamp: new Date(Date.now() - 345600000).toISOString(), mood: 'sad', intensity: 6 },
];

localStorage.setItem('mindflow_mood_history', JSON.stringify(seedData));
location.reload();
```

---

## 🎬 Recording Checklist

**Before Recording:**
- [ ] Clear browser history/cache
- [ ] Close unnecessary tabs
- [ ] Disable browser extensions
- [ ] Test audio levels
- [ ] Check screen resolution (1920x1080 recommended)
- [ ] Prepare typed messages in notepad (for faster demo)
- [ ] Seed mood history if showing dashboard

**During Recording:**
- [ ] Record in 4K if possible
- [ ] Use smooth cursor movements
- [ ] Pause briefly between actions
- [ ] Keep audio consistent
- [ ] Capture both light and dark modes

**After Recording:**
- [ ] Add background music (calming, not distracting)
- [ ] Include text overlays for key features
- [ ] Add call-to-action at end
- [ ] Export in multiple formats (YouTube, Twitter, LinkedIn)

---

## 🚀 Call to Action

**End every demo with:**

> "Visit [your-deployed-url] to try MindFlow yourself. Your mental wellness journey starts with a simple conversation."

**Social Media CTAs:**
- 🐦 Twitter: "Try the AI that adapts to your emotional state"
- 💼 LinkedIn: "Revolutionary approach to mental health technology"
- 🎥 YouTube: "Full walkthrough in description. Link to try it yourself!"

---

**Break a leg! 🌟**
