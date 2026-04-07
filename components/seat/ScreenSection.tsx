'use client';

import { useState } from 'react';
import type { Screen, ScreenRecommendations, RecommendMode } from '@/lib/types';
import RecommendModeSelector from './RecommendModeSelector';

type Props = {
  screen: Screen;
  recommendations: ScreenRecommendations | undefined;
};

// モード選択状態を管理し、おすすめ座席番号とコメントを表示するクライアントコンポーネント
export default function ScreenSection({ screen: _screen, recommendations }: Props) {
  const [mode, setMode] = useState<RecommendMode>('legroom');

  if (!recommendations) {
    return (
      <div className="mt-3 py-4 text-center text-xs text-gray-400">
        座席データがありません
      </div>
    );
  }

  const currentRec = recommendations.recommendations[mode];

  return (
    <div className="mt-4 space-y-3">
      {/* モード選択ボタン */}
      <RecommendModeSelector currentMode={mode} onChange={setMode} />

      {/* おすすめ理由 */}
      <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2 text-xs text-amber-800">
        {currentRec.reason}
      </div>

      {/* おすすめ座席番号一覧 */}
      {currentRec.seats.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {currentRec.seats.map((seatId) => (
            <span
              key={seatId}
              className="px-2 py-0.5 text-xs rounded bg-amber-100 text-amber-800 font-mono"
            >
              {seatId}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400">おすすめ座席データがありません</p>
      )}
    </div>
  );
}
