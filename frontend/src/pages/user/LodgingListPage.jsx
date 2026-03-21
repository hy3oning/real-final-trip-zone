import { Link } from "react-router-dom";
import { listFilters, lodgings } from "../../data/siteData";

export default function LodgingListPage() {
  return (
    <div className="container list-page">
      <section className="list-hero">
        <div>
          <p className="eyebrow">Stay discovery</p>
          <h1>원하는 분위기와 취소 정책까지 한 번에 좁히는 숙소 탐색</h1>
          <p>실제 운영 사이트처럼 결과 수, 필터, 숙소 밀도와 예약 행동이 바로 읽히게 구성한다.</p>
        </div>
        <div className="list-hero-note">
          <span className="small-label">Search result</span>
          <strong>{lodgings.length}개 숙소</strong>
          <p>즉시 확정, 무료 취소, 조식 포함 여부까지 같은 화면에서 확인</p>
        </div>
      </section>

      <section className="list-toolbar">
        <div className="filter-strip">
          {listFilters.map((filter, index) => (
            <button key={filter} type="button" className={`filter-chip${index === 0 ? " active" : ""}`}>
              {filter}
            </button>
          ))}
        </div>
        <div className="sort-strip">
          <span>추천순</span>
          <span>평점순</span>
          <span>가격 낮은순</span>
        </div>
      </section>

      <section className="lodging-results">
        <div className="lodging-results-grid">
          <div className="lodging-list">
            {lodgings.map((lodging, index) => (
              <article key={lodging.id} className="lodging-feature">
                <div className="lodging-feature-visual" style={{ backgroundImage: `url(${lodging.image})` }} />
                <div className="lodging-feature-copy">
                  <div className="lodging-title-row">
                    <span className="small-label">{lodging.region} · {lodging.district}</span>
                    <span className="rating-pill">★ {lodging.rating} · {lodging.reviewCount}</span>
                  </div>
                  <strong>{lodging.name}</strong>
                  <p className="lodging-feature-intro">{lodging.intro}</p>
                  <p>{lodging.type} · {lodging.room}</p>
                  <p>{lodging.review}</p>
                  <div className="feature-chip-row">
                    {lodging.highlights.map((item) => (
                      <span key={item} className="inline-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="lodging-foot-row">
                    <div className="lodging-price-block">
                      <span className="muted-inline">1박 기준</span>
                      <span className="price-tag">{lodging.price}</span>
                      <p className="muted-inline">{lodging.cancellation}</p>
                    </div>
                    <div className="lodging-action-group">
                      <Link className="secondary-button compact-button" to={`/lodgings/${lodging.id}`}>
                        상세 보기
                      </Link>
                      <Link className="primary-button compact-button" to={`/booking/${lodging.id}`}>
                        바로 예약
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="map-preview">
            <div className="map-preview-surface">
              <div className="map-preview-header">
                <strong>지도 기준 보기</strong>
                <span>{lodgings.length}개 숙소</span>
              </div>
              <div className="map-canvas">
                {lodgings.map((lodging, index) => (
                  <div
                    key={`pin-${lodging.id}`}
                    className="map-pin"
                    style={{
                      left: `${18 + (index % 3) * 26}%`,
                      top: `${20 + Math.floor(index / 2) * 17}%`,
                    }}
                  >
                    <span>{lodging.region}</span>
                  </div>
                ))}
              </div>
              <div className="map-preview-footer">
                <p>실서비스형 리스트처럼 결과와 지도를 같이 보며 숙소를 좁히는 흐름을 반영했다.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
