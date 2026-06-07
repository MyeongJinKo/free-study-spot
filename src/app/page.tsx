import Link from "next/link"
import PlaceCard from "@/components/PlaceCard"
import { buttonVariants } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Place } from "@/types/place"

export const revalidate = 3600 // 1시간마다 재검증

async function getPlaces(): Promise<Place[]> {
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("장소 데이터 로딩 실패:", error)
    return []
  }

  return data ?? []
}

export default async function Home() {
  const places = await getPlaces()

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">무료 공부 장소</h1>
            <p className="text-muted-foreground text-sm">
              무료로 이용할 수 있는 공부 공간을 모아뒀어요.
            </p>
          </div>
          <Link href="/submit" className={buttonVariants({ size: "sm" })}>
            장소 제보
          </Link>
        </div>

        {places.length === 0 ? (
          <p className="text-muted-foreground text-sm">등록된 장소가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
