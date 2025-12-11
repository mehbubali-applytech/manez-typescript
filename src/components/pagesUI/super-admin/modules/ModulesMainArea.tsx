"use client";
import React from "react";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import ModuleSingleCard from "./ModuleSingleCard";

const ModulesMainArea = () => {

  const trainingData = [
    {
      iconClass: "fa-sharp fa-light fa-book",
      title: "Attendance Modules",
      description: "Description for Attendance Modules"
    },
    {
      iconClass: "fa-sharp fa-light fa-user",
      title: "Leave Management Module",
      description: "Description for Leave Management Module"
    },
    {
      iconClass: "fa-light fa-badge-check",
      title: "Payroll Module",
      description: "Description for Payroll Module"
    },
    {
      iconClass: "fa-sharp fa-light fa-rectangle-terminal",
      title: "Offer Letters Module",
      description: "Description for Offer Letters Module"
    }, {
      iconClass: "fa-sharp fa-light fa-graduation-cap",
      title: "Compliance Module",
      description: "Description for Compliance Module"
    }
  ];

  return (
    <>
      <div className="app__slide-wrapper">
        <Breadcrumb breadTitle="Module Management" subTitle="Super Admin" />
        {/* <div className="grid grid-cols-12 gap-x-5 maxXs:gap-x-0"> */}

        {trainingData.map((item, index) => (
          <div className="col-span-12 sm:col-span-6 xxl:col-span-3" key={index}>
            <ModuleSingleCard {...item} />
          </div>
        ))}
      </div>
      {/* </div> */}
    </>
  );
};

export default ModulesMainArea;
