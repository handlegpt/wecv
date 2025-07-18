#!/bin/bash

echo "📊 WeCV AI 系统监控"
echo "===================="

# 检查容器状态
echo "🔍 容器状态检查..."
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "💾 资源使用情况..."
echo "CPU 使用率:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

echo ""
echo "📈 磁盘使用情况..."
df -h | grep -E "(Filesystem|/dev/)"

echo ""
echo "🌐 网络连接检查..."
echo "检查前端服务..."
curl -s -o /dev/null -w "前端响应时间: %{time_total}s\n" http://localhost:3000 || echo "前端服务不可用"

echo "检查后端API..."
curl -s -o /dev/null -w "API响应时间: %{time_total}s\n" http://localhost:3001/api/health || echo "后端API不可用"

echo ""
echo "📝 最近日志 (最后10行)..."
docker-compose -f docker-compose.prod.yml logs --tail=10

echo ""
echo "✅ 监控检查完成" 