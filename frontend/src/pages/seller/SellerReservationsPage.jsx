import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DataTable from "../../components/common/DataTable";
import { getSellerReservations, updateSellerReservationStatus } from "../../services/dashboardService";

const columns = [
  { key: "no", label: "예약번호" },
  { key: "guest", label: "예약자" },
  { key: "stay", label: "숙박일" },
  { key: "status", label: "상태" },
  { key: "amount", label: "결제금액" },
];

export default function SellerReservationsPage() {
  const [rows, setRows] = useState([]);
  const [selectedNo, setSelectedNo] = useState(null);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const selected = rows.find((row) => row.no === selectedNo) ?? rows[0];

  useEffect(() => {
    let cancelled = false;

    async function loadRows() {
      try {
        setIsLoading(true);
        const nextRows = await getSellerReservations();
        if (cancelled) return;
        setRows(nextRows);
        setSelectedNo(nextRows[0]?.no ?? null);
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load seller reservations.", error);
        setNotice("예약 목록을 불러오지 못했습니다.");
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
      const updated = await updateSellerReservationStatus(selected.no, nextStatus);
      setRows((prev) => prev.map((row) => (row.no === selected.no ? { ...row, ...updated } : row)));
      setNotice("");
    } catch (error) {
      setNotice(error.message);
    }
  };

  return (
    <DashboardLayout role="seller">
      <div className="dash-page-header">
        <div className="dash-page-header-copy">
          <p className="eyebrow">예약 운영</p>
          <h1>예약 관리</h1>
          <p>대기 {rows.filter((r) => r.status === "PENDING").length}건 · 확정 {rows.filter((r) => r.status === "CONFIRMED").length}건 · 취소 {rows.filter((r) => r.status === "CANCELED").length}건</p>
          {notice ? <p>{notice}</p> : null}
        </div>
      </div>

      <div className="dash-table-split">
        <section className="dash-content-section" style={{ marginBottom: 0 }}>
          {isLoading ? <div className="my-empty-inline">예약 목록을 불러오는 중입니다.</div> : null}
          <DataTable
            columns={columns}
            rows={rows}
            getRowKey={(row) => row.no}
            selectedKey={selectedNo}
            onRowClick={(row) => setSelectedNo(row.no)}
          />
        </section>

        <div className="dash-action-sheet">
          <h3>{selected?.no ?? "—"}</h3>
          <p>{selected?.guest} · {selected?.stay}</p>
          <div className="dash-action-grid">
            <button type="button" className="dash-action-btn is-primary" onClick={() => updateStatus("CONFIRMED")} disabled={!selected}>확정</button>
            <button type="button" className="dash-action-btn" onClick={() => updateStatus("COMPLETED")} disabled={!selected}>완료</button>
            <button type="button" className="dash-action-btn is-danger" onClick={() => updateStatus("CANCELED")} disabled={!selected}>취소</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
