import { authProviders, demoLoginAccounts } from "../../data/authData";
import { writeAuthSession } from "./authSession";

export function getSelectedAuthProvider(providerKey) {
  return authProviders.find((provider) => provider.key === providerKey) ?? authProviders[0];
}

export function findDemoLoginAccount(email, password) {
  return demoLoginAccounts.find((account) => account.email === email.trim() && account.password === password);
}

export function createAuthSessionPayload({ name, email, provider, role, landingTo }) {
  return {
    name,
    email,
    provider,
    role,
    landingTo,
    reviewEligibleLodgingIds: [1, 2, 3],
  };
}

export function loginWithSessionPayload(payload) {
  writeAuthSession(payload);
  return payload.landingTo ?? "/";
}

export function createSocialSession(provider) {
  return createAuthSessionPayload({
    name: `${provider.label} 회원`,
    email: `${provider.key.toLowerCase()}@tripzone.social`,
    provider: provider.key,
    role: "ROLE_USER",
    landingTo: "/",
  });
}

export function createDefaultLocalSession(form) {
  return createAuthSessionPayload({
    name: form.email.split("@")[0] || "tripzone",
    email: form.email,
    provider: form.provider,
    role: "ROLE_USER",
    landingTo: "/",
  });
}

export function createDemoAccountSession(account, providerKey) {
  return createAuthSessionPayload({
    name: account.name,
    email: account.email,
    provider: providerKey,
    role: account.role,
    landingTo: account.landingTo,
  });
}

export function getMembershipLabel(session) {
  if (session?.role === "ROLE_ADMIN") return "관리자";
  if (session?.role === "ROLE_HOST") return "판매자";
  if (session?.provider === "KAKAO") return "Basic";
  if (session?.provider === "NAVER") return "Naver";
  if (session?.provider === "GOOGLE") return "Google";
  return "Basic";
}

export function getHeaderRoleLinks(session) {
  if (session?.role === "ROLE_ADMIN") {
    return [
      { to: "/admin", label: "관리자 대시보드" },
      { to: "/admin/users", label: "회원 관리" },
      { to: "/admin/sellers", label: "판매자 관리" },
      { to: "/admin/events", label: "이벤트 · 쿠폰" },
      { to: "/admin/inquiries", label: "문의 모니터링" },
      { to: "/admin/audit-logs", label: "운영 로그" },
    ];
  }

  if (session?.role === "ROLE_HOST") {
    return [
      { to: "/seller", label: "판매자 대시보드" },
      { to: "/seller/lodgings", label: "숙소 관리" },
      { to: "/seller/rooms", label: "객실 관리" },
      { to: "/seller/reservations", label: "예약 관리" },
      { to: "/seller/inquiries", label: "문의 관리" },
    ];
  }

  return [
    { to: "/my", label: "마이페이지" },
    { to: "/my/bookings", label: "예약 내역" },
    { to: "/my/wishlist", label: "찜 목록" },
    { to: "/my/mileage", label: "마일리지" },
    { to: "/my/coupons", label: "쿠폰" },
    { to: "/my/profile", label: "내 정보 관리" },
    { to: "/my/seller-apply", label: "판매자 신청" },
    { to: "/my/payments", label: "결제 내역" },
    { to: "/my/inquiries", label: "문의센터" },
  ];
}

export function getAuthProviderMark(providerKey) {
  if (providerKey === "KAKAO") return "K";
  if (providerKey === "NAVER") return "N";
  return "G";
}
