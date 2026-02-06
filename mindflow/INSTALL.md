# 🌊 MindFlow Installation

## Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn

## Quick Install

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit .env.local and add your OpenAI API key

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

## Get OpenAI API Key

1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to "API Keys"
4. Create new secret key
5. Copy to `.env.local`

## Automated Setup

**Windows**: Run `setup.bat`  
**Mac/Linux**: Run `./setup.sh`

## Verify Installation

Test these inputs:
- "I'm feeling anxious" → Breathing + Grounding
- "I can't sleep" → Wind-down + Meditation
- "Show me my progress" → Dashboard

## Need Help?

- 📖 [Full README](./README.md)
- 🚀 [Quick Start Guide](./QUICKSTART.md)
- 🔧 [Troubleshooting](./QUICKSTART.md#troubleshooting)

## Deploy to Production

```bash
npm install -g vercel
vercel
```

---

**Built with 💚 for mental wellness**
