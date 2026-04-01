import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  DashboardFocusList,
  DashboardLinkList,
  DashboardMetricStrip,
  DashboardPanel,
  DashboardStayList,
  DashboardTrendList,
} from "../../features/dashboard/DashboardUI";
import { getSellerDashboardViewModel } from "../../features/dashboard/dashboardViewModels";
import { getSellerDashboardSnapshot } from "../../services/dashboardService";

export default function SellerDashboardPage() {
  const [snapshot, setSnapshot] = useState({
    reservations: [],
    lodgings: [],
    metrics: [],
    sellerTasks: [],
  });
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const vm = getSellerDashboardViewModel(snapshot);

  useEffect(() => {
    let cancelled = false;

    async function loadSnapshot() {
      try {
        setIsLoading(true);
        const nextSnapshot = await getSellerDashboardSnapshot();
        if (cancelled) return;
        setSnapshot(nextSnapshot);
      } catch (error) {
        if (cancelled) return;
        console.error("Failed to load seller dashboard snapshot.", error);
        setNotice("판매자 대시보드 데이터를 불러오지 못했습니다.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadSnapshot();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeLodgings = vm.lodgingRows.filter((item) => item.status === "ACTIVE").length;
  const inactiveLodgings = vm.lodgingRows.length - activeLodgings;
  const activeRatio = Math.round((activeLodgings / Math.max(vm.lodgingRows.length, 1)) * 100);
  const priorityRows = vm.reservationRows.slice(0, 2).map((item) => ({
    ...item,
    key: item.no,
    label:
      item.status === "PENDING"
        ? "결제 대기"
        : item.status === "CONFIRMED"
          ? "체크인 예정"
          : "취소 확인",
    title: `예약 ${item.no}`,
    meta: `${item.no} · ${item.detail}`,
    actionLabel:
      item.status === "PENDING"
        ? "결제 확인"
        : item.status === "CONFIRMED"
          ? "체크인 준비"
          : "취소 확인",
  }));

  return (
    <DashboardLayout role="seller">
      <div className="opsdash is-seller">
        {isLoading ? <div className="my-empty-inline">판매자 대시보드를 불러오는 중입니다.</div> : null}
        {notice ? <div className="my-empty-inline">{notice}</div> : null}
        <div className="seller-top-grid">
          <DashboardPanel
            eyebrow="Today First"
            title="체크인과 결제를 먼저 처리하세요"
            tone="strong"
            className="seller-panel-workboard"
          >
            <div className="opsdash-board-section">
              <div className="opsdash-board-head">
                <strong>체크인과 결제 확인</strong>
                <span>오늘 예약 우선 처리</span>
              </div>
              <DashboardFocusList rows={priorityRows} compact />
            </div>
          </DashboardPanel>

          <DashboardPanel
            eyebrow="Availability"
            title="노출 상태와 가동 현황"
            className="seller-panel-stays"
          >
            <div className="opsdash-board-section">
              <div className="opsdash-board-head">
                <strong>운영 숙소 상태</strong>
                <span>노출과 정비 상태를 분리해서 본다</span>
              </div>
              <div className="seller-stay-summary">
                <div className="seller-stay-summary-item">
                  <span>노출 중</span>
                  <strong>{activeLodgings}곳</strong>
                  <div className="opsdash-track">
                    <div className="opsdash-fill" style={{ width: `${activeRatio}%` }} />
                  </div>
                </div>
                <div className="seller-stay-summary-item is-sand">
                  <span>정비 필요</span>
                  <strong>{inactiveLodgings}곳</strong>
                  <div className="opsdash-track">
                    <div className="opsdash-fill" style={{ width: `${100 - activeRatio}%` }} />
                  </div>
                </div>
              </div>
              <DashboardStayList rows={vm.lodgingRows.slice(0, 2)} />
            </div>
          </DashboardPanel>
        </div>

        <DashboardMetricStrip items={vm.metrics.slice(1)} label="판매자 핵심 지표" className="seller-metric-strip" />

        <DashboardPanel eyebrow="Operations" title="주간 예약 흐름과 바로 가기" className="seller-panel-board">
          <div className="opsdash-board-grid seller-board-grid">
            <div className="opsdash-board-section">
              <div className="opsdash-board-head">
                <strong>예약 전환과 체크인</strong>
                <span>주간 흐름</span>
              </div>
              <DashboardTrendList rows={vm.trends} />
            </div>

            <div className="opsdash-board-section">
              <div className="opsdash-board-head">
                <strong>바로 가기</strong>
                <span>자주 여는 메뉴</span>
              </div>
              <DashboardLinkList items={vm.quickLinks} />
            </div>
          </div>
        </DashboardPanel>
      </div>
    </DashboardLayout>
  );
}
