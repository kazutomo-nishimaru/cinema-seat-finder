import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
      <p className="text-5xl font-bold text-gray-200">404</p>
      <h1 className="text-lg font-bold text-gray-900">ページが見つかりません</h1>
      <p className="text-sm text-gray-500">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        映画館一覧へ戻る
      </Link>
    </div>
  );
}
