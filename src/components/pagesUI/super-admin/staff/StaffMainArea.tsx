"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddNewStaffModal from "./AddNewStaff";
import StaffTable from "./StaffTable";

export interface IStaff {
  [key: string]: any;
  id: number;
  staffName: string;
  staffCode: string;
  department: string;
  companyName?: string;
}

const StaffMainArea = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [staff, setStaff] = useState<IStaff[]>([]);

  useEffect(() => {
    const dummyData: IStaff[] = [
      { id: 1, staffName: "John Doe", staffCode: "EMP001", department: "HR", companyName: "TechCorp" },
      { id: 2, staffName: "Jane Smith", staffCode: "EMP002", department: "IT", companyName: "InnovateTech" },
      { id: 3, staffName: "Robert Brown", staffCode: "EMP003", department: "Finance", companyName: "Digital Solutions" },
      { id: 4, staffName: "Emily Clark", staffCode: "EMP004", department: "Sales", companyName: "SalesForce" },
      { id: 5, staffName: "David Lee", staffCode: "EMP005", department: "Marketing", companyName: "Marketify" },
    ];
    setStaff(dummyData);
  }, []);

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
            <li className="breadcrumb-item active">All Staff</li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Add Staff
          </button>
        </div>
      </div>

      <StaffTable key={staff.length} data={staff} />

      {modalOpen && (
        <AddNewStaffModal open={modalOpen} setOpen={setModalOpen} />
      )}
    </div>
  );
};

export default StaffMainArea;
