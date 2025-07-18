# WeCV AI 部署指南

## 🚀 快速部署

### 1. 本地开发环境

```bash
# 克隆项目
git clone https://github.com/handlegpt/wecv.git
cd wecv

# 一键启动开发环境
./start.sh dev
```

### 2. 生产环境部署

```bash
# 使用生产环境配置
./start.sh prod
```

## 📋 环境要求

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+ (开发环境)
- PostgreSQL 14+ (可选，Docker会自动安装)
- Redis 6+ (可选，Docker会自动安装)

## 🔧 环境配置

### 1. 复制环境文件

```bash
cp .env.example .env
cp .env.prod.example .env.prod
```

### 2. 配置环境变量

编辑 `.env` 文件：

```env
# 数据库配置
DATABASE_URL="postgresql://username:password@localhost:5432/wecv"

# Redis配置
REDIS_URL="redis://localhost:6379"

# JWT密钥
JWT_SECRET="your-jwt-secret"

# OpenAI API
OPENAI_API_KEY="your-openai-api-key"

# 应用配置
NEXT_PUBLIC_API_URL="http://localhost:3001"
FRONTEND_URL="http://localhost:3000"
```

## 🐳 Docker 部署

### 开发环境

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 生产环境

```bash
# 使用生产环境配置
docker-compose -f docker-compose.prod.yml up -d

# 查看生产环境日志
docker-compose -f docker-compose.prod.yml logs -f
```

## 🌐 域名和SSL配置

### 1. 配置域名

将您的域名解析到服务器IP地址。

### 2. 自动SSL证书

```bash
# 运行SSL配置脚本
chmod +x scripts/ssl-setup.sh
./scripts/ssl-setup.sh your-domain.com api.your-domain.com letsencrypt
```

### 3. 手动SSL证书

将SSL证书文件放置在 `nginx/ssl/` 目录下：
- `cert.pem` - 证书文件
- `key.pem` - 私钥文件

## 📊 监控和备份

### 1. 系统监控

```bash
# 启动监控脚本
chmod +x scripts/monitor.sh
./scripts/monitor.sh
```

### 2. 数据库备份

```bash
# 手动备份
chmod +x scripts/backup.sh
./scripts/backup.sh

# 查看备份文件
ls -la backups/
```

### 3. 自动备份

添加到 crontab：

```bash
# 编辑 crontab
crontab -e

# 添加每日备份任务
0 2 * * * /path/to/wecv/scripts/backup.sh
```

## 🔍 故障排除

### 1. 服务无法启动

```bash
# 检查端口占用
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001

# 检查容器状态
docker ps -a
docker logs wecv-frontend
docker logs wecv-backend
```

### 2. 数据库连接失败

```bash
# 检查数据库容器
docker logs wecv-postgres

# 手动连接数据库
docker exec -it wecv-postgres psql -U postgres -d wecv
```

### 3. SSL证书问题

```bash
# 检查证书文件
ls -la nginx/ssl/

# 重新配置SSL
./scripts/ssl-setup.sh your-domain.com api.your-domain.com letsencrypt
```

## 📈 性能优化

### 1. 数据库优化

```sql
-- 创建索引
CREATE INDEX idx_resume_user_id ON resume(user_id);
CREATE INDEX idx_resume_created_at ON resume(created_at);
```

### 2. Redis缓存

确保Redis配置正确：

```env
REDIS_URL="redis://localhost:6379"
```

### 3. Nginx优化

编辑 `nginx/nginx.conf` 文件，添加缓存配置：

```nginx
# 静态文件缓存
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔐 安全配置

### 1. 防火墙设置

```bash
# 开放必要端口
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
```

### 2. 数据库安全

```bash
# 修改默认密码
docker exec -it wecv-postgres psql -U postgres
ALTER USER postgres PASSWORD 'your-secure-password';
```

### 3. SSL配置

确保使用强加密套件：

```nginx
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
```

## 📝 日志管理

### 1. 查看应用日志

```bash
# 前端日志
docker logs wecv-frontend

# 后端日志
docker logs wecv-backend

# 数据库日志
docker logs wecv-postgres
```

### 2. 日志轮转

创建日志轮转配置：

```bash
sudo nano /etc/logrotate.d/wecv
```

添加内容：

```
/path/to/wecv/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root root
}
```

## 🚀 更新部署

### 1. 代码更新

```bash
# 拉取最新代码
git pull origin main

# 重新构建镜像
docker-compose -f docker-compose.prod.yml build

# 重启服务
docker-compose -f docker-compose.prod.yml up -d
```

### 2. 数据库迁移

```bash
# 运行数据库迁移
docker exec -it wecv-backend npx prisma migrate deploy

# 重新生成Prisma客户端
docker exec -it wecv-backend npx prisma generate
```

## 📞 支持

如果遇到问题，请：

1. 查看 [GitHub Issues](https://github.com/handlegpt/wecv/issues)
2. 检查日志文件
3. 联系技术支持

---

**WeCV AI** - 让简历创作更智能、更专业！ 