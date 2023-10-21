# This is a one command approach to start this app from the repo root

# Step 1 Populate an updated requirements.txt file
pipenv requirements > ./backend/requirements.txt

# Step 2 Run Docker Compose
docker-compose up