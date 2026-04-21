# 🚀 NexusTrade Core - Deployment Guide

This guide covers deployment of NexusTrade Core to **Vercel** (frontend) and **Render** (backend) using free tiers.

## 📋 Prerequisites

### Required Accounts
- **GitHub Account**: https://github.com
- **Vercel Account**: https://vercel.com
- **Render Account**: https://render.com

### Required Tools
- **Git**: For version control
- **Node.js 18+**: For frontend deployment
- **Maven**: For backend building

## 🔧 Environment Setup

### Step 1: Copy Environment Variables
```bash
# Copy production environment template
cp .env.production .env

# Update with your actual values:
# - DATABASE_PASSWORD: Your Render PostgreSQL password
# - JWT_SECRET: Your JWT secret (min 32 characters)
```

### Step 2: Update Backend Configuration
```bash
# Update application.properties for production
# The backend will use Render's PostgreSQL database
# JWT secret and database URL will be injected via environment variables
```

## 🌐 Frontend Deployment (Vercel)

### Step 3: Deploy Frontend to Vercel
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

### Vercel Configuration
- **Framework**: Vite (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**: Set in Vercel dashboard
  ```
  VITE_API_BASE_URL=https://nexus-trade-core-backend.onrender.com/api/v1
  ```

### Vercel Dashboard Setup
1. **Login**: https://vercel.com
2. **Add Project**: "nexus-trade-core-frontend"
3. **Connect Repository**: `shambsinha/nexus-trade-core`
4. **Set Root Directory**: `frontend`
5. **Add Environment Variable**:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://nexus-trade-core-backend.onrender.com/api/v1`
   - **Environment**: Production

## 🖥️ Backend Deployment (Render)

### Step 4: Connect to Neon PostgreSQL Database
1. **Login**: https://neon.tech (or use your existing account)
2. **Get Connection Details**:
   - **Database**: `neondb` (already created)
   - **Connection String**: Available in Neon dashboard
   - **Username**: `neondb_owner` (default)
   - **Password**: Your existing Neon password
3. **Connection URL**:
   ```
   jdbc:postgresql://ep-little-rain-anufkqgy.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

### Step 5: Deploy Backend to Render
1. **Create New Web Service**:
   - **Name**: `nexus-trade-core-backend`
   - **Repository**: `shambsinha/nexus-trade-core`
   - **Root Directory**: `backend`
   - **Runtime**: Docker
   - **Plan**: Free
   - **Region**: Oregon
   - **Branch**: `main`

2. **Configure Environment Variables**:
   ```
   DATABASE_URL=jdbc:postgresql://dpg-cv9l8n7jm2s3f8g5a0.oregon-postgres.render.com:5432/nexustrade_prod
   DATABASE_USERNAME=nexustrade_user
   DATABASE_PASSWORD=your_actual_database_password
   JWT_SECRET=your_actual_jwt_secret_32_characters_min
   SERVER_PORT=8080
   ```

3. **Health Check**:
   - **Path**: `/api/v1/actuator/health`
   - **Auto-Deploy**: Enabled on main branch push

## 🔄 CI/CD Automation

### GitHub Integration
- **Vercel**: Auto-deploy on push to `main` branch
- **Render**: Auto-deploy on push to `main` branch
- **Webhook**: Automatic deployment via GitHub integration

## 🌍 Production URLs

After successful deployment:

### Frontend (Vercel)
```
https://nexus-trade-core-frontend.vercel.app
```

### Backend (Render)
```
https://nexus-trade-core-backend.onrender.com
```

### API Endpoints
```
Authentication: https://nexus-trade-core-backend.onrender.com/api/v1/auth
Assets: https://nexus-trade-core-backend.onrender.com/api/v1/assets
Health: https://nexus-trade-core-backend.onrender.com/api/v1/actuator/health
Swagger: https://nexus-trade-core-backend.onrender.com/swagger-ui.html
```

### Database Connection
```
Neon PostgreSQL: ep-little-rain-anufkqgy.c-6.us-east-1.aws.neon.tech
Database: neondb
Username: neondb_owner
```

## 🧪 Testing Deployment

### Frontend Tests
```bash
# Test frontend
curl https://nexus-trade-core-frontend.vercel.app
```

### Backend Tests
```bash
# Test health endpoint
curl https://nexus-trade-core-backend.onrender.com/api/v1/actuator/health

# Test authentication
curl -X POST https://nexus-trade-core-backend.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## 🔧 Troubleshooting

### Common Issues

#### Frontend Deployment Issues
- **Build Failures**: Check `package.json` scripts
- **Environment Variables**: Verify Vercel dashboard settings
- **CORS Issues**: Ensure backend allows frontend origin

#### Backend Deployment Issues
- **Database Connection**: Verify PostgreSQL credentials
- **Port Conflicts**: Ensure port 8080 is available
- **Memory Issues**: Check Render free tier limits

#### Environment Variable Issues
- **JWT Secret**: Must be at least 32 characters
- **Database URL**: Verify connection string format
- **Case Sensitivity**: Environment variables are case-sensitive

### Debug Commands
```bash
# Check Vercel logs
vercel logs

# Check Render logs
# View in Render dashboard under Logs tab

# Test database connection
curl https://nexus-trade-core-backend.onrender.com/api/v1/actuator/health
```

## 📊 Monitoring

### Vercel Monitoring
- **Analytics**: Built-in Vercel analytics
- **Logs**: Real-time deployment logs
- **Performance**: Web Vitals tracking

### Render Monitoring
- **Metrics**: Resource usage dashboard
- **Logs**: Application and system logs
- **Health Checks**: Automated monitoring
- **Alerts**: Email notifications on failures

## 💰 Cost Summary

### Free Tier Limits
- **Vercel**: 100GB bandwidth/month
- **Render**: 750 hours/month
- **PostgreSQL**: 256MB storage limit

### Upgrade Considerations
- **Vercel Pro**: $20/month for additional features
- **Render Starter**: $7/month for more resources
- **Database Scaling**: Based on usage

---

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] GitHub repository is up to date
- [ ] Environment variables configured
- [ ] Local testing completed
- [ ] Database schema verified

### Post-Deployment
- [ ] Frontend accessible at Vercel URL
- [ ] Backend accessible at Render URL
- [ ] Health checks passing
- [ ] API endpoints responding
- [ ] Authentication working
- [ ] CORS properly configured

### Security Verification
- [ ] HTTPS certificates valid
- [ ] Environment variables not exposed
- [ ] Database connection secure
- [ ] JWT tokens working correctly

---

**🚀 Your NexusTrade Core is now ready for production deployment!**
