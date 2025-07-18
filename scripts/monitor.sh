#!/bin/bash

echo "📊 WeCV AI System Monitoring"
echo "============================"

# Check container status
echo "🔍 Container status check..."
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "💾 Resource usage..."
echo "CPU Usage:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

echo ""
echo "📈 Disk usage..."
df -h | grep -E "(Filesystem|/dev/)"

echo ""
echo "🌐 Network connection check..."
echo "Checking frontend service..."
curl -s -o /dev/null -w "Frontend response time: %{time_total}s\n" http://localhost:3000 || echo "Frontend service unavailable"

echo "Checking backend API..."
curl -s -o /dev/null -w "API response time: %{time_total}s\n" http://localhost:3001/api/health || echo "Backend API unavailable"

echo ""
echo "📝 Recent logs (last 10 lines)..."
docker-compose -f docker-compose.prod.yml logs --tail=10

echo ""
echo "✅ Monitoring check completed" 