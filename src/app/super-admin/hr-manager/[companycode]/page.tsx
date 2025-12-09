import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import CompanyHrManagersMainArea from "@/components/pagesUI/super-admin/hr-managers/[companycode]/CompanyHrManagersMainArea";

interface Props {
  params: {
    companycode: string;
  };
}

const CompanyHrManagersPage = ({ params }: Props) => {
  return (
    <>
      <MetaData pageTitle={`HR Managers • ${params.companycode}`}>
        <Wrapper isSuperAdmin={true}>
          <CompanyHrManagersMainArea companyCode={params.companycode} />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default CompanyHrManagersPage;
