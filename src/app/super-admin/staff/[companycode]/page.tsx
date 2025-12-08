import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import CompanyStaffMainArea from "@/components/pagesUI/super-admin/companies/CompanyStaffMainArea";

interface Props {
  params: {
    companycode: string;
  };
}

export default function StaffByCompanyPage({ params }: Props) {
  return (
    <>
      <MetaData pageTitle={`Staff • ${params.companycode}`}>
        <Wrapper isSuperAdmin={true}>
          <CompanyStaffMainArea companyCode={params.companycode} />
        </Wrapper>
      </MetaData>
    </>
  );
}
