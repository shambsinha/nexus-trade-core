# 🚀 Initial Backend Deployment Guide - Render

## 📋 **Complete Step-by-Step Instructions**

### **Step 1: Access Render Dashboard**
1. **Open Browser**: https://render.com
2. **Sign In**: Click "Sign In" → "Continue with GitHub"
3. **Authorize**: Allow Render access to your GitHub account

### **Step 2: Create New Web Service**
1. **Click**: "New +" button (top right)
2. **Select**: "Web Service"
3. **Connect Repository**:
   - Click "Connect Repository"
   - Select "shambsinha/nexus-trade-core"
   - Click "Connect"

### **Step 3: Configure Web Service**
```
Basic Settings:
┌─────────────────────────────────────┐
│ Name: nexus-trade-backend              │
│ Runtime: Docker                        │
│ Instance Type: Free                    │
│ Region: Oregon                         │
│ Branch: main                          │
│ Root Directory: backend                 │
│ Dockerfile Path: ./Dockerfile            │
│ HTTP Port: 8080                       │
│ Health Check Path: /api/v1/auth/login  │
│ Auto-Deploy: ✅ Enabled                 │
└─────────────────────────────────────┘
```

### **Step 4: Add Environment Variables**
```
Add these exact environment variables:
┌─────────────────────────────────────┐
│ DATABASE_URL                           │
│ jdbc:postgresql://ep-little-rain-    │
│ anufkqgy.c-6.us-east-1.aws.neon.  │
│ tech/neondb?sslmode=require            │
├─────────────────────────────────────┤
│ DATABASE_USERNAME                       │
│ neondb_owner                          │
├─────────────────────────────────────┤
│ DATABASE_PASSWORD                       │
│ npg_8msaqdTNXE4r                   │
├─────────────────────────────────────┤
│ JWT_SECRET                           │
│ mySecretKey123456789012345678901234567890 │
├─────────────────────────────────────┤
│ JWT_EXPIRATION_MS                    │
│ 86400000                            │
├─────────────────────────────────────┤
│ SERVER_PORT                          │
│ 8080                                │
└─────────────────────────────────────┘
```

### **Step 5: Deploy**
1. **Click**: "Create Web Service" button
2. **Wait**: 2-3 minutes for build and deployment
3. **Success**: Backend will be live!

## 🎯 **Expected Results**

### **Deployment URL**
```
Backend URL: https://nexus-trade-backend.onrender.com
API Base:   https://nexus-trade-backend.onrender.com/api/v1
Swagger UI:  https://nexus-trade-backend.onrender.com/swagger-ui.html
Health:      https://nexus-trade-backend.onrender.com/api/v1/actuator/health
```

### **Build Process**
```
1. Render pulls from GitHub (main branch)
2. Builds Docker image from backend/Dockerfile
3. Starts container with environment variables
4. Runs health checks
5. Deploys to production URL
```

## 🔍 **Verification Steps**

### **Test Backend Health**
```bash
# Check if backend is running
curl https://nexus-trade-backend.onrender.com/api/v1/actuator/health

# Expected response
{"status":"UP"}
```

### **Test API Endpoints**
```bash
# Test login endpoint
curl -X POST https://nexus-trade-backend.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Expected response (with JWT token)
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "admin",
  "email": null,
  "role": "ADMIN"
}
```

### **Test Swagger Documentation**
1. **Visit**: https://nexus-trade-backend.onrender.com/swagger-ui.html
2. **Verify**: All API endpoints are listed
3. **Test**: Try API calls directly from Swagger UI

## 🔧 **Update Vercel Frontend**

### **Add API URL to Vercel**
1. **Visit**: https://vercel.com/shambsinha
2. **Go to**: nexus-trade-core-frontend → Settings → Environment Variables
3. **Add Variable**:
   - Name: `VITE_API_BASE_URL`
   - Value: `https://nexus-trade-backend.onrender.com/api/v1`
4. **Redeploy**: Vercel will automatically redeploy

### **Test Full Integration**
1. **Visit**: https://nexus-trade-core.vercel.app
2. **Login**: Use admin credentials
   - Username: `admin`
   - Password: `admin123`
3. **Verify**: Dashboard loads with assets

## 🚨 **Troubleshooting**

### **Build Failures**
```
Issue: Docker build fails
Solution: Check backend/Dockerfile
- Verify Java version (17+)
- Check Maven wrapper permissions
- Review build logs in Render dashboard
```

### **Database Connection Issues**
```
Issue: Cannot connect to PostgreSQL
Solution: Verify DATABASE_URL format
- Check Neon database status
- Test connection locally first
- Verify SSL mode is required
```

### **CORS Issues**
```
Issue: Frontend cannot connect to backend
Solution: Update CORS configuration
- Add Vercel domain to allowed origins
- Check preflight OPTIONS requests
- Verify credentials header
```

### **Health Check Failures**
```
Issue: Health check fails
Solution: Check endpoint availability
- Verify /api/v1/auth/login exists
- Check if backend is running on port 8080
- Review application logs
```

## 📊 **Monitoring**

### **Access Logs**
1. **Render Dashboard**: https://dashboard.render.com
2. **Select Service**: nexus-trade-backend
3. **Logs Tab**: Real-time application logs
4. **Metrics Tab**: Performance and usage metrics

### **Set Up Alerts (Optional)**
```yaml
# Add to render.yaml (advanced)
alerts:
  - type: health_check_failed
    threshold: 3
    duration: 5m
  - type: response_time
    threshold: 1000
    duration: 5m
```

## 🔄 **Future Deployments**

### **Automatic Deployments**
After initial setup:
- **Push to main**: Triggers automatic deployment
- **GitHub Actions**: Handles deployment via webhook
- **Zero Downtime**: Rolling updates
- **Rollback**: Available in Render dashboard

### **Manual Deployments**
```bash
# Force deployment from Render dashboard
1. Go to service settings
2. Click "Manual Deploy"
3. Select commit
4. Click "Deploy"
```

## ✅ **Success Checklist**

After deployment, verify:
- [ ] Backend responds to health checks
- [ ] API endpoints are accessible
- [ ] Swagger UI loads correctly
- [ ] Database connections work
- [ ] Frontend can communicate with backend
- [ ] Login functionality works
- [ ] Asset CRUD operations function
- [ ] Admin dashboard accessible

## 🎉 **Production URLs**

```
┌─────────────────────────────────────────┐
│ Frontend: https://nexus-trade-core.vercel.app │
│ Backend:  https://nexus-trade-backend.onrender.com │
│ API:      https://nexus-trade-backend.onrender.com/api/v1 │
│ Docs:     https://nexus-trade-backend.onrender.com/ │
│            swagger-ui.html                      │
│ Health:   https://nexus-trade-backend.onrender.com/ │
│            api/v1/actuator/health                 │
└─────────────────────────────────────────┘
```

---

**🎯 Follow these steps exactly and your NexusTrade Core backend will be live on Render!**

**Total Cost: $0/month (Free tier)** 🚀
