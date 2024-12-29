
# Use the official Node.js  image as the base image
FROM node:20

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 to allow external access to the application
EXPOSE 3000

# Define the command to run the application using npm
CMD ["npm", "start"]