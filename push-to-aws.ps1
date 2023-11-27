# get authentication token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 120244965420.dkr.ecr.us-east-1.amazonaws.com

# build images
docker compose -f .\compose-prod.yaml build

# Create tag names on images
docker tag michaels-chalet-frontend:latest 120244965420.dkr.ecr.us-east-1.amazonaws.com/michaels-chalet-frontend:latest
docker tag michaels-chalet-backend:latest 120244965420.dkr.ecr.us-east-1.amazonaws.com/michaels-chalet-backend:latest

# Push images to ECR registry
docker push 120244965420.dkr.ecr.us-east-1.amazonaws.com/michaels-chalet-frontend:latest
docker push 120244965420.dkr.ecr.us-east-1.amazonaws.com/michaels-chalet-backend:latest