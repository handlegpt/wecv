#!/bin/bash

# Database backup script
# Automatically backup at 2 AM daily

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="wecv_ai_backup_$DATE.sql"

echo "Starting database backup..."

# Create backup
pg_dump -h db -U postgres -d wecv_ai > "$BACKUP_DIR/$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "Backup successful: $BACKUP_FILE"
    
    # Compress backup file
    gzip "$BACKUP_DIR/$BACKUP_FILE"
    
    # Delete backups older than 7 days
    find "$BACKUP_DIR" -name "wecv_ai_backup_*.sql.gz" -mtime +7 -delete
    
    echo "Backup completed, deleted backup files older than 7 days"
else
    echo "Backup failed"
    exit 1
fi 