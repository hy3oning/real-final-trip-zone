# TripZone Company Spec v2

## 1. 문서 목적

이 문서는 팀 내부에서 공유된 TripZone 설계 초안, 테이블 초안, ERD 이미지, 구조 명세 스프레드시트를 바탕으로 실제 구현과 운영을 견딜 수 있는 수준으로 재정리한 기준서다.

원칙은 다음과 같다.

- 기존 팀 문서의 테이블명과 핵심 컬럼명은 최대한 유지한다.
- 충돌하는 설계는 하나의 기준으로 통합한다.
- 화면 중심 설계를 도메인 중심 설계로 보정한다.
- 학원 예시 문서 흔적은 제거하고 TripZone 기준으로 재정의한다.

## 2. 제품 범위

TripZone은 국내 숙소 예약 플랫폼이다. 주요 주체는 일반 회원, 판매자, 관리자다.

- 일반 회원: 회원가입, 로그인, 숙소 탐색, 예약, 결제, 리뷰, 찜, 문의, 쿠폰/마일리지 사용
- 판매자: 판매자 승인 후 숙소/객실 관리, 예약 처리, 문의 응답
- 관리자: 회원/판매자/이벤트/쿠폰/문의/운영 현황 관리

## 3. 핵심 설계 원칙

### 3.1 식별자

- 모든 기본키는 `NUMBER(10)` 시퀀스 기반으로 유지한다.
- 기존 `*_NO` 패턴은 유지한다.

### 3.2 시간 컬럼

- 기존 `REG_DATE`, `UPD_DATE`는 유지한다.
- 운영 추적이 필요한 경우 `APPROVED_AT`, `CANCELED_AT`, `EXPIRED_AT`, `DELETED_AT` 같은 목적형 컬럼을 추가한다.

### 3.3 삭제 정책

- 회원, 판매자, 숙소, 객실, 쿠폰, 이벤트, 문의방은 즉시 물리 삭제하지 않는다.
- 운영 화면에서 삭제는 기본적으로 상태값 변경 또는 `DELETED_AT` 기록으로 처리한다.

### 3.4 권한 정책

- 권한 기준 테이블은 `USER_ROLES`로 통일한다.
- 허용 권한은 `ROLE_USER`, `ROLE_HOST`, `ROLE_ADMIN`이다.
- 판매자 여부는 `USER_ROLES`와 `HOST_PROFILES`를 함께 본다.
- 관리자가 수행한 승인/제재 행위는 추적 가능해야 한다.

## 4. 도메인 모델

### 4.1 회원

- `USERS`는 회원의 공통 프로필과 상태를 가진다.
- 인증 수단은 `USER_AUTH_PROVIDERS`로 분리한다.
- 등급은 `MEMBER_GRADES`와 연결한다.
- 리프레시 토큰은 `USER_REFRESH_TOKENS`로 관리한다.

### 4.2 판매자

- 판매자는 일반 회원의 확장 개념이다.
- 판매자 신청 및 승인 상태는 `HOST_PROFILES`에서 관리한다.
- `APPROVAL_STATUS`는 `PENDING`, `APPROVED`, `REJECTED`, `SUSPENDED`를 사용한다.

### 4.3 숙소와 객실

- `LODGINGS`는 숙소 마스터다.
- `ROOMS`는 실제 예약 단위다.
- 가격과 재고 판단은 객실 기준이다.
- 숙소 이미지와 리뷰 이미지는 별도 테이블로 관리한다.

### 4.4 예약

- 예약의 기준 테이블은 `BOOKINGS`다.
- 예약은 객실 기준으로 생성된다.
- 예약 생성 시 가격, 할인 금액, 총 결제 금액은 스냅샷 값으로 저장한다.
- 예약 가능 여부는 서비스 레이어에서 `ROOM_NO + 날짜 범위 + STATUS` 기준으로 검증한다.

### 4.5 결제

- 결제는 `PAYMENTS`에서 관리한다.
- 하나의 예약은 하나의 활성 결제 기준 레코드를 갖는다.
- 환불/부분환불은 동일 테이블의 상태와 금액 컬럼으로 추적한다.

### 4.6 쿠폰과 마일리지

- 쿠폰 마스터는 `COUPONS`, 회원 보유 쿠폰은 `USER_COUPONS`로 분리한다.
- 이벤트와 쿠폰 관계는 `EVENT_COUPONS`로 관리한다.
- 마일리지는 집계값을 `USERS.MILEAGE`에 두고, 원장성 기록은 `MILEAGE_HISTORY`에 남긴다.

### 4.7 리뷰

- 리뷰는 숙박 완료 예약에 대해서만 1회 작성 가능하다.
- 제약 기준은 `REVIEWS.BOOKING_NO UNIQUE`다.
- 리뷰 이미지는 `REVIEW_IMAGES`로 분리한다.

### 4.8 문의

초안의 `INQUIRIES`, `COMMENT`, `INQUIRY_ROOM`, `INQUIRY_MESSAGE`는 충돌하므로 실시간 문의 흐름에 맞춰 아래와 같이 통일한다.

- 문의방 마스터: `INQUIRY_ROOMS`
- 문의 메시지: `INQUIRY_MESSAGES`

문의는 게시판형 단건보다 채팅형 구조가 운영상 확장성이 높다. 제목/유형/상태는 방에 두고, 실제 대화 내역은 메시지로 분리한다.

## 5. 상태 모델

### 5.1 판매자 승인 상태

- `PENDING`: 승인 대기
- `APPROVED`: 승인 완료
- `REJECTED`: 반려
- `SUSPENDED`: 운영 중지

### 5.2 숙소 상태

- `ACTIVE`: 노출 가능
- `INACTIVE`: 비노출
- `SUSPENDED`: 운영 제재

### 5.3 객실 상태

- `AVAILABLE`: 예약 가능
- `UNAVAILABLE`: 예약 불가
- `SUSPENDED`: 운영 제재

### 5.4 예약 상태

- `PENDING`: 예약 요청 직후, 결제 대기 또는 확인 대기
- `CONFIRMED`: 예약 확정
- `CANCELED`: 사용자 또는 운영자 취소
- `COMPLETED`: 숙박 완료
- `NO_SHOW`: 체크인 실패

상태 전이 원칙:

- `PENDING -> CONFIRMED`
- `PENDING -> CANCELED`
- `CONFIRMED -> CANCELED`
- `CONFIRMED -> COMPLETED`
- `CONFIRMED -> NO_SHOW`

### 5.5 결제 상태

- `READY`
- `PAID`
- `FAILED`
- `CANCELED`
- `PARTIAL_CANCELED`
- `REFUNDED`

### 5.6 문의 상태

- `OPEN`: 접수됨
- `ANSWERED`: 판매자 또는 운영자 응답 완료
- `CLOSED`: 종료
- `BLOCKED`: 운영 차단

## 6. 데이터 정합성 규칙

### 6.1 회원

- `EMAIL`은 유니크다.
- 탈퇴 후 재가입 정책이 필요하면 추후 soft-delete 정책과 함께 별도 정의한다.

### 6.2 판매자

- 한 회원은 하나의 `HOST_PROFILE`만 가진다.
- 판매자 승인 처리자는 관리자 권한 사용자여야 한다. 이 제약은 DB 단독으로 강제하기 어렵기 때문에 서비스 검증으로 보완한다.

### 6.3 예약

- `CHECK_OUT_DATE > CHECK_IN_DATE`
- `GUEST_COUNT > 0`
- 예약 생성 시 객실 최대 인원 초과 여부를 검증한다.
- 동일 객실의 동일 날짜 범위 중복 예약은 서비스 레이어와 조회 인덱스로 방지한다.

### 6.4 결제

- `PAYMENT_AMOUNT >= 0`
- `REFUND_AMOUNT >= 0`
- 부분환불 금액은 결제 금액을 초과할 수 없다.

### 6.5 쿠폰

- 쿠폰 기간은 `END_DATE >= START_DATE`
- 사용 가능한 회원 쿠폰은 한 예약에 하나만 적용한다.
- 이미 `USED` 또는 `EXPIRED` 상태인 쿠폰은 재사용할 수 없다.

### 6.6 리뷰

- 숙박 완료 전 리뷰 작성 불가
- 동일 예약의 중복 리뷰 불가

### 6.7 문의

- 문의방은 회원이 생성한다.
- 판매자 문의는 숙소 기준, 시스템 문의는 숙소 미지정 허용
- 메시지는 삭제 대신 숨김 또는 상태값 변경을 우선한다.

## 7. 인덱스 기준

최소 인덱스는 아래를 둔다.

- `USERS(EMAIL)`
- `USER_AUTH_PROVIDERS(LOGIN_ID)`
- `HOST_PROFILES(USER_NO, APPROVAL_STATUS)`
- `LODGINGS(HOST_NO, STATUS, REGION)`
- `ROOMS(LODGING_NO, STATUS)`
- `BOOKINGS(USER_NO, STATUS, CHECK_IN_DATE)`
- `BOOKINGS(ROOM_NO, CHECK_IN_DATE, CHECK_OUT_DATE, STATUS)`
- `PAYMENTS(BOOKING_NO, PAYMENT_STATUS)`
- `USER_COUPONS(USER_NO, STATUS, EXPIRED_AT)`
- `REVIEWS(LODGING_NO, REG_DATE)`
- `INQUIRY_ROOMS(USER_NO, ROOM_STATUS, INQUIRY_TYPE)`
- `INQUIRY_MESSAGES(INQUIRY_ROOM_NO, REG_DATE)`

## 8. 운영 및 감사

- 관리자/판매자 주요 행위는 `AUDIT_LOGS`에 기록한다.
- 최소 기록 대상: 판매자 승인/반려, 숙소 상태 변경, 예약 강제 취소, 쿠폰 발급/중지, 문의 차단

## 9. 구현 우선순위

1. 회원/권한/인증
2. 판매자 승인
3. 숙소/객실
4. 예약/결제
5. 리뷰/찜
6. 문의
7. 이벤트/쿠폰/마일리지
8. 운영 감사 로그

## 10. 최종 기준 선언

이 문서는 기존 산발적 메모를 대체하는 통합 개정 기준이다.

- 문의 구조는 `INQUIRY_ROOMS`, `INQUIRY_MESSAGES`를 기준으로 한다.
- 권한 구조는 `USER_ROLES`를 기준으로 한다.
- 인증 구조는 `USER_AUTH_PROVIDERS`, `USER_REFRESH_TOKENS`를 기준으로 한다.
- DDL 기준 구현안은 `tripzone-ddl-v2.sql`을 따른다.
- 패키지/파일 구조 기준 구현안은 `tripzone-structure-spec-v2.md`를 따른다.
