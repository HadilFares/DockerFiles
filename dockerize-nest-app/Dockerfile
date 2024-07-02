# Stage 1: Build Stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /usr/src/app
# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the necessary files from the build stage in one line
COPY --from=build /usr/src/app .
# Change ownership of the working directory
RUN chown -R appuser:appgroup /usr/src/app/dist
# Switch to the non-root user
USER appuser
# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
