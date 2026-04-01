import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyPageLayout from "../../components/user/MyPageLayout";
import {
  getInquiryCounts,
  INQUIRY_STATUS_LABELS,
  INQUIRY_TYPE_LABELS,
} from "../../features/mypage/mypageViewModels";
import { getMyInquiryThreads } from "../../services/mypageService";

export default function MyInquiriesPage() {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { answeredCount } = getInquiryCounts(rows);

  useEffect(() => {
    let cancelled = false;

    async function loadRows() {
      try {
        setIsLoading(true);
        setError("");
        const nextRows = await getMyInquiryThreads();
        if (cancelled) return;
        setRows(nextRows);
      } catch (loadError) {
        if (cancelled) return;
        console.error("Failed to load admin inquiries.", loadError);
        setRows([]);
        setError("관리자 문의 연동 상태를 확인 중입니다.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadRows();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MyPageLayout>
      <section className="my-list-sheet inquiry-sheet inquiry-sheet--list">
        <div className="mypage-header-row">
          <div className="mypage-header-copy">
            <strong>관리자 문의센터</strong>
            <p>결제, 예약, 계정 이슈처럼 운영팀 확인이 필요한 문의만 모아 봅니다.</p>
          </div>
        </div>
        <div className="support-center-strip support-center-strip--hero">
          <div className="support-center-item">
            <span>운영 시간</span>
            <strong>매일 09:00 - 18:00</strong>
          </div>
          <div className="support-center-item">
            <span>답변 기준</span>
            <strong>일반 문의 24시간 이내</strong>
          </div>
          <div className="support-center-item">
            <span>처리 방식</span>
            <strong>접수 → 확인 → 답변 완료</strong>
          </div>
        </div>
        <div className="support-quick-grid">
          <Link className="support-quick-card" to="/my/inquiries/new">
            <div className="support-quick-main">
              <span className="support-quick-eyebrow">운영 지원</span>
              <strong>관리자 문의 등록</strong>
              <span>결제, 취소 규정, 계정 이슈 접수</span>
            </div>
            <span className="support-quick-cta">바로 문의하기</span>
          </Link>
          <Link className="support-quick-card" to="/my/inquiries/new?type=BOOKING">
            <div className="support-quick-main">
              <span className="support-quick-eyebrow">예약 도움</span>
              <strong>취소 규정</strong>
              <span>수수료 기준과 일정 변경 정책 확인</span>
            </div>
            <span className="support-quick-cta">규정 문의하기</span>
          </Link>
          <Link className="support-quick-card" to="/my/inquiries/new?type=SYSTEM">
            <div className="support-quick-main">
              <span className="support-quick-eyebrow">계정 지원</span>
              <strong>로그인/인증 문의</strong>
              <span>인증 메일, 계정 상태, 접속 오류 확인</span>
            </div>
            <span className="support-quick-cta">지원 요청하기</span>
          </Link>
        </div>
        <div className="support-history-head">
          <strong>관리자 문의 내역</strong>
          <span>답변 완료 {answeredCount}건</span>
        </div>
        {isLoading ? (
          <div className="my-empty-panel">
            <strong>관리자 문의 내역을 불러오는 중입니다.</strong>
            <p>실제 문의 목록과 답변 상태를 동기화하고 있습니다.</p>
          </div>
        ) : null}
        {error && !isLoading ? (
          <div className="my-empty-inline">{error}</div>
        ) : null}
        <div className="payment-row-list inquiry-center-list">
          {rows.map((item) => (
            <article key={item.id} className="payment-row inquiry-center-row">
              <div className="payment-row-main">
                <div className="payment-row-copy inquiry-list-main">
                  <div className="payment-row-topline">
                    <span className="inquiry-list-type">{INQUIRY_TYPE_LABELS[item.type] ?? item.type}</span>
                    <span className={`table-code code-${item.status.toLowerCase()}`}>
                      {INQUIRY_STATUS_LABELS[item.status] ?? item.status}
                    </span>
                    <span>{item.bookingNo}</span>
                  </div>
                  <Link className="inquiry-title-link" to={`/my/inquiries/${item.id}`}>
                    {item.title}
                  </Link>
                  <p>{item.lodging} · {item.updatedAt}</p>
                </div>
              </div>
              <div className="payment-row-side inquiry-center-side">
                <Link className="coupon-action-button payment-action-button" to={`/my/inquiries/${item.id}`}>
                  상세보기
                </Link>
              </div>
            </article>
          ))}
        </div>
        {!isLoading && !rows.length && !error ? (
          <div className="my-empty-inline">등록된 관리자 문의가 없습니다.</div>
        ) : null}
      </section>
    </MyPageLayout>
  );
}
