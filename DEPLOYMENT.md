# WeCV AI 部署指南

## 环境要求

- Docker 和 Docker Compose
- Node.js 18+ (用于本地开发)
- PostgreSQL 15+
- Redis 7+

## 快速部署

### 1. 克隆项目

```bash
git clone https://github.com/handlegpt/wecv.git
cd wecv
```

### 2. 配置环境变量

复制环境变量示例文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置以下必需的环境变量：

```bash
# 数据库配置
DATABASE_URL=postgresql://postgres:postgres@db:5432/wecv_ai
REDIS_URL=redis://redis:6379

# JWT密钥
JWT_SECRET=your_secure_jwt_secret_here

# OpenAI API密钥
OPENAI_API_KEY=your_openai_api_key_here

# 邮件配置（用于邮件验证登录）
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# 谷歌OAuth配置（用于谷歌登录）
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google-login

# 前端配置
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

### 3. 启动服务

```bash
docker-compose up -d
```

### 4. 检查服务状态

```bash
docker-compose ps
```

### 5. 查看日志

```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs backend
docker-compose logs frontend
```

## 邮件配置

### Gmail 配置

1. 启用两步验证
2. 生成应用专用密码
3. 在 `.env` 文件中配置：

```bash
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

### 其他邮件服务商

#### Outlook/Hotmail
```bash
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-app-password
```

#### QQ邮箱
```bash
EMAIL_USER=your-email@qq.com
EMAIL_PASS=your-authorization-code
```

## 谷歌OAuth配置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 凭据
5. 配置授权重定向URI：
   - 开发环境：`http://localhost:3000/auth/google-login`
   - 生产环境：`https://your-domain.com/auth/google-login`
6. 在 `.env` 文件中配置：

```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

## 生产环境部署

### 1. 更新环境变量

```bash
# 生产环境配置
FRONTEND_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com/api
GOOGLE_REDIRECT_URI=https://your-domain.com/auth/google-login
```

### 2. 使用生产Dockerfile

```bash
# 构建生产镜像
docker-compose -f docker-compose.prod.yml build

# 启动生产服务
docker-compose -f docker-compose.prod.yml up -d
```

## 故障排除

### 常见问题

1. **后端启动失败**
   ```bash
   docker-compose logs backend
   ```

2. **数据库连接失败**
   ```bash
   docker-compose logs db
   ```

3. **邮件发送失败**
   - 检查邮件配置
   - 确认应用专用密码正确
   - 查看后端日志

4. **谷歌登录失败**
   - 检查OAuth配置
   - 确认重定向URI正确
   - 查看浏览器控制台错误

### 重置数据库

```bash
# 停止服务
docker-compose down

# 删除数据库卷
docker volume rm wecv_db_data

# 重新启动
docker-compose up -d
```

### 更新代码

```bash
# 拉取最新代码
git pull

# 重新构建并启动
docker-compose down
docker-compose up -d --build
```

## 监控和维护

### 查看服务状态

```bash
docker-compose ps
```

### 查看资源使用情况

```bash
docker stats
```

### 备份数据库

```bash
docker-compose exec db pg_dump -U postgres wecv_ai > backup.sql
```

### 恢复数据库

```bash
docker-compose exec -T db psql -U postgres wecv_ai < backup.sql
```

## 安全注意事项

1. **保护敏感信息**
   - 不要将 `.env` 文件提交到版本控制
   - 使用强密码和密钥

2. **HTTPS配置**
   - 生产环境必须使用HTTPS
   - 配置SSL证书

3. **定期更新**
   - 定期更新依赖包
   - 监控安全漏洞

## 性能优化

1. **数据库优化**
   - 配置适当的连接池
   - 定期清理旧数据

2. **缓存配置**
   - 启用Redis缓存
   - 配置CDN

3. **监控告警**
   - 设置服务监控
   - 配置错误告警 