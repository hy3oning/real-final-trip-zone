import { inquiryTimeline } from "../../data/siteData";

export default function MyInquiriesPage() {
  return (
    <div className="container page-stack">
      <section className="my-page-head">
        <p className="eyebrow">My support</p>
        <h1>내 문의</h1>
      </section>
      <section className="my-page-panel">
        <div className="inquiry-overview">
          <div className="inquiry-overview-item">
            <strong>InquiryRoom</strong>
            <p>제목, 문의 유형, 관련 숙소/예약, 문의 상태를 가진다.</p>
          </div>
          <div className="inquiry-overview-item">
            <strong>InquiryMessage</strong>
            <p>회원, 판매자, 관리자 메시지를 시간순으로 누적한다.</p>
          </div>
        </div>
        <div className="timeline-list">
          {inquiryTimeline.map((item) => (
            <article key={`${item.role}-${item.time}`} className="timeline-item">
              <div className="timeline-meta">
                <strong>{item.role}</strong>
                <span>{item.time}</span>
              </div>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <div className="booking-actions">
          <a className="secondary-button" href="/lodgings">
            다른 숙소 둘러보기
          </a>
          <a className="secondary-button" href="/my/bookings">
            예약 내역 보기
          </a>
        </div>
      </section>
    </div>
  );
}
