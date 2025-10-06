# 🚀 HƯỚNG DẪN SETUP NHANH - CÂU CÁ TV

## ✅ Các bước thực hiện

### 1️⃣ Cài đặt Backend

```powershell
cd backend
npm install
```

**Tạo file .env:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cau-ca-tv
JWT_SECRET=cau-ca-tv-super-secret-jwt-key-2024-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 2️⃣ Khởi động MongoDB

**Option 1: MongoDB Local (nếu đã cài)**
```powershell
net start MongoDB
```

**Option 2: MongoDB Atlas (Cloud - Miễn phí)**
1. Đăng ký tại: https://www.mongodb.com/cloud/atlas
2. Tạo cluster miễn phí
3. Lấy connection string
4. Cập nhật MONGODB_URI trong .env

### 3️⃣ Seed Database (Tạo dữ liệu mẫu)

```powershell
cd backend
npm run seed
```

Kết quả sẽ thấy:
```
✅ 11 products created
✅ 2 users created
🎉 Database seeded successfully!
```

### 4️⃣ Chạy Backend Server

**Terminal 1:**
```powershell
cd backend
npm run dev
```

Sẽ thấy:
```
🚀 Server running on port 5000
✅ MongoDB connected successfully
```

### 5️⃣ Cài đặt Frontend

**Terminal 2 (mở terminal mới):**
```powershell
npm install
```

**Tạo file .env.local:**
```
GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_URL=http://localhost:5000/api
```

### 6️⃣ Chạy Frontend

```powershell
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

---

## 👤 Tài khoản đăng nhập

**Admin:**
- Email: `admin@caucatv.com`
- Password: `adminpassword`

**Customer:**
- Email: `customer@email.com`
- Password: `password120`

---

## 🔧 Nếu gặp lỗi

### Lỗi: MongoDB connection failed

**Giải pháp:**
- Kiểm tra MongoDB đã chạy: `net start MongoDB`
- Hoặc sử dụng MongoDB Atlas (cloud)

### Lỗi: Port 5000 already in use

**Giải pháp:**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Lỗi: Cannot run scripts PowerShell

**Giải pháp:**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## 📁 Cấu trúc quan trọng

```
câu-cá-tv/
├── backend/
│   ├── src/
│   │   ├── server.ts      # Entry point
│   │   ├── models/        # MongoDB schemas
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API routes
│   │   └── scripts/seed.ts # Database seeding
│   ├── .env              # ⚠️ Cần tạo file này
│   └── package.json
│
├── services/
│   └── api.ts            # Frontend API calls
├── context/
│   └── AppContext.tsx    # State management (đã cập nhật dùng API)
├── .env.local           # ⚠️ Cần tạo file này
└── package.json
```

---

## ✨ Tính năng đã hoàn thành

✅ **Backend API hoàn chỉnh**
- RESTful API với Express
- MongoDB database
- JWT Authentication
- CRUD operations cho Products, Users, Orders

✅ **Frontend đã tích hợp API**
- Thay thế mock data bằng API calls
- Authentication với JWT
- State management với React Context
- Protected routes

✅ **Security**
- Password hashing với bcrypt
- JWT token authentication
- CORS configuration
- Helmet security headers

---

## 🎯 Test API

### Dùng browser hoặc Postman:

**Health Check:**
```
GET http://localhost:5000/health
```

**Login:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@caucatv.com",
  "password": "adminpassword"
}
```

**Get Products:**
```
GET http://localhost:5000/api/products
```

---

## 📊 Database Schema

### Products
```javascript
{
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String (enum),
  rating: Number (0-5),
  stock: Number
}
```

### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'customer' | 'admin'
}
```

### Orders
```javascript
{
  user: ObjectId,
  items: [{ product, quantity, price }],
  totalAmount: Number,
  status: String (enum),
  shippingAddress: Object
}
```

---

**Chúc bạn setup thành công! 🎉**
