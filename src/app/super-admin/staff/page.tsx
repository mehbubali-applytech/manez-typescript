import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import React from "react";
import StaffMainArea from "@/components/pagesUI/super-admin/staff/StaffMainArea";

const AllCompaniesPage = () => {
  return (
    <>
      <MetaData pageTitle="All Companies">
        <Wrapper isSuperAdmin={true}>
          <StaffMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default AllCompaniesPage;
