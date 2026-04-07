'use client';

import { useMemo, useState } from 'react';
import type { Theater } from '@/lib/types';
import TheaterList from '@/components/theater/TheaterList';
import TheaterMap from '@/components/map/TheaterMap';

type Props = {
  theaters: Theater[];
};

export default function HomeLayout({ theaters }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  // OR条件: いずれかの設備を持つ映画館を表示
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredTheaters = useMemo(
    () =>
      activeFilters.length === 0
        ? theaters
        : theaters.filter((t) => activeFilters.some((f) => t.facilities.includes(f))),
    [theaters, activeFilters],
  );

  return (
    <div className="flex h-full overflow-hidden">
      <aside className="w-80 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white">
        <TheaterList
          theaters={filteredTheaters}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onLocate={setUserLocation}
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />
      </aside>

      <main className="flex-1 relative">
        <TheaterMap
          theaters={filteredTheaters}
          selectedId={selectedId}
          onSelect={setSelectedId}
          userLocation={userLocation}
        />
      </main>
    </div>
  );
}
