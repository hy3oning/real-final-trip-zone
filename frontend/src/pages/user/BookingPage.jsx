import { Link, useParams } from "react-router-dom";
import { bookingChecklist, bookingStatusNotes, lodgings } from "../../data/siteData";

export default function BookingPage() {
  const { lodgingId } = useParams();
  const lodging = lodgings.find((item) => String(item.id) === lodgingId) ?? lodgings[0];

  return (
    <div className="container page-stack">
      <section className="booking-hero">
        <div className="booking-hero-main">
          <p className="eyebrow">Booking flow</p>
          <h1>{lodging.name} 예약</h1>
          <p>{lodging.intro}</p>
        </div>
        <div className="booking-hero-side">
          <span className="small-label">선택 숙소</span>
          <strong>{lodging.price}</strong>
          <p>{lodging.summary}</p>
        </div>
      </section>

      <section className="booking-section">
        <div className="booking-layout">
          <div className="booking-column">
            <div className="booking-section-head">
              <h2>입력 항목</h2>
            </div>
            <div className="booking-check-list">
              {bookingChecklist.map((item) => (
                <div key={item} className="booking-check-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="booking-form-mock">
            <div className="booking-field">
              <span>투숙 날짜</span>
              <strong>03.28 - 03.30</strong>
            </div>
            <div className="booking-field">
              <span>객실 타입</span>
              <strong>{lodging.room}</strong>
            </div>
            <div className="booking-field">
              <span>투숙 인원</span>
              <strong>성인 2명</strong>
            </div>
            <div className="booking-field">
              <span>결제 예정 금액</span>
              <strong>{lodging.price}</strong>
            </div>
            <div className="booking-summary-box">
              <p>객실 요금 {lodging.price}</p>
              <p>즉시 할인 -12,000원</p>
              <strong>총 결제 예정 137,000원</strong>
            </div>
            <Link className="primary-button booking-card-button" to="/my/bookings">
              예약 흐름 저장
            </Link>
          </div>
          <div className="booking-column">
            <div className="booking-section-head">
              <h2>예약 전 확인</h2>
            </div>
            <div className="booking-check-list">
              {bookingStatusNotes.map((item) => (
                <div key={item} className="booking-check-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
