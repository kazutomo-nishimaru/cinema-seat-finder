'use client';

import { cn } from '@/lib/cn';

// theaters.json に存在する設備 + 仕様書記載の全設備
const ALL_FACILITIES = [
  'IMAX',
  'Dolby Cinema',
  '4DX',
  '字幕',
  '吹替',
  'ミニシアター',
  '名画座',
  '駐車場',
];

type Props = {
  activeFilters: string[];
  onChange: (filters: string[]) => void;
};

export default function FilterPanel({ activeFilters, onChange }: Props) {
  const toggle = (facility: string) => {
    if (activeFilters.includes(facility)) {
      onChange(activeFilters.filter((f) => f !== facility));
    } else {
      onChange([...activeFilters, facility]);
    }
  };

  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-700">設備で絞り込む</span>
        {activeFilters.length > 0 && (
          <button
            onClick={() => onChange([])}
            className="text-xs text-blue-600 hover:underline"
          >
            リセット
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {ALL_FACILITIES.map((facility) => {
          const isActive = activeFilters.includes(facility);
          return (
            <label
              key={facility}
              className={cn(
                'flex items-center cursor-pointer rounded-full px-2.5 py-1 text-xs border transition-colors select-none',
                isActive
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400',
              )}
            >
              {/* スクリーンリーダー向けにチェックボックスは非表示で保持 */}
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => toggle(facility)}
                className="sr-only"
              />
              {facility}
            </label>
          );
        })}
      </div>
    </div>
  );
}
