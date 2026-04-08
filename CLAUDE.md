# Cinema Seat Finder — プロジェクト仕様書

## プロジェクト概要

**アプリ名**: Cinema Seat Finder
**コンセプト**: 地図で映画館を探し、その劇場・スクリーンに応じたおすすめ座席を提案するアプリ
**用途**: 株式会社ゴーガへの応募用ポートフォリオ（地図・位置情報を活用した施設検索アプリ）

### 解決するユーザー課題

- 近くの映画館をすぐ探したい
- IMAX / Dolby Cinema / 4DX などの設備条件で映画館を比較したい
- どの席が見やすいかわからない
- 没入感重視か、全体の見やすさ重視かで最適な席が変わる
- 映画館選びから座席選びまでを一貫してサポートしてほしい

---

## 技術スタック

| 項目               | 採用技術                                     |
| ------------------ | -------------------------------------------- |
| フレームワーク     | Next.js (App Router)                         |
| 言語               | TypeScript                                   |
| スタイリング       | Tailwind CSS（コンポーネントライブラリなし） |
| 地図               | Google Maps JavaScript API                   |
| データ管理         | JSON（静的ファイル）                         |
| Linter / Formatter | ESLint + Prettier                            |
| ホスティング       | Vercel                                       |

---

## ディレクトリ構成

```txt
cinema_seat_finder/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # ルートレイアウト
│   ├── page.tsx                # トップページ（地図 + 一覧）
│   ├── theaters/
│   │   └── [id]/
│   │       └── page.tsx        # 映画館詳細ページ
│   └── api/                    # API Routes（必要な場合）
├── components/                 # 再利用可能なコンポーネント
│   ├── map/                    # 地図関連
│   ├── theater/                # 映画館関連
│   └── seat/                   # 座席関連
├── data/                       # JSONデータ
│   ├── theaters.json           # 映画館データ
│   ├── screens.json            # スクリーンデータ
│   └── seats.json              # 座席データ
├── lib/                        # ロジック・ユーティリティ
│   ├── seat-recommendation.ts  # おすすめ座席ロジック
│   └── types.ts                # 型定義
├── public/                     # 静的ファイル
├── .env.local                  # 環境変数（Gitに含めない）
├── CLAUDE.md                   # このファイル
└── README.md
```

---

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start

# Lint
npm run lint

# フォーマット
npx prettier --write .
```

---

## 環境変数

```.env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<Google Maps APIキー>
```

`.env.local` に設定する。コードや会話にAPIキーを含めない。

---

## 機能仕様（MVP）

### 実装する機能

1. **映画館検索機能**
   - 地図上で映画館をピンで表示
   - 映画館一覧と地図を連動表示
   - 現在地から近い映画館を検索
   - エリア・駅名・住所で検索

2. **絞り込み機能**
   - IMAX / Dolby Cinema / 4DX
   - 字幕・吹替上映対応
   - ミニシアター / 名画座
   - 駐車場あり

3. **映画館詳細ページ**
   - 基本情報（名称・住所・アクセス・設備・公式サイト）
   - スクリーン一覧
   - 座席マップ

4. **おすすめ座席表示機能**
   - 座席マップのビジュアル表示
   - おすすめ座席エリアのハイライト
   - おすすめ理由の表示
   - モード切り替え（2〜3種類）

### MVPスコープ外（後回し）

- ログイン / お気に入り保存
- 上映スケジュール自動取得
- 複数スクリーンの本格対応
- 管理画面
- 作品情報との詳細連携

---

## データ構造

### 映画館データ（`data/theaters.json`）

```typescript
type Theater = {
  theater_id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  facilities: string[]; // 例: ["IMAX", "Dolby Cinema", "4DX"]
  website: string;
  access_info: string;
};
```

### スクリーンデータ（`data/screens.json`）

```typescript
type Screen = {
  screen_id: string;
  theater_id: string;
  screen_name: string;
  seat_rows: number;
  seat_columns: number;
  aisle_positions: number[]; // 通路がある列インデックス
  screen_type: string; // 例: "standard", "IMAX"
};
```

### 座席データ（`data/seats.json`）

座席データは**スクリーン単位・モード単位**で管理する。座席1つずつにデータを持たせず、「どの座席がおすすめか」をリストで記述する。ロジックによる自動計算は行わない。

座席IDは `"行ラベル-列番号"` 形式（例: `"B-3"` = B列3番）。行ラベルは前から A, B, C ... のアルファベット順。

```typescript
type ModeRecommendation = {
  seats: string[]; // 例: ["B-3", "C-4"]（行ラベル-列番号）
  reason: string; // 例: "スクリーン中央に近く映像・音響のバランスが最も取れた位置"
};

type ScreenRecommendations = {
  screen_id: string;
  recommendations: {
    balance: ModeRecommendation; // バランス重視
    immersive: ModeRecommendation; // 没入感重視
    overview: ModeRecommendation; // 全体把握重視
    accessibility: ModeRecommendation; // 出入りしやすさ重視
    motion_sickness: ModeRecommendation; // 酔いにくさ重視
  };
};
```

---

## おすすめ座席の定義方針

おすすめ座席はロジックで自動計算せず、JSONデータに手動で記述する。

### モード一覧

- バランス重視
- 没入感重視
- 全体把握重視
- 出入りしやすさ重視
- 酔いにくさ重視

### 理由テキストの記述ルール

- 理由はモード単位で1つ記述する（座席ごとではない）
- 短く、ユーザーが直感的に理解できる表現にする
  - 例: 「スクリーン中央に近く映像・音響のバランスが最も取れた位置」
  - 例: 「後方からスクリーン全体を余裕を持って見渡せる」
  - 例: 「通路に隣接または端席で途中退席や出入りがしやすい」

---

## コーディング規約（プロジェクト固有）

- `var` 禁止。`const` / `let` のみ使用
- コンポーネントは `components/` に機能別ディレクトリで整理
- 型定義は `lib/types.ts` に集約する
- Google Maps APIの呼び出しは `components/map/` 内に閉じ込める
- JSONデータの読み込みは `lib/` 経由で行い、コンポーネントから直接 import しない
- Tailwind クラスが長くなる場合は `cn()` ユーティリティ関数（clsx + tailwind-merge）を使う

---

## 開発方針

- 一人・期限なし
- **作り切れる構成を最優先**：シンプルに保ち、動くものを完成させることを重視する
- **低コスト運用**：JSONデータで完結させ、外部DBは使わない（MVP）
- Google Maps APIの呼び出し回数に注意する（課金発生のため）
- 実在の映画館すべてをカバーするのは困難なため、対象館を絞るか、モデル化した座席表で対応する

---

## ポートフォリオとしての見せどころ

- 地図を使う必然性が明確な設計
- 映画という実体験に基づいた企画・課題設定
- 検索体験（地図+絞り込み）と推薦ロジックの両方を実装
- UI/UXの工夫（地図と一覧の連動、座席マップのビジュアライズ）

---

## 映画館データ追加ワークフロー

### 基本方針

- ユーザーが映画館情報を会話で提供し、Claude が JSON ファイルを編集する
- 追加対象の映画館・スクリーンはユーザーからの指示に従う（エリア指定なし）
- 提供形式は問わない（座席表の画像・URL・テキスト説明など）

### ユーザーが提供する情報

| 項目 | 必須 | 備考 |
|------|------|------|
| 映画館名 | ✅ | |
| 住所 | ✅ | |
| 緯度・経度 | — | 未提供時は住所から推定する |
| 設備 | — | IMAX / Dolby Cinema / 名画座 のみ対象 |
| 公式サイト URL | — | |
| アクセス情報 | — | 最寄り駅・出口など |
| スクリーン名・種別 | ✅ | |
| 座席表 | ✅ | 画像・URL・テキストのいずれか |

### Claude の作業手順

1. **ID を採番する**
   - `theater_id`: `"theater-N"`（既存の最大値 +1）
   - `screen_id`: `"screen-N"`（既存の最大値 +1）

2. **`data/theaters.json` に追加する**
   - 既存エントリの形式に揃えて末尾に追加する

3. **`data/screens.json` に追加する**
   - `seat_rows` / `seat_columns` は座席表から読み取る
   - `aisle_positions` は通路の位置から設定する（0始まりの列インデックス）

4. **`data/seats.json` に追加する**
   - `legroom`（足元ゆったり）: 最後列を基本とする
   - `love`（推し席）: スクリーンとの距離・通路アクセスを考慮して選定する
   - 理由テキストはスクリーン種別や映画館の特徴を踏まえて記述する

5. **型チェックを実行する**

```bash
npx tsc --noEmit
```

---

## コードレビュー仕様

### 実施タイミング

ユーザーから「コードレビューしてください」または特定ファイル・機能の指定があったとき。

### レビュー観点

以下の3観点を優先順に確認する。

#### ① コード品質・可読性

- 命名が意図を正確に表しているか
- 不要な複雑さ・重複がないか（同じロジックが複数箇所に存在しないか）
- コメントが適切か（自明なコードへの冗長なコメント、または説明が必要な箇所の欠如）
- 型定義が正確か（`any` の使用、型の曖昧さ）
- 不要なファイル・未使用の import / 変数がないか

#### ② パフォーマンス

- 不要な再レンダリングが発生していないか（`useMemo` / `useCallback` の適用漏れ）
- データフェッチが適切な場所（Server Component）で行われているか
- 画像・フォントの最適化が適切か

#### ③ アクセシビリティ

- インタラクティブ要素に適切な `role` / `aria-*` 属性があるか
- キーボード操作（`tabIndex` / `onKeyDown`）が考慮されているか
- カラーコントラストが十分か
- `<img>` に `alt` 属性があるか

### 出力フォーマット

レビュー結果は以下の形式で報告する。

```
## コードレビュー結果

### ① コード品質・可読性
- **[ファイルパス:行番号]** 問題の説明
  → 修正案

### ② パフォーマンス
- **[ファイルパス:行番号]** 問題の説明
  → 修正案

### ③ アクセシビリティ
- **[ファイルパス:行番号]** 問題の説明
  → 修正案

### 総評
全体的な評価と優先して対応すべき項目のまとめ。
```

問題がない観点は「指摘なし」と明記する。
