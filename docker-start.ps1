# Script khoi chay Docker Compose cho Cau Ca TV
Write-Host "================================" -ForegroundColor Cyan
Write-Host "CAU CA TV - DOCKER LAUNCHER" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Kiem tra Docker
Write-Host "Kiem tra Docker..." -ForegroundColor Yellow
$dockerInstalled = $true
try {
    docker --version | Out-Null
    docker-compose --version | Out-Null
    Write-Host "Docker da cai dat" -ForegroundColor Green
}
catch {
    Write-Host "Docker chua duoc cai dat!" -ForegroundColor Red
    Write-Host "Tai Docker Desktop: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    $dockerInstalled = $false
}

if (-not $dockerInstalled) {
    exit 1
}

Write-Host ""
Write-Host "Bat dau khoi chay services..." -ForegroundColor Yellow
Write-Host ""

# Dung cac container cu (neu co)
Write-Host "Dung containers cu..." -ForegroundColor Yellow
docker-compose down 2>$null

# Build va chay
Write-Host "Build va khoi dong containers..." -ForegroundColor Yellow
docker-compose up -d --build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "KHOI DONG THANH CONG!" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "CAC DICH VU DANG CHAY:" -ForegroundColor Cyan
    Write-Host "   Frontend:  http://localhost:3000" -ForegroundColor White
    Write-Host "   Backend:   http://localhost:5000/api" -ForegroundColor White
    Write-Host "   MongoDB:   localhost:27017" -ForegroundColor White
    Write-Host ""
    Write-Host "HUONG DAN:" -ForegroundColor Cyan
    Write-Host "   Xem logs:      docker-compose logs -f" -ForegroundColor White
    Write-Host "   Dung services: docker-compose down" -ForegroundColor White
    Write-Host "   Seed database: docker exec -it cau-ca-backend npm run seed" -ForegroundColor White
    Write-Host ""
    
    # Hoi co muon seed database khong
    $seed = Read-Host "Ban co muon seed database voi 50 san pham? (y/n)"
    if ($seed -eq 'y' -or $seed -eq 'Y') {
        Write-Host ""
        Write-Host "Dang seed database..." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        docker exec -it cau-ca-backend npm run seed
        Write-Host "Seed hoan tat!" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "Mo trinh duyet..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3000"
}
else {
    Write-Host ""
    Write-Host "KHOI DONG THAT BAI!" -ForegroundColor Red
    Write-Host "Xem logs: docker-compose logs" -ForegroundColor Yellow
}
