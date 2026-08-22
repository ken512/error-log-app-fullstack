# 開発環境と本番環境の両対応

# 共通ベース
FROM node:22-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

# ステージ1: 依存関係のインストール（キャッシュ最適化）
FROM base AS dependencies

COPY package*.json ./

RUN npm ci --omit=dev

# ステージ2: 開発用（volumes対応）
FROM base AS development

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm exec prisma -- generate

ENV NODE_ENV=development

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ステージ3: ビルド
FROM base AS builder

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm exec prisma -- generate

RUN npm run build

# ステージ4: 本番用（軽量）
FROM base AS production

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src/generated ./src/generated

EXPOSE 3000

CMD ["npm", "start"]
