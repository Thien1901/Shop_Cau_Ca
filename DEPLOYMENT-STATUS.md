# 🌐 Câu Cá TV - Deployment URLs

## 🔗 Production URLs (sau khi deploy)

### Frontend (Vercel)
- **URL**: https://cau-ca-tv.vercel.app
- **Status**: 🔴 Not deployed yet

### Backend API (Render)
- **URL**: https://cau-ca-tv-backend.onrender.com
- **API Base**: https://cau-ca-tv-backend.onrender.com/api
- **Status**: 🔴 Not deployed yet

### Database (MongoDB Atlas)
- **Connection**: Configured via environment variables
- **Status**: 🔴 Not configured yet

---

## 📝 Deployment Checklist

### ✅ Pre-deployment
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database user and password created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Connection string obtained

### ✅ Backend Deployment (Render)
- [ ] Render account created
- [ ] Web service created and connected to GitHub
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] Database seeded
- [ ] API endpoints tested

### ✅ Frontend Deployment (Vercel)
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] Website accessible
- [ ] API connection working

---

## 🔧 Configuration

### Environment Variables

**Backend (Render):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cau-ca-tv
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=5000
```

**Frontend (Vercel):**
```
VITE_API_URL=https://cau-ca-tv-backend.onrender.com/api
```

---

## 🧪 Testing URLs

After deployment, test these endpoints:

### Backend
- `GET /api/products` - Get all products
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Frontend
- `/` - Home page
- `/products` - Products page
- `/login` - Login page
- `/register` - Register page
- `/cart` - Cart page
- `/checkout` - Checkout page

---

## 📊 Deployment Status

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Frontend | Vercel | 🔴 Not deployed | - |
| Backend | Render | 🔴 Not deployed | - |
| Database | MongoDB Atlas | 🔴 Not configured | - |

**Last Updated**: Never deployed

---

## 🆘 Support

If you encounter issues:
1. Check logs in Render/Vercel dashboard
2. Verify environment variables
3. Test MongoDB connection
4. Check CORS settings

---

## 📅 Deployment History

- **Initial Setup**: Not deployed yet
- **Latest Deploy**: N/A

---

**Ready to deploy? Follow QUICK-DEPLOY.md!** 🚀
