import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Place } from "@/types/place"

type Props = {
  place: Place
}

export default function PlaceCard({ place }: Props) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{place.name}</CardTitle>
          <Badge variant="secondary">{place.category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{place.address}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">{place.description}</p>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>운영시간: {place.hours}</p>
          <p>휴무: {place.closed}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {place.wifi && <Badge variant="outline">WiFi</Badge>}
          {place.outlet && <Badge variant="outline">콘센트</Badge>}
          {place.free && <Badge variant="outline">무료</Badge>}
          {place.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
