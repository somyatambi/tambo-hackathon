# 🚀 MindFlow - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Prerequisites Check

Make sure you have:
- ✅ Node.js 18+ installed ([Download](https://nodejs.org/))
- ✅ npm or yarn package manager
- ✅ Git installed
- ✅ Code editor (VS Code recommended)

Check versions:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
```

---

### 2. Clone Repository

```bash
git clone https://github.com/yourusername/mindflow.git
cd mindflow
```

---

### 3. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14 (React framework)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Tambo React SDK (generative UI)
- Lucide React (icons)
- TypeScript & supporting tools

**Expected time**: 1-2 minutes

---

### 4. Set Up Environment Variables

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local with your API key
```

**Get OpenAI API Key**:
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to "API Keys" section
4. Create new secret key
5. Copy and paste into `.env.local`:

```env
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

💡 **Tip**: OpenAI offers $5 in free credits for new accounts

---

### 5. Start Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.2.16
- Local:        http://localhost:3000
- Network:      http://192.168.1.x:3000

✓ Ready in 2.5s
```

---

### 6. Open in Browser

Navigate to: **http://localhost:3000**

You should see the MindFlow landing page with:
- 🌊 Calming gradient background
- ✨ "How are you feeling today?" prompt
- 5 quick prompt buttons
- Theme toggle in header

---

## 🎯 First Test

Try these inputs to see different components:

1. **Type**: "I'm feeling anxious"
   - Should render: Breathing Exercise + Anxiety Grounding

2. **Type**: "I can't sleep"
   - Should render: Sleep Wind-Down + Meditation Guide

3. **Type**: "Show me my progress"
   - Should render: Mood Dashboard

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### OpenAI API Key Issues

- ✅ Check key starts with `sk-`
- ✅ No extra spaces before/after
- ✅ Key is active (check OpenAI dashboard)
- ✅ Account has available credits

### Styles Not Loading

```bash
# Rebuild Tailwind
npm run build
npm run dev
```

---

## 📱 View on Mobile

**Same Network**:
1. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Open on phone: `http://YOUR_IP:3000`
3. Test mobile responsive design

**Using Tunneling (Advanced)**:
```bash
npm install -g localtunnel
lt --port 3000
```

---

## 🎨 Customize Theme

Edit `tailwind.config.ts` to change colors:

```typescript
// Change primary calm color
calm: {
  500: '#4f7857',  // Change to your color
}
```

Rebuild:
```bash
npm run dev
```

---

## 📚 Next Steps

### Learn the Codebase

1. **Read**: [README.md](./README.md) - Overview and features
2. **Study**: [COMPONENTS.md](./COMPONENTS.md) - All components explained
3. **Review**: [src/app/page.tsx](./src/app/page.tsx) - Main logic

### Make Your First Change

**Add a New Affirmation**:

1. Open: `src/components/generative/Affirmations.tsx`
2. Find: `affirmationsBank` array
3. Add: Your own affirmation
4. Save and see it appear!

### Add a New Component

Follow: [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines

---

## 🚀 Deploy to Production

When ready to share with the world:

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel login
vercel
```

Follow prompts and add your OpenAI API key in Vercel dashboard.

**Result**: Live URL in ~2 minutes! 🎉

### Option 2: Manual Deploy

See: [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

---

## 💡 Pro Tips

### VS Code Extensions

Install these for better dev experience:
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **Error Lens**

### Keyboard Shortcuts

```
Ctrl/Cmd + Shift + P   → Command palette
Ctrl/Cmd + B           → Toggle sidebar
Ctrl/Cmd + `           → Toggle terminal
F12                    → Open DevTools
```

### DevTools Tips

```
Application → Local Storage → localhost:3000
  └─ mindflow_mood_history    (View mood data)

Console → Type: localStorage.clear()
  └─ Clear all saved data
```

---

## 📞 Getting Help

**Documentation**:
- 📖 [README.md](./README.md) - Full documentation
- 🧩 [COMPONENTS.md](./COMPONENTS.md) - Component reference
- 🧪 [TESTING.md](./TESTING.md) - Testing guide
- 🎬 [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) - Demo scenarios

**Community**:
- 💬 [GitHub Discussions](https://github.com/yourusername/mindflow/discussions)
- 🐛 [Issues](https://github.com/yourusername/mindflow/issues)
- 📧 Email: support@mindflow.app

---

## ✅ Setup Complete!

You should now have:
- ✅ MindFlow running on localhost:3000
- ✅ All 10 therapeutic components working
- ✅ Light and dark mode functional
- ✅ Mood tracking saving to localStorage
- ✅ Beautiful calming design

**Ready to explore mental wellness AI! 🌊✨**

---

## 🎓 Learning Resources

### Next.js
- [Official Docs](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### Tailwind CSS
- [Docs](https://tailwindcss.com/docs)
- [Playground](https://play.tailwindcss.com/)

### Framer Motion
- [Docs](https://www.framer.com/motion/)
- [Examples](https://www.framer.com/motion/examples/)

### Tambo SDK
- [Documentation](https://docs.tambo.ai)
- [Examples](https://github.com/tambo-ai/examples)

---

**Happy Building! 💚**
