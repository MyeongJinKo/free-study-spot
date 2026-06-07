import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    name, category, address, region, district, age_limit,
    weekday_open, weekday_close,
    weekend_open, weekend_close,
    holiday_open, holiday_close,
    closed_day, wifi, outlet, description,
    website, instagram,
  } = body

  if (!name || !category || !address || !region || !district) {
    return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 })
  }

  const { error } = await supabase.from("submissions").insert({
    name,
    category,
    address,
    region,
    district,
    age_limit: age_limit || "전연령",
    weekday_open: weekday_open || null,
    weekday_close: weekday_close || null,
    weekend_open: weekend_open || null,
    weekend_close: weekend_close || null,
    holiday_open: holiday_open || null,
    holiday_close: holiday_close || null,
    closed_day: closed_day || null,
    wifi: !!wifi,
    outlet: !!outlet,
    description: description || null,
    website: website || null,
    instagram: instagram || null,
  })

  if (error) {
    console.error("제보 저장 실패:", error)
    return NextResponse.json({ error: "저장 중 오류가 발생했습니다." }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
