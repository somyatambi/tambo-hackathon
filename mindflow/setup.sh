#!/bin/bash

# MindFlow Installation Script
# Run this script to set up MindFlow quickly

echo "🌊 Welcome to MindFlow Setup!"
echo "================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Set up environment
echo "🔑 Setting up environment..."
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Created .env.local file"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local and add your OpenAI API key"
    echo "   Get your key from: https://platform.openai.com/api-keys"
    echo ""
    read -p "Press Enter to continue after adding your API key..."
else
    echo "✅ .env.local already exists"
fi
echo ""

# Build check
echo "🔨 Testing build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check errors above."
    exit 1
fi
echo "✅ Build successful"
echo ""

# Success message
echo "================================"
echo "🎉 Setup Complete!"
echo "================================"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "📚 Documentation:"
echo "  - README.md       - Full documentation"
echo "  - QUICKSTART.md   - Quick start guide"
echo "  - COMPONENTS.md   - Component reference"
echo ""
echo "Happy coding! 💚"
