# Use a smaller base image, node:alpine, which is much smaller in size
FROM node:alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Install dependencies
# Copying package.json and package-lock.json separately to leverage Docker cache
COPY package.json package-lock.json ./

# Install only production dependencies
# If you need development dependencies for building, omit `--production`
RUN npm ci --only=production

# Bundle app source
COPY . .

# Build the Next.js app
RUN npm run build

# Production stage: Use a clean, new stage to minimize the final image size
FROM node:alpine
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/next.config.js ./next.config.js
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "start" ]
