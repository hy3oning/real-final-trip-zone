import { Link, useParams } from "react-router-dom";
import { detailMoments, lodgings } from "../../data/siteData";

export default function LodgingDetailPage() {
  const { lodgingId } = useParams();
  const lodging = lodgings.find((item) => String(item.id) === lodgingId) ?? lodgings[0];

  return (
    <div className="container page-stack">
      <section className="lodging-hero">
        <div className="lodging-hero-visual" style={{ backgroundImage: `url(${lodging.image})` }} />
        <div className="lodging-hero-copy">
          <p className="eyebrow hero-eyebrow">{lodging.region}</p>
          <h1>{lodging.name}</h1>
          <p>{lodging.intro}</p>
          <div className="feature-chip-row">
            {lodging.highlights.map((item) => (
              <span key={item} className="inline-chip inline-chip-light">
                {item}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <Link className="primary-button" to={`/booking/${lodging.id}`}>
              예약하기
            </Link>
            <Link className="secondary-button" to="/my/inquiries">
              문의 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="detail-grid">
        <section className="detail-main">
          <div className="detail-headline">
            <span className="small-label">{lodging.district} · {lodging.type}</span>
            <h2>숙소 개요</h2>
            <p>{lodging.summary}</p>
          </div>

          <div className="detail-info-rail">
            <div className="detail-info-item">
              <strong>후기 요약</strong>
              <p>{lodging.review}</p>
            </div>
            <div className="detail-info-item">
              <strong>객실 타입</strong>
              <p>{lodging.room}</p>
            </div>
            <div className="detail-info-item">
              <strong>취소 정책</strong>
              <p>{lodging.cancellation}</p>
            </div>
          </div>

          <div className="detail-moment-list">
            {detailMoments.map((item) => (
              <div key={item} className="detail-moment-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <aside className="sticky-booking-card">
          <span className="small-label">Booking snapshot</span>
          <strong>{lodging.price}</strong>
          <p>{lodging.room}</p>
          <p>{lodging.cancellation}</p>
          <div className="feature-chip-row">
            <span className="inline-chip">★ {lodging.rating}</span>
            <span className="inline-chip">즉시 확정</span>
          </div>
          <Link className="primary-button booking-card-button" to={`/booking/${lodging.id}`}>
            객실 선택 후 예약
          </Link>
        </aside>
      </section>
    </div>
  );
}
