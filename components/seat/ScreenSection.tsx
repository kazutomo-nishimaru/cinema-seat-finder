'use client';

import { useState } from 'react';
import type { Screen, ScreenRecommendations, RecommendMode } from '@/lib/types';
import RecommendModeSelector from './RecommendModeSelector';
import SeatMap from './SeatMap';

type Props = {
  screen: Screen;
  recommendations: ScreenRecommendations | undefined;
};

// モード選択状態を管理し、RecommendModeSelector + SeatMap を統合するクライアントコンポーネント
export default function ScreenSection({ screen, recommendations }: Props) {
  const [mode, setMode] = useState<RecommendMode>('balance');

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

      {/* 選択モードの理由テキスト */}
      <div className="rounded-lg bg-amber-50 border border-amber-100 px-3 py-2 text-xs text-amber-800">
        {currentRec.reason}
      </div>

      {/* 座席グリッド */}
      <SeatMap screen={screen} recommendations={recommendations} mode={mode} />

      {/* 凡例 */}
      <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-sm bg-amber-400 inline-block shrink-0" />
          おすすめ席
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-sm bg-gray-100 inline-block shrink-0" />
          その他の席
        </span>
      </div>
    </div>
  );
}
