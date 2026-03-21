export default function SectionCard({ title, subtitle, children, accent = "blue" }) {
  return (
    <section className={`section-card accent-${accent}`}>
      <div className="section-card-head">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div>{children}</div>
    </section>
  );
}
