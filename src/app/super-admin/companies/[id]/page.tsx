import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import CompanyDetailsMainArea from "@/components/pagesUI/super-admin/companies/[id]/CompanyDetailsMainArea";

interface Props {
  params: {
    id: number;
  };
}

const CompanyDetailPage = ({ params }: Props) => {
  return (
    <>
      <MetaData pageTitle="Company Details">
        <Wrapper isSuperAdmin={true}>
          <CompanyDetailsMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default CompanyDetailPage;
