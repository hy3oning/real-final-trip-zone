export const quickLinks = [
  { title: "요구사항 명세서", href: "/submission-html/docs/requirements.html", kind: "문서" },
  { title: "기능 명세서", href: "/submission-html/docs/features.html", kind: "문서" },
  { title: "구조 명세서", href: "/submission-html/docs/structure.html", kind: "문서" },
  { title: "DB 명세서", href: "/submission-html/docs/database.html", kind: "문서" },
  { title: "발표 자료", href: "/presentation/index.html", kind: "발표" },
];

export const quickThemes = [
  { label: "오션뷰", emoji: "View", to: "/lodgings?theme=ocean" },
  { label: "독채", emoji: "Stay", to: "/lodgings?theme=private" },
  { label: "이번 주말", emoji: "Weekend", to: "/lodgings?theme=weekend" },
  { label: "제주", emoji: "Jeju", to: "/lodgings?region=제주" },
  { label: "부산", emoji: "Busan", to: "/lodgings?region=부산" },
  { label: "가성비", emoji: "Deal", to: "/lodgings?theme=deal" },
];

export const promoBanners = [
  {
    lead: "Spring Escape",
    title: "제주 2박 이상 예약 시\n조식 업그레이드",
    subtitle: "바다 근처 숙소를 중심으로 묶은 시즌 프로모션",
    date: "03.22 - 04.14",
    accent: "sunset",
  },
  {
    lead: "City Weekend",
    title: "서울 시티 스테이\n주말 한정 특가",
    subtitle: "금요일 체크인 기준으로 빠르게 예약 가능한 객실 모음",
    date: "이번 주말",
    accent: "peach",
  },
];

export const eventBanners = [
  {
    title: "신규 판매자 온보딩",
    subtitle: "승인 구조와 숙소 등록 흐름을 발표자료와 연결해 확인",
    action: "판매자 흐름 보기",
    href: "/seller",
  },
  {
    title: "설계 기준 허브",
    subtitle: "제출 HTML, 발표 deck, 구조 기준 문서를 한 번에 이동",
    action: "문서 허브 열기",
    href: "/docs",
  },
];

export const docsPrinciples = [
  {
    title: "문서형 산출물",
    copy: "요구사항, 기능, 구조, DB 문서는 정보 위계와 제출 가독성을 우선한다.",
  },
  {
    title: "발표형 산출물",
    copy: "발표 deck은 왜 이런 구조를 택했는지 빠르게 이해시키는 서사에 집중한다.",
  },
  {
    title: "구현형 산출물",
    copy: "프론트는 목업으로 흐름을 검증하고 나중에 API를 연결하는 방식으로 진행한다.",
  },
];

export const roleData = [
  {
    name: "User",
    subtitle: "탐색과 예약 중심",
    copy: "회원가입, 로그인, 숙소 탐색, 예약, 결제, 리뷰, 문의",
  },
  {
    name: "Seller",
    subtitle: "운영과 응답 중심",
    copy: "판매자 승인 신청, 숙소/객실 등록, 예약 처리, 문의 응답",
  },
  {
    name: "Admin",
    subtitle: "통제와 정책 중심",
    copy: "판매자 승인, 회원 상태 관리, 이벤트/쿠폰, 문의 모니터링",
  },
];

export const lodgings = [
  {
    id: 1,
    name: "해운대 오션 스테이",
    region: "부산",
    district: "해운대",
    type: "오션뷰 호텔",
    price: "149,000원",
    summary: "체크인 15:00 · 체크아웃 11:00 · 리뷰 4.8",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    intro: "해운대 앞에서 일출과 야경을 모두 담는 오션프론트 스테이",
    highlights: ["도보 3분 해변 접근", "2인 조식 포함", "24시간 프런트"],
    rating: "4.8",
    benefit: "오션뷰 객실 즉시 확정",
    review: "해변 접근성과 객실 전망이 특히 만족스럽다는 후기가 많음",
    cancellation: "체크인 3일 전까지 무료 취소",
    room: "디럭스 더블 · 최대 2인",
    reviewCount: "후기 318개",
  },
  {
    id: 2,
    name: "제주 포레스트 하우스",
    region: "제주",
    district: "애월",
    type: "감성 독채",
    price: "189,000원",
    summary: "최대 4인 · 바비큐 가능 · 리뷰 4.9",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
    intro: "돌담과 숲 사이에 놓인 독채 숙소로 조용한 체류에 맞춘 공간",
    highlights: ["독립 마당", "바비큐 존", "공항 40분"],
    rating: "4.9",
    benefit: "연박 시 바비큐 세트 제공",
    review: "조용한 동선과 독립적인 공간감 덕분에 가족 단위 선호가 높음",
    cancellation: "체크인 5일 전까지 무료 취소",
    room: "독채 스위트 · 최대 4인",
    reviewCount: "후기 194개",
  },
  {
    id: 3,
    name: "강릉 코스트 라운지",
    region: "강원",
    district: "강릉",
    type: "리조트",
    price: "129,000원",
    summary: "인피니티풀 · 조식 제공 · 리뷰 4.7",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    intro: "바다를 정면으로 바라보는 리조트형 숙소로 짧은 휴식에도 강한 인상",
    highlights: ["인피니티풀", "오션 라운지", "조식 포함"],
    rating: "4.7",
    benefit: "주중 예약 시 라운지 쿠폰 지급",
    review: "수영장과 조식 만족도가 높고 짧은 1박 일정에 특히 잘 맞음",
    cancellation: "체크인 2일 전까지 무료 취소",
    room: "시그니처 트윈 · 최대 3인",
    reviewCount: "후기 276개",
  },
  {
    id: 4,
    name: "서울 시티 모먼트",
    region: "서울",
    district: "성수",
    type: "부티크 호텔",
    price: "169,000원",
    summary: "도심 접근 · 루프탑 바 · 리뷰 4.6",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80",
    intro: "성수의 카페 거리와 한강 동선 사이에 놓인 감도 높은 도심형 스테이",
    highlights: ["루프탑 라운지", "셀프 체크인", "성수역 8분"],
    rating: "4.6",
    benefit: "주말 체크인 고객 웰컴 드링크 제공",
    review: "도심 접근성과 객실 감도가 좋아 짧은 시티 브레이크에 적합",
    cancellation: "체크인 1일 전까지 50% 환불",
    room: "어반 퀸 · 최대 2인",
    reviewCount: "후기 143개",
  },
  {
    id: 5,
    name: "여수 선셋 마리나",
    region: "전남",
    district: "여수",
    type: "마리나 리조트",
    price: "209,000원",
    summary: "마리나 뷰 · 노을 명소 · 리뷰 4.8",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    intro: "선셋 시간대가 가장 아름다운 마리나 앞 리조트형 숙소",
    highlights: ["마리나 선착장", "인룸 다이닝", "오션 테라스"],
    rating: "4.8",
    benefit: "노을 시간 웰컴 플래터 제공",
    review: "노을 전망과 테라스 동선이 강점이라 커플 수요가 높음",
    cancellation: "체크인 4일 전까지 무료 취소",
    room: "테라스 스위트 · 최대 2인",
    reviewCount: "후기 211개",
  },
  {
    id: 6,
    name: "경주 헤리티지 한옥",
    region: "경북",
    district: "경주",
    type: "한옥 스테이",
    price: "159,000원",
    summary: "전통 마당 · 조용한 골목 · 리뷰 4.9",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    intro: "황리단길과 가까우면서도 밤에는 조용하게 쉬기 좋은 한옥 숙소",
    highlights: ["전통 마당", "다도 세트", "황리단길 도보권"],
    rating: "4.9",
    benefit: "체크인 고객 전통차 제공",
    review: "분위기와 위치 밸런스가 좋아 재방문 후기 비율이 높음",
    cancellation: "체크인 3일 전까지 무료 취소",
    room: "한옥 온돌룸 · 최대 3인",
    reviewCount: "후기 167개",
  },
];

export const lodgingCollections = [
  { title: "이번 주말 예약 가능한 부산 숙소", region: "부산", ids: [1, 4, 3, 5] },
  { title: "제주 감도 높은 독채 스테이", region: "제주", ids: [2, 6, 5, 1] },
  { title: "짧은 휴식에 맞는 바다 숙소", region: "강원", ids: [3, 1, 5, 4] },
];

export const destinationStats = [
  { label: "오늘 확인 가능한 숙소", value: "128+" },
  { label: "이번 주말 특가", value: "24" },
  { label: "즉시 확정 객실", value: "56" },
];

export const listFilters = ["추천순", "오션뷰", "무료 취소", "조식 포함", "가성비", "독채"];

export const detailMoments = [
  "객실 선택 전 숙소 분위기와 위치 감을 먼저 보여준다.",
  "가격, 취소 정책, 평점, 주요 편의를 한 덩어리로 본다.",
  "문의와 예약 액션이 항상 보이도록 유지한다.",
];

export const bookingChecklist = [
  "체크인 / 체크아웃 날짜 선택",
  "투숙 인원과 요청사항 입력",
  "쿠폰 / 마일리지 적용",
  "예약 시점 가격 스냅샷 저장",
];

export const bookingStatusNotes = [
  "예약 상태: PENDING, CONFIRMED, CANCELED, COMPLETED, NO_SHOW",
  "결제 상태: READY, PAID, FAILED, CANCELED, PARTIAL_CANCELED, REFUNDED",
  "문의 구조는 InquiryRoom / InquiryMessage 기준으로 이어짐",
];

export const myBookingSummaries = [
  { label: "확정 예약", value: "08", tone: "mint" },
  { label: "대기 예약", value: "02", tone: "sand" },
  { label: "완료 예약", value: "24", tone: "blue" },
];

export const myBookingRows = [
  {
    name: "해운대 오션 스테이",
    stay: "03.25 - 03.27",
    status: "CONFIRMED",
    price: "298,000원",
  },
  {
    name: "제주 포레스트 하우스",
    stay: "04.04 - 04.06",
    status: "PENDING",
    price: "378,000원",
  },
  {
    name: "강릉 코스트 라운지",
    stay: "02.15 - 02.16",
    status: "COMPLETED",
    price: "129,000원",
  },
];

export const inquiryTimeline = [
  { role: "회원", body: "체크인 시간을 1시간 정도 앞당길 수 있는지 문의했습니다.", time: "오늘 14:10" },
  { role: "판매자", body: "당일 객실 상황 확인 후 16시 이전 답변 예정입니다.", time: "오늘 14:24" },
  { role: "관리자", body: "결제 문의는 OPEN 상태로 별도 모니터링 중입니다.", time: "어제 18:40" },
];

export const sellerTasks = [
  "판매자 승인 상태 확인",
  "숙소/객실 등록 화면 연결",
  "예약 요청 목록 확인",
  "문의 응답 채널 확인",
];

export const adminTasks = [
  "판매자 승인/반려/중지",
  "회원 상태 변경",
  "문의 모니터링",
  "이벤트/쿠폰 운영",
];

export const sellerLodgings = [
  { id: 101, name: "해운대 오션 스테이", status: "ACTIVE", roomCount: 4, inquiryCount: 3, occupancy: "82%" },
  { id: 102, name: "제주 포레스트 하우스", status: "INACTIVE", roomCount: 2, inquiryCount: 1, occupancy: "41%" },
];

export const reservationRows = [
  { no: "B-24031", guest: "김민수", stay: "03.25 - 03.27", status: "PENDING", amount: "298,000원" },
  { no: "B-24032", guest: "이서연", stay: "03.26 - 03.27", status: "CONFIRMED", amount: "149,000원" },
  { no: "B-24033", guest: "박준호", stay: "03.27 - 03.29", status: "CANCELED", amount: "258,000원" },
];

export const inquiryRooms = [
  { title: "체크인 시간 문의", type: "LODGING", status: "OPEN", actor: "회원" },
  { title: "예약 변경 요청", type: "BOOKING", status: "ANSWERED", actor: "회원" },
  { title: "결제 취소 문의", type: "PAYMENT", status: "CLOSED", actor: "회원" },
];

export const userRows = [
  { name: "김민수", role: "ROLE_USER", status: "ACTIVE", email: "minsu@tripzone.test" },
  { name: "정하늘", role: "ROLE_HOST", status: "DORMANT", email: "haneul@tripzone.test" },
  { name: "최다은", role: "ROLE_USER", status: "BLOCKED", email: "daeun@tripzone.test" },
];

export const sellerRows = [
  { business: "오션 스테이", owner: "김대표", status: "PENDING", region: "부산" },
  { business: "포레스트 하우스", owner: "이대표", status: "APPROVED", region: "제주" },
  { business: "코스트 라운지", owner: "박대표", status: "SUSPENDED", region: "강원" },
];

export const sellerMetrics = [
  { label: "오늘 체크인", value: "06", meta: "확정 예약 기준", tone: "mint" },
  { label: "답변 대기 문의", value: "03", meta: "OPEN 문의방", tone: "sand" },
  { label: "가동 객실", value: "12", meta: "ACTIVE / AVAILABLE", tone: "blue" },
];

export const adminMetrics = [
  { label: "승인 대기 판매자", value: "07", meta: "PENDING 상태", tone: "sand" },
  { label: "차단 회원", value: "03", meta: "BLOCKED 상태", tone: "mint" },
  { label: "미처리 운영 이슈", value: "05", meta: "문의 / 쿠폰 / 제재", tone: "blue" },
];

export const operationBoards = [
  {
    title: "문서와 구현 연결",
    copy: "설계 기준은 docs와 HTML 산출물에서 확인하고, 프론트는 그 구조를 화면으로 검증한다.",
  },
  {
    title: "운영 상태 우선",
    copy: "판매자와 관리자는 숙소 감성보다 상태, 승인, 문의, 예약 처리 흐름이 먼저 보여야 한다.",
  },
];

export const structureHighlights = [
  "루트 패키지명은 com.kh.trip 고정",
  "문의 모델은 InquiryRoom / InquiryMessage 고정",
  "프론트는 mock 기반으로 우선 개발",
  "백엔드는 최소 기준만 고정 후 팀원이 확장",
];
