import SectionCard from "../../components/common/SectionCard";
import DataTable from "../../components/common/DataTable";
import { inquiryRooms } from "../../data/siteData";

const columns = [
  { key: "title", label: "문의 제목" },
  { key: "type", label: "문의 유형" },
  { key: "status", label: "문의 상태" },
  { key: "actor", label: "작성 주체" },
];

export default function SellerInquiriesPage() {
  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">Seller inquiries</p>
          <h1>문의 관리</h1>
        </div>
      </section>
      <SectionCard title="판매자 문의 관리" subtitle="문의방과 메시지 모델 기준으로 확장 가능한 기본 목록">
        <div className="ops-toolbar">
          <span className="inline-chip">OPEN 1건</span>
          <span className="inline-chip">ANSWERED 1건</span>
          <span className="inline-chip">CLOSED 1건</span>
        </div>
        <DataTable columns={columns} rows={inquiryRooms} />
      </SectionCard>
    </div>
  );
}
