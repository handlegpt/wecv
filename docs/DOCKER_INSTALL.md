# Docker Installation Guide for WeCV AI

This guide will help you install and run WeCV AI using Docker.

## Prerequisites

### System Requirements
- **Operating System**: Linux, macOS, or Windows
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: At least 10GB free space
- **Network**: Internet connection for downloading images

### Install Docker

#### Ubuntu/Debian
```bash
# Update package index
sudo apt-get update

# Install required packages
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Add user to docker group
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

#### macOS
```bash
# Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop
# Or use Homebrew
brew install --cask docker
```

#### Windows
```bash
# Download Docker Desktop from:
# https://www.docker.com/products/docker-desktop
# Follow the installation wizard
```

### Verify Installation
```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Test Docker installation
docker run hello-world
```

## Quick Installation

### 1. Clone the Repository
```bash
git clone https://github.com/handlegpt/wecv.git
cd wecv
```

### 2. Make Startup Script Executable
```bash
chmod +x start.sh
```

### 3. Start Development Environment
```bash
./start.sh dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## Production Deployment

### 1. Configure Production Environment
```bash
# Copy production environment template
cp .env.prod.example .env.prod

# Edit production configuration
nano .env.prod
```

### 2. Configure Required Variables
```env
# Database
DB_PASSWORD=your_secure_password_here

# JWT Secret (generate a secure random string)
JWT_SECRET=your_very_secure_jwt_secret_key_wecv_ai_2024

# OpenAI API Key (optional for AI features)
OPENAI_API_KEY=your_openai_api_key_here

# Domain configuration
DOMAIN=your-domain.com
API_DOMAIN=api.your-domain.com
```

### 3. Start Production Environment
```bash
./start.sh prod
```

### 4. Configure SSL Certificates
```bash
# For Let's Encrypt certificates
./scripts/ssl-setup.sh your-domain.com api.your-domain.com letsencrypt

# For manual certificates, place files in nginx/ssl/
# - your-domain.com.crt and your-domain.com.key
# - api.your-domain.com.crt and api.your-domain.com.key
```

## Management Commands

### Development Environment
```bash
# Start development environment
./start.sh dev

# Stop all services
./start.sh stop

# Restart services
./start.sh restart

# View logs
./start.sh logs

# Check status
./start.sh status
```

### Production Environment
```bash
# Start production environment
./start.sh prod

# Restart production services
./start.sh restart prod

# View production logs
./start.sh logs prod

# Clean all containers and data
./start.sh clean
```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
sudo lsof -i :3000
sudo lsof -i :3001

# Stop conflicting services
sudo systemctl stop nginx  # if using nginx locally
```

#### 2. Docker Permission Denied
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login again, or run:
newgrp docker
```

#### 3. Insufficient Memory
```bash
# Check available memory
free -h

# Increase Docker memory limit in Docker Desktop settings
# Or increase swap space
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

#### 4. Database Connection Issues
```bash
# Check database container status
docker-compose ps db

# View database logs
docker-compose logs db

# Restart database
docker-compose restart db
```

#### 5. Build Failures
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Performance Optimization

#### 1. Increase Docker Resources
- **Docker Desktop**: Settings → Resources → Advanced
- **Linux**: Configure `/etc/docker/daemon.json`

#### 2. Optimize Database
```bash
# Check database performance
docker-compose exec db psql -U postgres -d wecv_ai -c "SELECT * FROM pg_stat_activity;"
```

#### 3. Monitor Resource Usage
```bash
# View container resource usage
docker stats

# Run monitoring script
./scripts/monitor.sh
```

## Backup and Recovery

### Database Backup
```bash
# Manual backup
docker-compose exec db pg_dump -U postgres wecv_ai > backup.sql

# Restore from backup
docker-compose exec -T db psql -U postgres -d wecv_ai < backup.sql
```

### Automated Backups
```bash
# Production environment includes daily backups
# Check backup directory
ls -la backups/
```

## Security Considerations

### 1. Change Default Passwords
```bash
# Edit .env.prod file
DB_PASSWORD=your_secure_password
JWT_SECRET=your_secure_jwt_secret
```

### 2. Configure Firewall
```bash
# Allow only necessary ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 3. Regular Updates
```bash
# Update Docker images
docker-compose pull

# Update application
git pull origin main
docker-compose build
```

## Support

### Getting Help
1. **Check Logs**: `./start.sh logs`
2. **Health Check**: http://localhost:3001/api/health
3. **GitHub Issues**: Report bugs on GitHub
4. **Documentation**: Check `/docs` directory

### Useful Commands
```bash
# View all containers
docker ps -a

# View container logs
docker logs container_name

# Execute commands in container
docker exec -it container_name bash

# View resource usage
docker stats

# Clean up unused resources
docker system prune
```

---

**Need more help?** Check the main [README.md](../README.md) or create an issue on GitHub. 