'use client';

import { cn } from '@/lib/cn';
import type { RecommendMode } from '@/lib/types';

const MODES: { mode: RecommendMode; label: string }[] = [
  { mode: 'legroom', label: '足元ゆったり' },
  { mode: 'love', label: '推し席' },
];

type Props = {
  currentMode: RecommendMode;
  onChange: (mode: RecommendMode) => void;
};

export default function RecommendModeSelector({ currentMode, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {MODES.map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={cn(
            'px-3 py-1 text-xs rounded-full border transition-colors font-medium',
            currentMode === mode
              ? 'bg-amber-400 border-amber-400 text-white'
              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
