# WeCV AI 后端 Dockerfile - 安全优化版本
FROM node:18-alpine AS base

# 安装安全更新和必要的包
RUN apk update && apk upgrade && \
    apk add --no-cache libc6-compat dumb-init && \
    rm -rf /var/cache/apk/*

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# 保留 package-lock.json 以确保依赖版本一致性
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund && \
    npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs api

# 创建必要的目录并设置权限
RUN mkdir -p logs && \
    chown -R api:nodejs /app

# Copy built application
COPY --from=builder --chown=api:nodejs /app/dist ./dist
COPY --from=builder --chown=api:nodejs /app/package.json ./package.json

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production --no-audit --no-fund && \
    npm cache clean --force

# 切换到非 root 用户
USER api

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

EXPOSE 5000

ENV PORT 5000

# 使用 dumb-init 作为 PID 1，正确处理信号
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/server.js"]
