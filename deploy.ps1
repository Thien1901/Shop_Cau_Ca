# 🚀 Deploy Script for Windows PowerShell

Write-Host "=== Câu Cá TV - Deploy Script ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if git is initialized
Write-Host "Step 1: Checking Git..." -ForegroundColor Yellow
if (-not (Test-Path .git)) {
    Write-Host "Initializing Git repository..." -ForegroundColor Green
    git init
    git branch -M main
} else {
    Write-Host "Git already initialized ✓" -ForegroundColor Green
}

# Step 2: Build Frontend
Write-Host ""
Write-Host "Step 2: Building Frontend..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "Frontend build successful ✓" -ForegroundColor Green
} else {
    Write-Host "Frontend build failed ✗" -ForegroundColor Red
    exit 1
}

# Step 3: Commit changes
Write-Host ""
Write-Host "Step 3: Committing changes..." -ForegroundColor Yellow
git add .
$commitMessage = Read-Host "Enter commit message (default: 'Deploy update')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Deploy update"
}
git commit -m "$commitMessage"

# Step 4: Ask for GitHub remote URL
Write-Host ""
Write-Host "Step 4: GitHub Remote Setup" -ForegroundColor Yellow
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    $githubUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git)"
    git remote add origin $githubUrl
}

# Step 5: Push to GitHub
Write-Host ""
Write-Host "Step 5: Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "Push successful ✓" -ForegroundColor Green
} else {
    Write-Host "Push failed ✗" -ForegroundColor Red
    Write-Host "You may need to pull first: git pull origin main --rebase" -ForegroundColor Yellow
}

# Step 6: Instructions
Write-Host ""
Write-Host "=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Go to https://render.com and deploy backend" -ForegroundColor White
Write-Host "2. Go to https://vercel.com and deploy frontend" -ForegroundColor White
Write-Host "3. Update VITE_API_URL in Vercel with your Render backend URL" -ForegroundColor White
Write-Host "4. Run seed command in Render Shell: npm run seed" -ForegroundColor White
Write-Host ""
Write-Host "✅ Code pushed successfully! Ready to deploy!" -ForegroundColor Green
