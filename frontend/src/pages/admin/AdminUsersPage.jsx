import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DataTable from "../../components/common/DataTable";
import { getAdminUsers, updateAdminUserStatus } from "../../services/dashboardService";

const columns = [
  { key: "name", label: "회원명" },
  { key: "role", label: "권한" },
  { key: "status", label: "상태" },
  { key: "email", label: "이메일" },
];

export default function AdminUsersPage() {
  const [rows, setRows] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const selectedUser = rows.find((row) => row.id === selectedUserId) ?? rows[0];

  useEffect(() => {
    let cancelled = false;

    async function loadRows() {
      try {
        setIsLoading(true);
        const nextRows = await getAdminUsers();
        if (cancelled) return;
        setRows(nextRows);
        setSelectedUserId(nextRows[0]?.id ?? null);
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load admin users.", error);
        setNotice("회원 목록을 불러오지 못했습니다.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadRows();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateStatus = async (nextStatus) => {
    if (!selectedUser) return;
    try {
      const updatedUser = await updateAdminUserStatus(selectedUser.id, nextStatus);
      setRows((current) => current.map((row) => (row.id === updatedUser.id ? updatedUser : row)));
      setNotice("회원 상태를 변경했습니다.");
    } catch (error) {
      setNotice(error.message);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="dash-page-header">
        <div className="dash-page-header-copy">
          <p className="eyebrow">회원 운영</p>
          <h1>회원 관리</h1>
          <p>총 {rows.length}명 · 활성 {rows.filter((r) => r.status === "ACTIVE").length} · 차단 {rows.filter((r) => r.status === "BLOCKED").length}</p>
          {notice ? <p>{notice}</p> : null}
        </div>
      </div>

      <div className="dash-table-split">
        <section className="dash-content-section" style={{ marginBottom: 0 }}>
          {isLoading ? <div className="my-empty-inline">회원 목록을 불러오는 중입니다.</div> : null}
          <DataTable
            columns={columns}
            rows={rows}
            getRowKey={(row) => row.id}
            selectedKey={selectedUserId}
            onRowClick={(row) => setSelectedUserId(row.id)}
          />
        </section>

        <div className="dash-action-sheet">
          <h3>{selectedUser?.name ?? "—"}</h3>
          <p>{selectedUser?.email}</p>
          <div className="dash-action-grid">
            <button type="button" className="dash-action-btn is-primary" onClick={() => updateStatus("ACTIVE")} disabled={!selectedUser}>활성</button>
            <button type="button" className="dash-action-btn is-danger" onClick={() => updateStatus("BLOCKED")} disabled={!selectedUser}>차단</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
