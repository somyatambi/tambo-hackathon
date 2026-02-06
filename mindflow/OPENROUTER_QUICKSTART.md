# 🚀 OpenRouter Quick Start

## ✅ Integration Complete!

MindFlow is now configured to use **OpenRouter** with **Claude Sonnet 4.5** for all AI interactions.

---

## 📝 What Changed?

### ✨ New Files Created:
- `src/lib/ai-config.ts` - OpenRouter configuration & API client
- `src/lib/env-utils.ts` - Environment detection & cost monitoring
- `src/app/api/chat/route.ts` - Secure chat endpoint
- `src/app/api/test-openrouter/route.ts` - Test endpoint (dev only)
- `src/components/OpenRouterTest.tsx` - Test UI component
- `OPENROUTER_INTEGRATION.md` - Complete documentation

### 🔄 Updated Files:
- `.env.local` - Now uses OpenRouter API key
- `.env.local.example` - Updated template
- `src/lib/tambo-config.ts` - Configured for OpenRouter

---

## 🎯 Next Steps (5 minutes)

### 1️⃣ Add Your API Key

Your `.env.local` has been updated with the OpenRouter configuration structure.

**If you haven't already:**
1. Go to [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Create an API key
3. Replace `your-openrouter-api-key-here` in `.env.local`

### 2️⃣ Start Development Server

```bash
npm run dev
```

### 3️⃣ Test the Integration

**Option A: Use the Test Endpoint**
```bash
# In a new terminal:
curl http://localhost:3000/api/test-openrouter
```

**Option B: Add Test Component to a Page**

Create/update `src/app/test/page.tsx`:
```tsx
import { OpenRouterTest } from '@/components/OpenRouterTest';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <OpenRouterTest />
    </div>
  );
}
```

Then visit: `http://localhost:3000/test`

### 4️⃣ Try Your First AI Request

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Give me a breathing exercise for anxiety"}
    ],
    "temperature": 0.7,
    "maxTokens": 300
  }'
```

---

## ✅ Verification Checklist

- [ ] `.env.local` has `OPENROUTER_API_KEY` set
- [ ] Dev server is running (`npm run dev`)
- [ ] Test endpoint returns success: `GET /api/test-openrouter`
- [ ] Chat endpoint works: `POST /api/chat`
- [ ] Tambo components use Claude Sonnet 4.5 automatically

---

## 🔒 Security Notes

✅ **What's Secure:**
- API key is only on server (never exposed to client)
- All AI calls go through API routes
- Input validation & sanitization enabled
- Request size limits in place
- Error handling without data leaks

⚠️ **Remember:**
- NEVER commit `.env.local` to git
- Keep your OpenRouter API key secret
- Monitor usage on OpenRouter dashboard

---

## 💰 Cost Monitoring

In development mode, every API call logs:
- Token usage (prompt + completion)
- Estimated cost
- Total session statistics

Check your terminal output for real-time cost tracking!

---

## 📚 Documentation

Full documentation available in:
- **[OPENROUTER_INTEGRATION.md](./OPENROUTER_INTEGRATION.md)** - Complete guide
- **[.env.local.example](./.env.local.example)** - Configuration template

---

## 🆘 Troubleshooting

### "API key not found"
→ Check `.env.local` has `OPENROUTER_API_KEY` set  
→ Restart dev server: `npm run dev`

### Test endpoint returns 403
→ Test endpoint only works in development  
→ Check `NODE_ENV=development`

### Slow responses
→ Normal for first request  
→ Claude Sonnet 4.5 is thorough and thoughtful  
→ Adjust `maxTokens` to control response length

### Rate limit errors
→ Wait a few seconds between requests  
→ Check OpenRouter account limits  
→ Implement request throttling if needed

---

## 🎉 You're All Set!

The MindFlow app is now powered by Claude Sonnet 4.5 via OpenRouter!

**Key Benefits:**
- 🧠 Advanced reasoning with Claude 3.5 Sonnet
- 💰 Competitive pricing through OpenRouter
- 🔄 Easy model switching
- 📊 Built-in cost monitoring
- 🔒 Enterprise-grade security

**Questions?** Check [OPENROUTER_INTEGRATION.md](./OPENROUTER_INTEGRATION.md) for detailed docs.

---

**Happy building! 🚀**
