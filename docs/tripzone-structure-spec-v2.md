# TripZone Structure Spec v2

## 1. 목적

이 문서는 기존 구글 스프레드시트 구조명세서를 기준으로, 현재 확정된 도메인 설계와 맞지 않는 항목을 정리해 실구현 가능한 구조 기준으로 다시 쓴 문서다.

기준 원칙:

- 기존 패키지 분류 의도는 유지한다.
- 오타와 중복 명칭은 바로잡는다.
- 도메인 설계와 충돌하는 파일명은 최신 기준으로 교체한다.
- 공통 레이어 이름은 일관되게 맞춘다.

## 2. 공통 패키지 기준

- base package: `com.kh.trip`
- layer package
  - `com.kh.trip.domain`
  - `com.kh.trip.dto`
  - `com.kh.trip.repository`
  - `com.kh.trip.service`
  - `com.kh.trip.controller`
  - `com.kh.trip.config`

## 3. 도메인별 구조

### 3.1 user

- domain
  - `User`
  - `MemberGrade`
  - `HostProfile`
  - `MileageHistory`
  - `UserAuthProvider`
  - `UserRole`
  - `UserRefreshToken`
- dto
  - `UserDTO`
  - `HostProfileDTO`
  - `MileageHistoryDTO`
  - `UserAuthProviderDTO`
  - `UserRoleDTO`
- repository
  - `UserRepository`
  - `MemberGradeRepository`
  - `UserAuthProviderRepository`
  - `UserRoleRepository`
  - `MileageHistoryRepository`
  - `HostProfileRepository`
  - `UserRefreshTokenRepository`
- service
  - `UserService`
  - `UserServiceImpl`
  - `HostService`
  - `HostServiceImpl`
  - `MileageService`
  - `MileageServiceImpl`
- controller
  - `UserController`
  - `HostController`
  - `MileageController`

### 3.2 login

- domain
  - `UserAuthProvider`
  - `UserRefreshToken`
- dto
  - `LoginRequestDTO`
  - `LoginResponseDTO`
  - `UserInfoDTO`
- repository
  - `UserAuthProviderRepository`
  - `UserRefreshTokenRepository`
- service
  - `LoginService`
  - `LoginServiceImpl`
- controller
  - `LoginController`

### 3.3 event

- domain
  - `Event`
  - `Coupon`
  - `EventCoupon`
- dto
  - `EventDTO`
  - `CouponDTO`
  - `UserCouponDTO`
- repository
  - `EventRepository`
  - `CouponRepository`
  - `EventCouponRepository`
  - `UserCouponRepository`
- service
  - `EventService`
  - `EventServiceImpl`
  - `CouponService`
  - `CouponServiceImpl`
- controller
  - `EventController`
  - `CouponController`

### 3.4 reserve

- domain
  - `Booking`
  - `Payment`
  - `Review`
  - `ReviewImage`
- dto
  - `BookingDTO`
  - `PaymentDTO`
  - `ReviewDTO`
- repository
  - `BookingRepository`
  - `PaymentRepository`
  - `ReviewRepository`
  - `ReviewImageRepository`
- service
  - `BookingService`
  - `BookingServiceImpl`
  - `PaymentService`
  - `PaymentServiceImpl`
  - `ReviewService`
  - `ReviewServiceImpl`
- controller
  - `BookingController`
  - `PaymentController`
  - `ReviewController`

### 3.5 lodging

- domain
  - `Lodging`
  - `Room`
  - `Wishlist`
  - `LodgingImage`
- dto
  - `LodgingDTO`
  - `RoomDTO`
  - `WishlistDTO`
- repository
  - `LodgingRepository`
  - `RoomRepository`
  - `WishlistRepository`
  - `LodgingImageRepository`
- service
  - `LodgingService`
  - `LodgingServiceImpl`
  - `RoomService`
  - `RoomServiceImpl`
  - `WishlistService`
  - `WishlistServiceImpl`
- controller
  - `LodgingController`
  - `RoomController`
  - `WishlistController`

### 3.6 inquiry

- domain
  - `InquiryRoom`
  - `InquiryMessage`
- dto
  - `InquiryRoomDTO`
  - `InquiryMessageDTO`
- repository
  - `InquiryRoomRepository`
  - `InquiryMessageRepository`
- service
  - `InquiryService`
  - `InquiryServiceImpl`
- controller
  - `InquiryController`

### 3.7 common

- dto
  - `PaginationDTO`
  - `PageRequestDTO`
  - `CodeLabelValueDTO`
- config
  - `CustomServletConfig`
  - `RootConfig`

### 3.8 admin

- domain
  - `AuditLog`
- dto
  - `AdminDashboardDTO`
  - `AuditLogDTO`
- repository
  - `AuditLogRepository`
- service
  - `AdminService`
  - `AdminServiceImpl`
- controller
  - `AdminController`

## 4. 구조명세서에서 바로잡은 항목

- `BookindController` -> `BookingController`
- `LodgindImage` -> `LodgingImage`
- `WishList` -> `Wishlist`
- `UserAuth` -> `UserAuthProvider`
- `Inquiry` / `Comment` -> `InquiryRoom` / `InquiryMessage`
- `CommentRepository` -> `InquiryMessageRepository`
- `UserGradeRepository` -> `MemberGradeRepository`

## 5. 구조 규칙

- 엔티티명은 단수형 기준
- DTO는 `*DTO`
- 구현체는 `*ServiceImpl`
- 컨트롤러는 도메인 기준 하나씩 분리
- repository는 테이블 또는 aggregate root 기준으로 구성

## 6. 최종 기준

- 기존 스프레드시트는 참고본으로 둔다.
- 실제 구현 시 구조 기준은 이 문서를 따른다.
- DB 기준은 `tripzone-ddl-v2.sql`, 도메인 기준은 `tripzone-company-spec.md`를 함께 본다.
