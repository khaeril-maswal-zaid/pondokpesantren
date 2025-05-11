export default function Loading() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-[250px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
