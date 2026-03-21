import { docsPrinciples, quickLinks } from "../../data/siteData";

export default function DocsPage() {
  return (
    <div className="container page-stack">
      <section className="docs-intro">
        <p className="eyebrow">Documentation hub</p>
        <h1>제출 문서와 발표 자료를 데모 화면과 섞지 않는 구조</h1>
        <p>
          같은 내용을 반복해서 붙여넣는 대신, 읽는 맥락에 따라 문서형과 발표형을 나눴다. 구현은 프론트에서
          확인하고, 기준은 별도 HTML 산출물로 본다.
        </p>
      </section>

      <section className="docs-section">
        <div className="docs-section-head">
          <h2>산출물 바로가기</h2>
          <p>제출용 문서는 읽기형, 발표 자료는 발표형으로 분리했다.</p>
        </div>
        <div className="docs-link-list">
          {quickLinks.map((item) => (
            <a key={item.title} className="docs-link-row" href={item.href}>
              <span className="small-label">{item.kind}</span>
              <strong>{item.title}</strong>
              <p>
                {item.kind === "발표"
                  ? "설계 기준을 슬라이드 내러티브로 정리한 자료"
                  : "제출용으로 바로 인쇄하거나 PDF 변환 가능한 문서"}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="docs-section-head">
          <h2>문서 사용 원칙</h2>
          <p>구현 demo와 설계 제출물을 섞지 않기 위해 문서형, 발표형, 구현형 산출물을 분리했다.</p>
        </div>
        <div className="docs-principle-list">
          {docsPrinciples.map((item) => (
            <div key={item.title} className="docs-principle-item">
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
