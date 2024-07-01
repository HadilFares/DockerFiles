# Base image with production-optimized Node.js (consider Alpine Linux for smaller size)
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and install dependencies (use multi-stage build for efficiency)
COPY package*.json ./
RUN npm install 

# Copy remaining application files (excluding node_modules)
COPY . . 

# Build the application
RUN npm run build

# Switch to a slimmer runtime image for production
FROM node:18-alpine AS runner

WORKDIR /app
RUN apk update

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy production-ready application files
COPY --from=builder /app .

# Change ownership of the necessary directories
RUN mkdir -p /app/.next/cache && chown -R appuser:appgroup /app/.next

# Expose port for Next.js app (typically 3000)
EXPOSE 3000

# Set user to non-root
USER appuser

# Start Next.js production server
CMD [ "npm", "run", "start" ]