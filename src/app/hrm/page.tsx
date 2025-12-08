import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import DashboardDetailsCards from "@/components/pagesUI/apps/home/DashboardDetailsCards";
import MettingSchedule from "@/components/pagesUI/apps/home/MettingSchedule";
import CalanderSection from "@/components/pagesUI/apps/home/CalanderSection";
import OrderOverview from "@/components/pagesUI/apps/home/OrderOverview";
import CustomerSatisfaction from "@/components/pagesUI/apps/home/CustomerSatisfaction";
import UserActivity from "@/components/pagesUI/apps/home/UserActivity";
import AnnouncementTable from "@/components/pagesUI/apps/home/AnnouncementTable";

const HRMDashboard = () => {
  return (
    <>
      <MetaData pageTitle="HRM Dashboard">
        <Wrapper>
      <div className="app__slide-wrapper">
        <div className="grid grid-cols-12 gap-x-5 maxXs:gap-x-0">
          <DashboardDetailsCards />
          <MettingSchedule />
          <CalanderSection />
          <OrderOverview />
          <CustomerSatisfaction />
          <UserActivity />
          <AnnouncementTable />
        </div>
      </div>
    </Wrapper>
      </MetaData>
    </>
  );
};

export default HRMDashboard;
