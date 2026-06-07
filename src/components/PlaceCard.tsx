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
          {place.weekday_open && (
            <p>평일: {place.weekday_open} - {place.weekday_close}</p>
          )}
          {place.weekend_open ? (
            <p>주말: {place.weekend_open} - {place.weekend_close}</p>
          ) : (
            <p>주말: 미운영</p>
          )}
          {place.holiday_open ? (
            <p>공휴일: {place.holiday_open} - {place.holiday_close}</p>
          ) : (
            <p>공휴일: 미운영</p>
          )}
          {place.closed_day && <p>휴무: {place.closed_day}</p>}
        </div>
        <div className="flex flex-wrap gap-1">
          {place.age_limit === "청년" && <Badge variant="secondary">청년전용</Badge>}
          {place.wifi && <Badge variant="outline">WiFi</Badge>}
          {place.outlet && <Badge variant="outline">콘센트</Badge>}
          {place.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        {(place.website || place.instagram) && (
          <div className="flex gap-3 text-sm">
            {place.website && (
              <a href={place.website} target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground underline underline-offset-2">
                홈페이지
              </a>
            )}
            {place.instagram && (
              <a href={place.instagram} target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground underline underline-offset-2">
                인스타그램
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
