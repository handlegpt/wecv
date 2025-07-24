FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install necessary system dependencies for Puppeteer, Prisma, and other tools
RUN apk add --no-cache \
    libc6-compat \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    openssl \
    openssl-dev \
    python3 \
    make \
    g++ \
    sqlite \
    postgresql-client

# Set environment variables for Puppeteer and Prisma
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PRISMA_ENGINE_CHECKSUM_IGNORE=1

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with force flag to resolve conflicts
RUN npm ci --legacy-peer-deps && npm cache clean --force
RUN npm audit --production --audit-level=high || echo "[WARNING] npm audit 检查未通过，请及时修复依赖安全问题。"

# Copy source code
COPY . .

# Generate Prisma client with explicit engine download
RUN npx prisma generate --schema=./prisma/schema.prisma

# Create necessary directories
RUN mkdir -p uploads exports temp

# Set proper permissions
RUN chmod -R 755 uploads exports temp

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start command with database initialization
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm run dev"] 