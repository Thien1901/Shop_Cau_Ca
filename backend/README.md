# Câu Cá TV - Backend API

Backend API cho ứng dụng e-commerce Câu Cá TV, xây dựng bằng Node.js, Express, TypeScript và MongoDB.

## 🚀 Tính năng

- ✅ RESTful API cho products, users, orders
- ✅ Authentication với JWT
- ✅ Role-based authorization (Admin/Customer)
- ✅ MongoDB database với Mongoose
- ✅ TypeScript
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Security với Helmet
- ✅ Request logging với Morgan

## 📋 Yêu cầu

- Node.js >= 18.x
- MongoDB >= 6.x (hoặc MongoDB Atlas)
- npm hoặc yarn

## 🛠️ Cài đặt

### 1. Install dependencies

```bash
npm install
```

### 2. Cấu hình môi trường

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật các biến môi trường trong file `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cau-ca-tv
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Khởi động MongoDB

**Option 1: MongoDB cục bộ**
```bash
# Windows (nếu đã cài MongoDB)
net start MongoDB
```

**Option 2: MongoDB Atlas (Cloud)**
- Tạo cluster miễn phí tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Lấy connection string và cập nhật vào `MONGODB_URI`

### 4. Seed database

```bash
npm run seed
```

### 5. Chạy server

**Development mode (với hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Đăng ký user mới | Public |
| POST | `/api/auth/login` | Đăng nhập | Public |
| GET | `/api/auth/me` | Lấy thông tin user hiện tại | Private |

### Products

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Lấy danh sách sản phẩm | Public |
| GET | `/api/products/:id` | Lấy chi tiết sản phẩm | Public |
| GET | `/api/products/categories` | Lấy danh sách categories | Public |
| POST | `/api/products` | Tạo sản phẩm mới | Admin |
| PUT | `/api/products/:id` | Cập nhật sản phẩm | Admin |
| DELETE | `/api/products/:id` | Xóa sản phẩm | Admin |

### Orders

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Tạo đơn hàng | Private |
| GET | `/api/orders` | Lấy đơn hàng của user | Private |
| GET | `/api/orders/:id` | Lấy chi tiết đơn hàng | Private |
| GET | `/api/orders/admin/all` | Lấy tất cả đơn hàng | Admin |
| PUT | `/api/orders/:id/status` | Cập nhật trạng thái đơn hàng | Admin |

## 🔐 Authentication

Sử dụng JWT Bearer token:

```
Authorization: Bearer <your_jwt_token>
```

## 📦 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts    # Auth logic
│   │   ├── productController.ts # Product logic
│   │   └── orderController.ts   # Order logic
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   └── errorHandler.ts      # Error handling
│   ├── models/
│   │   ├── User.ts              # User schema
│   │   ├── Product.ts           # Product schema
│   │   └── Order.ts             # Order schema
│   ├── routes/
│   │   ├── authRoutes.ts        # Auth routes
│   │   ├── productRoutes.ts     # Product routes
│   │   └── orderRoutes.ts       # Order routes
│   ├── scripts/
│   │   └── seed.ts              # Database seeding
│   └── server.ts                # Express app setup
├── .env.example
├── package.json
└── tsconfig.json
```

## 🧪 Testing API

Sử dụng Postman, Thunder Client, hoặc curl:

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@caucatv.com","password":"adminpassword"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

## 🔧 Scripts

- `npm run dev` - Chạy development server với hot reload
- `npm run build` - Build TypeScript sang JavaScript
- `npm start` - Chạy production server
- `npm run seed` - Seed database với dữ liệu mẫu

## 🙏 Default Accounts

**Admin:**
- Email: `admin@caucatv.com`
- Password: `adminpassword`

**Customer:**
- Email: `customer@email.com`
- Password: `password120`

## 📝 License

MIT
