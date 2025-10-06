# 🚀 START APPLICATION

Write-Host "🎣 Starting Câu Cá TV Application..." -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Start backend in new terminal
Write-Host "🔧 Starting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🚀 BACKEND SERVER' -ForegroundColor Green; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in new terminal  
Write-Host "🎨 Starting frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🎨 FRONTEND' -ForegroundColor Blue; npm run dev"

Write-Host "`n✅ Application starting!" -ForegroundColor Green
Write-Host "`n📡 Backend will run on: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🌐 Frontend will run on: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`n⚠️  Check the new terminal windows for output`n" -ForegroundColor Yellow
