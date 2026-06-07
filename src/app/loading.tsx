import { Skeleton } from "@/components/ui/skeleton"

function PlaceCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="space-y-1">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-28" />
      </div>
      <div className="flex gap-1">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-10 rounded-full" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>

        <div className="space-y-6">
          {/* 검색 + 필터 스켈레톤 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 w-full sm:w-32" />
            <Skeleton className="h-8 w-full sm:w-32" />
            <Skeleton className="h-8 w-full sm:w-36" />
          </div>

          {/* 지도 스켈레톤 */}
          <Skeleton className="w-full h-[300px] sm:h-[450px] rounded-lg" />

          {/* 카드 스켈레톤 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <PlaceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
