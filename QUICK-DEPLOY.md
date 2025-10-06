# 🚀 Quick Deploy Script

## Bước 1: Chuẩn bị MongoDB Atlas
1. Tạo tài khoản tại: https://www.mongodb.com/cloud/atlas/register
2. Tạo FREE cluster (M0 Sandbox)
3. Tạo database user và password
4. Whitelist IP: 0.0.0.0/0 (Allow from anywhere)
5. Copy connection string

## Bước 2: Deploy Backend (Render - FREE)
1. Push code lên GitHub
2. Đăng ký tại: https://render.com
3. New Web Service → Connect GitHub repo
4. Cấu hình:
   - Name: `cau-ca-tv-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables:
     ```
     MONGODB_URI=<your-mongodb-connection-string>
     JWT_SECRET=super-secret-key-12345
     NODE_ENV=production
     PORT=5000
     ```
5. Deploy → Chờ 5-10 phút
6. Copy URL backend: `https://cau-ca-tv-backend.onrender.com`

## Bước 3: Deploy Frontend (Vercel - FREE)
1. Cập nhật `.env.local`:
   ```
   VITE_API_URL=https://cau-ca-tv-backend.onrender.com/api
   ```
2. Push code
3. Đăng ký tại: https://vercel.com
4. New Project → Import GitHub repo
5. Cấu hình:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variable:
     ```
     VITE_API_URL=https://cau-ca-tv-backend.onrender.com/api
     ```
6. Deploy → Chờ 2-3 phút
7. Website: `https://cau-ca-tv.vercel.app`

## Bước 4: Seed Database
1. Vào Render Dashboard → cau-ca-tv-backend
2. Click tab "Shell"
3. Chạy: `npm run seed`

## ✅ XONG! Website đã live! 🎉

---

## Các lệnh cần thiết:

### Push lên GitHub (lần đầu):
```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### Update sau khi sửa code:
```bash
git add .
git commit -m "Update features"
git push
```

→ Vercel và Render sẽ tự động deploy!

---

## ⚠️ LƯU Ý QUAN TRỌNG:

1. **Render FREE** ngủ sau 15 phút không dùng
   - Lần đầu truy cập sẽ chậm 30-60s
   - Giải pháp: Upgrade lên plan trả phí ($7/tháng)

2. **MongoDB Atlas FREE** giới hạn 512MB
   - Đủ cho dự án nhỏ/demo
   - Production nên upgrade

3. **CORS Configuration**
   - Thêm domain Vercel vào CORS trong backend
   - File: `backend/src/server.ts`

4. **Environment Variables**
   - Không commit file `.env` lên GitHub
   - Chỉ commit `.env.example`

---

## 🎯 Khuyến nghị cho Production:

- ✅ Mua domain riêng (~$10/năm)
- ✅ Setup SSL certificate (Vercel/Render tự động)
- ✅ Setup monitoring (UptimeRobot miễn phí)
- ✅ Backup database định kỳ
- ✅ Use CDN cho images (Cloudinary miễn phí)
