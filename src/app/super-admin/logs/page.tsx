import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import LogsMainArea from "@/components/pagesUI/super-admin/logs/LogsMainArea";

const LogsPage = () => {
  return (
    <>
      <MetaData pageTitle="Support & Logs">
        <Wrapper isSuperAdmin={true}>
          <LogsMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default LogsPage;
