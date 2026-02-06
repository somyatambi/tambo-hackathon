#!/bin/bash
# MindFlow Tambo Integration Activation Script

echo "🚀 Activating Tambo SDK Integration for MindFlow..."
echo ""

# Step 1: Backup old files
echo "📦 Step 1: Creating backups..."
if [ -f "src/app/page.tsx" ]; then
    cp src/app/page.tsx src/app/page-manual-backup.tsx
    echo "✅ Backed up page.tsx -> page-manual-backup.tsx"
fi

if [ -f "src/lib/tambo-config.ts" ]; then
    cp src/lib/tambo-config.ts src/lib/tambo-config-old-backup.ts
    echo "✅ Backed up tambo-config.ts -> tambo-config-old-backup.ts"
fi

# Step 2: Activate new Tambo-powered files
echo ""
echo "🔄 Step 2: Activating Tambo-powered files..."
cp src/app/page-tambo.tsx src/app/page.tsx
echo "✅ Activated page-tambo.tsx -> page.tsx"

cp src/lib/tambo-config-new.ts src/lib/tambo-config.ts
echo "✅ Activated tambo-config-new.ts -> tambo-config.ts"

# Step 3: Verify environment variables
echo ""
echo "🔍 Step 3: Checking environment variables..."
if grep -q "NEXT_PUBLIC_OPENROUTER_API_KEY" .env.local; then
    echo "✅ NEXT_PUBLIC_OPENROUTER_API_KEY found"
else
    echo "⚠️  WARNING: NEXT_PUBLIC_OPENROUTER_API_KEY not found in .env.local"
    echo "   Please add: NEXT_PUBLIC_OPENROUTER_API_KEY=your-key-here"
fi

# Step 4: Check dependencies
echo ""
echo "📦 Step 4: Checking dependencies..."
if [ -f "node_modules/@tambo-ai/react/package.json" ]; then
    echo "✅ @tambo-ai/react installed"
else
    echo "⚠️  WARNING: @tambo-ai/react not found"
    echo "   Run: npm install"
fi

# Step 5: Summary
echo ""
echo "═══════════════════════════════════════════"
echo "✨ TAMBO INTEGRATION ACTIVATED! ✨"
echo "═══════════════════════════════════════════"
echo ""
echo "📋 What Changed:"
echo "  • page.tsx now uses TamboProvider"
echo "  • All components registered with Tambo SDK"
echo "  • AI-driven component selection (no manual logic)"
echo "  • 5 local tools available for AI"
echo "  • Claude Sonnet 4.5 via OpenRouter"
echo ""
echo "🚀 Next Steps:"
echo "  1. npm run dev"
echo "  2. Open http://localhost:3000"
echo "  3. Test: 'I'm feeling anxious'"
echo "  4. Check AI selects BreathingExercise component"
echo ""
echo "📖 Documentation: TAMBO_INTEGRATION_COMPLETE.md"
echo ""
echo "Good luck at the hackathon! 🎉"
