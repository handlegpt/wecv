FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install necessary system dependencies
RUN apk add --no-cache libc6-compat

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with clean cache
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "start"] 