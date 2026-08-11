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

## 初回セットアップ（環境構築）

```bash
make setup
```

このコマンドで以下が自動実行されます：
1. `.env.example` から `.env` を作成
2. Docker・PostgreSQL・PgAdmin を起動

起動後、`.env` の環境変数をプロジェクト関係者に確認して修正してください。

---

## Docker・PostgreSQL・PgAdmin の起動（2回目以降）

```bash
make up
```

このコマンドで以下が起動します：
- Next.js アプリケーション（http://localhost:3000）
- PostgreSQL（localhost:5433）
- PgAdmin 4（http://localhost:5050）

停止する場合：

```bash
make down
```

---

## Prisma マイグレーション（初回のみ）

```bash
make migrate
```

---

## よく使うコマンド

| コマンド | 説明 |
|---------|------|
| `make up` | Docker 起動（app + PostgreSQL + PgAdmin） |
| `make down` | Docker 停止 |
| `make migrate` | Prisma マイグレーション実行 |
| `make db` | PostgreSQL に接続（psql） |
| `make studio` | Prisma Studio 起動 |
| `make logs` | Docker ログ表示 |

---

## PgAdmin 4 でデータベースを確認

1. http://localhost:5050 にアクセス
2. ログイン：`.env` の `PGADMIN_EMAIL` / `PGADMIN_PASSWORD`
3. サーバー登録：
   - Hostname: `postgres`
   - Port: `5432`
   - Username: `.env` の `POSTGRES_USER`
   - Password: `.env` の `POSTGRES_PASSWORD`

---

## ローカルサーバーの起動（代替方法）

通常は `make up` で起動しますが、Next.js だけをローカルで起動したい場合：

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

- ユーザー登録     /signup
- ログイン        /login
- ユーザーアカウント /user-account 
- エラーログ登録.  /new-errorLog
- エラーログ一覧.  /errorLog-list
- エラーログ詳細.  /detail-errorLog
- エラーログ編集.  /errorLog-edit
- エラーログ削除
- キーワード検索

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

このプロジェクトは、スケーラビリティとメンテナンス性を確保するために **bulletproof-react** のアーキテクチャを採用しています。ファイルの種類ではなく機能（feature）ごとにファイルを整理することを基本思想としています。

## ディレクトリ構成

```
src/
├── app/              # アプリケーション層（レイアウト、ページ、Route Handler）
├── components/       # 共有のUIコンポーネント（例: Button, Modal）
├── features/         # 機能ベースのモジュール（例: 認証、エラーログ）
├── config/           # タグ一覧など、アプリ全体で使う定数
├── hooks/            # 共有のカスタムフック
├── lib/              # 設定済みのライブラリ（例: Prisma, Auth.js）
├── types/            # 共有のTypeScript型定義
└── utils/            # 共有の便利関数
```

## ディレクトリの役割

### `src/app/`
Next.js の App Router で使用するレイアウト・ページ・Route Handlers を配置します。

**例：**
```
app/
├── (auth)/          # 認証関連ページ（ログイン、サインアップ）
├── (dashboard)/     # 認証後のメインページ
├── api/             # Route Handlers（APIエンドポイント）
└── layout.tsx
```

### `src/components/`
複数の機能で再利用される UI コンポーネントを配置します。

**例：** Button, Modal, Card, Header, Footer など

### `src/features/`
特定の機能に関連するコードを機能ごとにディレクトリで管理します。
- API ロジック
- ビジネスロジック
- UI コンポーネント（機能特有）
- TypeScript 型定義（機能特有）

**例：**
```
features/
├── auth/            # 認証機能
├── error-log/       # エラーログ機能
├── tag/             # タグ管理機能
└── user/            # ユーザー管理機能
```

### `src/config/`
アプリケーション全体で使用される定数を配置します。

**例：** タグ一覧、API のベース URL、設定値 など

### `src/hooks/`
複数の機能で再利用されるカスタムフックを配置します。

**例：** useAuth, useFetch, useLocalStorage など

### `src/lib/`
設定済みのライブラリやユーティリティを配置します。

**例：**
```
lib/
├── auth.ts          # Auth.js の設定
├── prisma.ts        # Prisma Client
└── db.ts            # データベース関連ユーティリティ
```

### `src/types/`
複数の機能で使用される共有の TypeScript 型定義を配置します。

**例：** User, ErrorLog, Tag など

### `src/utils/`
複数の機能で再利用される便利関数を配置します。

**例：** 日付フォーマット、文字列加工、バリデーション など

## 主要な原則

### 機能第一（Feature-First）
特定の機能に関連するコードは `src/features` 内の専用ディレクトリにまとめて配置します。

### 共有とローカルの分離
- **複数機能で再利用**: `components/`, `hooks/`, `lib/`, `utils/` に配置
- **単一機能のみ**: その機能の `features/` ディレクトリ内に配置

### 疎結合
各機能は可能な限り独立しているべきです。機能間の直接インポート（例: `features/auth` から `features/error-log` をインポート）は避けてください。

### api
```
/src/app/
  (public)  # 未ログインユーザー向け

    errorlog-list/  # エラーログ一覧
      route.ts  # GET: 全ユーザーのエラーログ情報を取得
      
      errorlog-list/[id]/  # エラーログ詳細
      route.ts  # GET: 特定のエラーログ詳細情報を取得

      user-account/ # ユーザーアカウント
      route.ts # GET: ユーザーアカウント情報を取得
               # PUT: ユーザーアカウント情報を更新(編集可)

  (admin)  # ログインユーザー向け

    user-account/  # ユーザーアカウント
      route.ts  # GET: アカウント情報取得, PUT: 更新
    errorlog  # エラーログ登録フォーム
      route.ts  # POST: 新規投稿
    errorlog-edit/  # エラーログ編集
      route.ts  # PUT: 更新、DELETE: 削除
```


## DB設計
このアプリでやりたいこと。

- 一人のユーザーが複数のエラーログ投稿ができる (1対多)
- 一件のエラーログに対して、一人にユーザーが編集・投稿・削除ができる。(1対多)
- 複数のエラーログ投稿に対して、複数のタグをつけることができる。 ​(多対多)
- 複数のタグに対して、複数のエラーログにつけることができる。 ​(多対多)
- エラーログテーブルとタグテーブルは、​多対多のため、中間テーブルを設ける(ErrorLogTagテーブル)

<img width="1200" height="800" alt="エンティティ.png" src="/public/エンティティ.png" />

## ER図
<img width="1200" height="800" alt="ER図.png" src="/public/ER図.png" />