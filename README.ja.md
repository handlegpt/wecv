# WeCV AI - Intelligent Resume Generation & Management Platform

[English](README.md) | [中文](README.zh.md) | [日本語](README.ja.md)

WeCV AIは、AIを活用したインテリジェントな履歴書生成・管理プラットフォームで、多言語、多テンプレート、多形式エクスポート機能を提供し、ユーザーが迅速にプロフェッショナルな履歴書を作成できるよう支援します。

## 🚀 機能

### コア機能
- **スマート履歴書生成**: AIを活用した履歴書コンテンツ生成
- **複数テンプレート**: モダン、クラシック、クリエイティブなど、プロフェッショナルなテンプレート
- **リアルタイムプレビュー**: デスクトップ、モバイル、印刷プレビューモード
- **多形式エクスポート**: PDF、Word、HTMLなどの形式
- **AI執筆アシスタント**: インテリジェントなコンテンツ最適化とプロフェッショナルな提案
- **履歴書分析**: AI駆動の履歴書スコアリングと改善提案

### ユーザー管理
- **ユーザー登録・ログイン**: メールベースの登録とログイン
- **個人設定**: プロフィール管理、パスワード変更、通知設定
- **プライバシー制御**: 履歴書の公開設定、メール表示制御
- **権限管理**: 管理者権限を持つユーザーロール管理

### 管理機能
- **管理者ダッシュボード**: ユーザー管理、データ分析、システム監視
- **データ分析**: ユーザー数、履歴書数、アクティビティ統計
- **テンプレート管理**: 履歴書テンプレートのCRUD操作
- **システム監視**: システム運用状況の監視

### 技術機能
- **レスポンシブデザイン**: デスクトップとモバイルのサポート
- **リアルタイム保存**: 自動コンテンツ保存
- **共有機能**: 履歴書共有リンクの生成
- **多言語サポート**: 中国語と英語のインターフェース
- **セキュア認証**: JWTトークン認証メカニズム

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 14**: SSRとSSGをサポートするReactフレームワーク
- **TypeScript**: 型安全なJavaScript
- **Tailwind CSS**: ユーティリティファーストCSSフレームワーク
- **React Hot Toast**: 軽量通知コンポーネント

### バックエンド
- **Node.js**: JavaScriptランタイム
- **Express**: Webアプリケーションフレームワーク
- **TypeScript**: 型安全なJavaScript
- **Prisma ORM**: データベースORMツール
- **PostgreSQL**: リレーショナルデータベース
- **Redis**: キャッシュデータベース
- **JWT**: JSON Web Token認証

### AIサービス
- **OpenAI API**: GPTモデル統合
- **スマート分析**: 履歴書コンテンツ分析と最適化提案

### デプロイメント
- **Docker**: コンテナ化デプロイメント
- **Docker Compose**: マルチサービスオーケストレーション
- **Nginx**: リバースプロキシサーバー
- **SSL証明書**: HTTPSセキュアアクセス

## 📦 クイックスタート

### 前提条件
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 6+

### 1. プロジェクトのクローン
```bash
git clone https://github.com/handlegpt/wecv.git
cd wecv
```

### 2. 環境設定
```bash
# 環境設定ファイルのコピー
cp .env.example .env
cp .env.prod.example .env.prod

# 設定ファイルの編集
vim .env
```

### 3. Dockerデプロイメント（推奨）
```bash
# 全サービスのワンクリック起動
./start.sh dev

# または手動起動
docker-compose up -d
```

### 4. 開発環境デプロイメント
```bash
# 依存関係のインストール
npm install
cd frontend && npm install
cd ../backend && npm install

# データベースの起動
docker-compose up -d postgres redis

# データベースマイグレーション
cd backend
npx prisma migrate dev
npx prisma generate

# バックエンドサービスの起動
npm run dev

# フロントエンドサービスの起動
cd ../frontend
npm run dev
```

## 🔧 設定

### 環境変数
```bash
# データベース設定
DATABASE_URL="postgresql://username:password@localhost:5432/wecv"

# Redis設定
REDIS_URL="redis://localhost:6379"

# JWTシークレット
JWT_SECRET="your-jwt-secret"

# OpenAI API
OPENAI_API_KEY="your-openai-api-key"

# アプリケーション設定
NEXT_PUBLIC_API_URL="http://localhost:3001"
FRONTEND_URL="http://localhost:3000"
```

### 本番環境デプロイメント
```bash
# 本番環境設定の使用
docker-compose -f docker-compose.prod.yml up -d

# デプロイスクリプトの実行
./deploy.sh
```

## 📁 プロジェクト構造

```
wecv-ai/
├── frontend/                 # フロントエンドアプリケーション
│   ├── app/                 # Next.js 14 App Router
│   ├── components/          # Reactコンポーネント
│   ├── lib/                # ユーティリティライブラリ
│   └── public/             # 静的リソース
├── backend/                 # バックエンドアプリケーション
│   ├── src/
│   │   ├── controllers/    # コントローラー
│   │   ├── routes/         # ルート
│   │   ├── middlewares/    # ミドルウェア
│   │   └── types/          # 型定義
│   └── prisma/             # データベースモデル
├── nginx/                  # Nginx設定
├── scripts/                # デプロイスクリプト
├── docker-compose.yml      # 開発環境設定
├── docker-compose.prod.yml # 本番環境設定
└── README.md              # プロジェクトドキュメント
```

## 🎯 使用ガイド

### ユーザー機能
1. **登録・ログイン**: メールでアカウント登録
2. **履歴書作成**: テンプレート選択、個人情報入力
3. **AIアシスタント**: AIを使用した履歴書コンテンツ最適化
4. **プレビュー・エクスポート**: リアルタイムプレビューと履歴書エクスポート
5. **履歴書共有**: 共有リンクの生成

### 管理者機能
1. **ユーザー管理**: ユーザーアカウントの表示と管理
2. **データ分析**: プラットフォーム使用データの表示
3. **システム監視**: システム運用状況の監視
4. **テンプレート管理**: 履歴書テンプレートの管理

## 🔒 セキュリティ機能

- **JWT認証**: セキュアなユーザー認証メカニズム
- **パスワード暗号化**: bcryptパスワードハッシュ
- **CORS設定**: クロスオリジンリクエストセキュリティ制御
- **入力検証**: サーバーサイドデータ検証
- **SQLインジェクション保護**: Prisma ORM自動保護
- **XSS保護**: フロントエンド入力フィルタリング

## 📊 パフォーマンス最適化

- **Redisキャッシュ**: データベースクエリの削減
- **画像最適化**: 自動画像圧縮
- **コード分割**: オンデマンドコンポーネント読み込み
- **CDNサポート**: 静的リソースCDN加速
- **データベースインデックス**: クエリパフォーマンスの最適化

## 🤝 貢献

1. プロジェクトをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを開く

## 📝 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は[LICENSE](LICENSE)ファイルを参照してください

## 🆘 サポート

問題が発生した場合や提案がある場合は：

1. [GitHub Issues](https://github.com/handlegpt/wecv/issues)を確認
2. 新しいIssueを作成
3. 開発チームに連絡

## 🙏 謝辞

- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [Tailwind CSS](https://tailwindcss.com/) - CSSフレームワーク
- [Prisma](https://www.prisma.io/) - データベースORM
- [OpenAI](https://openai.com/) - AIサービス
- [Docker](https://www.docker.com/) - コンテナ化プラットフォーム

---

**WeCV AI** - 履歴書作成をよりスマートでプロフェッショナルに！ 