import SectionCard from "../../components/common/SectionCard";
import DataTable from "../../components/common/DataTable";
import { userRows } from "../../data/siteData";

const columns = [
  { key: "name", label: "회원명" },
  { key: "role", label: "권한" },
  { key: "status", label: "상태" },
  { key: "email", label: "이메일" },
];

export default function AdminUsersPage() {
  return (
    <div className="container page-stack">
      <section className="ops-list-head">
        <div>
          <p className="eyebrow">Admin users</p>
          <h1>회원 관리</h1>
        </div>
      </section>
      <SectionCard title="관리자 회원 관리" subtitle="회원 권한과 상태값을 기준으로 운영하는 기본 관리자 목록">
        <div className="ops-toolbar">
          <span className="inline-chip">ACTIVE 1명</span>
          <span className="inline-chip">DORMANT 1명</span>
          <span className="inline-chip">BLOCKED 1명</span>
        </div>
        <DataTable columns={columns} rows={userRows} />
      </SectionCard>
    </div>
  );
}
