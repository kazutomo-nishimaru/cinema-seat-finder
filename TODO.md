# Cinema Seat Finder — 実行計画 TODO

## Phase 0: 環境構築・初期設定

- [x] Next.js プロジェクトを作成する（TypeScript / ESLint / Tailwind CSS を有効化）
- [x] Prettier をインストールし、`.prettierrc` を設定する
- [x] `clsx` と `tailwind-merge` をインストールし、`lib/cn.ts` に `cn()` ユーティリティを作成する
- [x] `.env.local` を作成し、`.gitignore` に追加されていることを確認する
- [x] Google Maps API キーを取得し、`.env.local` に設定する
- [x] ディレクトリ構成（`app/`, `components/`, `data/`, `lib/`）を作成する
- [x] Git リポジトリを初期化し、初回コミットを行う

---

## Phase 1: 型定義・JSONデータ作成

- [x] `lib/types.ts` に型定義を記述する（`Theater`, `Screen`, `ScreenRecommendations`, `ModeRecommendation`）
- [x] `lib/data.ts` にJSONデータを読み込むユーティリティ関数を作成する
- [x] 対象とする映画館を選定する（実在の映画館から数館に絞る、またはモデルデータで代用）
- [x] `data/theaters.json` に映画館データを記述する
- [x] `data/screens.json` にスクリーンデータを記述する（1館につき1〜2スクリーン程度）
- [x] `data/seats.json` に座席データを記述する（スクリーン単位・モード単位のおすすめ座席リスト形式）
  - [x] 各モード（バランス / 没入感 / 全体把握 / 出入り / 酔いにくさ）のおすすめ座席と理由テキストを手動記述する

---

## Phase 2: トップページ（地図 + 映画館一覧）

- [x] `app/page.tsx` のレイアウトを作成する（左：一覧パネル、右：地図エリア）
- [x] `components/map/TheaterMap.tsx` を作成する
  - [x] Google Maps JavaScript API を読み込む（@vis.gl/react-google-maps）
  - [x] 映画館の位置にピンを表示する
  - [x] ピンをクリックで映画館を選択状態にする
- [x] `components/theater/TheaterList.tsx` を作成する
  - [x] 映画館一覧をカード形式で表示する
  - [x] カードをクリックで映画館詳細ページへ遷移する
- [x] 地図と一覧を連動させる（地図のピンと一覧カードで選択状態を共有）
- [x] 現在地取得ボタンを実装する（Geolocation API）

---

## Phase 3: 絞り込み機能

- [x] `components/theater/FilterPanel.tsx` を作成する
  - [x] チェックボックス形式で設備条件を表示する（IMAX / Dolby Cinema / 4DX / 字幕 / 吹替 / ミニシアター / 名画座 / 駐車場）
- [x] フィルター状態を管理し、地図のピンと一覧カードに反映する
- [x] フィルターを全解除するリセットボタンを追加する

---

## Phase 4: 映画館詳細ページ

- [x] `app/theaters/[id]/page.tsx` を作成する
- [x] 映画館の基本情報を表示する（名称 / 住所 / アクセス / 設備 / 公式サイトリンク）
- [x] `components/theater/TheaterDetail.tsx` を作成する
- [x] スクリーン一覧を表示する
- [x] 各スクリーンの座席マップへのリンク（またはアコーディオン展開）を実装する

---

## Phase 5: 座席マップ・おすすめ座席表示

- [x] `components/seat/SeatMap.tsx` を作成する
  - [x] 座席をグリッドで表示する（行・列の構造を再現）
  - [x] 通路位置に応じてギャップを入れる
- [x] `components/seat/SeatCell.tsx` を作成する
  - [x] 通常席 / おすすめ席 / 非おすすめ席でスタイルを切り替える
  - [x] おすすめ席をホバー / クリックで理由テキストを表示する
- [x] `components/seat/RecommendModeSelector.tsx` を作成する
  - [x] 5つのモードをボタン形式で切り替えられるUIを作成する
- [x] モード切り替えに応じて `SeatMap` のハイライトが変わるよう状態管理する

---

## Phase 6: 仕上げ・デプロイ

- [x] レスポンシブ対応を確認・調整する（モバイル表示）
- [x] ローディング UI を追加する（`loading.tsx` / スケルトン）
- [x] エラー UI を追加する（`error.tsx` / 404ページ）
- [x] Lint・フォーマットを通す（`npm run lint` / `npx prettier --write .`）
- [x] Vercel にデプロイする
  - [x] 環境変数 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` を Vercel に設定する
- [x] `README.md` を作成する（概要・機能・技術構成・起動方法）

---

## Phase 7: 映画館データ拡充

ユーザーからの指示に基づき、随時追加する。1館追加するごとに以下を繰り返す。

- [ ] ユーザー提供の情報（画像・URL・テキスト）をもとに `data/theaters.json` にエントリを追加する
  - `theater_id` は既存の最大値 +1 で採番する
  - 緯度・経度が未提供の場合は住所から推定する
- [ ] `data/screens.json` にスクリーン情報を追加する
  - `screen_id` は既存の最大値 +1 で採番する
  - 座席表から `seat_rows` / `seat_columns` / `aisle_positions` を読み取る
- [ ] `data/seats.json` におすすめ座席を追加する
  - `legroom`（足元ゆったり）: 最後列を基本に選定する
  - `love`（推し席）: スクリーンとの距離・通路アクセスを考慮して選定する
  - 各モードに理由テキストを記述する
- [ ] `npx tsc --noEmit` で型エラーがないことを確認する

---

## Phase 8: コードレビュー・品質改善

### レビュー実施

- [ ] **コード品質・可読性** のレビューを実施する
  - 命名・構造・重複・型定義・不要コードを確認する
- [ ] **パフォーマンス** のレビューを実施する
  - 不要な再レンダリング・データフェッチの場所・最適化漏れを確認する
- [ ] **アクセシビリティ** のレビューを実施する
  - `role` / `aria-*` 属性・キーボード操作・コントラストを確認する

### 修正

- [ ] レビューで挙がった指摘事項を優先度順に修正する
- [ ] `npm run lint` / `npx prettier --write .` を通す
- [ ] 修正後に再度型チェックを実行する（`npx tsc --noEmit`）
