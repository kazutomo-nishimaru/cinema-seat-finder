'use client';

import Link from 'next/link';
import type { Theater } from '@/lib/types';
import { cn } from '@/lib/cn';
import FilterPanel from '@/components/theater/FilterPanel';

type Props = {
  theaters: Theater[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onLocate: (location: { lat: number; lng: number }) => void;
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
};

export default function TheaterList({
  theaters,
  selectedId,
  onSelect,
  onLocate,
  activeFilters,
  onFilterChange,
}: Props) {
  // 現在地を取得して地図を移動
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert('お使いのブラウザは位置情報に対応していません');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onLocate({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        alert('現在地の取得に失敗しました。位置情報の許可を確認してください。');
      },
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* ヘッダー */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h1 className="text-base font-bold text-gray-900 tracking-tight">
          🎬 Cinema Seat Finder
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">映画館を選んでおすすめ座席を確認</p>
        <button
          onClick={handleGeolocation}
          className="mt-3 w-full flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span>📍</span>
          現在地から探す
        </button>
      </div>

      {/* 絞り込みパネル */}
      <FilterPanel activeFilters={activeFilters} onChange={onFilterChange} />

      {/* 映画館一覧 */}
      <ul className="flex-1 overflow-y-auto p-3 space-y-2">
        {theaters.length === 0 && (
          <li className="text-center text-xs text-gray-400 pt-8">
            条件に一致する映画館が見つかりませんでした
          </li>
        )}
        {theaters.map((theater) => {
          const isSelected = selectedId === theater.theater_id;
          return (
            <li key={theater.theater_id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => onSelect(theater.theater_id)}
                onKeyDown={(e) => e.key === 'Enter' && onSelect(theater.theater_id)}
                className={cn(
                  'w-full text-left rounded-xl border p-3 transition-all cursor-pointer',
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
                )}
              >
                <p className="font-semibold text-gray-900 text-sm leading-snug">
                  {theater.name}
                </p>
                <p className="text-xs text-gray-400 mt-1 truncate">{theater.address}</p>

                {/* 設備バッジ */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {theater.facilities.map((f) => (
                    <span
                      key={f}
                      className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* 詳細リンク */}
                <Link
                  href={`/theaters/${theater.theater_id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  詳細を見る →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
