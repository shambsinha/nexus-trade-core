# 🚀 NexusTrade Core - Deployment Guide

## 📋 Deployment Options

### **Option 1: Docker Compose (Recommended for Development)**
```bash
# Clone repository
git clone https://github.com/shambsinha/nexus-trade-core.git
cd nexus-trade-core

# Set up production environment
cp .env.production .env
# Edit .env with your actual values

# Deploy all services
docker-compose up -d

# Check status
docker-compose ps
```

### **Option 2: Manual Docker Deployment**
```bash
# Build backend
cd backend
docker build -t nexus-trade-backend .

# Build frontend
cd ../frontend
docker build -t nexus-trade-frontend .

# Run with production environment
docker run -d \
  --name nexus-trade-backend \
  -p 8080:8080 \
  --env-file .env \
  nexus-trade-backend

docker run -d \
  --name nexus-trade-frontend \
  -p 3000:80 \
  --env VITE_API_BASE_URL=https://your-api-domain.com/api/v1 \
  nexus-trade-frontend
```

### **Option 3: Cloud Platform Deployment**

#### **AWS ECS + RDS**
```bash
# 1. Create ECS Cluster
aws ecs create-cluster --cluster-name nexus-trade

# 2. Create RDS PostgreSQL
aws rds create-db-instance \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username nexus_user \
  --master-user-password YOUR_PASSWORD \
  --allocated-storage 20

# 3. Deploy using Docker Compose
ecs-cli compose --project-name nexus-trade up
```

#### **Google Cloud Run + Cloud SQL**
```bash
# 1. Enable APIs
gcloud services enable run.googleapis.com
gcloud services enable sql-component.googleapis.com

# 2. Create Cloud SQL instance
gcloud sql instances create nexus-trade-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1

# 3. Deploy to Cloud Run
gcloud run deploy nexus-trade-backend \
  --image gcr.io/PROJECT_ID/nexus-trade-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

gcloud run deploy nexus-trade-frontend \
  --image gcr.io/PROJECT_ID/nexus-trade-frontend \
  --platform managed \
  --region us-central1
```

#### **Azure Container Instances + Azure Database**
```bash
# 1. Create Resource Group
az group create --name nexus-trade --location eastus

# 2. Create PostgreSQL
az postgres server create \
  --name nexus-trade-db \
  --resource-group nexus-trade \
  --location eastus \
  --admin-user nexus_user \
  --admin-password YOUR_PASSWORD

# 3. Deploy Container Instances
az container create \
  --resource-group nexus-trade \
  --name nexus-trade-backend \
  --image nexus-trade-backend:latest \
  --cpu 1 --memory 2

az container create \
  --resource-group nexus-trade \
  --name nexus-trade-frontend \
  --image nexus-trade-frontend:latest \
  --cpu 1 --memory 1
```

## 🔧 Production Configuration

### **Environment Variables**
```bash
# Critical production variables
DATABASE_URL=jdbc:postgresql://your-db-host:5432/nexus_trade
DATABASE_USERNAME=nexus_user
DATABASE_PASSWORD=your-secure-password
JWT_SECRET=your-256-bit-jwt-secret
POSTGRES_PASSWORD=your-postgres-password
REDIS_PASSWORD=your-redis-password
```

### **SSL/HTTPS Setup**
```bash
# 1. Obtain SSL certificate (Let's Encrypt recommended)
certbot certonly --standalone -d your-domain.com

# 2. Configure nginx with SSL
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://backend:8080;
        # SSL headers
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🔍 Health Monitoring

### **Application Health Checks**
```bash
# Backend health
curl https://api.your-domain.com/api/v1/auth/login

# Frontend health
curl https://your-domain.com

# Database health
docker exec nexus-trade-db pg_isready -U nexus_user -d nexus_trade
```

### **Monitoring Setup**
```yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    ports: ["9090:9090"]
    
  grafana:
    image: grafana/grafana
    ports: ["3001:3000"]
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
```

## 📊 Scaling Configuration

### **Horizontal Scaling**
```yaml
# docker-compose.scale.yml
version: '3.8'
services:
  backend:
    deploy:
      replicas: 3
    environment:
      - DATABASE_URL=postgresql://postgres:5432/nexus_trade
      
  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    volumes: ["./nginx.conf:/etc/nginx/nginx.conf"]
```

### **Load Balancer Setup**
```bash
# Nginx load balancer
upstream backend_servers {
    server backend1:8080;
    server backend2:8080;
    server backend3:8080;
}

server {
    listen 80;
    location /api/ {
        proxy_pass http://backend_servers;
    }
}
```

## 🔐 Production Security

### **Security Headers**
```nginx
server {
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

### **Firewall Rules**
```bash
# UFW setup
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

## 🚨 Troubleshooting

### **Common Issues**
```bash
# Database connection issues
docker logs nexus-trade-db

# Backend startup issues
docker logs nexus-trade-backend

# Frontend build issues
docker logs nexus-trade-frontend

# Port conflicts
netstat -tulpn | grep :8080
netstat -tulpn | grep :3000
```

### **Performance Optimization**
```bash
# Database optimization
ALTER DATABASE nexus_trade SET shared_buffers = '256MB';
ALTER DATABASE nexus_trade SET effective_cache_size = '1GB';

# Application optimization
java -Xmx1g -Xms512m -jar nexus-trade-core.jar
```

## 📞 Support

### **Monitoring URLs**
- **Backend API**: https://api.your-domain.com/swagger-ui.html
- **Frontend**: https://your-domain.com
- **Health Check**: https://api.your-domain.com/actuator/health

### **Backup Strategy**
```bash
# Database backup
docker exec nexus-trade-db pg_dump -U nexus_user nexus_trade > backup.sql

# Application backup
docker save nexus-trade-backend > nexus-trade-backup.tar
```

---

**🎯 Deployment Checklist:**
- [ ] Environment variables configured
- [ ] SSL certificates obtained
- [ ] Database backup strategy in place
- [ ] Monitoring configured
- [ ] Load balancer set up (for scaling)
- [ ] Security headers configured
- [ ] Health checks implemented
- [ ] Backup automation configured
