# 🎯 BẮT ĐẦU NHANH - 3 BƯỚC ĐƠN GIẢN

## ⚡ TÓM TẮT CỰC NGẮN

```powershell
# Bước 1: Setup (chỉ chạy 1 lần)
.\setup.ps1

# Bước 2: Start app (mỗi lần chạy)
.\start.ps1

# Bước 3: Mở browser
http://localhost:3000
```

Xong! 🎉

---

## 📖 CHI TIẾT TỪNG BƯỚC

### Bước 1: Setup lần đầu

```powershell
# Chạy script setup tự động
.\setup.ps1
```

Script này sẽ:
- ✅ Kiểm tra MongoDB
- ✅ Install dependencies
- ✅ Tạo .env files
- ✅ Seed database (nếu bạn chọn Y)

---

### Bước 2: Khởi động ứng dụng

```powershell
# Chạy script start - Mở 2 terminals tự động
.\start.ps1
```

Hoặc manual:

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
npm run dev
```

---

### Bước 3: Truy cập

🌐 **Frontend:** http://localhost:3000  
📡 **Backend API:** http://localhost:5000/api

---

## 👤 ĐĂNG NHẬP

**Admin:**
- Email: `admin@caucatv.com`
- Password: `adminpassword`

**Customer:**
- Email: `customer@email.com`
- Password: `password120`

---

## 🐛 NẾU GẶP LỖI

### ❌ MongoDB connection error

**Giải pháp:**
```powershell
# Khởi động MongoDB
net start MongoDB
```

Hoặc dùng **MongoDB Atlas** (cloud - miễn phí):
1. Đăng ký tại: https://www.mongodb.com/cloud/atlas
2. Lấy connection string
3. Cập nhật trong `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cau-ca-tv
   ```

---

### ❌ PowerShell script error

```powershell
# Cho phép chạy scripts
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

### ❌ Port already in use

**Backend (port 5000):**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Frontend (port 3000):**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📚 THÊM THÔNG TIN

- 📋 [PROJECT-SUMMARY.md](PROJECT-SUMMARY.md) - Tổng quan dự án
- ✅ [CHECKLIST.md](CHECKLIST.md) - Tính năng đã hoàn thành
- 📖 [SETUP-GUIDE.md](SETUP-GUIDE.md) - Hướng dẫn chi tiết
- 🔧 [backend/README.md](backend/README.md) - API documentation

---

## 🎯 NEXT STEPS

1. ✅ Chạy app và test các tính năng
2. ✅ Đăng nhập với tài khoản admin
3. ✅ Thử thêm/sửa/xóa sản phẩm
4. ✅ Đăng ký tài khoản mới
5. ✅ Thêm sản phẩm vào giỏ hàng
6. ✅ Checkout

---

## 💡 TIPS

### Xem logs

**Backend logs:** Terminal running `npm run dev` in backend/  
**Frontend logs:** Terminal running `npm run dev` in root/  
**Browser console:** F12 → Console tab

### Restart servers

**Ctrl+C** trong terminal để stop, rồi chạy lại `npm run dev`

### Reset database

```powershell
cd backend
npm run seed
```

---

## 🎉 CHÚC MỪNG!

Bạn đã có một ứng dụng e-commerce full-stack hoàn chỉnh!

**Stack:**
- ✅ React 19 + TypeScript
- ✅ Node.js + Express
- ✅ MongoDB + Mongoose
- ✅ JWT Authentication
- ✅ RESTful API

**Happy Coding! 🚀**
