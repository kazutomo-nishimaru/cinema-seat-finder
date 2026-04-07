import { cn } from '@/lib/cn';

type Props = {
  seatId: string;
  isRecommended: boolean;
};

// 座席1マスを表示する。おすすめ席はアンバー色でハイライトする。
export default function SeatCell({ seatId, isRecommended }: Props) {
  return (
    <div
      title={seatId}
      className={cn(
        'w-5 h-5 rounded-sm transition-colors',
        isRecommended ? 'bg-amber-400' : 'bg-gray-100',
      )}
    />
  );
}
