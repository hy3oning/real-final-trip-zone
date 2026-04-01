import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DataTable from "../../components/common/DataTable";
import { getSellerRooms, updateSellerRoomStatus } from "../../services/dashboardService";

const columns = [
  { key: "name", label: "객실명" },
  { key: "type", label: "유형" },
  { key: "lodging", label: "숙소명" },
  { key: "status", label: "상태" },
  { key: "capacity", label: "최대 인원" },
  { key: "price", label: "가격" },
];

export default function SellerRoomsPage() {
  const [rows, setRows] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const selected = rows.find((row) => `${row.lodging}-${row.name}` === selectedKey) ?? rows[0];

  useEffect(() => {
    let cancelled = false;

    async function loadRows() {
      try {
        setIsLoading(true);
        const nextRows = await getSellerRooms();
        if (cancelled) return;
        setRows(nextRows);
        setSelectedKey(nextRows[0] ? `${nextRows[0].lodging}-${nextRows[0].name}` : null);
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load seller rooms.", error);
        setNotice("객실 목록을 불러오지 못했습니다.");
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
      const updated = await updateSellerRoomStatus(selected.id, nextStatus, selected.lodging);
      setRows((prev) =>
        prev.map((row) =>
          row.id === selected.id
            ? { ...row, ...updated }
            : row,
        ),
      );
      setNotice("");
    } catch (error) {
      setNotice(error.message);
    }
  };

  return (
    <DashboardLayout role="seller">
      <div className="dash-page-header">
        <div className="dash-page-header-copy">
          <p className="eyebrow">객실 운영</p>
          <h1>객실 관리</h1>
          <p>예약 가능 {rows.filter((r) => r.status === "AVAILABLE").length}개 · 불가 {rows.filter((r) => r.status === "UNAVAILABLE").length}개</p>
          {notice ? <p>{notice}</p> : null}
        </div>
      </div>

      <div className="dash-table-split">
        <section className="dash-content-section" style={{ marginBottom: 0 }}>
          {isLoading ? <div className="my-empty-inline">객실 목록을 불러오는 중입니다.</div> : null}
          <DataTable
            columns={columns}
            rows={rows}
            getRowKey={(row) => `${row.lodging}-${row.name}`}
            selectedKey={selectedKey}
            onRowClick={(row) => setSelectedKey(`${row.lodging}-${row.name}`)}
          />
        </section>

        <div className="dash-action-sheet">
          <h3>{selected?.name ?? "—"}</h3>
          <p>{selected?.lodging} · {selected?.type}</p>
          <div className="dash-action-grid">
            <button type="button" className="dash-action-btn is-primary" onClick={() => updateStatus("AVAILABLE")} disabled={!selected}>예약 가능</button>
            <button type="button" className="dash-action-btn is-danger" onClick={() => updateStatus("UNAVAILABLE")} disabled={!selected}>예약 불가</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
