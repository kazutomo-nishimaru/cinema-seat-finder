'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-full bg-gray-50 flex flex-col items-center justify-center gap-4 text-center px-4">
      <p className="text-4xl">⚠️</p>
      <h1 className="text-lg font-bold text-gray-900">エラーが発生しました</h1>
      <p className="text-sm text-gray-500">映画館情報の読み込みに失敗しました。</p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          再試行する
        </button>
        <Link
          href="/"
          className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          一覧に戻る
        </Link>
      </div>
    </div>
  );
}
