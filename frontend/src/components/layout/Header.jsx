import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "국내숙소" },
  { to: "/lodgings", label: "특가 숙소" },
  { to: "/my/bookings", label: "예약내역" },
  { to: "/my/inquiries", label: "문의내역" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="brand" to="/">
          <span className="brand-main">TripZone</span>
          <span className="brand-sub">국내 숙소 예약</span>
        </Link>
        <nav className="header-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-chip${isActive ? " active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-utility">
          <Link className="utility-link" to="/seller">
            판매자센터
          </Link>
          <Link className="utility-link" to="/docs">
            문서
          </Link>
        </div>
      </div>
    </header>
  );
}
