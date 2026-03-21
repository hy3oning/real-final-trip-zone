# trip-zone

설계 기준 전용 프로젝트 루트다.

## 구조

- `frontend/`: React + Vite 기반 프론트엔드
- `backend/`: 팀원용 최소 백엔드 루트
- `docs/`: 설계/DDL/코멘트 문서
- `submission-html/`: 제출용 HTML 문서 세트
- `presentation/`: 발표용 HTML deck

## 기준

- 루트 패키지명: `com.kh.trip`
- 문의 모델: `InquiryRoom`, `InquiryMessage`
- DB 기준: `docs/tripzone-ddl-v2.sql`

## 프론트 실행

```bash
cd frontend
npm install
npm run dev
```

## 현재 범위

- 프론트 우선 구현
- 백엔드는 최소 폴더와 기준만 고정
- 제출용/발표용 문서는 정적 HTML로 분리
