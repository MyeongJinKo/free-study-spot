# 무료 공부 장소

도서관, 청년센터, 주민센터 등 무료로 이용할 수 있는 공부 공간을 지도와 목록으로 안내하는 웹서비스입니다.

## 주요 기능

- **지도 뷰** — VWorld 배경지도 위에 장소 마커 표시, 줌 레벨에 따라 마커 클러스터링
- **지도↔카드 연동** — 마커 클릭 시 해당 카드 하이라이트, 카드 클릭 시 스크롤 이동
- **실시간 검색** — 장소명, 주소, 지역구 입력 시 자동완성 드롭다운
- **필터** — 지역(시/도) → 구/군 연동 필터, 카테고리 필터
- **장소 제보** — 사이트 내 폼으로 제보 접수 → Supabase에 저장 → 운영자 검토 후 반영
- **다크모드** — 시스템 테마 연동 및 수동 전환
- **로딩 스켈레톤** — 데이터 로딩 중 스켈레톤 UI 표시

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프론트엔드 | Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| 지도 | Leaflet, react-leaflet, react-leaflet-cluster, VWorld WMTS API |
| 백엔드/DB | Supabase (PostgreSQL + PostGIS) |
| 데이터 관리 | QGIS (PostGIS 직접 연결, POI 편집) |
| 배포 | Vercel |

## 데이터 워크플로우

```
QGIS에서 지도 위 POI 직접 편집
        ↓
Supabase PostgreSQL (PostGIS) 에 저장
        ↓
Next.js에서 API 조회 → 지도 마커 + 카드 표시
```

```
사용자가 사이트 내 폼으로 제보
        ↓
Supabase submissions 테이블에 저장
        ↓
운영자가 2~3일마다 검토 후 places 테이블에 추가
```

## DB 스키마

### places (장소 데이터)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | bigint | PK |
| name | text | 장소명 |
| category | text | 도서관 / 청년센터 / 주민센터 / 복지관 / 문화센터 / 기타 |
| address | text | 주소 |
| region | text | 시/도 |
| district | text | 구/군 |
| age_limit | text | 전연령 / 청년 |
| weekday_open | text | 평일 오픈 시간 |
| weekday_close | text | 평일 마감 시간 |
| weekend_open | text | 주말 오픈 (null = 미운영) |
| weekend_close | text | 주말 마감 |
| holiday_open | text | 공휴일 오픈 (null = 미운영) |
| holiday_close | text | 공휴일 마감 |
| closed_day | text | 정기 휴무일 |
| wifi | boolean | WiFi 여부 |
| outlet | boolean | 콘센트 여부 |
| description | text | 설명 |
| tags | text[] | 태그 |
| website | text | 홈페이지 URL |
| instagram | text | 인스타그램 URL |
| geom | geometry(Point, 4326) | 좌표 (QGIS로 입력) |

### submissions (제보 데이터)

places와 동일한 구조에 `status` (pending / approved / rejected), `submitted_at` 추가

## 로컬 실행

```bash
# 의존성 설치
npm install

# 환경변수 설정
# .env.local 파일 생성 후 아래 값 입력
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 개발 서버 시작
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## QGIS 연결

Session Pooler 방식으로 Supabase PostgreSQL에 직접 연결합니다.

`Layer → Data Source Manager → PostgreSQL → New Connection` 에서 아래 정보 입력

| 항목 | 값 |
|------|-----|
| Host | `aws-1-ap-northeast-2.pooler.supabase.com` |
| Port | `5432` |
| Database | `postgres` |
| User | `postgres.[project-ref]` |

연결 후 `public` 스키마에서 `places` 레이어 추가 → 편집 모드로 POI 직접 입력

## 배포

GitHub에 push하면 Vercel이 자동으로 재배포합니다.

Vercel 프로젝트 설정의 Environment Variables에 아래 두 값을 추가해야 합니다.

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
