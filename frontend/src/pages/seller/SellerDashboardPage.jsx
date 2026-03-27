import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  DashboardChecklist,
  DashboardFocusList,
  DashboardHero,
  DashboardLinkList,
  DashboardMetricStrip,
  DashboardPanel,
  DashboardStayList,
  DashboardTrendList,
} from "../../features/dashboard/DashboardUI";
import { getSellerDashboardViewModel } from "../../features/dashboard/dashboardViewModels";
import { getSellerDashboardSnapshot } from "../../services/dashboardService";

export default function SellerDashboardPage() {
  const vm = getSellerDashboardViewModel(getSellerDashboardSnapshot());
  const activeLodgings = vm.lodgingRows.filter((item) => item.status === "ACTIVE").length;
  const inactiveLodgings = vm.lodgingRows.length - activeLodgings;
  const activeRatio = Math.round((activeLodgings / Math.max(vm.lodgingRows.length, 1)) * 100);

  return (
    <DashboardLayout role="seller">
      <div className="opsdash is-seller">
        <DashboardHero
          eyebrow={vm.header.eyebrow}
          title={vm.header.title}
          description={vm.header.description}
          links={vm.header.links}
          facts={vm.header.facts}
          spotlight={vm.header.spotlight}
          insightTitle="지금 확인할 예약"
          insightRows={vm.reservationRows.slice(0, 4).map((item) => ({ ...item, label: item.no }))}
          ariaLabel="판매자 빠른 이동"
        />

        <DashboardMetricStrip items={vm.metrics} label="판매자 핵심 지표" />

        <DashboardPanel eyebrow="Workspace" title="오늘 운영 워크보드" tone="strong" className="seller-panel-workboard">
          <div className="opsdash-workboard seller-workboard">
            <div className="opsdash-board-section">
              <div className="opsdash-board-head">
                <strong>체크인과 결제 확인</strong>
                <span>오늘 예약 우선 처리</span>
              </div>
              <DashboardFocusList rows={vm.reservationRows.map((item) => ({ ...item, label: item.no, actionLabel: "열기" }))} />
            </div>

            <div className="opsdash-board-section">
              <div className="opsdash-board-head">
                <strong>노출 상태와 가동 현황</strong>
                <span>운영 숙소 상태</span>
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
              <DashboardStayList rows={vm.lodgingRows} />
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel eyebrow="Operations" title="주간 흐름과 오늘 할 일" className="seller-panel-board">
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
                <strong>오늘 확인 루틴</strong>
                <span>운영 체크</span>
              </div>
              <DashboardChecklist items={vm.checklist} />
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
