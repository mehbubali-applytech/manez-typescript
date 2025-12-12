import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/components/layouts/DefaultWrapper";
import CompaniesMainArea from "@/components/pagesUI/super-admin/companies/CompaniesMainArea";
import React from "react";
import CompanyDetailsMainArea from "@/components/pagesUI/super-admin/companies/[id]/CompanyDetailsMainArea";

const AllCompaniesPage = () => {
  return (
    <>
      <MetaData pageTitle="All Companies">
        <Wrapper role={"owner"}>
                    <CompanyDetailsMainArea />

        </Wrapper>
      </MetaData>
    </>
  );
};

export default AllCompaniesPage;
