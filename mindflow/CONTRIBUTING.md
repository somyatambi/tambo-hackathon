# Contributing to MindFlow

Thank you for your interest in contributing to MindFlow! This guide will help you get started.

## 🌟 Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? Open an issue
- ✨ **Feature Requests**: Have an idea? We'd love to hear it
- 📝 **Documentation**: Improve our docs
- 🎨 **Design**: Enhance UI/UX
- 💻 **Code**: Submit pull requests
- 🌍 **Translation**: Help us reach more people

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/mindflow.git
cd mindflow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```bash
cp .env.local.example .env.local
# Add your OpenAI API key to .env.local
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 Development Workflow

### Branch Naming

```
feature/component-name
bugfix/issue-description
docs/what-you-updated
design/ui-improvement
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add voice input component
fix: correct mood dashboard calculation
docs: update README with new features
style: improve dark mode colors
refactor: simplify breathing animation
test: add mood tracker tests
```

### Pull Request Process

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes**:
   - Write clean, readable code
   - Follow existing patterns
   - Add comments where helpful
   - Test thoroughly

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature
   ```

5. **Open a Pull Request**:
   - Describe what you changed and why
   - Reference any related issues
   - Add screenshots for UI changes
   - Ensure all checks pass

## 🏗️ Project Structure

```
mindflow/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Main chat interface
│   │   └── globals.css   # Global styles
│   ├── components/
│   │   ├── generative/   # Therapeutic components
│   │   └── *.tsx         # Shared components
│   └── lib/              # Utilities and config
│       ├── tambo-config.ts
│       └── mood-tools.ts
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🎨 Component Guidelines

### Creating a New Component

1. **File Location**: `src/components/generative/YourComponent.tsx`

2. **Template**:
```tsx
'use client';

import { motion } from 'framer-motion';
import { IconName } from 'lucide-react';

export default function YourComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 space-y-6"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-calm-600 dark:text-calm-400">
          <IconName className="w-5 h-5" />
          <h3 className="text-xl font-display font-semibold">
            Your Component Title
          </h3>
        </div>
        <p className="text-sage-600 dark:text-sage-400">
          Description of what this does
        </p>
      </div>

      {/* Component content */}
    </motion.div>
  );
}
```

3. **Register Component**:
   - Add to `renderComponent()` map in `src/app/page.tsx`
   - Add trigger patterns to `analyzeInput()`
   - Update `COMPONENTS.md`

### Design Principles

✅ **Do**:
- Use the glass-card style for containers
- Implement Framer Motion animations
- Support both light and dark mode
- Follow the calming color palette
- Add hover states and micro-interactions
- Use Lucide React icons
- Make it mobile-responsive

❌ **Don't**:
- Use harsh colors or aggressive animations
- Add external dependencies without discussion
- Break the calming aesthetic
- Forget accessibility considerations

## 🎨 Design System

### Colors

```css
/* Primary Palette */
calm:    Sage greens (for calm, grounding)
sage:    Neutral greens (for text, borders)
lavender: Soft purples (for meditation, sleep)
warmbeige: Warm neutrals (for comfort)

/* Use semantic names */
text-calm-600      /* Primary actions */
text-sage-700      /* Body text */
text-lavender-500  /* Special highlights */
```

### Typography

```css
font-display  /* Outfit - Headings */
font-sans     /* Inter - Body text */
```

### Spacing

```css
p-4   /* Tight spacing */
p-6   /* Normal spacing */
p-8   /* Generous spacing (preferred) */
space-y-6  /* Vertical rhythm */
```

## 🧪 Testing

### Manual Testing Checklist

Before submitting PR:

- [ ] Component renders correctly
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Mobile responsive (320px+)
- [ ] Tablet responsive (768px+)
- [ ] Desktop responsive (1024px+)
- [ ] Animations smooth (60fps)
- [ ] No console errors
- [ ] localStorage works (if applicable)
- [ ] Accessible (keyboard navigation, screen readers)

### Test User Inputs

Test your component with various inputs:

```
"I'm feeling anxious"
"I can't sleep"
"Show me progress"
"I'm in crisis"
"I'm feeling great!"
```

## 📝 Documentation

### Component Documentation

When adding a component, update:

1. **COMPONENTS.md**:
   - Add to catalog
   - List triggers
   - Describe features
   - Show props interface

2. **README.md**:
   - Update feature count
   - Add to use cases if relevant

3. **DEMO_SCRIPT.md**:
   - Add demo scenario if impactful

### Code Comments

Add comments for:
- Complex logic
- Non-obvious design decisions
- Therapeutic rationale
- Accessibility considerations

Example:
```tsx
// Reduce intensity on crisis detection to simplify cognitive load
if (isCrisis) {
  return ['CrisisResources']; // Single component only
}
```

## 🔒 Privacy & Ethics

### Critical Rules

1. **No External Data Transmission**:
   - All mood data must stay in localStorage
   - No analytics without explicit user consent
   - No tracking pixels or external scripts

2. **Crisis Handling**:
   - Crisis keywords MUST trigger CrisisResources
   - Never downplay or ignore distress signals
   - Always prioritize user safety

3. **Therapeutic Accuracy**:
   - Research any therapeutic technique before implementing
   - Consult mental health professionals when possible
   - Never claim to replace professional help

4. **Inclusive Language**:
   - Use person-first language
   - Avoid stigmatizing terms
   - Be culturally sensitive

## 🎯 Areas Needing Help

### High Priority

- [ ] Accessibility improvements (ARIA labels, keyboard nav)
- [ ] Additional therapeutic components
- [ ] Animation performance optimization
- [ ] Mobile UX enhancements
- [ ] Internationalization (i18n)

### Nice to Have

- [ ] Voice input integration
- [ ] Export journal entries as PDF
- [ ] Data visualization improvements
- [ ] PWA enhancements
- [ ] Integration tests

## 💬 Communication

### Questions?

- **GitHub Issues**: Technical questions
- **Discussions**: Feature ideas, general chat
- **Pull Requests**: Code reviews

### Code of Conduct

- Be respectful and inclusive
- Assume positive intent
- Focus on what's best for users
- Help create a welcoming community

## 🎉 Recognition

Contributors will be:
- Added to README acknowledgments
- Credited in release notes
- Listed in CONTRIBUTORS.md

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Every contribution, no matter how small, makes MindFlow better for everyone who uses it. We appreciate your help in making mental wellness support more accessible.

**Let's build something meaningful together! 💚**
