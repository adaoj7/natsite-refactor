# Use the official Node.js image as the base image
FROM node:20.5.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies
RUN npm install
RUN npm install -g pm2

# Expose the port the app runs on
EXPOSE 4242

# Define the command to run your application
CMD ["sh", "-c", "npm run pm2-build"]