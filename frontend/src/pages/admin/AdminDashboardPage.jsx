import { adminMetrics, adminTasks } from "../../data/siteData";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  return (
    <div className="container page-stack">
      <section className="ops-hero">
        <div>
          <p className="eyebrow">Admin operations</p>
          <h1>판매자 승인, 회원 상태, 문의 모니터링을 정책 기준으로 보는 운영 보드</h1>
          <p>관리자 화면은 예쁜 랜딩이 아니라 상태 분류와 빠른 판단이 핵심이다.</p>
        </div>
      </section>

      <section className="ops-board">
        <div className="summary-grid">
          {adminMetrics.map((item) => (
            <div key={item.label} className={`summary-card tone-${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.meta}</p>
            </div>
          ))}
        </div>
        <div className="ops-worklist">
          {adminTasks.map((task) => (
            <div key={task} className="ops-work-item">
              {task}
            </div>
          ))}
        </div>
        <div className="hero-actions">
          <Link className="primary-button" to="/admin/users">회원 관리</Link>
          <Link className="secondary-button" to="/admin/sellers">판매자 관리</Link>
        </div>
      </section>
    </div>
  );
}
