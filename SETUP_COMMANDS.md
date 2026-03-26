# フェーズ0 セットアップコマンド

以下のコマンドを**順番に**実行してください。

---

## Step 1: Next.js プロジェクトの作成

新しいバージョンの `create-next-app` は既存ファイルがあるディレクトリへの展開を拒否するため、
`/tmp` に一時作成してからコピーする方法を使います。

```bash
# /tmp に Next.js プロジェクトを作成（ディレクトリはどこでも可）
npx create-next-app@latest /tmp/cinema_next \
  --typescript \
  --eslint \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

# 生成ファイルを cinema_seat_finder にコピー（既存ファイルは上書きしない）
cp -rn /tmp/cinema_next/. \
  /Users/dnz_nishimaru/Desktop/challenge/cinema_seat_finder/
```

> `-n` (no-clobber) オプションにより、作成済みの `.prettierrc` / `.env.local` / `lib/cn.ts` は上書きされません。

---

## Step 2: 追加パッケージのインストール

```bash
npm install clsx tailwind-merge
```

---

## Step 3: Prettier のインストール

```bash
npm install --save-dev prettier
```

---

## Step 4: `.gitignore` の確認

Next.js が自動生成する `.gitignore` に `.env.local` が含まれていることを確認します。

```bash
grep ".env.local" .gitignore
```

含まれていれば `# local env files` と `.env.local` が表示されます。

---

## Step 5: Git リポジトリの初期化と初回コミット

```bash
git init
git add .
git commit -m "feat: フェーズ0 初期セットアップ"
```

---

## 完了後の確認

```bash
npm run dev
```

`http://localhost:3000` にアクセスして Next.js のデフォルトページが表示されれば OK です。
