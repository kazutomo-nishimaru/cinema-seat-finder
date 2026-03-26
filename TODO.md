# Cinema Seat Finder — 実行計画 TODO

## Phase 0: 環境構築・初期設定

- [x] Next.js プロジェクトを作成する（TypeScript / ESLint / Tailwind CSS を有効化）
- [x] Prettier をインストールし、`.prettierrc` を設定する
- [x] `clsx` と `tailwind-merge` をインストールし、`lib/cn.ts` に `cn()` ユーティリティを作成する
- [x] `.env.local` を作成し、`.gitignore` に追加されていることを確認する
- [ ] Google Maps API キーを取得し、`.env.local` に設定する
- [x] ディレクトリ構成（`app/`, `components/`, `data/`, `lib/`）を作成する
- [ ] Git リポジトリを初期化し、初回コミットを行う

---

## Phase 1: 型定義・JSONデータ作成

- [ ] `lib/types.ts` に型定義を記述する（`Theater`, `Screen`, `Seat`, `SeatRecommendation`）
- [ ] `lib/data.ts` にJSONデータを読み込むユーティリティ関数を作成する
- [ ] 対象とする映画館を選定する（実在の映画館から数館に絞る、またはモデルデータで代用）
- [ ] `data/theaters.json` に映画館データを記述する
- [ ] `data/screens.json` にスクリーンデータを記述する（1館につき1〜2スクリーン程度）
- [ ] `data/seats.json` に座席データを記述する
  - [ ] 各座席の行・列・通路隣接フラグを設定する
  - [ ] 各モード（バランス / 没入感 / 全体把握 / 出入り / 酔いにくさ）のおすすめ座席と理由テキストを手動記述する

---

## Phase 2: トップページ（地図 + 映画館一覧）

- [ ] `app/page.tsx` のレイアウトを作成する（左：一覧パネル、右：地図エリア）
- [ ] `components/map/TheaterMap.tsx` を作成する
  - [ ] Google Maps JavaScript API を読み込む
  - [ ] 映画館の位置にピンを表示する
  - [ ] ピンをクリックで映画館を選択状態にする
- [ ] `components/theater/TheaterList.tsx` を作成する
  - [ ] 映画館一覧をカード形式で表示する
  - [ ] カードをクリックで映画館詳細ページへ遷移する
- [ ] 地図と一覧を連動させる（地図のピンと一覧カードで選択状態を共有）
- [ ] 現在地取得ボタンを実装する（Geolocation API）

---

## Phase 3: 絞り込み機能

- [ ] `components/theater/FilterPanel.tsx` を作成する
  - [ ] チェックボックス形式で設備条件を表示する（IMAX / Dolby Cinema / 4DX / 字幕 / 吹替 / ミニシアター / 名画座 / 駐車場）
- [ ] フィルター状態を管理し、地図のピンと一覧カードに反映する
- [ ] フィルターを全解除するリセットボタンを追加する

---

## Phase 4: 映画館詳細ページ

- [ ] `app/theaters/[id]/page.tsx` を作成する
- [ ] 映画館の基本情報を表示する（名称 / 住所 / アクセス / 設備 / 公式サイトリンク）
- [ ] `components/theater/TheaterDetail.tsx` を作成する
- [ ] スクリーン一覧を表示する
- [ ] 各スクリーンの座席マップへのリンク（またはアコーディオン展開）を実装する

---

## Phase 5: 座席マップ・おすすめ座席表示

- [ ] `components/seat/SeatMap.tsx` を作成する
  - [ ] 座席をグリッドで表示する（行・列の構造を再現）
  - [ ] 通路位置に応じてギャップを入れる
- [ ] `components/seat/SeatCell.tsx` を作成する
  - [ ] 通常席 / おすすめ席 / 非おすすめ席でスタイルを切り替える
  - [ ] おすすめ席をホバー / クリックで理由テキストを表示する
- [ ] `components/seat/RecommendModeSelector.tsx` を作成する
  - [ ] 5つのモードをボタン形式で切り替えられるUIを作成する
- [ ] モード切り替えに応じて `SeatMap` のハイライトが変わるよう状態管理する

---

## Phase 6: 仕上げ・デプロイ

- [ ] レスポンシブ対応を確認・調整する（モバイル表示）
- [ ] ローディング UI を追加する（`loading.tsx` / スケルトン）
- [ ] エラー UI を追加する（`error.tsx` / 404ページ）
- [ ] Lint・フォーマットを通す（`npm run lint` / `npx prettier --write .`）
- [ ] Vercel にデプロイする
  - [ ] 環境変数 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` を Vercel に設定する
- [ ] `README.md` を作成する（概要・機能・技術構成・起動方法）
