import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import CompanyDetailMainArea from "@/components/pagesUI/super-admin/companies/CompanyDetailMainArea";

interface Props {
  params: {
    companycode: string;
  };
}

const CompanyDetailPage = ({ params }: Props) => {
  return (
    <>
      <MetaData pageTitle="Company Details">
        <Wrapper isSuperAdmin={true}>
          <CompanyDetailMainArea companyCode={params.companycode} />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default CompanyDetailPage;
