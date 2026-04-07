import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getTheaterById,
  getTheaters,
  getScreensByTheaterId,
  getRecommendationsByScreenId,
} from '@/lib/data';
import TheaterDetail from '@/components/theater/TheaterDetail';

// ビルド時に全映画館ページを静的生成する
export function generateStaticParams() {
  return getTheaters().map((t) => ({ id: t.theater_id }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const theater = getTheaterById(id);
  if (!theater) return {};
  return {
    title: `${theater.name} — Cinema Seat Finder`,
    description: `${theater.name}のスクリーン情報とおすすめ座席を確認できます。`,
  };
}

export default async function TheaterPage({ params }: Props) {
  const { id } = await params;
  const theater = getTheaterById(id);

  if (!theater) notFound();

  const screens = getScreensByTheaterId(id);
  const screensWithRecs = screens.map((screen) => ({
    screen,
    recommendations: getRecommendationsByScreenId(screen.screen_id),
  }));

  return <TheaterDetail theater={theater} screensWithRecs={screensWithRecs} />;
}
