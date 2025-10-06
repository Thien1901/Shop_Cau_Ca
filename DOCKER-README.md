# 🐳 HƯỚNG DẪN NHANH - DOCKER

## ⚡ Cách Chạy Nhanh Nhất

### Windows PowerShell:
```powershell
.\docker-start.ps1
```

### Linux/Mac:
```bash
docker-compose up -d
```

## 📦 Các File Docker

- `Dockerfile` - Build frontend (React + Vite + Nginx)
- `backend/Dockerfile` - Build backend (Node.js + Express)
- `docker-compose.yml` - Orchestration (Frontend + Backend + MongoDB)
- `nginx.conf` - Cấu hình Nginx cho frontend
- `docker-start.ps1` - Script tự động khởi chạy (Windows)
- `docker-stop.ps1` - Script dừng services (Windows)

## 🎯 Truy Cập

| Service | URL |
|---------|-----|
| **Website** | http://localhost:3000 |
| **API** | http://localhost:5000/api |
| **MongoDB** | localhost:27017 |

## 📝 Lệnh Thường Dùng

```powershell
# Khởi động
docker-compose up -d

# Xem logs
docker-compose logs -f

# Seed database
docker exec -it cau-ca-backend npm run seed

# Dừng
docker-compose down

# Dừng + xóa data
docker-compose down -v

# Rebuild
docker-compose up -d --build
```

## 🔧 Troubleshooting

### Port đã được sử dụng?
```powershell
# Kiểm tra port 3000, 5000, 27017
netstat -ano | findstr "3000"
netstat -ano | findstr "5000"
netstat -ano | findstr "27017"
```

### Container lỗi?
```powershell
# Xem logs chi tiết
docker logs cau-ca-frontend
docker logs cau-ca-backend
docker logs cau-ca-mongodb

# Restart container
docker restart cau-ca-backend
```

### Muốn xóa hết và làm lại?
```powershell
docker-compose down -v
docker-compose up -d --build
```

---

📖 **Xem hướng dẫn chi tiết tại: [DOCKER-GUIDE.md](DOCKER-GUIDE.md)**
