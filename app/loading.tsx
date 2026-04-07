// トップページのローディング UI（Suspense フォールバック）
export default function Loading() {
  return (
    <div className="flex h-full">
      {/* 左パネルスケルトン */}
      <aside className="w-80 flex-shrink-0 border-r border-gray-200 bg-white p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
        <div className="h-8 bg-gray-100 rounded-lg animate-pulse" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </aside>
      {/* 地図スケルトン */}
      <main className="flex-1 bg-gray-100 animate-pulse" />
    </div>
  );
}
