"use client";
import React from "react";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";

const ModulesMainArea = () => {
  return (
    <>
      <div className="app__slide-wrapper">
        <Breadcrumb breadTitle="Module Management" subTitle="Super Admin" />
        <div className="card">
          <div className="card__header">
            <h5 className="card__title">Enabled Modules</h5>
          </div>
          <div className="card__body">
            <div className="space-y-3">
              <div className="flex items-center">
                <input type="checkbox" className="form-check-input" checked readOnly />
                <label className="form-check-label ml-2">HRM Module</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="form-check-input" checked readOnly />
                <label className="form-check-label ml-2">CRM Module</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="form-check-input" checked readOnly />
                <label className="form-check-label ml-2">Payroll Module</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModulesMainArea;
