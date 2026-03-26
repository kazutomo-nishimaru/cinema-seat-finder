import { getTheaters } from '@/lib/data';
import HomeLayout from '@/components/HomeLayout';

// Server Component — データ取得はサーバー側で行い、Client Component に渡す
export default function HomePage() {
  const theaters = getTheaters();
  return <HomeLayout theaters={theaters} />;
}
