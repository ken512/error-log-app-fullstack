# Error Log App

開発中に発生したエラーを記録し、原因・解決方法・調査内容を蓄積するナレッジ管理アプリです。

同じエラーで何度も悩まないために、エラー内容を記録・検索・再利用できることを目的としています。

---

# 開発者向け情報

## 前提条件

- Node.js 22.x 以上
- Next.js 15.5.18 以上
- npm 10.x 以上
- Docker
- Docker Compose

---

## 依存パッケージのインストール

```bash
npm install
```

---

## 環境変数の設定

プロジェクトルートに `.env` ファイルを作成し、以下の環境変数を設定してください。

```env
# Database
DATABASE_URL=

# Authentication
AUTH_SECRET=
AUTH_URL=http://localhost:3000
```

---

## Docker(PostgreSQL)の起動

```bash
docker compose up -d
```

停止

```bash
docker compose down
```

---

## Prisma

マイグレーション

```bash
npx prisma migrate dev
```

Prisma Client生成

```bash
npx prisma generate
```

Prisma Studio起動

```bash
npx prisma studio
```

---

## ローカルサーバーの起動

```bash
npm run dev
```

起動後

```
http://localhost:3000
```

へアクセスしてください。

---

# 技術スタック

| カテゴリ | 技術 |
|----------|------|
| フロントエンド | Next.js / React / TypeScript |
| スタイリング | Tailwind CSS |
| フォーム | React Hook Form / Zod |
| バックエンド | Next.js Route Handlers |
| データベース | PostgreSQL |
| ORM / Migration | Prisma |
| SQL | PostgreSQL（生SQL） |
| ローカル環境 | Docker / Docker Compose |
| 認証 | Auth.js |
| デプロイ | AWS EC2（予定） |
| バージョン管理 | Git / GitHub |

---

# 主な機能

- ユーザー登録
- ログイン / ログアウト
- エラーログ登録
- エラーログ一覧
- エラーログ詳細
- エラーログ編集
- エラーログ削除
- キーワード検索
- タグ管理
- ユーザーごとのログ管理

---

# データベース設計方針

本プロジェクトでは、**SQLを理解・習得すること**を目的として、Prismaをマイグレーションおよびスキーマ管理に利用し、データ操作は可能な限り**生SQL**で実装します。

## Prismaの役割

- スキーマ管理
- マイグレーション
- Prisma Client生成

## 生SQLを採用する理由

- SQLの理解を深めるため
- CRUD操作をSQLで実装できるようになるため
- JOIN・GROUP BY・ORDER BYなどのクエリを習得するため
- ORMに依存しないデータベース操作を学ぶため

---

# プロジェクト構成

本プロジェクトは、保守性・拡張性を意識し、**Feature First** のアーキテクチャを採用しています。

```
src/
├── app/                    # App Router
│   ├── (auth)              # 認証関連
│   ├── (dashboard)         # ログイン後画面
│   ├── api/                # Route Handlers(API)
│   └── layout.tsx
│
├── components/             # 共通UI
│
├── features/
│   ├── auth/
│   ├── error-log/
│   ├── tag/
│   └── user/
│
├── hooks/
│
├── lib/
│   ├── auth/
│   ├── prisma/
│   └── validations/
│
├── constants/
│
├── types/
│
└── utils/
```
