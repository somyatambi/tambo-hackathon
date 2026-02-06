# MindFlow - Deployment Guide

## 🚀 Quick Deploy to Vercel

### Method 1: Deploy Button (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mindflow)

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 3: Git Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
6. Click "Deploy"

---

## 🔑 Environment Variables

Set these in your Vercel project settings:

```env
OPENAI_API_KEY=sk-...your-key-here
ANTHROPIC_API_KEY=sk-ant-...  # Optional
```

### Getting an OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy and save it securely

---

## 🌐 Custom Domain

### Add a Custom Domain on Vercel

1. Go to your project settings
2. Navigate to "Domains"
3. Add your domain (e.g., `mindflow.app`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

### Recommended Domains
- `mindflow.app`
- `getmindflow.com`
- `usemindflow.io`

---

## 📊 Performance Optimization

### Vercel Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit `.env.local` to git
- ✅ Use Vercel's environment variables
- ✅ Rotate API keys regularly

### API Keys
- ✅ Set spending limits on OpenAI account
- ✅ Monitor usage in OpenAI dashboard
- ✅ Use separate keys for dev/prod

---

## 📱 Progressive Web App (PWA)

To make MindFlow installable:

### 1. Create `public/manifest.json`:

```json
{
  "name": "MindFlow - Mental Wellness Companion",
  "short_name": "MindFlow",
  "description": "Your adaptive mental wellness companion",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f6f8f6",
  "theme_color": "#4f7857",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Add to `src/app/layout.tsx`:

```tsx
export const metadata = {
  manifest: '/manifest.json',
  // ... other metadata
}
```

---

## 🧪 Testing Production Build Locally

```bash
# Build for production
npm run build

# Start production server
npm start

# Open http://localhost:3000
```

---

## 📈 Analytics (Optional)

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Update `src/app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### API Key Issues

- Check environment variables are set correctly
- Verify API key is valid
- Check OpenAI account has credits

### Slow Performance

- Check Vercel region (use closest to users)
- Optimize images with Next.js Image component
- Enable caching for static assets

---

## 📞 Support

- **Documentation**: [README.md](./README.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/mindflow/issues)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

## ✅ Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] OpenAI API key tested
- [ ] Build completes successfully
- [ ] All components render correctly
- [ ] Mobile responsive design verified
- [ ] Dark mode works properly
- [ ] localStorage persists data
- [ ] Crisis resources display correctly
- [ ] README and docs updated
- [ ] License file included

---

**Ready to deploy? Let's go! 🚀**
