'use client';

import { useMemo, useState } from 'react';
import type { Theater } from '@/lib/types';
import TheaterList from '@/components/theater/TheaterList';
import TheaterMap from '@/components/map/TheaterMap';
import { cn } from '@/lib/cn';

type Props = {
  theaters: Theater[];
};

export default function HomeLayout({ theaters }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  // OR条件: いずれかの設備を持つ映画館を表示
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  // モバイル用タブ切り替え（デスクトップでは常に両方表示）
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  const filteredTheaters = useMemo(
    () =>
      activeFilters.length === 0
        ? theaters
        : theaters.filter((t) => activeFilters.some((f) => t.facilities.includes(f))),
    [theaters, activeFilters],
  );

  return (
    <div className="flex flex-col h-full">
      {/* メインコンテンツエリア */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左パネル: 映画館一覧 + フィルター */}
        <aside
          className={cn(
            'flex-col border-r border-gray-200 bg-white',
            'md:flex md:w-80 md:flex-shrink-0',
            mobileView === 'list' ? 'flex flex-1' : 'hidden',
          )}
        >
          <TheaterList
            theaters={filteredTheaters}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onLocate={setUserLocation}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        </aside>

        {/* 右パネル: 地図 */}
        <main
          className={cn(
            'relative',
            'md:flex md:flex-1',
            mobileView === 'map' ? 'flex flex-1' : 'hidden',
          )}
        >
          <TheaterMap
            theaters={filteredTheaters}
            selectedId={selectedId}
            onSelect={setSelectedId}
            userLocation={userLocation}
          />
        </main>
      </div>

      {/* モバイル用タブバー（md以上では非表示） */}
      <nav className="md:hidden flex shrink-0 border-t border-gray-200 bg-white">
        {(
          [
            { view: 'list', label: '一覧' },
            { view: 'map', label: '地図' },
          ] as const
        ).map(({ view, label }) => (
          <button
            key={view}
            onClick={() => setMobileView(view)}
            className={cn(
              'flex-1 py-3 text-sm font-medium transition-colors',
              mobileView === view
                ? 'text-blue-600 border-t-2 border-blue-600 -mt-px'
                : 'text-gray-500',
            )}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
