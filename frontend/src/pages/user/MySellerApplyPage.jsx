import { useState } from "react";
import { Link } from "react-router-dom";
import MyPageLayout from "../../components/user/MyPageLayout";
import {
  getSellerApplicationDraft,
  getSellerApplicationSteps,
  getSellerApplicationTemplate,
  submitSellerApplication,
} from "../../services/dashboardService";

function getStatusLabel(status) {
  if (status === "PENDING") return "승인 대기";
  if (status === "APPROVED") return "승인 완료";
  if (status === "REJECTED") return "반려";
  return status;
}

function formatSubmittedAt(value) {
  if (!value) return "아직 제출 전";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function MySellerApplyPage() {
  const initialDraft = getSellerApplicationDraft();
  const [status, setStatus] = useState(initialDraft?.status ?? "PENDING");
  const [submittedAt, setSubmittedAt] = useState(initialDraft?.submittedAt ?? null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [form, setForm] = useState({
    businessNo: initialDraft?.businessNo ?? "",
    businessName: initialDraft?.businessName ?? "",
    owner: initialDraft?.owner ?? "",
    account: initialDraft?.account ?? "",
  });
  const sellerApplicationStatus = getSellerApplicationTemplate();
  const sellerApplicationSteps = getSellerApplicationSteps();
  const statusToneClass =
    status === "APPROVED" ? "is-approved" : status === "REJECTED" ? "is-rejected" : "is-pending";

  const handleChange = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const validateForm = () => {
    if (!form.businessNo.trim()) return "사업자번호를 입력해 주세요.";
    if (!form.businessName.trim()) return "상호명을 입력해 주세요.";
    if (!form.owner.trim()) return "대표자명을 입력해 주세요.";
    if (!form.account.trim()) return "정산 계좌를 입력해 주세요.";
    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextError = validateForm();
    if (nextError) {
      setError(nextError);
      setNotice("");
      return;
    }
    const saved = submitSellerApplication(form);
    setStatus(saved.status);
    setSubmittedAt(saved.submittedAt ?? null);
    setError("");
    setNotice("신청서가 저장되었습니다. 현재 상태는 승인 대기입니다.");
    setIsCompleteOpen(true);
  };

  return (
    <MyPageLayout>
      <>
        <form className="my-form-sheet" onSubmit={handleSubmit} noValidate>
          <div className="mypage-header-row">
            <div className="mypage-header-copy">
              <strong>판매자 신청</strong>
              <p>사업자 정보를 제출하고 승인 결과를 마이페이지에서 바로 확인합니다.</p>
            </div>
          </div>

          <section className="seller-apply-hero">
            <div className="seller-apply-hero-copy">
              <span className="seller-apply-eyebrow">Seller Onboarding</span>
              <strong>{getStatusLabel(status)} 상태입니다.</strong>
              <p>신청 후 승인 전까지는 일반회원 흐름을 유지하고, 승인 완료 시 판매자센터 기능이 열립니다.</p>
            </div>
            <div className={`seller-apply-status-card ${statusToneClass}`}>
              <span>현재 상태</span>
              <strong>{getStatusLabel(status)}</strong>
              <p>마지막 제출 {formatSubmittedAt(submittedAt)}</p>
            </div>
          </section>

          <section className="seller-apply-glance-grid" aria-label="판매자 신청 요약">
            {sellerApplicationStatus.map((item) => (
              <article key={item.label} className="seller-apply-glance-card">
                <span>{item.label}</span>
                <strong>{item.label === "현재 상태" ? getStatusLabel(status) : item.display ?? item.value}</strong>
              </article>
            ))}
          </section>

          <section className="seller-apply-grid">
            <div className="seller-apply-panel">
              <div className="mypage-subsection-head">
                <strong>신청 절차</strong>
                <span>사업자 정보 제출 후 관리자 승인</span>
              </div>
              <div className="seller-apply-step-list">
                {sellerApplicationSteps.map((item, index) => (
                  <div key={item} className="seller-apply-step-item">
                    <span className="seller-apply-step-no">{index + 1}</span>
                    <div>
                      <strong>{item}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="seller-apply-note-list">
                <article className="seller-apply-note-card">
                  <span>심사 기준</span>
                  <strong>사업자 정보와 정산 계좌 일치 여부</strong>
                </article>
                <article className="seller-apply-note-card">
                  <span>확인 위치</span>
                  <strong>마이페이지와 헤더 메뉴에서 상태 확인</strong>
                </article>
              </div>
            </div>

            <div className="seller-apply-panel">
              <div className="mypage-subsection-head">
                <strong>신청서 작성</strong>
                <span>정산 계좌와 사업자 정보를 입력합니다.</span>
              </div>

              <div className="profile-summary-note">
                <span>현재 상태: {getStatusLabel(status)}</span>
                <span>마지막 제출: {formatSubmittedAt(submittedAt)}</span>
                {notice ? <span>{notice}</span> : null}
                {error ? <span>{error}</span> : null}
              </div>

              <div className="seller-apply-form-grid">
                <label className="field-block seller-apply-field">
                  <span>사업자번호</span>
                  <input value={form.businessNo} onChange={(e) => handleChange("businessNo", e.target.value)} placeholder="123-45-67890" />
                </label>
                <label className="field-block seller-apply-field">
                  <span>상호명</span>
                  <input value={form.businessName} onChange={(e) => handleChange("businessName", e.target.value)} placeholder="TripZone Stay" />
                </label>
                <label className="field-block seller-apply-field">
                  <span>대표자명</span>
                  <input value={form.owner} onChange={(e) => handleChange("owner", e.target.value)} placeholder="대표자 이름" />
                </label>
                <label className="field-block seller-apply-field">
                  <span>정산 계좌</span>
                  <input value={form.account} onChange={(e) => handleChange("account", e.target.value)} placeholder="은행 / 계좌번호" />
                </label>
              </div>

              <div className="seller-apply-action-bar">
                <button type="submit" className="coupon-action-button inquiry-submit-link">신청 제출</button>
                <Link className="text-link" to="/my/profile">내 정보 관리</Link>
              </div>
            </div>
          </section>
        </form>

        {isCompleteOpen ? (
          <div className="my-feedback-modal" role="dialog" aria-modal="true" aria-labelledby="seller-apply-complete-title">
            <div className="my-feedback-modal-backdrop" onClick={() => setIsCompleteOpen(false)} />
            <section className="my-feedback-modal-sheet">
              <span className="my-feedback-modal-eyebrow">Seller Apply</span>
              <h2 id="seller-apply-complete-title">판매자 신청이 접수되었습니다.</h2>
              <p>현재 상태는 승인 대기입니다. 승인 결과가 정리되면 이 화면에서 상태를 바로 확인할 수 있습니다.</p>
              <div className="my-feedback-modal-meta">
                <span>상태: {getStatusLabel(status)}</span>
                <span>제출 시각: {formatSubmittedAt(submittedAt)}</span>
              </div>
              <div className="my-feedback-modal-actions">
                <button type="button" className="coupon-action-button inquiry-submit-link" onClick={() => setIsCompleteOpen(false)}>
                  확인
                </button>
                <Link className="text-link" to="/my/profile">내 정보 관리</Link>
              </div>
            </section>
          </div>
        ) : null}
      </>
    </MyPageLayout>
  );
}
