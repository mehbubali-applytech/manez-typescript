"use client";
import Link from "next/link";
import React, { useState } from "react";
import EmployeesTable from "./EmployeesTable";
import AddNewEmployeeModal from "./AddNewEmployee";

export interface IEmployee {
  [key: string]: any;
  id: number;
  empName: string;
  empCode: string;
  department: string;
  company: string;
}

const dummyEmployeeData: IEmployee[] = [
  { id: 1, empName: "Alice Johnson", empCode: "EMP001", department: "Engineering", company: "Google" },
  { id: 2, empName: "Bob Wilson", empCode: "EMP002", department: "Product", company: "Microsoft" },
  { id: 3, empName: "Carol White", empCode: "EMP003", department: "Design", company: "Amazon" },
  { id: 4, empName: "David Brown", empCode: "EMP004", department: "Sales", company: "Meta" },
];

const EmployeesMainArea = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>(dummyEmployeeData);

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
            <li className="breadcrumb-item active">Employees</li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Add Employee
          </button>
        </div>
      </div>

      <EmployeesTable key={employees.length} data={employees} />

      {modalOpen && (
        <AddNewEmployeeModal open={modalOpen} setOpen={setModalOpen} />
      )}
    </div>
  );
};

export default EmployeesMainArea;
