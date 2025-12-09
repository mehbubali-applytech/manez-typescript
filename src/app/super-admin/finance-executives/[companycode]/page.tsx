import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import CompanyFinanceExecutivesMainArea from "@/components/pagesUI/super-admin/finance-executives/[companycode]/CompanyFinanceExecutivesMainArea";

interface Props {
  params: {
    companycode: string;
  };
}

const CompanyFinanceExecutivesPage = ({ params }: Props) => {
  return (
    <>
      <MetaData pageTitle={`Finance Executives • ${params.companycode}`}>
        <Wrapper isSuperAdmin={true}>
          <CompanyFinanceExecutivesMainArea companyCode={params.companycode} />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default CompanyFinanceExecutivesPage;
