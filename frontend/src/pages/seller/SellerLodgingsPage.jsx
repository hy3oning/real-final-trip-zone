import SectionCard from "../../components/common/SectionCard";
import DataTable from "../../components/common/DataTable";
import { sellerLodgings } from "../../data/siteData";

const columns = [
  { key: "name", label: "숙소명" },
  { key: "status", label: "상태" },
  { key: "roomCount", label: "객실 수" },
  { key: "inquiryCount", label: "문의 건수" },
  { key: "occupancy", label: "점유율" },
];

export default function SellerLodgingsPage() {
  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">Seller inventory</p>
          <h1>숙소 관리</h1>
        </div>
        <div className="ops-toolbar">
          <span className="inline-chip">ACTIVE 1곳</span>
          <span className="inline-chip">INACTIVE 1곳</span>
          <span className="inline-chip">총 객실 6개</span>
        </div>
      </section>
      <SectionCard title="판매자 숙소 관리" subtitle="숙소 상태, 객실 수, 문의량, 점유율을 한 번에 보는 운영 목록">
        <DataTable columns={columns} rows={sellerLodgings} />
      </SectionCard>
    </div>
  );
}
