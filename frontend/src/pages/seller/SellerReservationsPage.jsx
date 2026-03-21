import SectionCard from "../../components/common/SectionCard";
import DataTable from "../../components/common/DataTable";
import { reservationRows } from "../../data/siteData";

const columns = [
  { key: "no", label: "예약번호" },
  { key: "guest", label: "예약자" },
  { key: "stay", label: "숙박일" },
  { key: "status", label: "상태" },
  { key: "amount", label: "결제금액" },
];

export default function SellerReservationsPage() {
  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">Seller reservations</p>
          <h1>예약 관리</h1>
        </div>
      </section>
      <SectionCard title="판매자 예약 관리" subtitle="예약 요청, 승인, 취소 흐름을 확인하는 목록 화면" accent="sand">
        <div className="ops-toolbar">
          <span className="inline-chip">오늘 체크인 6건</span>
          <span className="inline-chip">승인 대기 1건</span>
          <span className="inline-chip">취소 요청 1건</span>
        </div>
        <DataTable columns={columns} rows={reservationRows} />
      </SectionCard>
    </div>
  );
}
