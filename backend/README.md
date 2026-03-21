# backend

팀원용 최소 백엔드 루트다.

## 현재 고정 사항

- root package: `com.kh.trip`
- 문의 모델: `InquiryRoom`, `InquiryMessage`
- DDL 기준: `../docs/tripzone-ddl-v2.sql`
- 구조 기준: `../docs/tripzone-structure-spec-v2.md`

## 권장 시작 순서

1. `User`, `MemberGrade`, `HostProfile`
2. `Lodging`, `Room`
3. `Booking`, `Payment`
4. `InquiryRoom`, `InquiryMessage`
5. `Review`, `Wishlist`, `Coupon`

## 폴더

- `src/main/java/com/kh/trip`
- `src/main/resources`
