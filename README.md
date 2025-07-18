# WeCV AI - Smart Resume Generator & Management Platform

[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md)

WeCV AI is an AI-powered intelligent resume generation and management platform that provides multi-language, multi-template, and multi-format export capabilities to help users quickly create professional resumes.

## 🚀 Features

### Core Features
- **Smart Resume Generation**: AI-powered resume content generation
- **Multiple Templates**: Modern, Classic, Creative, and more professional templates
- **Real-time Preview**: Desktop, mobile, and print preview modes
- **Multi-format Export**: PDF, Word, HTML, and other formats
- **AI Writing Assistant**: Intelligent content optimization and professional suggestions
- **Resume Analysis**: AI-driven resume scoring and improvement recommendations

### User Management
- **User Registration & Login**: Email-based registration and login
- **Personal Settings**: Profile management, password changes, notification settings
- **Privacy Control**: Resume visibility settings, email display control
- **Permission Management**: User role management with admin privileges

### Management Features
- **Admin Dashboard**: User management, data analytics, system monitoring
- **Data Analytics**: User count, resume count, activity statistics
- **Template Management**: Resume template CRUD operations
- **System Monitoring**: System operation status monitoring

### Technical Features
- **Responsive Design**: Desktop and mobile support
- **Real-time Saving**: Automatic content saving
- **Sharing Functionality**: Generate resume sharing links
- **Multi-language Support**: Chinese and English interfaces
- **Secure Authentication**: JWT token authentication mechanism

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with SSR and SSG support
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hot Toast**: Lightweight notification component

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **TypeScript**: Type-safe JavaScript
- **Prisma ORM**: Database ORM tool
- **PostgreSQL**: Relational database
- **Redis**: Cache database
- **JWT**: JSON Web Token authentication

### AI Services
- **OpenAI API**: GPT model integration
- **Smart Analysis**: Resume content analysis and optimization suggestions

### Deployment
- **Docker**: Containerized deployment
- **Docker Compose**: Multi-service orchestration
- **Nginx**: Reverse proxy server
- **SSL Certificates**: HTTPS secure access

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 6+

### 1. Clone Project
```bash
git clone https://github.com/handlegpt/wecv.git
cd wecv
```

### 2. Environment Configuration
```bash
# Copy environment configuration files
cp .env.example .env
cp .env.prod.example .env.prod

# Edit configuration files
vim .env
```

### 3. Docker Deployment (Recommended)
```bash
# One-click startup for all services
./start.sh dev

# Or manual startup
docker-compose up -d
```

### 4. Development Environment Deployment
```bash
# Install dependencies
npm install
cd frontend && npm install
cd ../backend && npm install

# Start database
docker-compose up -d postgres redis

# Database migration
cd backend
npx prisma migrate dev
npx prisma generate

# Start backend service
npm run dev

# Start frontend service
cd ../frontend
npm run dev
```

## 🔧 Configuration

### Environment Variables
```bash
# Database configuration
DATABASE_URL="postgresql://username:password@localhost:5432/wecv"

# Redis configuration
REDIS_URL="redis://localhost:6379"

# JWT secret
JWT_SECRET="your-jwt-secret"

# OpenAI API
OPENAI_API_KEY="your-openai-api-key"

# Application configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"
FRONTEND_URL="http://localhost:3000"
```

### Production Environment Deployment
```bash
# Use production environment configuration
docker-compose -f docker-compose.prod.yml up -d

# Run deployment script
./deploy.sh
```

## �� Project Structure

```
wecv-ai/
├── frontend/                 # Frontend application
│   ├── app/                 # Next.js 14 App Router
│   ├── components/          # React components
│   ├── lib/                # Utility libraries
│   └── public/             # Static resources
├── backend/                 # Backend application
│   ├── src/
│   │   ├── controllers/    # Controllers
│   │   ├── routes/         # Routes
│   │   ├── middlewares/    # Middlewares
│   │   └── types/          # Type definitions
│   └── prisma/             # Database models
├── nginx/                  # Nginx configuration
├── scripts/                # Deployment scripts
├── docker-compose.yml      # Development environment config
├── docker-compose.prod.yml # Production environment config
└── README.md              # Project documentation
```

## 🎯 Usage Guide

### User Features
1. **Register/Login**: Use email to register account
2. **Create Resume**: Select template, fill in personal information
3. **AI Assistant**: Use AI to optimize resume content
4. **Preview/Export**: Real-time preview and export resume
5. **Share Resume**: Generate sharing links

### Admin Features
1. **User Management**: View and manage user accounts
2. **Data Analytics**: View platform usage data
3. **System Monitoring**: Monitor system operation status
4. **Template Management**: Manage resume templates

## 🔒 Security Features

- **JWT Authentication**: Secure user authentication mechanism
- **Password Encryption**: bcrypt password hashing
- **CORS Configuration**: Cross-origin request security control
- **Input Validation**: Server-side data validation
- **SQL Injection Protection**: Prisma ORM automatic protection
- **XSS Protection**: Frontend input filtering

## 📊 Performance Optimization

- **Redis Caching**: Reduce database queries
- **Image Optimization**: Automatic image compression
- **Code Splitting**: On-demand component loading
- **CDN Support**: Static resource CDN acceleration
- **Database Indexing**: Optimize query performance

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🆘 Support

If you encounter issues or have suggestions, please:

1. Check [GitHub Issues](https://github.com/handlegpt/wecv/issues)
2. Create a new Issue
3. Contact the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [OpenAI](https://openai.com/) - AI services
- [Docker](https://www.docker.com/) - Containerization platform

---

**WeCV AI** - Making resume creation smarter and more professional! 