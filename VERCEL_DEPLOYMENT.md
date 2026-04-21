# 🚀 Vercel Deployment Guide - NexusTrade Core

## 📋 Overview

Deploy NexusTrade Core to Vercel for **FREE frontend hosting** with backend proxy integration.

## 🎯 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel      │    │   Free Backend  │    │   Database      │
│   Frontend    │◄──►│   (Render/     │◄──►│   (Neon/      │
│   (React)     │    │   Railway)     │    │   Supabase)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Frontend Deployment (Vercel)

### **Step 1: Install Vercel CLI**
```bash
# Install globally
npm i -g vercel

# Login to Vercel
vercel login
```

### **Step 2: Deploy Frontend**
```bash
# Navigate to frontend
cd frontend

# Deploy to Vercel
vercel --prod

# Follow prompts:
# ? Set up and deploy "~/nexus-trade-core/frontend"? [Y/n] y
# ? Which scope do you want to deploy to? shambsinha
# ? Link to existing project? [y/N] n
# ? What's your project's name? nexus-trade-core
# ? In which directory is your code located? ./
```

### **Step 3: Configure Environment Variables**
```bash
# Set backend URL in Vercel dashboard
# Visit: https://vercel.com/shambsinha/nexus-trade-core/settings/environment-variables

# Add environment variable:
VITE_API_BASE_URL=https://your-backend-domain.com/api/v1
```

## 🆓 Free Backend Hosting Options

### **Option 1: Render (Recommended)**
```bash
# 1. Create Render account
# Visit: https://render.com

# 2. Create Web Service
# Service Type: Web Service
# Name: nexus-trade-backend
# Runtime: Docker
# Instance Type: Free

# 3. Connect GitHub
# Connect your nexus-trade-core repository

# 4. Environment Variables
DATABASE_URL=postgresql://user:password@host:5432/db
JWT_SECRET=your-jwt-secret
SERVER_PORT=8080

# 5. Deploy URL
# https://nexus-trade-backend.onrender.com
```

### **Option 2: Railway**
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Deploy backend
cd backend
railway up

# 4. Set environment variables
railway variables set DATABASE_URL="postgresql://..."
railway variables set JWT_SECRET="your-jwt-secret"
```

### **Option 3: Supabase (Database + Backend)**
```bash
# 1. Create Supabase project
# Visit: https://supabase.com

# 2. Get connection details
# Project Settings > Database > Connection string

# 3. Update backend environment
DATABASE_URL=postgresql://[user]:[password]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
JWT_SECRET=your-jwt-secret
```

### **Option 4: Fly.io**
```bash
# 1. Install Fly CLI
curl -L https://fly.io/install.sh | sh

# 2. Login
fly auth login

# 3. Deploy
cd backend
fly launch

# 4. Set secrets
fly secrets set DATABASE_URL="postgresql://..."
fly secrets set JWT_SECRET="your-jwt-secret"
```

## 🔧 Vercel Configuration Details

### **vercel.json Explanation**
```json
{
  "framework": "vite",           // Vite build system
  "buildCommand": "npm run build",  // Build command
  "outputDirectory": "dist",         // Build output
  "rewrites": [                     // API proxy rules
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "functions": {                    // Serverless functions
    "api/index.js": {
      "runtime": "@vercel/node"
    }
  }
}
```

### **API Proxy Function**
```javascript
// api/index.js - Routes API requests to backend
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Proxy /api/* to your backend
app.use('/api', createProxyMiddleware({
  target: process.env.BACKEND_URL,
  changeOrigin: true,
  pathRewrite: { '^/api': '/api/v1' }
}));
```

### **Environment Variables Setup**
```bash
# Vercel Environment Variables
VITE_API_BASE_URL=https://your-backend-domain.com/api/v1
BACKEND_URL=https://your-backend-domain.com
ALLOWED_ORIGINS=https://your-domain.vercel.app,https://localhost:3000
```

## 🌐 Complete Setup

### **Production URLs**
```
Frontend: https://nexus-trade-core.vercel.app
Backend API: https://your-backend-domain.onrender.com/api/v1
API Docs: https://your-backend-domain.onrender.com/api/v1/swagger-ui.html
Health Check: https://your-backend-domain.onrender.com/api/v1/actuator/health
```

### **CORS Configuration**
```yaml
# Backend application.yml for production
spring:
  web:
    cors:
      allowed-origins: 
        - https://nexus-trade-core.vercel.app
        - https://your-domain.com
      allowed-methods: GET,POST,PUT,DELETE,OPTIONS
      allowed-headers: '*'
      allow-credentials: true
```

## 🔍 Testing Deployment

### **Frontend Tests**
```bash
# Test Vercel deployment
curl https://nexus-trade-core.vercel.app

# Test API proxy
curl https://nexus-trade-core.vercel.app/api/auth/login

# Test with data
curl -X POST https://nexus-trade-core.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

### **Backend Tests**
```bash
# Test backend health
curl https://your-backend-domain.onrender.com/actuator/health

# Test API endpoints
curl https://your-backend-domain.onrender.com/api/v1/auth/register
curl https://your-backend-domain.onrender.com/api/v1/assets
```

## 📊 Monitoring & Analytics

### **Vercel Analytics**
- Visit: https://vercel.com/shambsinha/nexus-trade-core/analytics
- Real-time metrics
- Performance insights
- Error tracking

### **Backend Monitoring**
```bash
# Render logs
# Dashboard: https://dashboard.render.com/web/services/nexus-trade-backend/logs

# Railway logs
railway logs

# Fly logs
fly logs
```

## 🔄 CI/CD Automation

### **Vercel + GitHub Actions**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

## 🚨 Troubleshooting

### **Common Issues**
```bash
# CORS errors
# Check allowed origins in backend
# Verify Vercel environment variables

# API proxy not working
# Check api/index.js function
# Verify BACKEND_URL environment variable

# Build failures
# Check vercel.json configuration
# Review build logs in Vercel dashboard

# Database connection issues
# Verify DATABASE_URL format
# Check database service status
```

### **Performance Optimization**
```javascript
// Vercel Edge Functions optimization
export const config = {
  runtime: 'edge',
  regions: ['iad1'], // US East
  maxDuration: 30 // seconds
};
```

## 💰 Cost Analysis

### **FREE Tier Limits**
```
Vercel: 100GB bandwidth/month
Render: 750 hours/month (free tier)
Railway: $5 credit/month
Supabase: 500MB database
Fly.io: 160GB shared CPU/month
```

### **Recommended Setup**
- **Frontend**: Vercel (FREE)
- **Backend**: Render (FREE tier)
- **Database**: Neon PostgreSQL (FREE tier)

**Total Monthly Cost: $0** 🎉

## 📞 Support

### **Useful Links**
- Vercel Dashboard: https://vercel.com/dashboard
- Render Dashboard: https://dashboard.render.com
- Railway Dashboard: https://railway.app/dashboard
- Documentation: https://vercel.com/docs

### **Emergency Rollback**
```bash
# Vercel rollback
vercel rollback --to [deployment-id]

# Render rollback
# Use GitHub revert or redeploy specific commit
```

---

**🎯 Your NexusTrade Core is now ready for FREE production deployment!**

This setup demonstrates:
- ✅ **Cloud Architecture**: Multi-platform deployment knowledge
- ✅ **Cost Optimization**: Free tier utilization
- ✅ **DevOps Excellence**: CI/CD and automation
- ✅ **Production Mindset**: Monitoring and troubleshooting
