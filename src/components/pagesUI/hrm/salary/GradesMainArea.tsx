import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import React from "react";
import GradeTable from "./GradeTable";

const GradeMainArea = () => {
  return (
    <>
      <div className="app__slide-wrapper">
        <Breadcrumb breadTitle="Biometric Attendance" subTitle="Home" />
        <div className="grid grid-cols-12 gap-x-5 maxXs:gap-x-0">
          <GradeTable />
        </div>
      </div>
    </>
  );
};

export default GradeMainArea;
