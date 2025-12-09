import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import FinanceExecutivesMainArea from "@/components/pagesUI/super-admin/finance-executives/FinanceExecutivesMainArea";

const FinanceExecutivesPage = () => {
  return (
    <>
      <MetaData pageTitle="Finance Executives">
        <Wrapper isSuperAdmin={true}>
          <FinanceExecutivesMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default FinanceExecutivesPage;
