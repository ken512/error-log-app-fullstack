# 開発環境と本番環境の両対応

# ステージ1: 依存関係のインストール（キャッシュ最適化）
FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev 

# ステージ2: 開発用（volumes対応）
FROM node:22-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ステージ3: ビルド
FROM dependencies AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ステージ4: 本番用（軽量）
FROM node:22-alpine AS production

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
