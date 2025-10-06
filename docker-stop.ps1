# Script dừng Docker services
Write-Host "🛑 Đang dừng Câu Cá TV Docker services..." -ForegroundColor Yellow

docker-compose down

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Đã dừng tất cả services!" -ForegroundColor Green
    
    $removeVolumes = Read-Host "❓ Bạn có muốn xóa database (volumes)? (y/n)"
    if ($removeVolumes -eq 'y' -or $removeVolumes -eq 'Y') {
        docker-compose down -v
        Write-Host "✅ Đã xóa volumes!" -ForegroundColor Green
    }
} else {
    Write-Host "❌ Có lỗi xảy ra!" -ForegroundColor Red
}
