# Cyclic Deployment Setup Guide

## 🌀 Cyclic.sh Deployment Steps

### 1. **Create Cyclic Account**
- Go to [cyclic.sh](https://cyclic.sh)
- **Sign in with GitHub** (free, no card needed)
- Authorize Cyclic to access your repositories

### 2. **Deploy Backend Application**

#### **Connect Repository:**
1. Dashboard → **"Link Your Own"**
2. Select: **tudungsaji** repository  
3. **Root Directory**: `BE_tudungsaji`
4. **Branch**: `main`
5. Click **"Link Repo"**

#### **Configure Deployment:**
```yaml
Build Command: npm install
Start Command: npm start
Environment: Node.js
Port: 3000 (auto-detected)
```

### 3. **Environment Variables Setup**
In Cyclic dashboard → Environment → Add variables:

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-connection-string
PORT=3000
# Add any other environment variables from .env
```

### 4. **Automatic Deployment**
✅ Cyclic auto-deploys on every push to `main` branch  
✅ No manual deployment needed  
✅ Webhook integration with GitHub  

### 5. **Get Your App URL**
After deployment, Cyclic provides:
```
https://your-app-name.cyclic.app
```

Example: `https://tudungsaji-backend.cyclic.app`

## 🔧 GitHub Secrets Setup

Add to GitHub repo → Settings → Secrets:

```bash
CYCLIC_APP_URL=https://your-app-name.cyclic.app
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id  
VERCEL_PROJECT_ID=your_vercel_project_id
DOCKER_PASSWORD=your_docker_hub_token
```

## 🚀 Deployment Flow

```
1. Code Push to GitHub main branch
2. Cyclic auto-detects change via webhook  
3. Cyclic builds & deploys backend automatically
4. Vercel deploys frontend automatically
5. Health checks run via GitHub Actions
```

## ✅ Benefits

- **🆓 Completely Free** - No credit card required
- **🔄 Auto Deploy** - Push to deploy  
- **📊 Built-in Monitoring** - Logs & metrics
- **🌐 Custom Domain** - Free HTTPS
- **📱 Node.js Optimized** - Express.js works perfectly

## 🔍 Testing Deployment

### **Local Test:**
```bash
cd BE_tudungsaji
npm start
curl http://localhost:5000/health
```

### **Production Test:**
```bash
curl https://your-app-name.cyclic.app/health
```

## 📋 Troubleshooting

### **Common Issues:**

#### **Build Fails:**
- Check `package.json` has all dependencies
- Ensure `npm start` script exists
- Check Node.js version compatibility

#### **App Not Starting:**
- Verify `PORT` environment variable
- Check application logs in Cyclic dashboard
- Ensure health check endpoint exists

#### **Environment Variables:**
- Double-check MongoDB connection string
- Verify all required env vars are set
- Check for typos in variable names

## 🎯 Academic Requirements Met

✅ **CI/CD Pipeline** - GitHub Actions + Cyclic webhook  
✅ **Automated Deployment** - Push to deploy  
✅ **Docker Integration** - Build & push to Docker Hub  
✅ **Health Monitoring** - Automated health checks  
✅ **Professional Setup** - Production-ready configuration  

This setup provides a complete CI/CD pipeline suitable for academic evaluation and real-world deployment!