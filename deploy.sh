#!/bin/bash

echo "🚀 WeCV AI 生产环境部署脚本"
echo "================================"

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装，请先安装 Docker"
    exit 1
fi

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

# 创建必要的目录
echo "📁 创建必要的目录..."
mkdir -p nginx/conf.d
mkdir -p nginx/ssl
mkdir -p logs/nginx
mkdir -p backups
mkdir -p uploads
mkdir -p scripts

# 复制环境变量文件
echo "📝 配置环境变量..."
cp .env.example .env

echo ""
echo "⚠️  重要提示："
echo "1. 请编辑 .env 文件，配置以下变量："
echo "   - DB_PASSWORD: 数据库密码"
echo "   - JWT_SECRET: JWT密钥"
echo "   - OPENAI_API_KEY: OpenAI API密钥"
echo ""
echo "2. 请将SSL证书文件放入 nginx/ssl/ 目录："
echo "   - wecv.ai.crt 和 wecv.ai.key"
echo "   - api.wecv.ai.crt 和 api.wecv.ai.key"
echo ""
echo "3. 请确保域名已正确解析到服务器IP"
echo ""

read -p "是否继续部署？(y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "部署已取消"
    exit 1
fi

# 停止现有服务
echo "🛑 停止现有服务..."
docker-compose -f docker-compose.prod.yml down

# 构建并启动服务
echo "🔨 构建并启动服务..."
docker-compose -f docker-compose.prod.yml up -d --build

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 30

# 检查服务状态
echo "📊 检查服务状态..."
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "✅ WeCV AI 部署完成！"
echo ""
echo "🌐 访问地址："
echo "   前端: https://wecv.ai"
echo "   API: https://api.wecv.ai"
echo ""
echo "📊 查看日志："
echo "   docker-compose -f docker-compose.prod.yml logs -f"
echo ""
echo "🛑 停止服务："
echo "   docker-compose -f docker-compose.prod.yml down"
echo ""
echo "🔄 更新服务："
echo "   ./deploy.sh" 