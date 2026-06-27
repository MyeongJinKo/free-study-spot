// 네이버 Geocoding API로 청년 일자리카페 주소 → 좌표 변환
const CLIENT_ID = "i7orvr1ond"
const CLIENT_SECRET = "ngnL2pIFldV9SHIhKjUEE4FYS9gKCrVaehho2sOH"

const places = [
  // 서울
  { name: "청년내일브릿지", address: "서울특별시 성동구 성수일로12길 20 성동안심상가 701호", region: "서울특별시", district: "성동구" },
  { name: "구로 청년공간 청년이룸", address: "서울특별시 구로구 오리로 1130", region: "서울특별시", district: "구로구" },
  { name: "을지유니크팩토리", address: "서울특별시 중구 을지로 170", region: "서울특별시", district: "중구" },
  { name: "성장동행 청년카페", address: "서울특별시 노원구 노해로 455", region: "서울특별시", district: "노원구" },
  { name: "청년새롬", address: "서울특별시 도봉구 마들로 656 도봉구청 1층", region: "서울특별시", district: "도봉구" },
  // 인천
  { name: "청년센터 서해구1939", address: "인천광역시 서구 봉오재3로94번길 19", region: "인천광역시", district: "서구" },
  // 대전
  { name: "대전 일자리지원센터", address: "대전광역시 중구 중앙로 119", region: "대전광역시", district: "중구" },
  { name: "청년공간 동구동락", address: "대전광역시 동구 백룡로 20", region: "대전광역시", district: "동구" },
  // 울산
  { name: "울산남구청년일자리카페", address: "울산광역시 남구 대학로 130", region: "울산광역시", district: "남구" },
  // 대구
  { name: "영진전문대학교센터", address: "대구광역시 북구 복현로 35 영진전문대학교 정보관 412-1호", region: "대구광역시", district: "북구" },
  { name: "대구테크노파크 지역인재양성센터", address: "대구광역시 중구 서성로20길 25", region: "대구광역시", district: "중구" },
  { name: "대구광역시청년센터 다온나그래", address: "대구광역시 북구 대현로 3", region: "대구광역시", district: "북구" },
  { name: "대구광역시청년센터 활동그래", address: "대구광역시 중구 중앙대로 402", region: "대구광역시", district: "중구" },
  { name: "(사)대구경북첨단벤처기업연합회 청년센터", address: "대구광역시 동구 동대구로 481 대구지식서비스센터 2층", region: "대구광역시", district: "동구" },
  { name: "(사)수성사회적경제네트워크 청년카페", address: "대구광역시 수성구 무학로 142-1", region: "대구광역시", district: "수성구" },
  { name: "동구청년센터 the꿈", address: "대구광역시 동구 효목로 7", region: "대구광역시", district: "동구" },
  // 부산
  { name: "부산 청년잡 성장카페 1호점", address: "부산광역시 부산진구 가야대로 772", region: "부산광역시", district: "부산진구" },
  { name: "부산 청년잡 성장카페 2호점", address: "부산광역시 부산진구 가야대로 772", region: "부산광역시", district: "부산진구" },
  { name: "부산 청년잡 성장카페 3호점", address: "부산광역시 사상구 학감대로 252", region: "부산광역시", district: "사상구" },
  { name: "동래구청년 어울림센터 청년자람터", address: "부산광역시 동래구 금강로 129", region: "부산광역시", district: "동래구" },
  { name: "해운대 청년잡카페 드림포트", address: "부산광역시 해운대구 반여로 120", region: "부산광역시", district: "해운대구" },
  { name: "사하구 청년창업 지원센터", address: "부산광역시 사하구 하신중앙로 324", region: "부산광역시", district: "사하구" },
  { name: "사하청년공간 청신호", address: "부산광역시 사하구 낙동대로 413", region: "부산광역시", district: "사하구" },
  { name: "광안XtoZ 청년커뮤니티센터", address: "부산광역시 수영구 수영로607번길 17", region: "부산광역시", district: "수영구" },
  // 광주
  { name: "광주청년일자리스테이션 동명", address: "광주광역시 동구 서석로 89", region: "광주광역시", district: "동구" },
  { name: "광주청년일자리스테이션 상무", address: "광주광역시 서구 상무중앙로 9", region: "광주광역시", district: "서구" },
  { name: "광주청년일자리스테이션 용봉", address: "광주광역시 북구 용봉로 105", region: "광주광역시", district: "북구" },
  { name: "광주청년일자리스테이션 광산", address: "광주광역시 광산구 소촌로85번길 14-9", region: "광주광역시", district: "광산구" },
  // 경기
  { name: "군포시 청년공간 플라잉", address: "경기도 군포시 번영로 314", region: "경기도", district: "군포시" },
  { name: "수원시청년지원센터 청년바람지대", address: "경기도 수원시 팔달구 효원로249번길 38", region: "경기도", district: "수원시" },
  { name: "구리시청년내일센터", address: "경기도 구리시 건원대로 67", region: "경기도", district: "구리시" },
  { name: "남양주시 사회적경제 창업지원센터", address: "경기도 남양주시 덕송3로 31", region: "경기도", district: "남양주시" },
  { name: "양주시청년센터", address: "경기도 양주시 덕정길 67", region: "경기도", district: "양주시" },
  { name: "청년센터 청년공감터", address: "경기도 의정부시 둔야로 9", region: "경기도", district: "의정부시" },
  { name: "청년다락방", address: "경기도 의정부시 호국로 1314", region: "경기도", district: "의정부시" },
  { name: "청년일자리카페 청년e-room", address: "경기도 이천시 경충대로 2701-32", region: "경기도", district: "이천시" },
  { name: "파주시청년공간 GP1939", address: "경기도 파주시 금릉역로 84", region: "경기도", district: "파주시" },
  { name: "포천청년비전센터", address: "경기도 포천시 호국로 1423", region: "경기도", district: "포천시" },
  { name: "청년스테이션", address: "경기도 시흥시 정왕대로233번길 19-1", region: "경기도", district: "시흥시" },
  { name: "김포시청년지원센터", address: "경기도 김포시 김포대로 841", region: "경기도", district: "김포시" },
  { name: "의왕청년발전소 포일센터", address: "경기도 의왕시 안양판교로 82", region: "경기도", district: "의왕시" },
  // 세종
  { name: "세종일자리경제진흥원", address: "세종특별자치시 조치원읍 으뜸길 251", region: "세종특별자치시", district: "조치원읍" },
  { name: "세종청년센터", address: "세종특별자치시 다정중앙로 20", region: "세종특별자치시", district: "세종시" },
  // 충북
  { name: "제천시 청년센터", address: "충청북도 제천시 독순로 65", region: "충청북도", district: "제천시" },
  { name: "청년 Jump Station", address: "충청북도 청주시 상당구 상당로55번길 21", region: "충청북도", district: "청주시" },
  { name: "생거진천 청년카페", address: "충청북도 진천군 진천읍 남산길 34", region: "충청북도", district: "진천군" },
  // 충남
  { name: "공주시 청년공유공간 일루와유", address: "충청남도 공주시 공주대학로 94-27", region: "충청남도", district: "공주시" },
  { name: "계룡시 청년센터 소소마루", address: "충청남도 계룡시 서금암로 17", region: "충청남도", district: "계룡시" },
  { name: "청년꿈키움광장", address: "충청남도 논산시 대학로 61", region: "충청남도", district: "논산시" },
  { name: "금산군 다락원", address: "충청남도 금산군 금산읍 금산로 1559", region: "충청남도", district: "금산군" },
  { name: "당진청년타운나래", address: "충청남도 당진시 당진중앙1로 59", region: "충청남도", district: "당진시" },
  { name: "보령청년커뮤니티센터", address: "충청남도 보령시 명천로4길 21", region: "충청남도", district: "보령시" },
  { name: "부여군 청년센터", address: "충청남도 부여군 부여읍 사비로100번길 10", region: "충청남도", district: "부여군" },
  { name: "서산 청년마당", address: "충청남도 서산시 번화1로 19", region: "충청남도", district: "서산시" },
  { name: "서천청춘아지트", address: "충청남도 서천군 서천읍 군청로 32", region: "충청남도", district: "서천군" },
  { name: "아산시 청년아지트 나와유 온양점", address: "충청남도 아산시 번영로86번길 27-4", region: "충청남도", district: "아산시" },
  { name: "예산청년온담", address: "충청남도 예산군 예산읍 주교리 258-15", region: "충청남도", district: "예산군" },
  { name: "천안청년센터 불당이음", address: "충청남도 천안시 서북구 검은들3길 38", region: "충청남도", district: "천안시" },
  { name: "천안청년센터 안서이음", address: "충청남도 천안시 동남구 상명대길 58", region: "충청남도", district: "천안시" },
  { name: "충남산학융합원 홍성센터", address: "충청남도 홍성군 홍성읍 대학길 25", region: "충청남도", district: "홍성군" },
  { name: "청년활력공간", address: "충청남도 청양군 청양읍 중앙로열길 22-1", region: "충청남도", district: "청양군" },
  { name: "충남 청년센터", address: "충청남도 홍성군 홍북읍 상하천로 58", region: "충청남도", district: "홍성군" },
  { name: "태안군 교육문화센터", address: "충청남도 태안군 태안읍 백화로 180", region: "충청남도", district: "태안군" },
  // 전북
  { name: "청년방앗간", address: "전북특별자치도 전주시 덕진구 팔달로 354", region: "전라북도", district: "전주시" },
  { name: "청년이음 전주", address: "전북특별자치도 전주시 완산구 현무1길 31-5", region: "전라북도", district: "전주시" },
  { name: "남원청년마루", address: "전북특별자치도 남원시 동문로 50-7", region: "전라북도", district: "남원시" },
  // 전남
  { name: "아우름카페", address: "전라남도 장성군 장성읍 영천로 231-1", region: "전라남도", district: "장성군" },
  { name: "청춘오름", address: "전라남도 화순군 화순읍 하주길 10", region: "전라남도", district: "화순군" },
  { name: "꿈청카페", address: "전라남도 순천시 중앙로 95", region: "전라남도", district: "순천시" },
  { name: "달빛청춘마루 청년센터", address: "전라남도 영암군 동문안1길15번길 1층", region: "전라남도", district: "영암군" },
  { name: "생태비즈니스센터", address: "전라남도 순천시 역전광장3길 54", region: "전라남도", district: "순천시" },
  { name: "어울림", address: "전라남도 순천시 우석로 197", region: "전라남도", district: "순천시" },
  // 경북
  { name: "경주시청년센터", address: "경상북도 경주시 원효로 142", region: "경상북도", district: "경주시" },
  { name: "경북고용성장지원센터 도량본점", address: "경상북도 구미시 야은로 366", region: "경상북도", district: "구미시" },
  { name: "경북고용성장지원센터 산동지점", address: "경상북도 구미시 신당1로3길 3", region: "경상북도", district: "구미시" },
  { name: "김천시 청년센터", address: "경상북도 김천시 평화길 134", region: "경상북도", district: "김천시" },
  { name: "영주청년정주지원센터", address: "경상북도 영주시 풍기읍 동양대로 145", region: "경상북도", district: "영주시" },
  { name: "의성군청년센터 영글터", address: "경상북도 의성군 의성읍 경북대로 5690", region: "경상북도", district: "의성군" },
  { name: "문경시청년센터", address: "경상북도 문경시 점촌1길 5", region: "경상북도", district: "문경시" },
  { name: "영천 청년센터", address: "경상북도 영천시 충효로 60", region: "경상북도", district: "영천시" },
  { name: "상주시 청년센터 들락날락", address: "경상북도 상주시 동수2길 22", region: "경상북도", district: "상주시" },
  // 경남
  { name: "김해 청년카페", address: "경상남도 김해시 호계로 441", region: "경상남도", district: "김해시" },
  { name: "양산 청년카페", address: "경상남도 양산시 중부로 10", region: "경상남도", district: "양산시" },
  { name: "진주 청년카페", address: "경상남도 진주시 진양호로 563", region: "경상남도", district: "진주시" },
  { name: "창원 청년카페", address: "경상남도 창원시 성산구 중앙대로228번길 6", region: "경상남도", district: "창원시" },
  { name: "사천 청춘도화지", address: "경상남도 사천시 정동면 반룡1길 193", region: "경상남도", district: "사천시" },
  { name: "함양 청년카페", address: "경상남도 함양군 함양읍 고운로 35", region: "경상남도", district: "함양군" },
  // 강원
  { name: "강원청년센터", address: "강원특별자치도 춘천시 금강로 45", region: "강원특별자치도", district: "춘천시" },
  { name: "태백청년센터", address: "강원특별자치도 태백시 계산1길 15", region: "강원특별자치도", district: "태백시" },
  { name: "강릉정보문화진흥센터", address: "강원특별자치도 강릉시 경강로2326번길 4", region: "강원특별자치도", district: "강릉시" },
  // 제주
  { name: "제주패스파인더", address: "제주특별자치도 제주시 서광로 192", region: "제주특별자치도", district: "제주시" },
]

async function geocode(address) {
  const url = `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`
  const res = await fetch(url, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
      "X-NCP-APIGW-API-KEY": CLIENT_SECRET,
    }
  })
  const data = await res.json()
  if (data.addresses && data.addresses.length > 0) {
    const { x, y } = data.addresses[0]
    return { lng: parseFloat(x), lat: parseFloat(y) }
  }
  return null
}

function q(v) {
  if (v === null || v === undefined) return "null"
  return `'${String(v).replace(/'/g, "''")}'`
}

const sqls = []
const failed = []

for (const place of places) {
  process.stdout.write(`지오코딩 중: ${place.name}... `)
  const coords = await geocode(place.address)

  if (!coords) {
    console.log("❌ 실패")
    failed.push(`${place.name} (${place.address})`)
    continue
  }

  console.log(`✅ (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`)

  sqls.push(
    `insert into places (name, category, address, region, district, age_limit, wifi, outlet, geom) values (` +
    `${q(place.name)}, '청년센터', ${q(place.address)}, ${q(place.region)}, ${q(place.district)}, ` +
    `'청년', false, false, ` +
    `ST_SetSRID(ST_MakePoint(${coords.lng}, ${coords.lat}), 4326)` +
    `);`
  )

  await new Promise(r => setTimeout(r, 150))
}

import { writeFileSync } from "fs"
writeFileSync("scripts/insert_cafes.sql", sqls.join("\n"))

console.log(`\n✅ 완료: ${sqls.length}개 성공 / ${failed.length}개 실패`)
console.log("📄 scripts/insert_cafes.sql 파일로 저장됐습니다.\n")

if (failed.length > 0) {
  console.log("❌ 실패 목록:")
  failed.forEach(n => console.log(`  - ${n}`))
}
