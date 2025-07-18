#!/bin/bash

# SSL 证书配置脚本
# 支持 Let's Encrypt 自动证书

DOMAIN=${1:-wecv.ai}
API_DOMAIN=${2:-api.wecv.ai}

echo "🔐 配置 SSL 证书..."
echo "域名: $DOMAIN"
echo "API域名: $API_DOMAIN"

# 创建 SSL 目录
mkdir -p nginx/ssl

# 检查是否使用 Let's Encrypt
if [ "$3" = "letsencrypt" ]; then
    echo "使用 Let's Encrypt 自动证书..."
    
    # 安装 certbot
    if ! command -v certbot &> /dev/null; then
        echo "安装 certbot..."
        apt-get update
        apt-get install -y certbot
    fi
    
    # 获取证书
    certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN
    certbot certonly --standalone -d $API_DOMAIN
    
    # 复制证书到 nginx 目录
    cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/$DOMAIN.crt
    cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/$DOMAIN.key
    cp /etc/letsencrypt/live/$API_DOMAIN/fullchain.pem nginx/ssl/$API_DOMAIN.crt
    cp /etc/letsencrypt/live/$API_DOMAIN/privkey.pem nginx/ssl/$API_DOMAIN.key
    
    echo "✅ Let's Encrypt 证书配置完成"
else
    echo "请手动将 SSL 证书文件放入 nginx/ssl/ 目录："
    echo "- $DOMAIN.crt 和 $DOMAIN.key"
    echo "- $API_DOMAIN.crt 和 $API_DOMAIN.key"
fi 