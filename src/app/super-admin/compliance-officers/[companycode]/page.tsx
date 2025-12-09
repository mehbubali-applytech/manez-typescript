import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import CompanyComplianceOfficersMainArea from "@/components/pagesUI/super-admin/compliance-officers/[companycode]/CompanyComplianceOfficersMainArea";

interface Props {
  params: {
    companycode: string;
  };
}

const CompanyComplianceOfficersPage = ({ params }: Props) => {
  return (
    <>
      <MetaData pageTitle={`Compliance Officers • ${params.companycode}`}>
        <Wrapper isSuperAdmin={true}>
          <CompanyComplianceOfficersMainArea companyCode={params.companycode} />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default CompanyComplianceOfficersPage;
