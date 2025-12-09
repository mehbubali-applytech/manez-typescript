"use client";
import Link from "next/link";
import React, { useState } from "react";
import AddNewHrManagerModal from "./AddNewHrManager";
import HrManagersTable from "./HrManagersTable";

export interface IHrManager {
  [key: string]: any;
  id: number;
  hrName: string;
  hrCode: string;
  department: string;
  company: string;
}

const dummyHrData: IHrManager[] = [
  { id: 1, hrName: "Rahul Sharma", hrCode: "HR001", department: "Recruitment", company: "Google" },
  { id: 2, hrName: "Anita Verma", hrCode: "HR002", department: "Operations", company: "Microsoft" },
  { id: 3, hrName: "Vikas Singh", hrCode: "HR003", department: "Compliance", company: "Amazon" },
  { id: 4, hrName: "Neha Gupta", hrCode: "HR004", department: "Finance", company: "Meta" },
];

const HrManagersMainArea = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hrManagers, setHrManagers] = useState<IHrManager[]>(dummyHrData);

  return (
    <div className="app__slide-wrapper">
      <div className="breadcrumb__wrapper mb-[25px]">
        <nav>
          <ol className="breadcrumb flex items-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/super-admin">Admin</Link>
            </li>
            <li className="breadcrumb-item active">HR Managers</li>
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

      <HrManagersTable key={hrManagers.length} data={hrManagers} />

      {modalOpen && (
        <AddNewHrManagerModal open={modalOpen} setOpen={setModalOpen} />
      )}

    </div>
  );
};

export default HrManagersMainArea;
