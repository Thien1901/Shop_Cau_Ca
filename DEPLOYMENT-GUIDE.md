# 🚀 Hướng Dẫn Đưa Web Lên Hosting

## 📋 Tổng Quan

Dự án này bao gồm:
- **Frontend**: React + Vite (cần build thành static files)
- **Backend**: Node.js + Express + MongoDB (cần server)
- **Database**: MongoDB (cần cloud database)

## 🎯 Các Phương Án Hosting

### ✅ PHƯƠNG ÁN 1: VERCEL (Frontend) + RENDER (Backend) - MIỄN PHÍ ⭐

#### Bước 1: Chuẩn bị Database - MongoDB Atlas (MIỄN PHÍ)

1. **Tạo tài khoản MongoDB Atlas**
   - Truy cập: https://www.mongodb.com/cloud/atlas/register
   - Đăng ký tài khoản miễn phí

2. **Tạo Cluster**
   - Chọn "Create a New Cluster"
   - Chọn "M0 Sandbox" (FREE)
   - Chọn region gần Việt Nam (Singapore)
   - Click "Create Cluster"

3. **Tạo Database User**
   - Vào "Database Access" → "Add New Database User"
   - Username: `admin`
   - Password: Tạo mật khẩu mạnh (lưu lại)
   - Chọn "Built-in Role": Read and write to any database

4. **Cho phép kết nối từ mọi nơi**
   - Vào "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Lấy Connection String**
   - Vào "Database" → Click "Connect"
   - Chọn "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Thay `<password>` bằng mật khẩu thật

---

#### Bước 2: Deploy Backend lên Render (MIỄN PHÍ)

1. **Push code lên GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/cau-ca-tv.git
   git push -u origin main
   ```

2. **Tạo tài khoản Render**
   - Truy cập: https://render.com/
   - Sign up with GitHub

3. **Tạo Web Service mới**
   - Click "New +" → "Web Service"
   - Connect GitHub repository của bạn
   - Chọn repo `cau-ca-tv`

4. **Cấu hình Web Service**
   ```
   Name: cau-ca-tv-backend
   Region: Singapore
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Thêm Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   ```
   MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/cau-ca-tv?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=production
   PORT=5000
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Đợi 5-10 phút để deploy
   - Lấy URL backend: `https://cau-ca-tv-backend.onrender.com`

7. **Seed Database**
   - Sau khi deploy xong, vào "Shell" tab
   - Chạy: `npm run seed`

---

#### Bước 3: Deploy Frontend lên Vercel (MIỄN PHÍ)

1. **Cập nhật API URL trong code**
   
   Sửa file `.env.local`:
   ```
   VITE_API_URL=https://cau-ca-tv-backend.onrender.com/api
   ```

2. **Tạo file vercel.json** (nếu chưa có)
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

3. **Push code lên GitHub**
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

4. **Deploy lên Vercel**
   - Truy cập: https://vercel.com/
   - Sign up with GitHub
   - Click "New Project"
   - Import repo GitHub của bạn
   - Configure:
     ```
     Framework Preset: Vite
     Root Directory: ./
     Build Command: npm run build
     Output Directory: dist
     Install Command: npm install
     ```

5. **Thêm Environment Variables**
   ```
   VITE_API_URL=https://cau-ca-tv-backend.onrender.com/api
   ```

6. **Deploy**
   - Click "Deploy"
   - Đợi 2-3 phút
   - Website của bạn: `https://cau-ca-tv.vercel.app`

---

### ✅ PHƯƠNG ÁN 2: NETLIFY (Frontend + Serverless Functions)

#### Bước 1: Chuẩn bị
- Tạo MongoDB Atlas (như Phương án 1)
- Push code lên GitHub

#### Bước 2: Deploy lên Netlify
1. Truy cập: https://www.netlify.com/
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Chọn repo GitHub
5. Configure:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
6. Environment Variables:
   ```
   VITE_API_URL=https://cau-ca-tv.netlify.app/.netlify/functions
   ```

**Lưu ý**: Backend cần chuyển sang Netlify Functions (phức tạp hơn)

---

### ✅ PHƯƠNG ÁN 3: HOSTING VIỆT NAM (Trả phí)

#### Các nhà cung cấp:
- **Hostinger VN**: ~50.000 VNĐ/tháng
- **Tino Host**: ~30.000 VNĐ/tháng
- **BKNS**: ~40.000 VNĐ/tháng

#### Yêu cầu:
- VPS hoặc Hosting hỗ trợ Node.js
- MongoDB (cài đặt trên VPS hoặc dùng MongoDB Atlas)
- Domain (tùy chọn)

#### Các bước:
1. Thuê VPS/Hosting
2. Cài đặt Node.js, MongoDB (hoặc dùng Atlas)
3. Upload code qua FTP/SSH
4. Chạy `npm install` và `npm run build`
5. Setup Nginx/Apache reverse proxy
6. Chạy PM2 để keep server alive

---

## 📝 Chuẩn Bị Trước Khi Deploy

### 1. Tạo file `.env.production` trong thư mục backend:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cau-ca-tv
JWT_SECRET=your-production-secret-key
NODE_ENV=production
PORT=5000
```

### 2. Cập nhật `package.json` trong backend:
```json
{
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "dev": "tsx watch src/server.ts",
    "seed": "tsx src/scripts/seed.ts"
  }
}
```

### 3. Thêm TypeScript build cho backend
```bash
cd backend
npm install --save-dev typescript @types/node
npx tsc --init
```

Sửa `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 4. Build frontend
```bash
npm run build
```
→ Tạo folder `dist` chứa static files

---

## 🔧 Script Hỗ Trợ

### Build toàn bộ dự án:
```bash
# Build frontend
npm run build

# Build backend
cd backend
npm run build
```

### Test local trước khi deploy:
```bash
# Backend
cd backend
npm start

# Frontend (serve static)
npx serve -s dist -p 3000
```

---

## ✅ CHECKLIST TRƯỚC KHI DEPLOY

- [ ] MongoDB Atlas đã tạo và lấy connection string
- [ ] Backend code đã push lên GitHub
- [ ] Frontend đã cập nhật API URL
- [ ] Environment variables đã thiết lập đúng
- [ ] Database đã seed dữ liệu mẫu
- [ ] Test local chạy OK
- [ ] CORS đã cấu hình cho production domain

---

## 🎯 Khuyến Nghị

**Cho người mới/Dự án nhỏ:**
→ **Dùng Phương án 1** (Vercel + Render + MongoDB Atlas)
- ✅ Hoàn toàn MIỄN PHÍ
- ✅ Dễ dàng deploy
- ✅ Auto deploy khi push code
- ✅ SSL miễn phí
- ✅ CDN toàn cầu

**Cho dự án thương mại:**
→ Hosting VPS Việt Nam + MongoDB Atlas
- ✅ Kiểm soát hoàn toàn
- ✅ Performance tốt cho người dùng VN
- ⚠️ Cần kiến thức DevOps

---

## 🆘 Troubleshooting

### Lỗi CORS:
Sửa `backend/src/server.ts`:
```typescript
app.use(cors({
  origin: ['https://cau-ca-tv.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### Lỗi MongoDB connection:
- Kiểm tra IP whitelist trên MongoDB Atlas
- Kiểm tra username/password
- Kiểm tra connection string

### Lỗi 404 trên Vercel:
- Đảm bảo có file `vercel.json` với rewrites
- Đảm bảo React Router đang dùng BrowserRouter

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề, liên hệ:
- GitHub Issues
- Email support
- Discord community

---

**Chúc bạn deploy thành công! 🚀**
