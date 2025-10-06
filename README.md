# 🎣 Câu Cá TV - E-Commerce Application

Ứng dụng thương mại điện tử bán dụng cụ câu cá, được xây dựng với **React + TypeScript + Node.js + MongoDB**.

## 📦 Cấu trúc dự án

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT
- **AI**: Google Gemini AI

## 🚀 Hướng dẫn cài đặt

### Yêu cầu
- Node.js >= 18.x
- MongoDB >= 6.x

### Bước 1: Cài đặt Backend

```bash
cd backend
npm install
cp .env.example .env
# Chỉnh sửa .env với MongoDB URI của bạn
npm run seed   # Seed database
npm run dev    # Chạy backend (port 5000)
```

### Bước 2: Cài đặt Frontend

```bash
# Từ thư mục root
npm install
cp .env.local.example .env.local
# Cập nhật VITE_API_URL=http://localhost:5000/api
npm run dev    # Chạy frontend (port 3000)
```

## 👤 Tài khoản mặc định

**Admin**: admin@caucatv.com / adminpassword  
**Customer**: customer@email.com / password120

## 📚 Chi tiết

Xem [backend/README.md](backend/README.md) để biết thêm API documentation.
