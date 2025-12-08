import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import ModulesMainArea from "@/components/pagesUI/super-admin/modules/ModulesMainArea";

const ModulesPage = () => {
  return (
    <>
      <MetaData pageTitle="Module Management">
        <Wrapper isSuperAdmin={true}>
          <ModulesMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default ModulesPage;
