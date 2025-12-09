"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import StaffTable from "./StaffTable";
import { IStaff } from "./StaffMainArea";

interface Props {
  department: string;
}

const StaffByDepartmentMainArea: React.FC<Props> = ({ department }) => {
  const [staff, setStaff] = useState<IStaff[]>([]);

  useEffect(() => {
    // Dummy data for generic departments (like employees)
    const dummyData: IStaff[] = [
      { id: 1, staffName: "John Doe", staffCode: "EMP001", department: "Employees", companyName: "TechCorp" },
      { id: 2, staffName: "Jane Smith", staffCode: "EMP002", department: "Employees", companyName: "InnovateTech" },
      { id: 3, staffName: "Robert Brown", staffCode: "EMP003", department: "Employees", companyName: "Digital Solutions" },
      { id: 4, staffName: "Emily Clark", staffCode: "EMP004", department: "Employees", companyName: "SalesForce" },
      { id: 5, staffName: "David Lee", staffCode: "EMP005", department: "Employees", companyName: "Marketify" },
    ];
    setStaff(dummyData);
  }, []);

  const departmentTitle = department
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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
            <li className="breadcrumb-item active">{departmentTitle}</li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button
            type="button"
            className="btn btn-primary"
          >
            Add {departmentTitle}
          </button>
        </div>
      </div>

      <StaffTable key={staff.length} data={staff} />
    </div>
  );
};

export default StaffByDepartmentMainArea;
