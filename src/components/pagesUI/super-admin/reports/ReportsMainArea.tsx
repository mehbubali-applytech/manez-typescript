"use client";
import React from "react";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";

const ReportsMainArea = () => {
  return (
    <>
      <div className="app__slide-wrapper">
        <Breadcrumb breadTitle="Reports & Analytics" subTitle="Super Admin" />
        <div className="card">
          <div className="card__header">
            <h5 className="card__title">Platform Reports</h5>
          </div>
          <div className="card__body">
            <p className="text-muted">Platform usage and analytics reports will be displayed here.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsMainArea;
