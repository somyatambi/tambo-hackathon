# 🏆 Tambo Hackathon Submission

## 🌊 MindFlow - Adaptive Mental Wellness Companion

**An intelligent mental wellness app that uses Tambo's Generative UI to dynamically render therapeutic tools based on your emotional state.**

🚀 **[Try Live Demo](https://tambo-hackathon-chi.vercel.app/)** | 📚 **[View Submission Details](./mindflow/HACKATHON_SUBMISSION.md)**

---

## 🎯 Main Project

The hackathon submission is in the **[mindflow](./mindflow)** directory.

📄 **[View Full Hackathon Submission Details](./mindflow/HACKATHON_SUBMISSION.md)**

---

## 🚀 Quick Start

```bash
cd mindflow
npm install
cp .env.example .env.local
# Add your OPENROUTER_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📖 Key Features

- **🧠 AI-Powered Component Selection** - Tambo's generative UI intelligently selects 2-3 therapeutic components based on emotional context
- **💬 Natural Language Interface** - Just describe how you're feeling, no menu navigation required
- **🎨 10 Therapeutic Components** - Breathing, journaling, mood tracking, meditation, CBT reframing, grounding, and more
- **🔒 Privacy-First** - All data stored locally, no external tracking
- **⚡ Real-time Adaptation** - Interface adapts as conversation builds context
- **🚨 Crisis Detection** - Automatic priority handling for urgent situations

---

## 🛠️ Tech Stack

- **Tambo React SDK** - Core generative UI framework
- **Next.js 14** - React framework
- **Claude Sonnet 4.5** - AI model (via OpenRouter)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

---

## 📂 Repository Structure

```
.
├── mindflow/                    # Main hackathon project
│   ├── src/
│   │   ├── app/                # Next.js app with Tambo integration
│   │   ├── components/         # 10 therapeutic components
│   │   └── lib/                # Tambo config, registry, tools
│   ├── HACKATHON_SUBMISSION.md # Detailed submission document
│   ├── README.md               # Project documentation
│   └── package.json
│
├── tambo/                       # Tambo SDK (local development)
└── community/                   # Community templates
```

---

## 📝 Documentation

- **[Hackathon Submission](./mindflow/HACKATHON_SUBMISSION.md)** - Complete project description, Tambo integration details, tech stack
- **[MindFlow README](./mindflow/README.md)** - User-facing documentation
- **[Quick Start Guide](./mindflow/QUICKSTART.md)** - 5-minute setup
- **[Installation Guide](./mindflow/INSTALL.md)** - Detailed setup instructions
- **[Tambo Integration](./mindflow/TAMBO_INTEGRATION.md)** - Technical deep dive

---

## 🎯 What Makes This Special

**MindFlow demonstrates the true power of Tambo's generative UI for adaptive interfaces.** Mental wellness isn't one-size-fits-all - what helps with anxiety doesn't help with insomnia. By letting AI dynamically compose the interface based on emotional context, we create a truly personalized, friction-free experience.

This isn't just a mental health app with generative UI bolted on. **Tambo is the architectural foundation** - every interaction, every component, every transition is driven by AI understanding of human emotion.

---

## 👥 Team

Built with ❤️ for the Tambo Hackathon

---

## 📄 License

MIT License - See [LICENSE](./mindflow/LICENSE)

---

## 🔗 Links

- [GitHub Repository](https://github.com/somyatambi/tambo-hackathon)
- [Tambo Documentation](https://tambo.ai/docs)
- [Live Demo](#) *(Coming soon)*
