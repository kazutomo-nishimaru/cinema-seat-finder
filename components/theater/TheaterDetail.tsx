import Link from 'next/link';
import type { Theater, Screen, ScreenRecommendations } from '@/lib/types';
import { cn } from '@/lib/cn';
import ScreenSection from '@/components/seat/ScreenSection';

// スクリーン種別ごとのバッジカラー
const SCREEN_TYPE_STYLES: Record<string, string> = {
  standard: 'bg-gray-100 text-gray-700',
  IMAX: 'bg-blue-100 text-blue-700',
  'Dolby Cinema': 'bg-purple-100 text-purple-700',
  '4DX': 'bg-orange-100 text-orange-700',
};

type ScreenWithRec = {
  screen: Screen;
  recommendations: ScreenRecommendations | undefined;
};

type Props = {
  theater: Theater;
  screensWithRecs: ScreenWithRec[];
};

export default function TheaterDetail({ theater, screensWithRecs }: Props) {
  return (
    <div className="min-h-full bg-gray-50">
      {/* ページヘッダー（パンくずナビ） */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-blue-600 hover:underline shrink-0">
            ← 映画館一覧
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-gray-700 font-medium truncate">{theater.name}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* 映画館基本情報 */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h1 className="text-xl font-bold text-gray-900">{theater.name}</h1>

          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs text-gray-500 mb-0.5">住所</dt>
              <dd className="text-gray-800">{theater.address}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500 mb-0.5">アクセス</dt>
              <dd className="text-gray-800">{theater.access_info}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500 mb-1">設備</dt>
              <dd className="flex flex-wrap gap-1.5">
                {theater.facilities.map((f) => (
                  <span
                    key={f}
                    className="px-2.5 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    {f}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <a
            href={theater.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            公式サイトを見る →
          </a>
        </section>

        {/* スクリーン一覧 */}
        <section>
          <h2 className="text-sm font-semibold text-gray-600 mb-3">
            スクリーン一覧（{screensWithRecs.length}件）
          </h2>

          {screensWithRecs.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">スクリーン情報がありません</p>
          ) : (
            <ul className="space-y-4">
              {screensWithRecs.map(({ screen, recommendations }) => (
                <li
                  key={screen.screen_id}
                  className="bg-white rounded-xl border border-gray-200 p-4"
                >
                  {/* スクリーンヘッダー */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 text-sm">
                      {screen.screen_name}
                    </span>
                    <span
                      className={cn(
                        'text-xs px-2.5 py-0.5 rounded-full font-medium',
                        SCREEN_TYPE_STYLES[screen.screen_type] ?? 'bg-gray-100 text-gray-700',
                      )}
                    >
                      {screen.screen_type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {screen.seat_rows}列 × {screen.seat_columns}席
                  </p>

                  {/* おすすめ座席セクション */}
                  <ScreenSection recommendations={recommendations} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
