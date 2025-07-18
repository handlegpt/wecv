# WeCV AI Docker 部署指南

## 快速开始

### 开发环境

```bash
# 启动开发环境
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 生产环境

```bash
# 启动生产环境
docker-compose -f docker-compose.prod.yml up -d

# 查看日志
docker-compose -f docker-compose.prod.yml logs -f

# 停止服务
docker-compose -f docker-compose.prod.yml down
```

## 环境变量配置

### 开发环境 (.env)
```env
# 数据库配置
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=wecv_ai

# JWT密钥
JWT_SECRET=your_jwt_secret_here

# OpenAI API密钥
OPENAI_API_KEY=your_openai_api_key_here
```

### 生产环境 (.env.prod)
```env
# 数据库配置
POSTGRES_USER=wecv_user
POSTGRES_PASSWORD=strong_password_here
POSTGRES_DB=wecv_ai_prod

# JWT密钥 (使用强密钥)
JWT_SECRET=your_very_strong_jwt_secret_here

# OpenAI API密钥
OPENAI_API_KEY=your_openai_api_key_here
```

## 服务说明

### 开发环境
- **前端**: http://localhost:3000 (开发模式，热重载)
- **后端**: http://localhost:3001 (开发模式，热重载)
- **数据库**: localhost:5432
- **Redis**: localhost:6379

### 生产环境
- **前端**: http://localhost:3000 (生产构建)
- **后端**: http://localhost:3001 (生产模式)
- **数据库**: localhost:5432
- **Redis**: localhost:6379

## 构建镜像

### 单独构建前端
```bash
cd frontend
docker build -t wecv-ai-frontend .
```

### 单独构建后端
```bash
cd backend
docker build -t wecv-ai-backend .
```

## 数据持久化

数据会自动保存到以下目录：
- `./uploads` - 上传文件
- `./exports` - 导出文件
- `./temp` - 临时文件
- `./backups` - 数据库备份

## 故障排除

### 常见问题

1. **端口冲突**
   ```bash
   # 检查端口占用
   lsof -i :3000
   lsof -i :3001
   ```

2. **构建失败**
   ```bash
   # 清理Docker缓存
   docker system prune -a
   
   # 重新构建
   docker-compose build --no-cache
   ```

3. **数据库连接问题**
   ```bash
   # 检查数据库状态
   docker-compose logs db
   
   # 重启数据库
   docker-compose restart db
   ```

### 日志查看

```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db
```

## 性能优化

### 开发环境优化
- 使用卷挂载实现热重载
- 共享node_modules减少构建时间

### 生产环境优化
- 使用多阶段构建
- 最小化镜像大小
- 非root用户运行
- 健康检查

## 安全建议

1. **生产环境必须修改默认密码**
2. **使用强JWT密钥**
3. **定期更新依赖**
4. **启用HTTPS**
5. **配置防火墙**

## 监控

### 健康检查
所有服务都配置了健康检查：
- 数据库: `pg_isready`
- Redis: `redis-cli ping`
- 前端/后端: HTTP状态检查

### 日志管理
```bash
# 查看实时日志
docker-compose logs -f --tail=100

# 导出日志
docker-compose logs > logs.txt
```

## 备份和恢复

### 数据库备份
```bash
# 创建备份
docker-compose exec db pg_dump -U postgres wecv_ai > backup.sql

# 恢复备份
docker-compose exec -T db psql -U postgres wecv_ai < backup.sql
```

### 完整备份
```bash
# 备份所有数据
tar -czf wecv_backup_$(date +%Y%m%d_%H%M%S).tar.gz \
  uploads/ exports/ temp/ backups/
``` 