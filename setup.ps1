# 🚀 QUICK START SCRIPT

Write-Host "🎣 CÂU CÁ TV - QUICK START" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Check if MongoDB is running
Write-Host "📊 Checking MongoDB..." -ForegroundColor Yellow
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB is not running!" -ForegroundColor Red
    Write-Host "   Please start MongoDB first:" -ForegroundColor Yellow
    Write-Host "   - Run: net start MongoDB" -ForegroundColor White
    Write-Host "   - Or use MongoDB Atlas (cloud)" -ForegroundColor White
    exit 1
}

# Check if backend dependencies installed
Write-Host "`n📦 Checking backend dependencies..." -ForegroundColor Yellow
if (!(Test-Path "backend/node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Backend dependencies OK" -ForegroundColor Green
}

# Check if frontend dependencies installed
Write-Host "`n📦 Checking frontend dependencies..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Frontend dependencies OK" -ForegroundColor Green
}

# Check if .env exists
Write-Host "`n🔧 Checking configuration..." -ForegroundColor Yellow
if (!(Test-Path "backend/.env")) {
    Write-Host "⚠️  backend/.env not found!" -ForegroundColor Red
    Write-Host "   Copying from .env.example..." -ForegroundColor Yellow
    Copy-Item "backend/.env.example" "backend/.env"
    Write-Host "   ⚠️  Please update backend/.env with your MongoDB URI" -ForegroundColor Yellow
} else {
    Write-Host "✅ backend/.env exists" -ForegroundColor Green
}

if (!(Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local not found!" -ForegroundColor Red
    Write-Host "   Copying from .env.local.example..." -ForegroundColor Yellow
    Copy-Item ".env.local.example" ".env.local"
    Write-Host "✅ .env.local created" -ForegroundColor Green
} else {
    Write-Host "✅ .env.local exists" -ForegroundColor Green
}

# Ask to seed database
Write-Host "`n🌱 Do you want to seed the database? (Y/N)" -ForegroundColor Yellow
$seed = Read-Host
if ($seed -eq "Y" -or $seed -eq "y") {
    Write-Host "Seeding database..." -ForegroundColor Yellow
    Set-Location backend
    npm run seed
    Set-Location ..
    Write-Host "✅ Database seeded" -ForegroundColor Green
}

Write-Host "`n====================================`n" -ForegroundColor Cyan
Write-Host "✨ SETUP COMPLETE!" -ForegroundColor Green
Write-Host "`nTo start the application:" -ForegroundColor Cyan
Write-Host "  1. Open a terminal and run: cd backend; npm run dev" -ForegroundColor White
Write-Host "  2. Open another terminal and run: npm run dev" -ForegroundColor White
Write-Host "`nOr use the start.ps1 script to start both automatically`n" -ForegroundColor Yellow

Write-Host "📚 Useful commands:" -ForegroundColor Cyan
Write-Host "  npm run backend    - Start backend only" -ForegroundColor White
Write-Host "  npm run frontend   - Start frontend only" -ForegroundColor White
Write-Host "  npm run seed       - Seed database`n" -ForegroundColor White

Write-Host "👤 Default accounts:" -ForegroundColor Cyan
Write-Host "  Admin: admin@caucatv.com / adminpassword" -ForegroundColor White
Write-Host "  Customer: customer@email.com / password120`n" -ForegroundColor White

Write-Host "🎉 Happy Coding!" -ForegroundColor Green
