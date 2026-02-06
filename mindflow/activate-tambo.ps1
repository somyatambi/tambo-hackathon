# MindFlow Tambo Integration Activation Script (Windows)

Write-Host "🚀 Activating Tambo SDK Integration for MindFlow..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Backup old files
Write-Host "📦 Step 1: Creating backups..." -ForegroundColor Yellow
if (Test-Path "src/app/page.tsx") {
    Copy-Item "src/app/page.tsx" "src/app/page-manual-backup.tsx" -Force
    Write-Host "✅ Backed up page.tsx -> page-manual-backup.tsx" -ForegroundColor Green
}

if (Test-Path "src/lib/tambo-config.ts") {
    Copy-Item "src/lib/tambo-config.ts" "src/lib/tambo-config-old-backup.ts" -Force
    Write-Host "✅ Backed up tambo-config.ts -> tambo-config-old-backup.ts" -ForegroundColor Green
}

# Step 2: Activate new Tambo-powered files
Write-Host ""
Write-Host "🔄 Step 2: Activating Tambo-powered files..." -ForegroundColor Yellow
Copy-Item "src/app/page-tambo.tsx" "src/app/page.tsx" -Force
Write-Host "✅ Activated page-tambo.tsx -> page.tsx" -ForegroundColor Green

Copy-Item "src/lib/tambo-config-new.ts" "src/lib/tambo-config.ts" -Force
Write-Host "✅ Activated tambo-config-new.ts -> tambo-config.ts" -ForegroundColor Green

# Step 3: Verify environment variables
Write-Host ""
Write-Host "🔍 Step 3: Checking environment variables..." -ForegroundColor Yellow
if (Select-String -Path ".env.local" -Pattern "NEXT_PUBLIC_OPENROUTER_API_KEY" -Quiet) {
    Write-Host "✅ NEXT_PUBLIC_OPENROUTER_API_KEY found" -ForegroundColor Green
} else {
    Write-Host "⚠️  WARNING: NEXT_PUBLIC_OPENROUTER_API_KEY not found in .env.local" -ForegroundColor Red
    Write-Host "   Please add: NEXT_PUBLIC_OPENROUTER_API_KEY=your-key-here" -ForegroundColor Yellow
}

# Step 4: Check dependencies
Write-Host ""
Write-Host "📦 Step 4: Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules/@tambo-ai/react/package.json") {
    Write-Host "✅ @tambo-ai/react installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  WARNING: @tambo-ai/react not found" -ForegroundColor Red
    Write-Host "   Run: npm install" -ForegroundColor Yellow
}

# Step 5: Summary
Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "✨ TAMBO INTEGRATION ACTIVATED! ✨" -ForegroundColor Magenta
Write-Host "═══════════════════════════════════════════" -ForegroundColor Magenta
Write-Host ""
Write-Host "📋 What Changed:" -ForegroundColor Cyan
Write-Host "  • page.tsx now uses TamboProvider"
Write-Host "  • All components registered with Tambo SDK"
Write-Host "  • AI-driven component selection (no manual logic)"
Write-Host "  • 5 local tools available for AI"
Write-Host "  • Claude Sonnet 4.5 via OpenRouter"
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. npm run dev"
Write-Host "  2. Open http://localhost:3000"
Write-Host "  3. Test: 'I'm feeling anxious'"
Write-Host "  4. Check AI selects BreathingExercise component"
Write-Host ""
Write-Host "📖 Documentation: TAMBO_INTEGRATION_COMPLETE.md" -ForegroundColor Yellow
Write-Host ""
Write-Host "Good luck at the hackathon! 🎉" -ForegroundColor Green
