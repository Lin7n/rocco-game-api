# ===== 洛克王国：世界 手游助手 - 后端 Dockerfile =====
# 阶段1：构建依赖
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ===== 阶段2：运行时镜像 =====
FROM node:22-alpine AS runtime
LABEL maintainer="game-tool-miniapp" \
      version="1.0" \
      description="洛克王国：世界 手游助手 后端 API"

# 时区（容器默认UTC，改为上海时区让日志时间合理）
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone && \
    apk del tzdata

WORKDIR /app

# 创建非root用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S backend -u 1001 -G nodejs

# 复制依赖和代码
COPY --from=deps --chown=backend:nodejs /app/node_modules ./node_modules
COPY --chown=backend:nodejs src ./src
COPY --chown=backend:nodejs package.json ./

USER backend

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-3001}/health || exit 1

ENV NODE_ENV=production \
    PORT=3001

EXPOSE 3001

CMD ["node", "src/index.js"]
