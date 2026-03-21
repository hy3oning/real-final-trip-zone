import { roleData } from "../../data/siteData";

export default function RolesPage() {
  return (
    <div className="container page-stack">
      <section className="docs-section">
        <div className="docs-section-head">
          <h2>3-Role 구조</h2>
          <p>TripZone의 모든 화면과 기능은 세 역할을 기준으로 나뉜다. 역할이 섞이면 문서도 코드도 동시에 꼬인다.</p>
        </div>
        <div className="role-rail">
          {roleData.map((role) => (
            <article key={role.name} className="role-rail-item">
              <span className="small-label">{role.subtitle}</span>
              <strong>{role.name}</strong>
              <p>{role.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="docs-section-head">
          <h2>왜 역할 분리가 중요한가</h2>
          <p>같은 예약 서비스라도 사용자 화면과 운영 화면은 목적이 다르기 때문에 동일한 UI 문법으로 풀면 안 된다.</p>
        </div>
        <div className="docs-principle-list">
          <div className="docs-principle-item">
            <strong>User Surface</strong>
            <p>브랜드와 경험이 먼저 보이고, 탐색과 예약 흐름이 자연스럽게 이어져야 한다.</p>
          </div>
          <div className="docs-principle-item">
            <strong>Seller / Admin Surface</strong>
            <p>유틸리티 카피, 상태값, 목록, 액션이 우선이다. 마케팅형 화면과 같은 문법을 쓰지 않는다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
