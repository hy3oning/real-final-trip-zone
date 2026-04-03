import { Link } from "react-router-dom";

function RegionCardSkeleton() {
  return (
    <div className="home-rebuild-region-card home-rebuild-region-card--skeleton" aria-hidden="true">
      <div className="home-rebuild-region-media home-rebuild-skeleton-block" />
    </div>
  );
}

export function HomeRegionSection({ regions, loading }) {
  return (
    <section className="home-rebuild-stage home-rebuild-region-board">
      <div className="home-rebuild-section-head">
        <div className="home-rebuild-section-copy">
          <span className="home-rebuild-section-eyebrow">인기 여행지</span>
          <h2>인기 여행지</h2>
          <p>원하는 지역을 선택해 숙소를 찾아보세요.</p>
        </div>
        <Link className="home-rebuild-section-link" to="/lodgings">
          전체 지역 보기
        </Link>
      </div>

      <div className="home-rebuild-region-list" aria-label="인기 지역 카드">
        {loading
          ? [0, 1, 2, 3].map((i) => <RegionCardSkeleton key={i} />)
          : regions.map((item) => (
              <Link key={item.id ?? item.title} className="home-rebuild-region-card home-rebuild-region-card--nav" to={item.href}>
                <div className="home-rebuild-region-media">
                  <img src={item.image} alt={`${item.title} 여행지`} loading="lazy" />
                  <div className="home-rebuild-region-overlay home-rebuild-region-overlay--large">
                    <strong>{item.title}</strong>
                    <span>{item.caption}</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
