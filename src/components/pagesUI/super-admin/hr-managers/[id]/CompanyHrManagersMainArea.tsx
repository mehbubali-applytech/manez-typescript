"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddNewHrManager from "../add-hr-manager/AddNewHrManager";
import HrManagersTable from "../HrManagersTable";
import { IHrManager } from "../hr-managers.interface";

const DUMMY_HR_MANAGERS: any[] = [
  { id: 1, hrName: "Rahul Sharma", hrCode: "HR001", department: "Recruitment", company: "Google", companyCode: "GOOG" },
  { id: 2, hrName: "Anita Verma", hrCode: "HR002", department: "Operations", company: "Microsoft", companyCode: "MSFT" },
  { id: 3, hrName: "Vikas Singh", hrCode: "HR003", department: "Compliance", company: "Amazon", companyCode: "AMZN" },
  { id: 4, hrName: "Neha Gupta", hrCode: "HR004", department: "Finance", company: "Meta", companyCode: "META" },
  { id: 5, hrName: "Priya Reddy", hrCode: "HR005", department: "Recruitment", company: "Google", companyCode: "GOOG" },
];

const CompanyHrManagersMainArea: React.FC<{ id: number }> = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hrManagers, setHrManagers] = useState<IHrManager[]>([]);

  useEffect(() => {
    const filteredManagers = DUMMY_HR_MANAGERS.filter(
      (mgr) => mgr.id === id
    );
    setHrManagers(filteredManagers);
  }, [id]);

  return (
    <div className="app__slide-wrapper">
      {/* Breadcrumb */}
      <div className="breadcrumb__wrapper mb-[25px]">
        <nav>
          <ol className="breadcrumb flex items-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/super-admin">Admin</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/super-admin/hr-manager">HR Managers</Link>
            </li>
            <li className="breadcrumb-item active">
              {id}
            </li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Add HR Manager
          </button>
        </div>
      </div>

      {/* HR Managers Table */}
      <HrManagersTable  />

    </div>
  );
};

export default CompanyHrManagersMainArea;
