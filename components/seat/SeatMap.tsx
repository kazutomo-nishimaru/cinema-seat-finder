import type { Screen, ScreenRecommendations, RecommendMode } from '@/lib/types';
import { rowToLabel, toSeatId, isSeatRecommended } from '@/lib/data';
import SeatCell from './SeatCell';

type Props = {
  screen: Screen;
  recommendations: ScreenRecommendations;
  mode: RecommendMode;
};

export default function SeatMap({ screen, recommendations, mode }: Props) {
  const { seat_rows, seat_columns, aisle_positions } = screen;

  return (
    <div className="overflow-x-auto">
      {/* スクリーン（前方）の表示 */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-full max-w-fit bg-gray-300 text-gray-600 text-[10px] text-center py-1 px-12 rounded-sm">
          スクリーン
        </div>

        {/* 座席グリッド */}
        <div className="flex flex-col gap-1">
          {Array.from({ length: seat_rows }, (_, rowIdx) => {
            const rowNum = rowIdx + 1;
            const rowLabel = rowToLabel(rowNum);

            // 通路（aisle_positions）を挟みながら座席セルを生成する
            const cells: React.ReactNode[] = [];
            for (let colIdx = 0; colIdx < seat_columns; colIdx++) {
              const colNum = colIdx + 1;
              if (aisle_positions.includes(colIdx)) {
                // 通路ギャップ
                cells.push(<span key={`aisle-${colIdx}`} className="w-3 shrink-0" />);
              }
              cells.push(
                <SeatCell
                  key={toSeatId(rowNum, colNum)}
                  seatId={toSeatId(rowNum, colNum)}
                  isRecommended={isSeatRecommended(recommendations, mode, rowNum, colNum)}
                />,
              );
            }

            return (
              <div key={rowLabel} className="flex items-center gap-1">
                {/* 行ラベル（A, B, C ...） */}
                <span className="w-4 shrink-0 text-[10px] text-gray-400 text-right">
                  {rowLabel}
                </span>
                {cells}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
