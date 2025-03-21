export default function ProductSkeleton() {
  return (
    <div className="card h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Ürün resmi skeleton */}
      <div className="relative aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

      {/* Ürün bilgileri skeleton */}
      <div className="flex flex-col flex-1 p-6">
        {/* Yıldız rating skeleton */}
        <div className="mb-2 flex items-center">
          <div className="w-20 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Başlık skeleton */}
        <div className="w-full h-7 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
        <div className="w-3/4 h-7 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>

        {/* Kategori skeleton */}
        <div className="w-1/2 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>

        {/* Fiyat skeleton */}
        <div className="mt-auto">
          <div className="w-28 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>
          <div className="w-full h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
