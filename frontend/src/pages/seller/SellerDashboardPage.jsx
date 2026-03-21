import { sellerMetrics, sellerTasks } from "../../data/siteData";
import { Link } from "react-router-dom";

export default function SellerDashboardPage() {
  return (
    <div className="container page-stack">
      <section className="ops-hero">
        <div>
          <p className="eyebrow">Seller operations</p>
          <h1>오늘 처리해야 하는 예약, 문의, 숙소 상태를 한 화면에 모은 보드</h1>
          <p>판매자 화면은 브랜드 감성보다 상태 확인과 빠른 액션이 우선이다.</p>
        </div>
      </section>

      <section className="ops-board">
        <div className="summary-grid">
          {sellerMetrics.map((item) => (
            <div key={item.label} className={`summary-card tone-${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.meta}</p>
            </div>
          ))}
        </div>
        <div className="ops-worklist">
          {sellerTasks.map((task) => (
            <div key={task} className="ops-work-item">
              {task}
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <Link className="primary-button" to="/seller/lodgings">숙소 관리</Link>
          <Link className="secondary-button" to="/seller/reservations">예약 관리</Link>
          <Link className="secondary-button" to="/seller/inquiries">문의 관리</Link>
        </div>
      </section>
    </div>
  );
}
