import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import CompanyEmployeesMainArea from "@/components/pagesUI/super-admin/employees/[companycode]/CompanyEmployeesMainArea";

interface Props {
  params: {
    companycode: string;
  };
}

const CompanyEmployeesPage = ({ params }: Props) => {
  return (
    <>
      <MetaData pageTitle={`Employees • ${params.companycode}`}>
        <Wrapper isSuperAdmin={true}>
          <CompanyEmployeesMainArea companyCode={params.companycode} />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default CompanyEmployeesPage;
