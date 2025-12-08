import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import SuperAdminDashboard from "@/components/pagesUI/super-admin/SuperAdminDashboard";

const SuperAdminPage = () => {
  return (
    <>
      <MetaData pageTitle="Super Admin Dashboard">
        <Wrapper isSuperAdmin={true}>
          <SuperAdminDashboard />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default SuperAdminPage;
