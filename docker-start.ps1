# Script khởi chạy Docker Compose cho Câu Cá TV
# Author: Auto-generated
# Date: 2025-01-07

Write-Host "================================" -ForegroundColor Cyan
Write-Host "🐳 CÂU CÁ TV - DOCKER LAUNCHER" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Docker
Write-Host "🔍 Kiểm tra Docker..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    docker-compose --version | Out-Null
    Write-Host "✅ Docker đã cài đặt" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker chưa được cài đặt!" -ForegroundColor Red
    Write-Host "👉 Tải Docker Desktop: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🚀 Bắt đầu khởi chạy services..." -ForegroundColor Yellow
Write-Host ""

# Dừng các container cũ (nếu có)
Write-Host "🛑 Dừng containers cũ..." -ForegroundColor Yellow
docker-compose down 2>$null

# Build và chạy
Write-Host "🔨 Build và khởi động containers..." -ForegroundColor Yellow
docker-compose up -d --build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "✅ KHỞI ĐỘNG THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📍 CÁC DỊCH VỤ ĐANG CHẠY:" -ForegroundColor Cyan
    Write-Host "   Frontend:  http://localhost:3000" -ForegroundColor White
    Write-Host "   Backend:   http://localhost:5000/api" -ForegroundColor White
    Write-Host "   MongoDB:   localhost:27017" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 HƯỚNG DẪN:" -ForegroundColor Cyan
    Write-Host "   • Xem logs:         docker-compose logs -f" -ForegroundColor White
    Write-Host "   • Dừng services:    docker-compose down" -ForegroundColor White
    Write-Host "   • Seed database:    docker exec -it cau-ca-backend npm run seed" -ForegroundColor White
    Write-Host ""
    
    # Hỏi có muốn seed database không
    $seed = Read-Host "❓ Bạn có muốn seed database với 50 sản phẩm? (y/n)"
    if ($seed -eq 'y' -or $seed -eq 'Y') {
        Write-Host ""
        Write-Host "🌱 Đang seed database..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5  # Đợi backend khởi động
        docker exec -it cau-ca-backend npm run seed
        Write-Host "✅ Seed hoàn tất!" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "🌐 Mở trình duyệt..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3000"
    
} else {
    Write-Host ""
    Write-Host "❌ KHỞI ĐỘNG THẤT BẠI!" -ForegroundColor Red
    Write-Host "👉 Xem logs: docker-compose logs" -ForegroundColor Yellow
}
