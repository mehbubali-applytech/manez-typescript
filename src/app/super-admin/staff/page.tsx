import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import StaffMainArea from "@/components/pagesUI/super-admin/staff/StaffMainArea";

const ModulesPage = () => {
  return (
    <>
      <MetaData pageTitle="Module Management">
        <Wrapper isSuperAdmin={true}>
          <StaffMainArea/>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default ModulesPage;
