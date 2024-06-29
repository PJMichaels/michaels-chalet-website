#!/bin/bash
# This script is a bit of a work in progress. Right now the root project path is hardcoded.

# Load environment variables from .env file
set -o allexport
source ./backend/.env
set +o allexport

# Variables
PROJECT_ROOT_PATH="/home/truejambles/Projects/michaels-chalet-website" # need to get this in a smarter way
CONTAINER_NAME="michaels-chalet-db"
USERNAME="$DB_USER"
DATABASE_NAME="$DB_NAME"
BACKUP_DIR="$PROJECT_ROOT_PATH/database/backups"
BACKUP_FILE="$BACKUP_DIR/backup_$(date +%F).sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create a backup
docker exec -t $CONTAINER_NAME pg_dump -U $USERNAME $DATABASE_NAME > $BACKUP_FILE
echo "Created a new database backup file"


# Optional: Delete old backups (e.g., older than 7 days)
find $BACKUP_DIR -type f -name "*.sql" -mtime +7 -exec rm {} \;
