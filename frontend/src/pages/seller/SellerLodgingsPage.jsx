import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DataTable from "../../components/common/DataTable";
import { getSellerLodgings, updateSellerLodgingStatus } from "../../services/dashboardService";

const columns = [
  { key: "name", label: "숙소명" },
  { key: "type", label: "유형" },
  { key: "region", label: "지역" },
  { key: "status", label: "상태" },
  { key: "roomCount", label: "객실" },
  { key: "occupancy", label: "점유율" },
];

export default function SellerLodgingsPage() {
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const selected = rows.find((row) => row.id === selectedId) ?? rows[0];

  useEffect(() => {
    let cancelled = false;

    async function loadRows() {
      try {
        setIsLoading(true);
        const nextRows = await getSellerLodgings();
        if (cancelled) return;
        setRows(nextRows);
        setSelectedId(nextRows[0]?.id ?? null);
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load seller lodgings.", error);
        setNotice("숙소 목록을 불러오지 못했습니다.");
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
    if (!selected) return;
    try {
      const updated = await updateSellerLodgingStatus(selected.id, nextStatus);
      setRows((prev) => prev.map((row) => (row.id === selected.id ? { ...row, ...updated } : row)));
      setNotice("");
    } catch (error) {
      setNotice(error.message);
    }
  };

  return (
    <DashboardLayout role="seller">
      <div className="dash-page-header">
        <div className="dash-page-header-copy">
          <p className="eyebrow">숙소 운영</p>
          <h1>숙소 관리</h1>
          <p>운영 {rows.filter((r) => r.status === "ACTIVE").length}곳 · 비노출 {rows.filter((r) => r.status === "INACTIVE").length}곳 · 총 객실 {rows.reduce((sum, r) => sum + (r.roomCount || 0), 0)}개</p>
          {notice ? <p>{notice}</p> : null}
        </div>
      </div>

      <div className="dash-table-split">
        <section className="dash-content-section" style={{ marginBottom: 0 }}>
          {isLoading ? <div className="my-empty-inline">숙소 목록을 불러오는 중입니다.</div> : null}
          <DataTable
            columns={columns}
            rows={rows}
            getRowKey={(row) => row.id}
            selectedKey={selectedId}
            onRowClick={(row) => setSelectedId(row.id)}
          />
        </section>

        <div className="dash-action-sheet">
          <h3>{selected?.name ?? "—"}</h3>
          <p>{selected?.region} · {selected?.type}</p>
          <div className="dash-action-grid">
            <button type="button" className="dash-action-btn is-primary" onClick={() => updateStatus("ACTIVE")} disabled={!selected}>운영</button>
            <button type="button" className="dash-action-btn is-danger" onClick={() => updateStatus("INACTIVE")} disabled={!selected}>비노출</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
