# OpenRouter Integration Guide

## 🎉 MindFlow now uses OpenRouter with Claude Sonnet 4.5!

This guide covers the complete OpenRouter integration for the MindFlow mental wellness app.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Configuration](#configuration)
3. [Architecture](#architecture)
4. [Usage Examples](#usage-examples)
5. [Testing](#testing)
6. [Security](#security)
7. [Cost Monitoring](#cost-monitoring)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### 1. Set Up Environment Variables

Update your `.env.local` file:

```bash
# OpenRouter API Configuration
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=anthropic/claude-sonnet-4.5

# Optional: Site information (helps with OpenRouter rankings)
OPENROUTER_SITE_URL=https://mindflow-app.com
OPENROUTER_SITE_NAME=MindFlow
```

### 2. Get Your OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy it to your `.env.local` file

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Test the Integration

```bash
npm run dev
```

Visit: `http://localhost:3000/api/test-openrouter` (in development mode only)

---

## ⚙️ Configuration

### File Structure

```
mindflow/
├── .env.local                          # Environment variables (DO NOT COMMIT)
├── src/
│   ├── lib/
│   │   ├── ai-config.ts               # OpenRouter configuration & API calls
│   │   ├── env-utils.ts               # Environment detection & logging
│   │   └── tambo-config.ts            # Updated Tambo config for OpenRouter
│   ├── app/
│   │   └── api/
│   │       ├── chat/route.ts          # Secure chat endpoint
│   │       └── test-openrouter/route.ts  # Test endpoint
│   └── components/
│       └── OpenRouterTest.tsx         # Test UI component
```

### Environment Variables Explained

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENROUTER_API_KEY` | ✅ Yes | - | Your OpenRouter API key |
| `OPENROUTER_BASE_URL` | ⚠️ No | `https://openrouter.ai/api/v1` | OpenRouter API base URL |
| `OPENROUTER_MODEL` | ⚠️ No | `anthropic/claude-sonnet-4.5` | Model to use |
| `OPENROUTER_SITE_URL` | ⚠️ No | - | Your site URL (optional) |
| `OPENROUTER_SITE_NAME` | ⚠️ No | `MindFlow` | Your app name (optional) |
| `NODE_ENV` | ✅ Yes | `development` | Environment mode |

---

## 🏗️ Architecture

### Security-First Design

```
┌─────────────┐
│   Client    │
│  (Browser)  │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────┐
│  Next.js API    │
│  Route Handler  │
│  /api/chat      │
└──────┬──────────┘
       │ Validates & Sanitizes
       ▼
┌─────────────────┐
│  ai-config.ts   │
│  (Server Only)  │
└──────┬──────────┘
       │ With Retry Logic
       ▼
┌─────────────────┐
│   OpenRouter    │
│   Claude 4.5    │
└─────────────────┘
```

**Key Security Features:**
- ✅ API key never exposed to client
- ✅ All API calls server-side only
- ✅ Input validation & sanitization
- ✅ Request size limits
- ✅ Error handling without leaking details

---

## 💻 Usage Examples

### Basic Chat Completion

```typescript
// app/api/my-feature/route.ts
import { callOpenRouter } from '@/lib/ai-config';

export async function POST(request: Request) {
  const { userMessage } = await request.json();
  
  const response = await callOpenRouter([
    {
      role: 'system',
      content: 'You are a helpful mental wellness companion.',
    },
    {
      role: 'user',
      content: userMessage,
    },
  ]);
  
  return Response.json({
    reply: response.choices[0].message.content,
  });
}
```

### Using the Helper Function

```typescript
import { completeText } from '@/lib/ai-config';

const systemPrompt = 'You are a compassionate therapist.';
const userPrompt = 'I feel anxious today.';

const reply = await completeText(userPrompt, systemPrompt);
console.log(reply); // AI response as string
```

### Client-Side Usage

```typescript
// components/ChatInterface.tsx
'use client';

async function sendMessage(message: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      maxTokens: 500,
    }),
  });
  
  const data = await response.json();
  return data.message;
}
```

### Tambo Integration (Automatic)

The Tambo SDK is already configured to use OpenRouter. Just use Tambo as normal:

```typescript
import { tamboClient } from '@/lib/tambo-config';

// Tambo automatically uses Claude Sonnet 4.5 via OpenRouter
```

---

## 🧪 Testing

### 1. Health Check (GET)

```bash
curl http://localhost:3000/api/test-openrouter
```

Returns connection status and configuration.

### 2. Completion Test (POST)

```bash
curl -X POST http://localhost:3000/api/test-openrouter \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Say hello!"}'
```

### 3. Using the Test Component

Add to any page (development only):

```tsx
import { OpenRouterTest } from '@/components/OpenRouterTest';

export default function TestPage() {
  return <OpenRouterTest />;
}
```

### 4. Manual Chat API Test

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Give me a mindfulness tip"}
    ],
    "temperature": 0.7,
    "maxTokens": 150
  }'
```

---

## 🔒 Security

### Best Practices

✅ **DO:**
- Keep `.env.local` in `.gitignore`
- Use API routes (server-side) for all AI calls
- Validate and sanitize user inputs
- Set reasonable token limits
- Use HTTPS in production
- Monitor API usage regularly

❌ **DON'T:**
- Never commit `.env.local`
- Never expose API key to client
- Never trust client-side input
- Don't skip error handling
- Don't ignore rate limits

### Input Sanitization

The system automatically:
- Trims whitespace
- Limits message length (10,000 chars)
- Validates message structure
- Checks role validity

### Error Handling

Errors are handled gracefully:
- User-friendly messages shown to users
- Detailed errors logged server-side only
- No sensitive data leaked in responses
- Automatic retry for transient failures

---

## 💰 Cost Monitoring

### Development Mode Features

In development, you get automatic cost tracking:

```typescript
import { getUsageStats } from '@/lib/env-utils';

const stats = getUsageStats();
console.log('Total requests:', stats.totalRequests);
console.log('Total tokens:', stats.totalTokens);
console.log('Total cost: $', stats.totalCost.toFixed(6));
```

### Token Usage Logs

Every API call logs:
- Prompt tokens
- Completion tokens
- Total tokens
- Estimated cost

### Estimated Costs (Claude Sonnet 4.5)

Approximate pricing (check OpenRouter for current rates):
- **Input:** ~$3 per 1M tokens
- **Output:** ~$15 per 1M tokens
- **Blended:** ~$15 per 1M tokens (estimated)

Example costs:
- Simple chat (500 tokens): $0.0075
- Long conversation (2000 tokens): $0.03
- Daily usage (100k tokens): $1.50

---

## 🐛 Troubleshooting

### Problem: "API key not found"

**Solution:**
```bash
# Check .env.local exists and has:
OPENROUTER_API_KEY=sk-or-v1-...

# Restart dev server:
npm run dev
```

### Problem: "Rate limit exceeded"

**Solution:**
- Wait a few seconds and retry
- Check your OpenRouter account limits
- Implement request throttling

### Problem: "Invalid model"

**Solution:**
```bash
# Verify model name in .env.local:
OPENROUTER_MODEL=anthropic/claude-sonnet-4.5

# Valid models:
# - anthropic/claude-sonnet-4.5
# - anthropic/claude-3.5-sonnet
# - anthropic/claude-3-opus
```

### Problem: Test endpoint returns 403

**Solution:**
Test endpoint only works in development. Set:
```bash
NODE_ENV=development
```

### Problem: Slow responses

**Possible causes:**
1. Network latency
2. Large token requests
3. High OpenRouter load
4. Retry logic kicking in

**Solutions:**
- Reduce `maxTokens`
- Check OpenRouter status
- Optimize prompts

### Debugging Checklist

- [ ] `.env.local` file exists
- [ ] `OPENROUTER_API_KEY` is set
- [ ] API key is valid (check OpenRouter dashboard)
- [ ] Dev server is running
- [ ] No firewall blocking requests
- [ ] Check browser console for errors
- [ ] Check terminal/server logs

### Getting Help

1. Check server logs: `npm run dev` output
2. Test endpoint: `GET /api/test-openrouter`
3. Verify API key: OpenRouter dashboard
4. Check OpenRouter status: https://status.openrouter.ai/

---

## 📊 Monitoring in Production

### Recommended Tools

1. **OpenRouter Dashboard**: Monitor usage and costs
2. **Vercel Analytics**: Track API route performance
3. **Sentry**: Error tracking and alerting
4. **Custom logging**: Log to your preferred service

### Example Production Monitoring

```typescript
// lib/monitoring.ts
export async function logAPICall(data: {
  endpoint: string;
  tokens: number;
  duration: number;
  success: boolean;
}) {
  // Send to your monitoring service
  await fetch('https://your-logging-service.com/log', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    }),
  });
}
```

---

## 🎯 Next Steps

Now that OpenRouter is integrated:

1. ✅ Test the connection: `/api/test-openrouter`
2. ✅ Try the chat endpoint: `/api/chat`
3. ✅ Use Tambo components (auto-configured)
4. ✅ Monitor costs in development
5. ✅ Deploy to production

**Happy coding! 🚀**

---

## 📚 Additional Resources

- [OpenRouter Documentation](https://openrouter.ai/docs)
- [Claude 3.5 Sonnet Guide](https://docs.anthropic.com/claude/docs/claude-3-5-sonnet)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Tambo Documentation](https://tambo.ai/docs)

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Status:** ✅ Production Ready
