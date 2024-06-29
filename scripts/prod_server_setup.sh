#!/bin/bash
# This script is a bit of a work in progress. Right now the root project path is hardcoded.

# This section creates a cron job to backup the database every night at 2 AM
# Variables
PROJECT_ROOT_PATH="/home/truejambles/Projects/michaels-chalet-website" # need to get this in a smarter way
BACKUP_SCRIPT_PATH="$PROJECT_ROOT_PATH/scripts/db_backup.sh"
CRON_SCHEDULE="0 2 * * *"  # Runs daily at 2 AM

# Create a cron job
(crontab -l 2>/dev/null; echo "$CRON_SCHEDULE $BACKUP_SCRIPT_PATH") | crontab -

echo "Cron job created to run backup script at $CRON_SCHEDULE"