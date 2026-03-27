import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  DashboardFactGrid,
  DashboardFocusList,
  DashboardHero,
  DashboardLogList,
  DashboardMetricStrip,
  DashboardMixList,
  DashboardPanel,
  DashboardPerformanceList,
  DashboardWatchList,
} from "../../features/dashboard/DashboardUI";
import { getAdminDashboardViewModel } from "../../features/dashboard/dashboardViewModels";
import { getAdminDashboardSnapshot } from "../../services/dashboardService";

export default function AdminDashboardPage() {
  const vm = getAdminDashboardViewModel(getAdminDashboardSnapshot());

  return (
    <DashboardLayout role="admin">
      <div className="opsdash is-admin">
        <DashboardHero
          eyebrow={vm.header.eyebrow}
          title={vm.header.title}
          description={vm.header.description}
          links={vm.header.links}
          facts={vm.header.facts}
          spotlight={vm.header.spotlight}
          insightTitle="우선 처리 큐"
          insightRows={vm.watchRows.slice(0, 4).map((item) => ({ ...item, label: item.kind }))}
          ariaLabel="관리자 빠른 이동"
        />

        <DashboardMetricStrip items={vm.metrics} label="관리자 핵심 지표" />

        <DashboardPanel eyebrow="Workspace" title="오늘 운영 워크보드" tone="strong" className="admin-panel-workboard">
          <div className="opsdash-workboard admin-workboard">
            <div className="opsdash-board-section">
              <div className="opsdash-board-head">
                <strong>오늘 바로 처리할 항목</strong>
                <span>승인 · 문의 · 제재</span>
              </div>
              <DashboardFocusList rows={vm.watchRows.map((item) => ({ ...item, label: item.kind, actionLabel: "열기" }))} />
            </div>

            <div className="opsdash-board-rail">
              <div className="opsdash-board-section">
                <div className="opsdash-board-head">
                  <strong>최근 운영 로그</strong>
                  <span>최근 조치 기록</span>
                </div>
                <DashboardLogList rows={vm.logs} />
              </div>

              <div className="opsdash-board-section">
                <div className="opsdash-board-head">
                  <strong>주의 회원과 운영 포인트</strong>
                  <span>리스크 확인</span>
                </div>
                <DashboardWatchList rows={vm.attentionUsers} />
                <DashboardFactGrid items={vm.facts} />
              </div>
            </div>
          </div>
        </DashboardPanel>

        <DashboardPanel eyebrow="Insights" title="예약 흐름과 상위 성과" className="admin-panel-board">
          <div className="opsdash-board-grid admin-board-grid">
            <div className="opsdash-board-section">
              <div className="opsdash-board-head">
                <strong>예약 흐름</strong>
                <span>전체 예약 전환</span>
              </div>
              <DashboardMixList rows={vm.reservationMix} />
            </div>

            <div className="opsdash-board-section">
              <div className="opsdash-board-head">
                <strong>판매 성과 상위 숙소</strong>
                <span>최근 6개월 기준</span>
              </div>
              <DashboardPerformanceList rows={vm.sellerPerformance} />
            </div>
          </div>
        </DashboardPanel>
      </div>
    </DashboardLayout>
  );
}
