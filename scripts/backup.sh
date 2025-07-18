#!/bin/bash

# 数据库备份脚本
# 每天凌晨2点自动备份

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="wecv_ai_backup_$DATE.sql"

echo "开始备份数据库..."

# 创建备份
pg_dump -h db -U postgres -d wecv_ai > "$BACKUP_DIR/$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "备份成功: $BACKUP_FILE"
    
    # 压缩备份文件
    gzip "$BACKUP_DIR/$BACKUP_FILE"
    
    # 删除7天前的备份
    find "$BACKUP_DIR" -name "wecv_ai_backup_*.sql.gz" -mtime +7 -delete
    
    echo "备份完成，已删除7天前的备份文件"
else
    echo "备份失败"
    exit 1
fi 