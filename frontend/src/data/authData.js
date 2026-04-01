export const authProviders = [
  { key: "LOCAL", label: "이메일 로그인", description: "이메일과 비밀번호로 로그인" },
  { key: "KAKAO", label: "카카오", description: "카카오 계정으로 간편 로그인" },
  { key: "NAVER", label: "네이버", description: "네이버 계정으로 간편 로그인" },
  { key: "GOOGLE", label: "구글", description: "구글 계정으로 간편 로그인" },
];

export const defaultLoginForm = {
  provider: "LOCAL",
  email: "tripzone@example.com",
  password: "",
  remember: true,
};

export const demoLoginAccounts = [
  {
    key: "user",
    label: "일반 회원",
    name: "Chat Flow",
    email: "chatflow1774941743",
    password: "Trip1234!",
    role: "ROLE_USER",
    landingTo: "/my/profile",
  },
  {
    key: "host",
    label: "판매자",
    name: "zeus",
    email: "zeus",
    password: "1234",
    role: "ROLE_HOST",
    landingTo: "/seller",
  },
  {
    key: "admin",
    label: "관리자",
    name: "게스트01",
    email: "admin",
    password: "1234",
    role: "ROLE_ADMIN",
    landingTo: "/admin",
  },
];

export const defaultSignupForm = {
  provider: "LOCAL",
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "ROLE_USER",
  marketing: false,
};
