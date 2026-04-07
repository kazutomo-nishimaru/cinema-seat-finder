'use client';

// error.tsx は必ず Client Component にする必要がある
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
      <p className="text-4xl">⚠️</p>
      <h1 className="text-lg font-bold text-gray-900">エラーが発生しました</h1>
      <p className="text-sm text-gray-500">ページの読み込みに失敗しました。</p>
      <button
        onClick={reset}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        再試行する
      </button>
    </div>
  );
}
