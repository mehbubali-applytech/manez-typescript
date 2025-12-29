import Wrapper from "@/components/layouts/DefaultWrapper";
import AddEditRole from "@/components/pagesUI/owner/role/add-role/AddRoleMainArea";
import RoleMainArea from "@/components/pagesUI/owner/role/RoleMainArea";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Role Management">
        <Wrapper role="owner">
          <RoleMainArea />
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
