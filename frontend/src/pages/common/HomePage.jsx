import { Link } from "react-router-dom";
import {
  destinationStats,
  lodgingCollections,
  lodgings,
  promoBanners,
} from "../../data/siteData";

function buildCollectionCards(collection) {
  const base = collection.ids
    .map((id) => lodgings.find((item) => item.id === id))
    .filter(Boolean);

  return Array.from({ length: 4 }, (_, index) => {
    const lodging = base[index % base.length];
    return {
      ...lodging,
      key: `${collection.region}-${lodging.id}-${index}`,
      benefit: index % 2 === 0 ? lodging.benefit : lodging.highlights[index % lodging.highlights.length],
    };
  });
}

export default function HomePage() {
  return (
    <div className="home-shell">
      <section className="home-hero">
        <div className="home-hero-backdrop" />
        <div className="home-hero-overlay" />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="eyebrow home-hero-eyebrow">TripZone stay booking</p>
            <div className="home-hero-brand">TripZone</div>
            <h1>이번 주말, 바로 떠날 수 있는 숙소를 가장 먼저 보여주는 메인</h1>
            <p>지역, 날짜, 인원을 바로 정하고 특가 숙소 흐름으로 이어지게 구성한다.</p>
            <div className="hero-actions">
              <Link className="primary-button" to="/lodgings">
                숙소 보러가기
              </Link>
            </div>
            <div className="hero-stat-row">
              {destinationStats.map((item) => (
                <div key={item.label} className="hero-stat-item">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="search-panel">
            <div className="search-tabs">
              <Link className="search-tab active" to="/lodgings">
                국내숙소
              </Link>
              <Link className="search-tab" to="/lodgings?theme=resort">
                리조트
              </Link>
              <Link className="search-tab" to="/lodgings?theme=private">
                독채
              </Link>
            </div>
            <div className="search-grid">
              <div className="search-field">
                <span>어디로 떠나세요?</span>
                <strong>제주, 부산, 강릉</strong>
              </div>
              <div className="search-field">
                <span>체크인 / 체크아웃</span>
                <strong>03.28 - 03.30</strong>
              </div>
              <div className="search-field">
                <span>인원</span>
                <strong>성인 2명</strong>
              </div>
            </div>
            <Link className="primary-button search-submit" to="/lodgings">
              검색하기
            </Link>
          </div>
        </div>
      </section>

      <div className="container home-content">
        <section className="home-shortcuts">
          <Link className="shortcut-link" to="/lodgings?region=제주">
            제주 숙소
          </Link>
          <Link className="shortcut-link" to="/lodgings?region=부산">
            부산 숙소
          </Link>
          <Link className="shortcut-link" to="/lodgings?theme=ocean">
            오션뷰
          </Link>
          <Link className="shortcut-link" to="/lodgings?theme=deal">
            특가 숙소
          </Link>
          <Link className="shortcut-link" to="/lodgings?theme=private">
            독채 스테이
          </Link>
        </section>

        <section className="home-section">
          <div className="home-section-head">
            <h2>이번 주 많이 찾는 특가</h2>
            <Link className="text-link" to="/lodgings">
              전체 숙소 보기
            </Link>
          </div>
          <div className="promo-grid">
            {promoBanners.map((item) => (
              <article key={item.title} className={`promo-card promo-${item.accent}`}>
                <span className="small-label">{item.lead}</span>
                <strong>{item.title}</strong>
                <p>{item.subtitle}</p>
                <span className="promo-date">{item.date}</span>
              </article>
            ))}
          </div>
        </section>

        {lodgingCollections.map((collection) => (
          <section key={collection.title} className="home-section">
            <div className="home-section-head">
              <h2>{collection.title}</h2>
              <Link className="text-link" to={`/lodgings?region=${collection.region}`}>
                더보기
              </Link>
            </div>
            <div className="lodging-showcase">
              {buildCollectionCards(collection).map((lodging) => (
                <Link key={lodging.key} className="showcase-row" to={`/lodgings/${lodging.id}`}>
                  <div className="rail-card-visual" style={{ backgroundImage: `url(${lodging.image})` }}>
                    <span className="rail-badge">추천 숙소</span>
                  </div>
                  <div className="showcase-copy">
                    <div className="showcase-kicker">{lodging.region} · {lodging.district}</div>
                    <strong>{lodging.name}</strong>
                    <p className="showcase-intro">{lodging.intro}</p>
                    <div className="showcase-meta-row">
                      <span className="price-tag">{lodging.price}</span>
                      <span className="rating-pill">★ {lodging.rating} · {lodging.reviewCount}</span>
                    </div>
                    <p className="showcase-benefit">{lodging.benefit}</p>
                    <div className="showcase-foot">
                      <span className="rail-submeta">{lodging.room}</span>
                      <span className="showcase-link">객실 보기</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
