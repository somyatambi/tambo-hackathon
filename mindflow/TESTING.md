# 🧪 MindFlow Testing Guide

## Manual Testing Checklist

### 🎯 Component Testing

#### 1. Breathing Exercise
**Test Input**: "I'm feeling anxious"

**Verify**:
- [ ] Component renders smoothly
- [ ] Breathing circle animates (scales up/down)
- [ ] Start button works
- [ ] Pause button works
- [ ] Cycle counter increments
- [ ] Phases change: Inhale → Hold → Exhale
- [ ] Animation is smooth (60fps)
- [ ] Works in light and dark mode

---

#### 2. Journal Prompt
**Test Input**: "I want to journal"

**Verify**:
- [ ] Text area is focusable
- [ ] Character counter updates
- [ ] Save button enables when text entered
- [ ] Save confirmation appears
- [ ] Data persists in localStorage
- [ ] Different journal styles work (gratitude, stream, structured)
- [ ] Privacy message displays

---

#### 3. Mood Tracker
**Test Input**: "How am I feeling"

**Verify**:
- [ ] All 8 mood options display
- [ ] Mood selection highlights
- [ ] Intensity slider works (1-10)
- [ ] Log button saves data
- [ ] Success confirmation shows
- [ ] Data saved to localStorage
- [ ] Can log multiple moods

---

#### 4. Cognitive Reframe
**Test Input**: "I'm having negative thoughts"

**Verify**:
- [ ] Step 1: Can enter negative thought
- [ ] Continue button activates
- [ ] Step 2: Shows CBT questions
- [ ] Can enter reframed thought
- [ ] Success message appears
- [ ] Start over resets form
- [ ] Both steps animate smoothly

---

#### 5. Meditation Guide
**Test Input**: "I want to meditate"

**Verify**:
- [ ] Timer displays correctly (5:00)
- [ ] Begin button starts meditation
- [ ] Phases progress automatically
- [ ] Phase text updates
- [ ] Progress dots update
- [ ] Pause works
- [ ] Resume works
- [ ] All 3 types work (breath, body-scan, loving-kindness)

---

#### 6. Anxiety Grounding
**Test Input**: "I'm having a panic attack"

**Verify**:
- [ ] All 5 categories display
- [ ] Correct counts (5-4-3-2-1)
- [ ] Circles clickable in sequence
- [ ] Completed circles show checkmark
- [ ] Progress bar updates
- [ ] Completion message appears
- [ ] Cannot skip ahead

---

#### 7. Mood Dashboard
**Test Input**: "Show me my progress"

**Verify**:
- [ ] Displays with existing data
- [ ] Shows 0 check-ins if no data
- [ ] Time range selector works (7/14/30 days)
- [ ] Metrics update when range changes
- [ ] Trend icon matches status
- [ ] Insights are relevant
- [ ] Dominant mood calculates correctly

---

#### 8. Crisis Resources
**Test Input**: "I'm in crisis" or "suicide"

**Verify**:
- [ ] Renders IMMEDIATELY
- [ ] Overrides other components
- [ ] Emergency banner prominent
- [ ] All 3 main resources display
- [ ] Contact numbers visible
- [ ] Additional resources shown
- [ ] Red border for urgency
- [ ] Compassionate messaging

**CRITICAL**: This component MUST work perfectly

---

#### 9. Affirmations
**Test Input**: "I'm feeling great"

**Verify**:
- [ ] Displays random affirmation
- [ ] Refresh button generates new one
- [ ] Save button works
- [ ] Confirmation appears
- [ ] Affirmation is readable
- [ ] Gradient background looks good

---

#### 10. Sleep Wind-Down
**Test Input**: "I can't sleep"

**Verify**:
- [ ] All 4 routine items display
- [ ] Items are clickable
- [ ] Completed items strike through
- [ ] Checkmarks appear
- [ ] Progress bar updates
- [ ] Completion message shows
- [ ] Can re-click items

---

### 🎨 Design System Testing

#### Light Mode
- [ ] All colors visible
- [ ] Text readable
- [ ] Gradients look good
- [ ] Glass cards have subtle blur
- [ ] Shadows appropriate

#### Dark Mode
- [ ] Toggle switches correctly
- [ ] Colors adapt properly
- [ ] Text remains readable
- [ ] Components maintain hierarchy
- [ ] Gradients still subtle

#### Animations
- [ ] Fade-in on component render
- [ ] Smooth transitions (no jank)
- [ ] Hover states work
- [ ] Button press animations
- [ ] Loading indicators smooth

---

### 📱 Responsive Testing

#### Mobile (320px - 767px)
- [ ] Layout stacks vertically
- [ ] Text readable without zoom
- [ ] Buttons large enough to tap
- [ ] Input fields full width
- [ ] No horizontal scroll
- [ ] Navigation accessible

#### Tablet (768px - 1023px)
- [ ] Layout adapts appropriately
- [ ] Components use available space
- [ ] Grid layouts work
- [ ] Touch targets adequate

#### Desktop (1024px+)
- [ ] Max-width container centers
- [ ] Components don't stretch too wide
- [ ] Spacing appropriate
- [ ] Hover states work

---

### 🧠 AI Pattern Matching Testing

Test various inputs to verify correct component selection:

#### Anxiety Patterns
```
Input: "I'm feeling anxious"
Expected: BreathingExercise + AnxietyGrounding
```

```
Input: "I'm having a panic attack"
Expected: BreathingExercise + AnxietyGrounding
```

```
Input: "I'm overwhelmed with work"
Expected: BreathingExercise + AnxietyGrounding
```

#### Sleep Patterns
```
Input: "I can't fall asleep"
Expected: SleepWindDown + MeditationGuide
```

```
Input: "insomnia again"
Expected: SleepWindDown + MeditationGuide
```

#### Sadness Patterns
```
Input: "I'm feeling really sad"
Expected: JournalPrompt + Affirmations
```

```
Input: "I'm depressed"
Expected: JournalPrompt + CognitiveReframe
```

#### Positive Patterns
```
Input: "I'm feeling amazing!"
Expected: Affirmations + JournalPrompt
```

```
Input: "I'm so grateful today"
Expected: Affirmations + JournalPrompt
```

#### Progress Patterns
```
Input: "Show me my stats"
Expected: MoodDashboard
```

```
Input: "How am I doing this week?"
Expected: MoodDashboard
```

#### Crisis Patterns (CRITICAL)
```
Input: "I want to die"
Expected: CrisisResources ONLY
```

```
Input: "suicide"
Expected: CrisisResources ONLY
```

```
Input: "I need help now"
Expected: CrisisResources
```

---

### 🔒 Privacy Testing

#### LocalStorage
- [ ] Mood entries save correctly
- [ ] Journal entries save correctly
- [ ] Data persists after refresh
- [ ] Data limited to 100 entries
- [ ] No sensitive data in URLs
- [ ] No console.log with user data

#### Network Tab
- [ ] No unexpected requests
- [ ] No user data in request bodies
- [ ] API calls only for AI generation
- [ ] No tracking pixels
- [ ] No analytics (unless explicitly added)

---

### ⚡ Performance Testing

#### Load Times
- [ ] Initial page load < 3s
- [ ] Component render < 100ms
- [ ] Smooth scrolling (60fps)
- [ ] No layout shift (CLS < 0.1)
- [ ] Interactive quickly (FID < 100ms)

#### Memory
- [ ] No memory leaks
- [ ] Animations don't degrade
- [ ] localStorage within limits
- [ ] Component cleanup on unmount

---

### ♿ Accessibility Testing

#### Keyboard Navigation
- [ ] Can tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Can navigate chat with arrow keys
- [ ] Focus visible on all elements
- [ ] No keyboard traps

#### Screen Readers
- [ ] Headings structured properly (h1 → h6)
- [ ] Images have alt text
- [ ] Buttons have descriptive labels
- [ ] Form inputs have labels
- [ ] ARIA labels where needed

#### Color Contrast
- [ ] Text meets WCAG AA (4.5:1)
- [ ] Large text meets WCAG AA (3:1)
- [ ] Interactive elements have visible focus
- [ ] Color not sole indicator

---

### 🌐 Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

### 🧪 Edge Cases

#### Empty States
- [ ] No mood history shows appropriate message
- [ ] Empty journal shows placeholder
- [ ] First-time user sees welcome

#### Long Input
- [ ] Very long chat messages don't break layout
- [ ] Journal entries handle 10,000+ characters
- [ ] Mood notes don't overflow

#### Rapid Input
- [ ] Fast typing doesn't break chat
- [ ] Quick component interactions work
- [ ] No race conditions

#### Slow Network
- [ ] Loading states appear
- [ ] Timeouts handled gracefully
- [ ] Error messages helpful

---

### 📋 Pre-Deployment Checklist

Before deploying to production:

**Code Quality**
- [ ] No console.errors in production
- [ ] No TODO comments in critical code
- [ ] ESLint passes
- [ ] TypeScript compiles without errors
- [ ] No unused imports

**Configuration**
- [ ] Environment variables documented
- [ ] .env.local.example up to date
- [ ] API keys not in code
- [ ] vercel.json configured

**Content**
- [ ] Crisis resources accurate
- [ ] Contact numbers correct
- [ ] Affirmations spell-checked
- [ ] Journal prompts make sense

**Documentation**
- [ ] README updated
- [ ] COMPONENTS.md accurate
- [ ] DEMO_SCRIPT.md works
- [ ] CHANGELOG updated

**Legal/Privacy**
- [ ] Privacy policy reviewed
- [ ] Terms of service reviewed
- [ ] Crisis disclaimers present
- [ ] MIT license included

---

## 🤖 Automated Testing (Future)

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

### Visual Regression
```bash
npm run test:visual
```

---

## 🐛 Bug Reporting Template

When you find a bug:

```markdown
**Bug Description**
Clear description of what's wrong

**Steps to Reproduce**
1. Go to...
2. Click on...
3. Type...
4. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- Browser: Chrome 120
- OS: Windows 11
- Device: Desktop
- Screen size: 1920x1080
```

---

## ✅ Test Coverage Goals

- Components: 80%+
- User flows: 100%
- Crisis detection: 100% (CRITICAL)
- Mobile responsive: 100%
- Accessibility: WCAG AA minimum

---

**Happy Testing! 🧪✨**
