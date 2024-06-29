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

# Find the most recent backup file
BACKUP_FILE=$(ls -t $BACKUP_DIR/*.sql | head -1)

# Restore the backup
if [ -f "$BACKUP_FILE" ]; then
  docker exec -i $CONTAINER_NAME psql -U $USERNAME $DATABASE_NAME -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
  cat $BACKUP_FILE | docker exec -i $CONTAINER_NAME psql -U $USERNAME $DATABASE_NAME
  echo "Database restored from $BACKUP_FILE"
else
  echo "No backup file found to restore."
fi