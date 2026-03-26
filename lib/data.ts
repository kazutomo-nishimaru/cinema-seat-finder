// JSONデータの読み込みユーティリティ
// コンポーネントから直接 import せず、必ずこのモジュール経由でデータを取得する
import type { Theater, Screen, ScreenRecommendations, RecommendMode } from '@/lib/types';
import theatersData from '@/data/theaters.json';
import screensData from '@/data/screens.json';
import seatsData from '@/data/seats.json';

export const getTheaters = (): Theater[] => theatersData as Theater[];

export const getTheaterById = (id: string): Theater | undefined =>
  (theatersData as Theater[]).find((t) => t.theater_id === id);

export const getScreensByTheaterId = (theaterId: string): Screen[] =>
  (screensData as Screen[]).filter((s) => s.theater_id === theaterId);

export const getScreenById = (id: string): Screen | undefined =>
  (screensData as Screen[]).find((s) => s.screen_id === id);

export const getRecommendationsByScreenId = (
  screenId: string,
): ScreenRecommendations | undefined =>
  (seatsData as ScreenRecommendations[]).find((s) => s.screen_id === screenId);

// 行番号（1始まり）をアルファベットラベルに変換 例: 1 → "A", 2 → "B"
export const rowToLabel = (row: number): string => String.fromCharCode(64 + row);

// 座席IDを生成 例: (2, 3) → "B-3"
export const toSeatId = (row: number, col: number): string => `${rowToLabel(row)}-${col}`;

// 指定座席が特定モードでおすすめかどうかを判定
export const isSeatRecommended = (
  recs: ScreenRecommendations,
  mode: RecommendMode,
  row: number,
  col: number,
): boolean => recs.recommendations[mode].seats.includes(toSeatId(row, col));
