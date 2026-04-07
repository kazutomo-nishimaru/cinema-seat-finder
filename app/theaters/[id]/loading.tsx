// 映画館詳細ページのローディング UI（Suspense フォールバック）
export default function Loading() {
  return (
    <div className="min-h-full bg-gray-50">
      {/* ヘッダースケルトン */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-40" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* 基本情報スケルトン */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
          </div>
        </div>
        {/* スクリーンカードスケルトン */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-4 bg-gray-100 rounded animate-pulse w-1/4" />
            <div className="h-16 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        ))}
      </main>
    </div>
  );
}
