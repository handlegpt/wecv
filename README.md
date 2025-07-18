# WeCV AI - Intelligent Resume Generation & Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org/)

WeCV AI is an intelligent AI-powered resume generation and management platform that helps users create professional resumes with AI assistance. Built with modern technologies and designed for scalability.

## 🌟 Features

- **Multi-language Support**: English, Chinese (Simplified/Traditional), Japanese, Spanish, French, German
- **AI Translation**: Intelligent resume translation across 7 languages
- **Multiple Templates**: Professional, Creative, Modern, Minimalist
- **AI Writing Assistant**: OpenAI-powered content generation
- **Export Options**: PDF, DOCX, HTML formats
- **User Management**: Registration, login, profile management
- **Resume Management**: Create, edit, organize resumes
- **Online Hosting**: Share resumes with public URLs
- **Admin Dashboard**: User management, analytics, system monitoring
- **Data Analytics**: Usage statistics and insights
- **Permission System**: Role-based access control

## 🌍 Multi-language Features

### Supported Languages
- 🇺🇸 **English** (en-US) - Default language
- 🇨🇳 **Chinese Simplified** (zh-CN)
- 🇹🇼 **Chinese Traditional** (zh-TW)
- 🇯🇵 **Japanese** (ja-JP)
- 🇪🇸 **Spanish** (es-ES)
- 🇫🇷 **French** (fr-FR)
- 🇩🇪 **German** (de-DE)

### Multi-language Capabilities
- **Interface Localization**: Complete UI translation for all supported languages
- **Resume Translation**: AI-powered translation of resume content
- **Language Preferences**: User-specific language settings
- **Multi-language Export**: Export resumes in different languages
- **Batch Translation**: Translate all resumes at once
- **Cultural Adaptation**: Language-specific resume formats and styles

## 🚀 Quick Start with Docker

### Prerequisites

- Docker and Docker Compose installed
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/handlegpt/wecv.git
   cd wecv
   ```

2. **Start development environment**
   ```bash
   chmod +x start.sh
   ./start.sh dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/api/health

### Production Deployment

1. **Configure production environment**
   ```bash
   cp .env.prod.example .env.prod
   # Edit .env.prod with your production settings
   ```

2. **Start production environment**
   ```bash
   ./start.sh prod
   ```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form handling
- **Framer Motion**: Animations
- **React PDF**: PDF generation
- **i18next**: Internationalization

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type safety
- **Prisma ORM**: Database management
- **PostgreSQL**: Primary database
- **Redis**: Caching and sessions
- **JWT**: Authentication
- **OpenAI API**: AI content generation

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and load balancing
- **SSL/TLS**: Secure connections
- **Automated Backups**: Database backup system

## 📁 Project Structure

```
wecv/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   ├── lib/                # Utility functions
│   └── Dockerfile          # Frontend container
├── backend/                 # Express.js backend API
│   ├── src/                # Source code
│   ├── prisma/             # Database schema
│   └── Dockerfile          # Backend container
├── nginx/                  # Nginx configuration
├── scripts/                # Utility scripts
├── docker-compose.yml      # Development environment
├── docker-compose.prod.yml # Production environment
└── start.sh               # Startup script
```

## 🔧 Configuration

### Environment Variables

#### Development (.env)
```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/wecv_ai
JWT_SECRET=your_jwt_secret_wecv_ai
OPENAI_API_KEY=your_openai_api_key
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=WeCV AI
```

#### Production (.env.prod)
```env
DB_PASSWORD=your_secure_db_password
JWT_SECRET=your_very_secure_jwt_secret_key_wecv_ai_2024
OPENAI_API_KEY=your_openai_api_key_here
REDIS_URL=redis://redis:6379
NODE_ENV=production
DOMAIN=wecv.ai
API_DOMAIN=api.wecv.ai
```

## 🚀 Available Scripts

### Development
```bash
./start.sh dev          # Start development environment
./start.sh stop         # Stop all services
./start.sh restart      # Restart development services
./start.sh logs         # View development logs
./start.sh status       # Check service status
```

### Production
```bash
./start.sh prod         # Start production environment
./start.sh restart prod # Restart production services
./start.sh logs prod    # View production logs
./start.sh clean        # Clean all containers and data
```

## 📊 Monitoring & Maintenance

### Health Checks
- Backend: `http://localhost:3001/api/health`
- Frontend: `http://localhost:3000`

### Database Backup
```bash
# Manual backup
docker-compose exec db pg_dump -U postgres wecv_ai > backup.sql

# Automated backup (runs daily at 2 AM)
# Configured in docker-compose.prod.yml
```

### System Monitoring
```bash
# Run monitoring script
./scripts/monitor.sh
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Admin and user permissions
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **XSS Protection**: Content Security Policy headers
- **HTTPS Enforcement**: SSL/TLS encryption
- **Rate Limiting**: API request throttling

## 🌐 Deployment

### Docker Deployment (Recommended)
1. Clone the repository
2. Configure environment variables
3. Run `./start.sh prod`
4. Configure domain and SSL certificates

### Manual Deployment
1. Install Node.js, PostgreSQL, Redis
2. Configure environment variables
3. Run database migrations
4. Start frontend and backend services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` directory
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join GitHub Discussions for questions

## 🔄 Updates

- **Dependencies**: Run `npm update` in frontend/backend directories
- **Database**: Run `npx prisma migrate deploy` for schema updates
- **Docker Images**: Rebuild with `docker-compose build`

---

**WeCV AI** - Making resume creation intelligent and effortless! 🚀 