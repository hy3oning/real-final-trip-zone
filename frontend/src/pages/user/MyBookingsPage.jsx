import { myBookingRows, myBookingSummaries } from "../../data/siteData";

export default function MyBookingsPage() {
  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">My trips</p>
        <h1>내 예약</h1>
      </section>
      <section className="my-page-panel">
        <div className="summary-grid">
          {myBookingSummaries.map((item) => (
            <div key={item.label} className={`summary-card tone-${item.tone}`}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
        <div className="booking-list">
          {myBookingRows.map((item) => (
            <article key={`${item.name}-${item.stay}`} className="booking-list-item">
              <div>
                <strong>{item.name}</strong>
                <p>{item.stay}</p>
              </div>
              <div className="booking-list-meta">
                <span className="inline-chip">{item.status}</span>
                <span className="price-tag">{item.price}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="booking-actions">
          <a className="secondary-button" href="/lodgings">
            숙소 더 보기
          </a>
          <a className="secondary-button" href="/my/inquiries">
            문의 내역 보기
          </a>
        </div>
      </section>
    </div>
  );
}
