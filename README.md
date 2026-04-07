# Cinema Seat Finder

地図で映画館を探し、スクリーンに応じたおすすめ座席を提案するアプリです。

## 機能

- **映画館を地図で検索** — Google Maps 上にピンで映画館を表示。ピンと一覧カードを連動して選択できます
- **現在地から探す** — Geolocation API で現在地を取得し、地図を自動移動
- **設備で絞り込み** — IMAX / Dolby Cinema / 名画座 でフィルタリング
- **映画館詳細表示** — 住所・アクセス・設備・公式サイトリンク・スクリーン一覧
- **おすすめ座席提案** — 「足元ゆったり」「推し席」の2モードで座席番号とコメントを表示

## 技術構成

| 項目 | 採用技術 |
|------|----------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| 地図 | Google Maps JavaScript API (@vis.gl/react-google-maps) |
| データ管理 | JSON（静的ファイル） |
| ホスティング | Vercel |

## 起動方法

### 1. リポジトリをクローン

```sh
git clone <repository-url>
cd cinema_seat_finder
```

### 2. 依存関係をインストール

```sh
npm install
```

### 3. 環境変数を設定

`.env.local` を作成し、Google Maps API キーを設定します。

```sh
cp .env.local.example .env.local
# .env.local を編集して API キーを入力
```

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

> Google Maps API キーは [Google Cloud Console](https://console.cloud.google.com/) で取得できます。Maps JavaScript API を有効にしてください。

### 4. 開発サーバーを起動

```sh
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてください。

## その他のコマンド

```sh
npm run build   # 本番ビルド
npm run start   # 本番サーバー起動
npm run lint    # ESLint チェック
npx prettier --write .  # コードフォーマット
```

## ディレクトリ構成

```
cinema_seat_finder/
├── app/                        # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx                # トップページ（地図 + 映画館一覧）
│   ├── not-found.tsx           # 404 ページ
│   ├── error.tsx               # エラーページ
│   ├── loading.tsx             # ローディング UI
│   └── theaters/[id]/          # 映画館詳細ページ
├── components/
│   ├── HomeLayout.tsx
│   ├── map/                    # 地図関連
│   ├── theater/                # 映画館関連
│   └── seat/                   # 座席関連
├── data/                       # JSON データ
│   ├── theaters.json
│   ├── screens.json
│   └── seats.json
└── lib/                        # 型定義・ユーティリティ
    ├── types.ts
    ├── data.ts
    └── cn.ts
```
