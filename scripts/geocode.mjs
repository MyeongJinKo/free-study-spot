// VWorld 주소 검색 API로 주소 → 좌표 변환 후 SQL INSERT문 생성
const VWORLD_KEY = "A678B804-2AAF-304D-8FA6-581AE4E91884"

const places = [
  // 서울청년센터 오랑
  { name: "서울청년센터 중구", category: "청년센터", address: "서울 중구 서소문로12길 36", region: "서울특별시", district: "중구", age_limit: "청년", weekday_open: "10:00", weekday_close: "21:30", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 성북", category: "청년센터", address: "서울 성북구 종암로5길 7", region: "서울특별시", district: "성북구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 강동", category: "청년센터", address: "서울 강동구 올림픽로 610", region: "서울특별시", district: "강동구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 강북", category: "청년센터", address: "서울 강북구 노해로23길 123", region: "서울특별시", district: "강북구", age_limit: "청년", weekday_open: "09:30", weekday_close: "21:30", weekend_open: "09:30", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 강서", category: "청년센터", address: "서울 강서구 강서로 231", region: "서울특별시", district: "강서구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 관악", category: "청년센터", address: "서울 관악구 신림로 99", region: "서울특별시", district: "관악구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "22:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 광진", category: "청년센터", address: "서울 광진구 능동로 245", region: "서울특별시", district: "광진구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 금천", category: "청년센터", address: "서울 금천구 가산디지털1로 120", region: "서울특별시", district: "금천구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 노원", category: "청년센터", address: "서울 노원구 동일로 1405", region: "서울특별시", district: "노원구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 동대문", category: "청년센터", address: "서울 동대문구 회기로 165", region: "서울특별시", district: "동대문구", age_limit: "청년", weekday_open: "10:00", weekday_close: "21:30", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 마포", category: "청년센터", address: "서울 마포구 월드컵로1길 14", region: "서울특별시", district: "마포구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 서초", category: "청년센터", address: "서울 서초구 남부순환로 2567", region: "서울특별시", district: "서초구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 성동", category: "청년센터", address: "서울 성동구 마조로 66", region: "서울특별시", district: "성동구", age_limit: "청년", weekday_open: "10:00", weekday_close: "21:40", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 은평", category: "청년센터", address: "서울 은평구 통일로67길 9", region: "서울특별시", district: "은평구", age_limit: "청년", weekday_open: "10:00", weekday_close: "21:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 영등포", category: "청년센터", address: "서울 영등포구 당산로 83", region: "서울특별시", district: "영등포구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매월 첫째 월요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 양천", category: "청년센터", address: "서울특별시 양천구 오목로 359", region: "서울특별시", district: "양천구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울청년센터 도봉", category: "청년센터", address: "서울 도봉구 마들로11길 75", region: "서울특별시", district: "도봉구", age_limit: "청년", weekday_open: "09:30", weekday_close: "21:30", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://youth.seoul.go.kr/orang", instagram: null },
  { name: "서울광역청년센터", category: "청년센터", address: "서울특별시 용산구 원효로97길 15", region: "서울특별시", district: "용산구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://www.smyc.kr", instagram: "https://www.instagram.com/smyc_youth/" },
  // 무중력지대
  { name: "무중력지대 홍제", category: "청년센터", address: "서울시 서대문구 통일로 484 유진상가 B동 2층", region: "서울특별시", district: "서대문구", age_limit: "청년", weekday_open: "10:00", weekday_close: "21:00", weekend_open: "11:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: null, instagram: null },
  { name: "무중력지대 성북", category: "청년센터", address: "서울시 성북구 아리랑로 50", region: "서울특별시", district: "성북구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "22:00", holiday_open: "10:00", holiday_close: "22:00", closed_day: null, wifi: true, outlet: true, website: null, instagram: null },
  { name: "무중력지대 G밸리", category: "청년센터", address: "서울시 금천구 가산디지털1로 168 우림라이온스밸리 A동 612호", region: "서울특별시", district: "금천구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: null, instagram: null },
  { name: "무중력지대 대방동", category: "청년센터", address: "서울시 동작구 등용로 79-1", region: "서울특별시", district: "동작구", age_limit: "청년", weekday_open: "10:00", weekday_close: "22:00", weekend_open: "10:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: null, instagram: null },
  { name: "신촌 파랑고래", category: "청년센터", address: "서울시 서대문구 연세로5나길 19", region: "서울특별시", district: "서대문구", age_limit: "청년", weekday_open: "09:00", weekday_close: "21:00", weekend_open: "10:00", weekend_close: "18:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 법정공휴일", wifi: true, outlet: true, website: "https://parangkore.or.kr", instagram: null },
  { name: "마포청년창업취업지원센터 나루", category: "청년센터", address: "서울특별시 마포구 양화로13", region: "서울특별시", district: "마포구", age_limit: "청년", weekday_open: "10:00", weekday_close: "21:00", weekend_open: "10:00", weekend_close: "18:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: "https://www.naroo.or.kr", instagram: null },
  { name: "관악청년문화공간 신림동쓰리룸", category: "청년센터", address: "서울 관악구 신림동 241-22 302호", region: "서울특별시", district: "관악구", age_limit: "청년", weekday_open: "10:00", weekday_close: "20:00", weekend_open: "11:00", weekend_close: "19:00", holiday_open: null, holiday_close: null, closed_day: "일요일, 공휴일", wifi: true, outlet: true, website: null, instagram: null },
  // 도서관
  { name: "서울도서관", category: "도서관", address: "서울특별시 중구 세종대로 110", region: "서울특별시", district: "중구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "21:00", weekend_open: "09:00", weekend_close: "18:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://lib.seoul.go.kr", instagram: null },
  { name: "마포중앙도서관", category: "도서관", address: "서울시 마포구 성산로 128", region: "서울특별시", district: "마포구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "20:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://mplib.mapo.go.kr", instagram: null },
  { name: "마포구립 서강도서관", category: "도서관", address: "서울시 마포구 독막로 165", region: "서울특별시", district: "마포구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "20:00", holiday_open: null, holiday_close: null, closed_day: "매주 화요일, 법정공휴일", wifi: true, outlet: true, website: "https://mplib.mapo.go.kr", instagram: null },
  { name: "도곡정보문화도서관", category: "도서관", address: "서울시 강남구 도곡로18길 57", region: "서울특별시", district: "강남구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://library.gangnam.go.kr", instagram: null },
  { name: "서초구립반포도서관", category: "도서관", address: "서울특별시 서초구 고무래로 34", region: "서울특별시", district: "서초구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://www.seocholib.or.kr", instagram: null },
  { name: "관악중앙도서관", category: "도서관", address: "서울시 관악구 신림로3길 35", region: "서울특별시", district: "관악구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://lib.gwanak.go.kr", instagram: null },
  { name: "신길도서관", category: "도서관", address: "서울특별시 영등포구 신길로 131", region: "서울특별시", district: "영등포구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://www.ydplib.or.kr", instagram: null },
  { name: "독산도서관", category: "도서관", address: "서울시 금천구 독산로54길 114", region: "서울특별시", district: "금천구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://geumcheonlib.seoul.kr", instagram: null },
  { name: "가산도서관", category: "도서관", address: "서울시 금천구 가산로5길 43", region: "서울특별시", district: "금천구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://geumcheonlib.seoul.kr", instagram: null },
  { name: "광진정보도서관", category: "도서관", address: "서울특별시 광진구 아차산로78길 90", region: "서울특별시", district: "광진구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "22:00", holiday_open: null, holiday_close: null, closed_day: "매주 화요일, 법정공휴일", wifi: true, outlet: true, website: "https://www.gwangjinlib.seoul.kr", instagram: null },
  { name: "구립은평뉴타운도서관", category: "도서관", address: "서울특별시 은평구 진관2로 111-51", region: "서울특별시", district: "은평구", age_limit: "전연령", weekday_open: "08:00", weekday_close: "22:00", weekend_open: "08:00", weekend_close: "22:00", holiday_open: null, holiday_close: null, closed_day: "법정공휴일", wifi: true, outlet: true, website: "https://www.enlib.or.kr", instagram: null },
  { name: "성동구립도서관", category: "도서관", address: "서울 성동구 고산자로10길 9", region: "서울특별시", district: "성동구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://www.sdlib.or.kr", instagram: null },
  { name: "이진아기념도서관", category: "도서관", address: "서울특별시 서대문구 독립문공원길 80", region: "서울특별시", district: "서대문구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://lib.sdm.or.kr", instagram: null },
  { name: "중구구립 가온도서관", category: "도서관", address: "서울시 중구 동호로14길 18", region: "서울특별시", district: "중구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "22:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://www.junggulib.or.kr", instagram: null },
  { name: "용산꿈나무도서관", category: "도서관", address: "서울특별시 용산구 백범로 329", region: "서울특별시", district: "용산구", age_limit: "전연령", weekday_open: "09:00", weekday_close: "21:00", weekend_open: "09:00", weekend_close: "17:00", holiday_open: null, holiday_close: null, closed_day: "매주 월요일, 법정공휴일", wifi: true, outlet: true, website: "https://yslibrary.or.kr", instagram: null },
]

async function geocode(address) {
  const url = `https://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${encodeURIComponent(address)}&refine=true&key=${VWORLD_KEY}&type=road&format=json`
  const res = await fetch(url)
  const data = await res.json()
  if (data.response?.status === "OK" && data.response?.result?.point) {
    const { x, y } = data.response.result.point
    return { lng: parseFloat(x), lat: parseFloat(y) }
  }
  return null
}

function q(v) {
  if (v === null || v === undefined) return "null"
  return `'${String(v).replace(/'/g, "''")}'`
}

const sqls = []
let failed = []

for (const place of places) {
  process.stdout.write(`지오코딩 중: ${place.name}... `)
  const coords = await geocode(place.address)

  if (!coords) {
    console.log("❌ 실패")
    failed.push(place.name)
    continue
  }

  console.log(`✅ (${coords.lat}, ${coords.lng})`)

  sqls.push(
    `insert into places (name, category, address, region, district, age_limit, weekday_open, weekday_close, weekend_open, weekend_close, holiday_open, holiday_close, closed_day, wifi, outlet, website, instagram, geom) values (` +
    `${q(place.name)}, ${q(place.category)}, ${q(place.address)}, ${q(place.region)}, ${q(place.district)}, ` +
    `${q(place.age_limit)}, ${q(place.weekday_open)}, ${q(place.weekday_close)}, ` +
    `${q(place.weekend_open)}, ${q(place.weekend_close)}, ${q(place.holiday_open)}, ${q(place.holiday_close)}, ` +
    `${q(place.closed_day)}, ${place.wifi}, ${place.outlet}, ${q(place.website)}, ${q(place.instagram)}, ` +
    `ST_SetSRID(ST_MakePoint(${coords.lng}, ${coords.lat}), 4326)` +
    `);`
  )

  await new Promise(r => setTimeout(r, 100)) // API 부하 방지
}

console.log("\n\n========== SQL INSERT 문 ==========\n")
console.log(sqls.join("\n"))

if (failed.length > 0) {
  console.log("\n\n========== 좌표 못 찾은 장소 ==========")
  failed.forEach(n => console.log(`- ${n}`))
}
