import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import CompanyStaffMainArea from "@/components/pagesUI/super-admin/staff/[companycode]/CompanyStaffMainArea";

interface Props {
  params: {
    companycode: string;
  };
}

const CompanyDetailPage = ({ params }: Props) => {
  return (
    <>
      <MetaData pageTitle="Company Details">
        <Wrapper role="super-admin">
          <CompanyStaffMainArea companyCode={params.companycode} />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default CompanyDetailPage;
