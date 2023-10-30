# get authentication token
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 120244965420.dkr.ecr.us-east-2.amazonaws.com

# ensure the build is current
docker compose -f ./compose-prod build

# Create tag names on images
docker tag michaels-chalet-website-frontend-prod:latest 120244965420.dkr.ecr.us-east-2.amazonaws.com/michaels-chalet-app-frontend
docker tag michaels-chalet-website-backend-prod:latest 120244965420.dkr.ecr.us-east-2.amazonaws.com/michaels-chalet-app-backend

# Push images to ECR registry
docker push 120244965420.dkr.ecr.us-east-2.amazonaws.com/michaels-chalet-app-frontend:latest
docker push 120244965420.dkr.ecr.us-east-2.amazonaws.com/michaels-chalet-app-backend:latest