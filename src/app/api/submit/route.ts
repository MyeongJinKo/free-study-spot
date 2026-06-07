import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { name, category, address, region, district, hours, closed, wifi, outlet, description } = body

  if (!name || !category || !address || !region || !district) {
    return NextResponse.json({ error: "필수 항목이 누락되었습니다." }, { status: 400 })
  }

  const { error } = await supabase.from("submissions").insert({
    name,
    category,
    address,
    region,
    district,
    hours: hours || null,
    closed: closed || null,
    wifi: !!wifi,
    outlet: !!outlet,
    description: description || null,
  })

  if (error) {
    console.error("제보 저장 실패:", error)
    return NextResponse.json({ error: "저장 중 오류가 발생했습니다." }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
