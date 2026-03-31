import { authProviders } from "../../data/authData";
import { post } from "../../lib/appClient";
import { clearAuthSession, readAuthSession, writeAuthSession } from "./authSession";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID ?? "";
const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID ?? "";
const KAKAO_REDIRECT_URI =
  import.meta.env.VITE_KAKAO_REDIRECT_URI ?? "http://localhost:5173/auth/kakao/callback";
const NAVER_REDIRECT_URI =
  import.meta.env.VITE_NAVER_REDIRECT_URI ?? "http://localhost:5173/auth/naver/callback";
let googleScriptPromise = null;
let googleInitialized = false;
let googleLoginPromise = null;
let googleLoginHandlers = null;

export function getSelectedAuthProvider(providerKey) {
  return authProviders.find((provider) => provider.key === providerKey) ?? authProviders[0];
}

function getLandingPath(roleNames = []) {
  if (roleNames.includes("ROLE_ADMIN")) return "/admin";
  if (roleNames.includes("ROLE_HOST")) return "/seller";
  return "/";
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

export function createAuthSessionPayloadFromResponse(response, fallbackEmail, provider = "LOCAL") {
  const roleNames = response.roleNames ?? [];

  return {
    userNo: response.userNo,
    name: response.userName,
    email: fallbackEmail,
    loginId: response.loginId,
    provider,
    role: roleNames[0] ?? "ROLE_USER",
    roleNames,
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    accessTokenExpiresIn: response.accessTokenExpiresIn,
    refreshTokenExpiresIn: response.refreshTokenExpiresIn,
    landingTo: getLandingPath(roleNames),
    reviewEligibleLodgingIds: [1, 2, 3],
  };
}

export function loginWithSessionPayload(payload) {
  writeAuthSession(payload);
  return payload.landingTo ?? "/";
}

export async function loginWithCredentials(form) {
  const response = await post("/api/auth/login", {
    loginId: form.email.trim(),
    password: form.password,
  });

  return createAuthSessionPayloadFromResponse(response, form.email.trim(), "LOCAL");
}

export async function signupWithCredentials(form) {
  return post("/api/auth/register", {
    loginId: form.email.trim(),
    password: form.password,
    userName: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
  });
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

export function getKakaoAuthUrl() {
  if (!KAKAO_CLIENT_ID) {
    throw new Error("Kakao client id is not configured.");
  }

  return `https://kauth.kakao.com/oauth/authorize?client_id=${encodeURIComponent(KAKAO_CLIENT_ID)}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;
}

export function getNaverAuthUrl() {
  if (!NAVER_CLIENT_ID) {
    throw new Error("Naver client id is not configured.");
  }

  const state = crypto.randomUUID();
  window.sessionStorage.setItem("tripzone-naver-state", state);
  return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${encodeURIComponent(NAVER_CLIENT_ID)}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI)}&state=${encodeURIComponent(state)}`;
}

export async function loginWithSocialCode(provider, code, state) {
  const endpoint = provider === "KAKAO" ? "/api/auth/kakao" : "/api/auth/naver";
  const payload =
    provider === "NAVER"
      ? { code, state }
      : { code, redirectUri: KAKAO_REDIRECT_URI };
  const response = await post(endpoint, payload);
  return createAuthSessionPayloadFromResponse(response, `${provider.toLowerCase()}@tripzone.social`, provider);
}

export async function loginWithGoogleIdToken(idToken) {
  const response = await post("/api/auth/google", { idToken });
  return createAuthSessionPayloadFromResponse(response, "google@tripzone.social", "GOOGLE");
}

export function loadGoogleScript() {
  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    if (!GOOGLE_CLIENT_ID) {
      reject(new Error("Google client id is not configured."));
      return;
    }

    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }

    const existing = document.querySelector('script[data-google-identity="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google), { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Google login script could not be loaded."));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

function resetGoogleLoginHandlers() {
  googleLoginPromise = null;
  googleLoginHandlers = null;
}

function ensureGoogleInitialized(google) {
  if (googleInitialized) {
    return;
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: async (response) => {
      const handlers = googleLoginHandlers;
      resetGoogleLoginHandlers();

      if (!handlers) {
        return;
      }

      try {
        const session = await loginWithGoogleIdToken(response.credential);
        handlers.resolve(session);
      } catch (error) {
        handlers.reject(error);
      }
    },
  });

  googleInitialized = true;
}

export async function loginWithGooglePopup() {
  if (googleLoginPromise) {
    return googleLoginPromise;
  }

  const google = await loadGoogleScript();
  ensureGoogleInitialized(google);

  googleLoginPromise = new Promise((resolve, reject) => {
    googleLoginHandlers = { resolve, reject };

    google.accounts.id.cancel?.();
    google.accounts.id.prompt((notification) => {
      if (!googleLoginHandlers) {
        return;
      }

      if (notification.isNotDisplayed?.()) {
        resetGoogleLoginHandlers();
        reject(new Error("Google 로그인 창을 열 수 없습니다. 브라우저의 FedCM 또는 서드파티 로그인 설정을 확인하세요."));
        return;
      }

      if (notification.isSkippedMoment?.()) {
        resetGoogleLoginHandlers();
        reject(new Error("Google 로그인 요청이 취소되었거나 현재 브라우저에서 차단되었습니다."));
      }
    });
  });

  return googleLoginPromise;
}

export async function logoutCurrentSession() {
  const session = readAuthSession();

  if (!session?.refreshToken) {
    clearAuthSession();
    return;
  }

  try {
    await post("/api/auth/logout", {
      refreshToken: session.refreshToken,
    });
  } finally {
    clearAuthSession();
  }
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

export function getMembershipLabel(session) {
  if (session?.role === "ROLE_ADMIN") return "관리자";
  if (session?.role === "ROLE_HOST") return "판매자";
  if (session?.provider === "KAKAO") return "Kakao";
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
