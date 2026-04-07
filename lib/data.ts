// JSONデータの読み込みユーティリティ
// コンポーネントから直接 import せず、必ずこのモジュール経由でデータを取得する
import type { Theater, Screen, ScreenRecommendations } from '@/lib/types';
import theatersData from '@/data/theaters.json';
import screensData from '@/data/screens.json';
import seatsData from '@/data/seats.json';

export const getTheaters = (): Theater[] => theatersData as Theater[];

export const getTheaterById = (id: string): Theater | undefined =>
  (theatersData as Theater[]).find((t) => t.theater_id === id);

export const getScreensByTheaterId = (theaterId: string): Screen[] =>
  (screensData as Screen[]).filter((s) => s.theater_id === theaterId);

export const getRecommendationsByScreenId = (
  screenId: string,
): ScreenRecommendations | undefined =>
  (seatsData as ScreenRecommendations[]).find((s) => s.screen_id === screenId);
