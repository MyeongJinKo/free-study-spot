import PlaceCard from "@/components/PlaceCard"
import places from "@/data/places.json"
import { Place } from "@/types/place"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8 space-y-1">
          <h1 className="text-2xl font-bold">무료 공부 장소</h1>
          <p className="text-muted-foreground text-sm">
            무료로 이용할 수 있는 공부 공간을 모아뒀어요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(places as Place[]).map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </main>
  )
}
