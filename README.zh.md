# WeCV AI - 智能简历生成与管理平台

[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md)

WeCV AI 是一个基于人工智能的智能简历生成与管理平台，提供多语言、多模板、多格式导出等功能，帮助用户快速创建专业的简历。

## 🚀 功能特性

### 核心功能
- **智能简历生成**: 基于AI技术，智能生成简历内容
- **多模板支持**: 提供现代、经典、创意等多种简历模板
- **实时预览**: 支持桌面、手机、打印等多种预览模式
- **多格式导出**: 支持PDF、Word、HTML等多种格式导出
- **AI写作助手**: 智能优化简历内容，提供专业建议
- **简历分析**: AI驱动的简历评分和改进建议

### 用户管理
- **用户注册登录**: 支持邮箱注册和登录
- **个人设置**: 个人信息管理、密码修改、通知设置
- **隐私控制**: 简历公开性设置、邮箱显示控制
- **权限管理**: 用户角色管理，支持管理员权限

### 管理功能
- **管理后台**: 用户管理、数据统计、系统监控
- **数据统计**: 用户数量、简历数量、活跃度统计
- **模板管理**: 简历模板的增删改查
- **系统监控**: 系统运行状态监控

### 技术特性
- **响应式设计**: 支持桌面端和移动端
- **实时保存**: 自动保存用户编辑内容
- **分享功能**: 生成简历分享链接
- **多语言支持**: 支持中英文界面
- **安全认证**: JWT token认证机制

## 🛠️ 技术栈

### 前端
- **Next.js 14**: React框架，支持SSR和SSG
- **TypeScript**: 类型安全的JavaScript
- **Tailwind CSS**: 实用优先的CSS框架
- **React Hot Toast**: 轻量级通知组件

### 后端
- **Node.js**: JavaScript运行时
- **Express**: Web应用框架
- **TypeScript**: 类型安全的JavaScript
- **Prisma ORM**: 数据库ORM工具
- **PostgreSQL**: 关系型数据库
- **Redis**: 缓存数据库
- **JWT**: JSON Web Token认证

### AI服务
- **OpenAI API**: GPT模型集成
- **智能分析**: 简历内容分析和优化建议

### 部署
- **Docker**: 容器化部署
- **Docker Compose**: 多服务编排
- **Nginx**: 反向代理服务器
- **SSL证书**: HTTPS安全访问

## 📦 快速开始

### 环境要求
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 6+

### 1. 克隆项目
```bash
git clone https://github.com/handlegpt/wecv.git
cd wecv
```

### 2. 环境配置
```bash
# 复制环境配置文件
cp .env.example .env
cp .env.prod.example .env.prod

# 编辑配置文件
vim .env
```

### 3. Docker部署（推荐）
```bash
# 一键启动所有服务
./start.sh dev

# 或者手动启动
docker-compose up -d
```

### 4. 开发环境部署
```bash
# 安装依赖
npm install
cd frontend && npm install
cd ../backend && npm install

# 启动数据库
docker-compose up -d postgres redis

# 数据库迁移
cd backend
npx prisma migrate dev
npx prisma generate

# 启动后端服务
npm run dev

# 启动前端服务
cd ../frontend
npm run dev
```

## 🔧 配置说明

### 环境变量
```bash
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

### 生产环境部署
```bash
# 使用生产环境配置
docker-compose -f docker-compose.prod.yml up -d

# 运行部署脚本
./deploy.sh
```

## 📁 项目结构

```
wecv-ai/
├── frontend/                 # 前端应用
│   ├── app/                 # Next.js 14 App Router
│   ├── components/          # React组件
│   ├── lib/                # 工具库
│   └── public/             # 静态资源
├── backend/                 # 后端应用
│   ├── src/
│   │   ├── controllers/    # 控制器
│   │   ├── routes/         # 路由
│   │   ├── middlewares/    # 中间件
│   │   └── types/          # 类型定义
│   └── prisma/             # 数据库模型
├── nginx/                  # Nginx配置
├── scripts/                # 部署脚本
├── docker-compose.yml      # 开发环境配置
├── docker-compose.prod.yml # 生产环境配置
└── README.md              # 项目说明
```

## 🎯 使用指南

### 用户功能
1. **注册登录**: 使用邮箱注册账号
2. **创建简历**: 选择模板，填写个人信息
3. **AI助手**: 使用AI优化简历内容
4. **预览导出**: 实时预览并导出简历
5. **分享简历**: 生成分享链接

### 管理员功能
1. **用户管理**: 查看和管理用户账号
2. **数据统计**: 查看平台使用数据
3. **系统监控**: 监控系统运行状态
4. **模板管理**: 管理简历模板

## 🔒 安全特性

- **JWT认证**: 安全的用户认证机制
- **密码加密**: bcrypt密码哈希
- **CORS配置**: 跨域请求安全控制
- **输入验证**: 服务端数据验证
- **SQL注入防护**: Prisma ORM自动防护
- **XSS防护**: 前端输入过滤

## 📊 性能优化

- **Redis缓存**: 减少数据库查询
- **图片优化**: 自动图片压缩
- **代码分割**: 按需加载组件
- **CDN支持**: 静态资源CDN加速
- **数据库索引**: 优化查询性能

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🆘 支持

如果您遇到问题或有建议，请：

1. 查看 [GitHub Issues](https://github.com/handlegpt/wecv/issues)
2. 创建新的 Issue
3. 联系开发团队

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Prisma](https://www.prisma.io/) - 数据库ORM
- [OpenAI](https://openai.com/) - AI服务
- [Docker](https://www.docker.com/) - 容器化平台

---

**WeCV AI** - 让简历创作更智能、更专业！ 