import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-topline">
          <div className="footer-brand-block">
            <Link className="brand footer-brand" to="/">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark-wave" />
                <span className="brand-mark-sun" />
              </span>
              <span className="brand-copy">
                <span className="brand-main">TripZone</span>
                <span className="brand-sub">stay and travel</span>
              </span>
            </Link>
            <p>국내 프리미엄 스테이를 빠르게 탐색하고, 일정에 맞춰 바로 예약하는 여행 예약 서비스</p>
            <div className="footer-service-note">
              <span>예약 상담 09:00 - 23:00</span>
              <span>당일 예약 · 일정 변경 지원</span>
            </div>
          </div>
          <div className="footer-link-grid">
            <div className="footer-link-block">
              <strong>서비스</strong>
              <Link to="/lodgings">국내 숙소</Link>
              <Link to="/lodgings?theme=deal">오늘 특가</Link>
              <Link to="/my/bookings">예약 내역</Link>
            </div>
            <div className="footer-link-block">
              <strong>지원</strong>
              <Link to="/my/inquiries">문의 내역</Link>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </div>
            <div className="footer-link-block">
              <strong>호스트</strong>
              <Link to="/seller">호스트 센터</Link>
              <Link to="/seller/rooms">숙소 등록</Link>
              <Link to="/seller/reservations">예약 운영</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottomline">
          <div className="footer-policy-links" aria-label="서비스 안내">
            <span>TripZone 서비스 안내</span>
            <span>이용약관</span>
            <span>개인정보처리방침</span>
            <span>전자금융거래 이용약관</span>
          </div>
          <div className="footer-meta-group">
            <span>고객센터 1670-2048</span>
            <span>예약 변경 · 결제 문의</span>
            <span>호스트 제휴 문의 host@tripzone.kr</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
