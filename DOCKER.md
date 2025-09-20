# WeCV AI Docker 部署指南

## 🐳 快速开始

### 1. 环境准备
确保已安装：
- Docker
- Docker Compose

### 2. 配置环境变量
```bash
# 复制环境变量模板
cp env.example .env

# 编辑 .env 文件，至少配置以下变量：
# AUTH0_SECRET=your_secret_here
# AUTH0_BASE_URL=http://localhost:3066
# AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
# AUTH0_CLIENT_ID=your_client_id
# AUTH0_CLIENT_SECRET=your_client_secret
# DB_HOST=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/wecv_ai?retryWrites=true&w=majority
```

### 3. 设置 MongoDB Atlas (推荐)
**使用云数据库，无需在服务器安装 MongoDB：**
1. 访问 [MongoDB Atlas](https://www.mongodb.com/atlas)
2. 创建免费账户和集群
3. 创建数据库用户 (Database Access)
4. 设置网络访问 (Network Access) - 添加 `0.0.0.0/0` 允许所有IP
5. 获取连接字符串 (Connect -> Drivers -> Node.js)
6. 将连接字符串填入 `.env` 文件的 `DB_HOST` 变量

### 4. 启动服务
```bash
# 构建并启动所有服务
docker-compose up --build -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 5. 访问应用
- **前端**: http://localhost:3066
- **后端API**: http://localhost:5022
- **数据库**: MongoDB Atlas (云数据库)

## 🔧 常用命令

```bash
# 停止所有服务
docker-compose down

# 重启服务
docker-compose restart

# 查看特定服务日志
docker-compose logs -f [service_name]

# 进入容器
docker-compose exec [service_name] sh

# 清理所有数据（包括数据库）
docker-compose down -v
```

## 📁 服务说明

- **mongodb**: MongoDB 数据库服务
- **api**: 后端 API 服务 (Express.js)
- **client**: 前端服务 (Next.js)

## ⚠️ 注意事项

1. **首次启动**：数据库会自动初始化，创建必要的用户和集合
2. **数据持久化**：MongoDB 数据会保存在 Docker volume 中
3. **环境变量**：确保 `.env` 文件中的配置正确
4. **端口冲突**：确保 3066、5022、27017 端口未被占用

## 🔒 安全特性

### Docker 安全配置
- **非 root 用户**：所有容器都以非 root 用户运行
- **只读文件系统**：容器使用只读文件系统，防止恶意文件写入
- **权限最小化**：移除所有不必要的 Linux 能力
- **临时文件系统**：使用 tmpfs 挂载临时目录，防止持久化攻击
- **健康检查**：内置健康检查端点，监控服务状态

### 安全措施
- **`.dockerignore`**：排除敏感文件和目录
- **依赖锁定**：保留 `package-lock.json` 确保依赖版本一致性
- **信号处理**：使用 `dumb-init` 正确处理进程信号
- **缓存清理**：构建时清理 npm 缓存，减少攻击面

## 🐛 故障排除

### 常见问题

1. **端口被占用**
   ```bash
   # 查看端口占用
   lsof -i :3066
   lsof -i :5022
   lsof -i :27017
   ```

2. **数据库连接失败**
   - 检查 MongoDB 容器是否正常运行
   - 确认数据库连接字符串正确

3. **Auth0 认证失败**
   - 检查 `.env` 文件中的 Auth0 配置
   - 确认 Auth0 应用设置正确

4. **前端无法访问后端**
   - 检查网络连接
   - 确认 API 服务正常运行

### 查看详细日志
```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs mongodb
docker-compose logs api
docker-compose logs client
```
