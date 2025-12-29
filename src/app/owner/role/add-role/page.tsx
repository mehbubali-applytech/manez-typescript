import Wrapper from "@/components/layouts/DefaultWrapper";
import AddEditRole from "@/components/pagesUI/owner/role/add-role/AddRoleMainArea";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Add Role">
        <Wrapper role="owner">
          <AddEditRole />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
