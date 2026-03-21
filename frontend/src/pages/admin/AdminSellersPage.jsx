import SectionCard from "../../components/common/SectionCard";
import DataTable from "../../components/common/DataTable";
import { sellerRows } from "../../data/siteData";

const columns = [
  { key: "business", label: "상호명" },
  { key: "owner", label: "대표자" },
  { key: "status", label: "승인 상태" },
  { key: "region", label: "지역" },
];

export default function AdminSellersPage() {
  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">Admin sellers</p>
          <h1>판매자 관리</h1>
        </div>
      </section>
      <SectionCard title="관리자 판매자 관리" subtitle="승인, 반려, 중지 같은 운영 액션이 붙기 쉬운 기본 목록" accent="mint">
        <div className="ops-toolbar">
          <span className="inline-chip">PENDING 1건</span>
          <span className="inline-chip">APPROVED 1건</span>
          <span className="inline-chip">SUSPENDED 1건</span>
        </div>
        <DataTable columns={columns} rows={sellerRows} />
      </SectionCard>
    </div>
  );
}
