#Dockerfile

# Use the official lightweight Node.js image.
FROM node:16-alpine

# Set the working directory to the root of your project
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the project
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set the command to start the node server
CMD ["npm", "start"]

#
