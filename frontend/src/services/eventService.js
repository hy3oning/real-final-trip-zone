import { eventBanners, quickThemes } from "../data/homeData";
import { get, getApiBaseUrl } from "../lib/appClient";

const EVENT_PROMO_ACCENTS = ["sunset", "peach", "mint", "dusk"];
const EVENT_FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80",
];
const COUPON_FALLBACK_IMAGES = eventBanners.map((item) => item.image).filter(Boolean);
const EVENT_TARGET_PREFIX = "[[target:";
const DEFAULT_EVENT_TARGET = "theme=deal";
const eventTargetLabelByQuery = new Map([
  [DEFAULT_EVENT_TARGET, "전체 특가"],
  ...quickThemes.map((item) => [String(item.to).replace("/lodgings?", ""), item.label]),
]);

function formatEventPeriod(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "이벤트 기간 확인";
  }

  return `${String(start.getMonth() + 1).padStart(2, "0")}.${String(start.getDate()).padStart(2, "0")} - ${String(end.getMonth() + 1).padStart(2, "0")}.${String(end.getDate()).padStart(2, "0")}`;
}

function buildEventImageUrl(fileName) {
  if (!fileName) return "";
  if (/^https?:\/\//i.test(fileName)) return fileName;
  return `${getApiBaseUrl()}/api/event/view/${encodeURIComponent(fileName)}`;
}

function parseEventContent(rawContent = "") {
  const normalized = typeof rawContent === "string" ? rawContent : "";
  const markerPattern = /^\[\[target:(.+?)\]\]\r?\n?/;
  const match = normalized.match(markerPattern);
  const targetValue = match?.[1]?.trim() || DEFAULT_EVENT_TARGET;
  const content = match ? normalized.replace(markerPattern, "") : normalized;

  return {
    content,
    targetValue,
  };
}

function buildEventHref(targetValue) {
  const query = targetValue?.trim() || DEFAULT_EVENT_TARGET;
  return `/lodgings?${query}`;
}

function getEventTargetLabel(targetValue) {
  return eventTargetLabelByQuery.get(targetValue?.trim() || DEFAULT_EVENT_TARGET) ?? "이벤트 대상 숙소";
}

function resolveCouponTargetValue(couponName = "") {
  if (couponName.includes("제주")) return "region=제주";
  if (couponName.includes("부산")) return "region=부산";
  if (couponName.includes("서울")) return "region=서울";
  if (couponName.includes("오션")) return "theme=ocean";
  if (couponName.includes("독채")) return "theme=private";
  return DEFAULT_EVENT_TARGET;
}

function resolveCouponTargetLabel(couponName = "") {
  return getEventTargetLabel(resolveCouponTargetValue(couponName));
}

function formatCouponDiscountLabel(discountType, discountValue) {
  return discountType === "PERCENT"
    ? `${Number(discountValue ?? 0)}% 할인`
    : `${Number(discountValue ?? 0).toLocaleString()}원 할인`;
}

function mapCouponDto(dto, index = 0) {
  const targetValue = resolveCouponTargetValue(dto.couponName ?? "");
  const targetLabel = resolveCouponTargetLabel(dto.couponName ?? "");
  const discountLabel = formatCouponDiscountLabel(dto.discountType, dto.discountValue);
  const couponName = String(dto.couponName ?? "").trim();
  const couponTitle = couponName || `${discountLabel} 쿠폰`;
  const couponSubtitle = `${discountLabel} · ${targetLabel}`;

  return {
    id: `coupon-${dto.couponNo}`,
    entityType: "COUPON",
    couponNo: dto.couponNo,
    couponName: dto.couponName,
    title: couponTitle,
    subtitle: couponSubtitle,
    action: "쿠폰 받기",
    heroTitle: couponTitle,
    heroSubtitle: couponSubtitle,
    heroEyebrow: "Discount Coupon",
    heroMeta: formatEventPeriod(dto.startDate, dto.endDate),
    detailTitle: couponTitle,
    detailCopy: "쿠폰을 받으면 마이페이지 쿠폰함에 바로 추가됩니다.",
    href: buildEventHref(targetValue),
    targetLabel,
    targetValue,
    ctaLabel: "쿠폰 받기",
    status: dto.status,
    discountType: dto.discountType,
    discountValue: dto.discountValue,
    accent: EVENT_PROMO_ACCENTS[index % EVENT_PROMO_ACCENTS.length],
    imageUrl: COUPON_FALLBACK_IMAGES[index % COUPON_FALLBACK_IMAGES.length] || EVENT_FALLBACK_IMAGES[index % EVENT_FALLBACK_IMAGES.length],
    periodLabel: formatEventPeriod(dto.startDate, dto.endDate),
  };
}

function mapEventDto(dto, index = 0) {
  const { content, targetValue } = parseEventContent(dto.content);
  const href = buildEventHref(targetValue);
  const targetLabel = getEventTargetLabel(targetValue);

  return {
    id: `event-${dto.eventNo}`,
    entityType: "EVENT",
    eventNo: dto.eventNo,
    title: dto.title,
    subtitle: content,
    action: "이벤트 보기",
    heroTitle: dto.title,
    heroSubtitle: content,
    heroEyebrow: "Live Event",
    heroMeta: formatEventPeriod(dto.startDate, dto.endDate),
    detailTitle: dto.title,
    detailCopy: content,
    href,
    targetLabel,
    targetValue,
    ctaLabel: `${targetLabel} 보기`,
    couponNames: dto.couponNames ?? [],
    status: dto.status,
    accent: EVENT_PROMO_ACCENTS[index % EVENT_PROMO_ACCENTS.length],
    thumbnailUrl: dto.thumbnailUrl ?? "",
    imageUrl: buildEventImageUrl(dto.thumbnailUrl) || EVENT_FALLBACK_IMAGES[index % EVENT_FALLBACK_IMAGES.length],
    periodLabel: formatEventPeriod(dto.startDate, dto.endDate),
  };
}

export async function fetchLiveEvents() {
  const response = await get("/api/event/list?page=1&size=20");
  return (response.dtoList ?? [])
    .filter((dto) => dto.status === "ONGOING")
    .map((dto, index) => mapEventDto(dto, index));
}

export async function fetchLiveCoupons() {
  const response = await get("/api/coupon/list");
  return (response ?? [])
    .filter((dto) => dto.status === "ACTIVE")
    .map((dto, index) => mapCouponDto(dto, index));
}
