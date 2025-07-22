# 🚀 Solar Application Builder Buddy - Deployment Guide

**AI-powered development assistant with intelligent code generation and smart workflow automation**

## 📋 Overview

This guide provides comprehensive instructions for deploying the Solar Application Builder Buddy across multiple platforms including E2B, Railway, and local development environments.

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Python FastAPI with AI integration (OpenAI GPT-4)
- **AI Features**: Code generation, template management, project analysis
- **Deployment**: Multi-platform support (E2B, Railway, Docker)

## 🚀 Quick Start Options

### Option 1: E2B Development Environment (Recommended)

**Perfect for development and testing with AI features**

```bash
# Clone the repository
git clone https://github.com/mikeschlottig/Solar-Application-Builder-Buddy-Production.git
cd Solar-Application-Builder-Buddy-Production

# Build and run with E2B
docker build -f e2b.Dockerfile -t builder-buddy-e2b .
docker run -p 5173:5173 -p 8000:8000 \
  -e OPENAI_API_KEY=your-key \
  builder-buddy-e2b
```

**Access:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Option 2: Railway Production Deployment

**Optimized for production with nginx + prerender.io for SEO**

```bash
# Build Railway image
docker build -f railway.Dockerfile -t builder-buddy-railway .

# Run with production settings
docker run -p 8000:8000 \
  -e OPENAI_API_KEY=your-key \
  -e PRERENDER_TOKEN=your-token \
  builder-buddy-railway
```

### Option 3: Docker Compose (Full Stack)

```bash
# Environment setup
cp .env.example .env
# Edit .env with your API keys

# Start all services
docker-compose up -d

# Development mode
docker-compose up

# Production mode
docker-compose --profile production up
```

## 🔧 Environment Configuration

### Required Environment Variables

```bash
# AI Integration
OPENAI_API_KEY=sk-your-openai-api-key

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:8000
VITE_OPENAI_API_KEY=your-openai-key
VITE_ENABLE_AI_FEATURES=true

# Backend Configuration
DATABASE_URL=sqlite:///./builder_buddy.db
CORS_ORIGINS=[\"http://localhost:5173\"]

# Production Only
PRERENDER_TOKEN=your-prerender-token
```

### Optional Environment Variables

```bash
# Logging Configuration
LOG_LEVEL=INFO
LOG_FILE_PATH=./logs/builder_buddy.log

# AI Model Configuration
OPENAI_MODEL=gpt-4
OPENAI_TEMPERATURE=0.1
OPENAI_MAX_TOKENS=4000

# Development
HOT_RELOAD=true
DEBUG_MODE=true
```

## 🏭 Platform-Specific Deployments

### E2B Platform Deployment

**Best for: Development, testing, AI feature development**

1. **Prepare Environment**
   ```bash
   # Install E2B CLI
   npm install -g @e2b/cli
   
   # Login to E2B
   e2b auth login
   ```

2. **Deploy to E2B**
   ```bash
   # Build and deploy
   e2b build
   e2b deploy
   ```

3. **Configure E2B Settings**
   - Set environment variables in E2B dashboard
   - Configure resource limits for AI processing
   - Enable GPU support for enhanced AI performance

### Railway Platform Deployment

**Best for: Production, SEO-optimized applications**

1. **Connect Repository**
   - Connect GitHub repository to Railway
   - Select `railway.Dockerfile` as build configuration

2. **Environment Configuration**
   ```bash
   # Required Railway Variables
   OPENAI_API_KEY=your-key
   PRERENDER_TOKEN=your-token
   DATABASE_URL=postgresql://user:pass@host:port/db
   
   # Railway will automatically set:
   PORT=8000
   RAILWAY_ENVIRONMENT=production
   ```

3. **Domain Configuration**
   - Configure custom domain in Railway dashboard
   - SSL certificates are automatically provisioned
   - CDN optimization enabled by default

### Local Development Setup

**Best for: Feature development, debugging, customization**

1. **Prerequisites**
   ```bash
   # Required software
   - Node.js 20+
   - Python 3.11+
   - pnpm (for frontend)
   - uv (for backend)
   ```

2. **Frontend Setup**
   ```bash
   cd app
   pnpm install
   pnpm dev
   ```

3. **Backend Setup**
   ```bash
   cd services
   uv sync
   uv run uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## 🤖 AI Features Configuration

### OpenAI Integration

```python
# AI Configuration (services/config.py)
AI_CONFIG = {
    "model": "gpt-4",
    "temperature": 0.1,
    "max_tokens": 4000,
    "system_prompt": "You are an expert software developer assistant."
}
```

### Code Generation Features

- **React Component Generation**: AI-powered component creation
- **API Endpoint Generation**: FastAPI route generation
- **Documentation Generation**: Automatic README and API docs
- **Test Generation**: Automated test case creation
- **Code Review**: AI-powered code analysis and suggestions

### Template Management

```typescript
// Template Configuration (app/src/config/templates.ts)
export const TEMPLATE_CONFIG = {
  reactComponent: {
    functional: true,
    typescript: true,
    styling: 'tailwind',
    accessibility: true,
    testing: 'jest'
  },
  apiEndpoint: {
    framework: 'fastapi',
    validation: 'pydantic',
    documentation: 'openapi',
    testing: 'pytest'
  }
};
```

## 🔍 Monitoring & Logging

### Application Logs

```bash
# View logs in development
docker-compose logs -f builder-buddy

# View specific service logs
docker-compose logs -f builder-buddy-frontend
docker-compose logs -f builder-buddy-backend
```

### AI Interaction Logs

```bash
# AI-specific logging
tail -f logs/ai_interactions.log
tail -f logs/code_generation.log
```

### Performance Monitoring

- **Frontend**: React DevTools, Lighthouse metrics
- **Backend**: FastAPI built-in metrics, custom performance tracking
- **AI**: Token usage tracking, response time monitoring

## 🔐 Security Configuration

### API Security

```python
# Security Headers (services/api/middleware.py)
SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000"
}
```

### Environment Security

- Store sensitive keys in environment variables
- Use `.env` files for local development only
- Never commit API keys to version control
- Use platform-specific secret management

## 🧪 Testing & Quality Assurance

### Frontend Testing

```bash
cd app

# Unit tests
pnpm test

# Component testing
pnpm test:components

# E2E testing
pnpm test:e2e

# Type checking
pnpm type-check

# Linting
pnpm lint
```

### Backend Testing

```bash
cd services

# Unit tests
uv run pytest

# API tests
uv run pytest tests/api/

# AI integration tests
uv run pytest tests/ai/

# Coverage
uv run pytest --cov=api --cov-report=html
```

### AI Testing

```bash
# Test AI code generation
uv run python tests/test_ai_generation.py

# Test template system
uv run python tests/test_templates.py

# Performance testing
uv run python tests/test_ai_performance.py
```

## 🚨 Troubleshooting

### Common Issues

**1. AI Features Not Working**
```bash
# Check OpenAI API key
echo $OPENAI_API_KEY

# Verify API connectivity
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

**2. Build Failures**
```bash
# Clear caches
pnpm store prune
docker system prune -af

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
```

**3. Port Conflicts**
```bash
# Check port usage
lsof -i :5173
lsof -i :8000

# Use different ports
export FRONTEND_PORT=3000
export BACKEND_PORT=8080
```

### Performance Optimization

**Frontend Optimization**
- Enable code splitting in Vite configuration
- Optimize bundle size with tree shaking
- Use React.lazy for component lazy loading
- Implement proper caching strategies

**Backend Optimization**
- Configure uvicorn workers for production
- Implement Redis caching for AI responses
- Use database connection pooling
- Enable gzip compression

**AI Optimization**
- Cache frequently used AI responses
- Implement request batching
- Use streaming for long responses
- Monitor token usage and costs

## 📊 Production Monitoring

### Health Checks

```bash
# Frontend health
curl http://localhost:5173/health

# Backend health
curl http://localhost:8000/health

# AI services health
curl http://localhost:8000/api/ai/health
```

### Performance Metrics

- **Response Times**: < 200ms for UI, < 2s for AI generation
- **Memory Usage**: < 1GB for typical workloads
- **CPU Usage**: < 50% average load
- **AI Token Usage**: Monitor costs and limits

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] API keys validated
- [ ] Tests passing
- [ ] Build successful
- [ ] Security scan complete

### Post-Deployment
- [ ] Health checks passing
- [ ] AI features working
- [ ] Performance monitoring active
- [ ] Error tracking configured
- [ ] Backup strategy implemented

## 📞 Support

For deployment issues or questions:

- **Documentation**: Check this guide and README.md
- **Issues**: Create GitHub issue with deployment logs
- **AI Problems**: Verify OpenAI API key and quotas
- **Performance**: Monitor logs and system resources

---

**🎉 Deployment successful! Your AI-powered Application Builder Buddy is ready to accelerate development workflows!**