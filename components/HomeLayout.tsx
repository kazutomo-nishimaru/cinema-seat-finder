'use client';

import { useState } from 'react';
import type { Theater } from '@/lib/types';
import TheaterList from '@/components/theater/TheaterList';
import TheaterMap from '@/components/map/TheaterMap';

type Props = {
  theaters: Theater[];
};

export default function HomeLayout({ theaters }: Props) {
  // 選択中の映画館ID（地図ピンと一覧カードで共有）
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // 現在地（地図の中心移動に使用）
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div className="flex h-full overflow-hidden">
      {/* 左パネル: 映画館一覧 */}
      <aside className="w-80 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white">
        <TheaterList
          theaters={theaters}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onLocate={setUserLocation}
        />
      </aside>

      {/* 右パネル: 地図 */}
      <main className="flex-1 relative">
        <TheaterMap
          theaters={theaters}
          selectedId={selectedId}
          onSelect={setSelectedId}
          userLocation={userLocation}
        />
      </main>
    </div>
  );
}
