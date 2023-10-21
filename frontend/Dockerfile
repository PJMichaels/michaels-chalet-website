# Use an official Node runtime as a base image
FROM node:14

# Set the working directory
WORKDIR /frontend

# Install dependencies
COPY package.json package-lock.json /frontend/
RUN npm install

# Copy the current directory contents into the container
COPY . /frontend/

# Start the app
CMD ["npm", "start"]
