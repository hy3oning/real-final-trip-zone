import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { promoBanners } from "../../data/homeData";
import { readAuthSession } from "../../features/auth/authSession";
import { toUserFacingErrorMessage } from "../../lib/appClient";
import { fetchMyCoupons, claimMyCoupon } from "../../services/mypageService";
import { fetchLiveCoupons, fetchLiveEvents } from "../../services/eventService";

export default function EventsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [liveEvents, setLiveEvents] = useState([]);
  const [liveCoupons, setLiveCoupons] = useState([]);
  const [myCouponNames, setMyCouponNames] = useState([]);
  const [eventNotice, setEventNotice] = useState("");
  const [actionNotice, setActionNotice] = useState("");
  const [claimingCouponId, setClaimingCouponId] = useState(null);
  const isLoggedIn = Boolean(readAuthSession()?.accessToken);
  const promoRows = useMemo(() => [...liveEvents, ...liveCoupons], [liveCoupons, liveEvents]);
  const selectedEventId = searchParams.get("event");
  const selectedEvent = promoRows.find((item) => item.id === selectedEventId) ?? null;
  const hasClaimedSelectedCoupon =
    selectedEvent?.entityType === "COUPON" &&
    myCouponNames.includes(selectedEvent.couponName ?? selectedEvent.title);

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      try {
        const [eventRows, couponRows] = await Promise.all([fetchLiveEvents(), fetchLiveCoupons()]);
        if (cancelled) return;
        setLiveEvents(eventRows);
        setLiveCoupons(couponRows);
        setEventNotice("");
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load live events.", error);
        setEventNotice("이벤트 목록을 불러오지 못했습니다.");
      }
    }

    loadEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadMyCoupons() {
      if (!isLoggedIn) {
        setMyCouponNames([]);
        return;
      }

      try {
        const rows = await fetchMyCoupons();
        if (cancelled) return;
        setMyCouponNames(rows.map((item) => item.couponName ?? item.name).filter(Boolean));
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load my coupon snapshot.", error);
      }
    }

    loadMyCoupons();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  const openEvent = (eventId) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("event", eventId);
    setSearchParams(nextParams);
    setActionNotice("");
  };

  const closeEvent = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("event");
    setSearchParams(nextParams);
    setActionNotice("");
  };

  const handleCouponClaim = async () => {
    if (!selectedEvent || selectedEvent.entityType !== "COUPON") return;
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      setClaimingCouponId(selectedEvent.id);
      setActionNotice("");
      await claimMyCoupon(selectedEvent);
      const rows = await fetchMyCoupons();
      setMyCouponNames(rows.map((item) => item.couponName ?? item.name).filter(Boolean));
      setActionNotice("쿠폰을 쿠폰함에 담았습니다.");
    } catch (error) {
      setActionNotice(toUserFacingErrorMessage(error, "쿠폰을 받지 못했습니다."));
    } finally {
      setClaimingCouponId(null);
    }
  };

  if (selectedEvent) {
    return (
      <div className="container page-stack">
        <section className="events-detail-shell">
          <div className="events-detail-head">
            <div className="events-detail-breadcrumb">
              <button type="button" className="text-link" onClick={closeEvent}>프로모션</button>
              <span>›</span>
              <span>{selectedEvent.detailTitle}</span>
            </div>
          </div>

          <div className="events-detail-grid">
            <article className={`events-detail-hero-card${selectedEvent.entityType === "COUPON" ? " is-coupon" : ""}`}>
              <div className="events-detail-hero-head">
                <span className="events-detail-eyebrow">{selectedEvent.heroEyebrow}</span>
                <span className="events-detail-meta">{selectedEvent.heroMeta}</span>
              </div>
              <div className="events-detail-copy">
                <strong>{selectedEvent.heroTitle}</strong>
                <p>{selectedEvent.heroSubtitle}</p>
              </div>
              <div className="events-detail-divider" />
              <div className="events-detail-summary">
                <span className="events-detail-summary-label">
                  {selectedEvent.entityType === "COUPON" ? "혜택 안내" : "프로모션 안내"}
                </span>
                <small>{selectedEvent.detailCopy}</small>
              </div>
              {selectedEvent.entityType === "COUPON" ? (
                <div className="events-detail-coupon-facts">
                  <div className="events-detail-coupon-fact">
                    <span>혜택</span>
                    <strong>{selectedEvent.couponName ?? selectedEvent.title}</strong>
                  </div>
                  <div className="events-detail-coupon-fact">
                    <span>할인 내용</span>
                    <strong>{selectedEvent.title}</strong>
                  </div>
                  <div className="events-detail-coupon-fact">
                    <span>사용 기간</span>
                    <strong>{selectedEvent.heroMeta}</strong>
                  </div>
                </div>
              ) : (
                <div className="events-detail-event-strip">
                  <div className="events-detail-coupon-fact">
                    <span>진행 기간</span>
                    <strong>{selectedEvent.heroMeta}</strong>
                  </div>
                  <div className="events-detail-coupon-fact">
                    <span>이동 경로</span>
                    <strong>{selectedEvent.targetLabel ?? "이벤트 대상"}</strong>
                  </div>
                  <Link className="events-detail-inline-link" to={selectedEvent.href ?? "/lodgings?theme=deal"}>
                    {`${selectedEvent.targetLabel ?? "이벤트 대상"} 보기`}
                  </Link>
                </div>
              )}
            </article>

            <aside className="events-detail-side">
              <div className={`events-detail-coupon-box${selectedEvent.entityType === "COUPON" ? " is-coupon" : ""}`}>
                <span className="events-detail-side-label">Promotion Action</span>
                <strong>{selectedEvent.detailTitle}</strong>
                <p>
                  {selectedEvent.entityType === "COUPON"
                    ? "받은 쿠폰은 쿠폰함에서 바로 확인할 수 있습니다."
                    : "프로모션 카드를 누르면 바로 대상 숙소나 특가 리스트로 이어집니다."}
                </p>
                {selectedEvent.entityType === "COUPON" ? (
                  hasClaimedSelectedCoupon ? (
                    <Link className="events-detail-download-button is-link is-complete" to="/my/coupons">
                      쿠폰함 보기
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="events-detail-download-button"
                      onClick={handleCouponClaim}
                      disabled={claimingCouponId === selectedEvent.id}
                    >
                      {claimingCouponId === selectedEvent.id
                        ? "쿠폰 받는 중"
                        : isLoggedIn
                          ? "쿠폰 받기"
                          : "로그인 후 쿠폰 받기"}
                    </button>
                  )
                ) : (
                  <Link
                    className="events-detail-download-button is-link"
                    to={selectedEvent.ctaHref ?? selectedEvent.href ?? "/lodgings?theme=deal"}
                  >
                    {selectedEvent.ctaLabel ?? selectedEvent.action ?? "이벤트 대상 보기"}
                  </Link>
                )}
                {actionNotice ? <div className="my-empty-inline">{actionNotice}</div> : null}
                <div className="events-detail-side-note">
                  <span>
                    {selectedEvent.entityType === "COUPON"
                      ? hasClaimedSelectedCoupon
                        ? "이미 받은 쿠폰입니다. 쿠폰함에서 바로 확인할 수 있습니다."
                        : "쿠폰을 받으면 마이페이지 쿠폰함에 바로 반영됩니다."
                      : `${selectedEvent.targetLabel ?? "대상 리스트"}로 바로 이동해 예약 탐색으로 이어집니다.`}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container page-stack">
      <section className="home-section">
        <div className="home-section-head">
          <h2>프로모션</h2>
          <Link className="text-link" to="/lodgings?theme=deal">
            대상 숙소 보기
          </Link>
        </div>
        <div className="promo-grid">
          {(promoRows.length ? promoRows : promoBanners).map((item, index) => (
            <button
              key={item.id ?? item.title}
              type="button"
              className={`promo-card promo-${item.accent ?? "sunset"}${item.entityType === "COUPON" ? " is-coupon" : " is-event"}`}
              style={{
                backgroundImage:
                  item.entityType === "COUPON"
                    ? undefined
                    : `linear-gradient(180deg, rgba(8, 24, 34, 0.12), rgba(8, 24, 34, 0.58)), url(${item.imageUrl || item.image || promoBanners[index % promoBanners.length]?.image})`,
              }}
              onClick={() => openEvent(item.id)}
            >
              <span className="promo-kind">{item.entityType === "COUPON" ? "Discount Coupon" : "Live Event"}</span>
              <strong>{item.title}</strong>
              <p>{item.subtitle ?? item.content ?? "이벤트 상세 내용을 확인해 주세요."}</p>
              <div className="promo-foot">
                <span className="promo-date">{item.periodLabel ?? item.date}</span>
                {item.entityType === "COUPON" ? <span className="promo-target">{item.targetLabel}</span> : null}
              </div>
            </button>
          ))}
        </div>
        {!promoRows.length ? <div className="my-empty-inline">{eventNotice || "현재 진행 중인 프로모션이 없습니다."}</div> : null}
      </section>
    </div>
  );
}
