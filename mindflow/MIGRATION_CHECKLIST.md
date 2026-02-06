# 🔄 OpenRouter Migration Checklist

Use this checklist to verify the OpenRouter integration is working correctly.

---

## ✅ Pre-Flight Checklist

### Configuration
- [ ] `.env.local` file exists
- [ ] `OPENROUTER_API_KEY` is set with your actual API key (starts with `sk-or-v1-`)
- [ ] `OPENROUTER_BASE_URL` is set to `https://openrouter.ai/api/v1`
- [ ] `OPENROUTER_MODEL` is set to `anthropic/claude-sonnet-4.5`
- [ ] `.env.local` is in `.gitignore` (verified - already present)
- [ ] `.env.local.backup` created with old keys

### Files Created
- [ ] `src/lib/ai-config.ts` exists
- [ ] `src/lib/env-utils.ts` exists
- [ ] `src/app/api/chat/route.ts` exists
- [ ] `src/app/api/test-openrouter/route.ts` exists
- [ ] `src/components/OpenRouterTest.tsx` exists
- [ ] `OPENROUTER_INTEGRATION.md` exists
- [ ] `OPENROUTER_QUICKSTART.md` exists

### Files Updated
- [ ] `src/lib/tambo-config.ts` now uses OpenRouter config
- [ ] `.env.local.example` updated with OpenRouter template

---

## 🧪 Testing Checklist

### Step 1: Start Server
```bash
npm run dev
```
- [ ] Server starts without errors
- [ ] No environment variable warnings in console

### Step 2: Health Check
```bash
curl http://localhost:3000/api/test-openrouter
```
**Expected:** JSON response with `"status": "ok"`
- [ ] Connection test passes
- [ ] Configuration is displayed
- [ ] API key is present (but masked)

### Step 3: Test Completion
```bash
curl -X POST http://localhost:3000/api/test-openrouter \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Say hello in one sentence"}'
```
**Expected:** JSON response with AI-generated text
- [ ] AI responds successfully
- [ ] Response makes sense
- [ ] Token usage is logged
- [ ] Estimated cost is calculated

### Step 4: Chat Endpoint
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Give me a brief mindfulness tip"}
    ],
    "temperature": 0.7,
    "maxTokens": 150
  }'
```
**Expected:** JSON with `{"success": true, "message": "...", ...}`
- [ ] Chat API works
- [ ] Returns proper JSON
- [ ] Message content is relevant
- [ ] Usage stats included

### Step 5: Test UI Component (Optional)

Create `src/app/test/page.tsx`:
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

Visit `http://localhost:3000/test`
- [ ] Page loads without errors
- [ ] "Check Connection Status" button works
- [ ] "Test AI Completion" button works
- [ ] Results display correctly
- [ ] Token usage is shown

### Step 6: Development Logging

Check terminal output during tests:
- [ ] `[AI Config]` logs appear
- [ ] Model name is logged (anthropic/claude-sonnet-4.5)
- [ ] Token usage is logged
- [ ] Estimated costs are shown
- [ ] Request duration is logged

---

## 🔒 Security Verification

### API Key Protection
- [ ] API key is NOT in any client-side code
- [ ] API key is NOT in git history
- [ ] `.env.local` is in `.gitignore`
- [ ] All AI calls go through API routes (not client-side)

### Input Validation
- [ ] Chat endpoint rejects invalid requests
- [ ] Message length is limited
- [ ] Message roles are validated
- [ ] Proper error messages for bad input

### Error Handling
- [ ] API errors don't expose sensitive info
- [ ] User-friendly error messages
- [ ] Server errors are logged
- [ ] Retry logic works for transient failures

---

## 🎯 Functionality Tests

### Tambo Integration
- [ ] Tambo config updated to use OpenRouter
- [ ] Existing Tambo components still work
- [ ] Mental wellness conversations use Claude
- [ ] Component generation works

### MindFlow Features
Test each feature to ensure it works with the new AI:
- [ ] Mood tracking conversations
- [ ] Breathing exercises suggestions
- [ ] Journal prompts generation
- [ ] Emergency resources (if applicable)
- [ ] Cognitive reframing
- [ ] Sleep guidance

---

## 💰 Cost Monitoring

### Development Mode
- [ ] Token usage logged in console
- [ ] Estimated costs displayed
- [ ] Usage stats endpoint works (`getUsageStats()`)
- [ ] Cost per request is reasonable

### Usage Stats
In Node REPL or test script:
```typescript
import { getUsageStats } from '@/lib/env-utils';
console.log(getUsageStats());
```
- [ ] Total requests counted
- [ ] Total tokens summed
- [ ] Total cost calculated
- [ ] Recent entries tracked

---

## 📊 Performance Tests

### Response Times
- [ ] First request: < 5 seconds (cold start)
- [ ] Subsequent requests: < 2 seconds
- [ ] Streaming responses work (if enabled)
- [ ] No timeout errors

### Error Recovery
Test these scenarios:
- [ ] Network interruption: Retries work
- [ ] Rate limit: Waits and retries
- [ ] Invalid API key: Clear error message
- [ ] Model not found: Error handled
- [ ] Timeout: Proper error response

---

## 🚀 Production Readiness

### Environment
- [ ] Production `.env` prepared (different API key recommended)
- [ ] `NODE_ENV=production` works
- [ ] Logging is appropriate for production
- [ ] Cost monitoring plan in place

### Monitoring
- [ ] OpenRouter dashboard accessible
- [ ] Usage alerts configured
- [ ] Error tracking ready (Sentry, etc.)
- [ ] Cost limits set on OpenRouter account

### Documentation
- [ ] Team knows how to use new API
- [ ] Integration guide is accessible
- [ ] Troubleshooting steps documented
- [ ] Emergency contacts listed

---

## 🎉 Final Verification

Run all systems:
```bash
# Clean install
rm -rf node_modules
npm install

# Start fresh
npm run dev

# Run all tests above
# ...
```

**All green?** You're ready to deploy! 🚀

---

## 📝 Notes

Use this section for any issues or observations:

```
Date: _____________
Tester: _____________

Issues found:
- 
- 
- 

Resolution:
- 
- 
- 

Sign-off: _____________ Date: _____________
```

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check API key in `.env.local` |
| 429 Rate Limit | Wait 60s, check OpenRouter account |
| 403 Forbidden | Verify account has access to Claude |
| 500 Server Error | Check server logs, restart server |
| Slow responses | Normal for Claude, reduce maxTokens |
| Test endpoint 403 | Only works in development mode |

---

**Status:** ⬜ Not Started / 🔄 In Progress / ✅ Complete

**Completion Date:** _______________

**Sign-off:** _______________
