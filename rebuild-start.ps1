# This is a one command approach to start this app from the repo root

# Populate an updated requirements.txt file
pipenv requirements > ./backend/requirements.txt

# Build and run Docker Compose
docker-compose build
docker-compose up