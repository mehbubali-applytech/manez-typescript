"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddNewEmployeeModal from "../AddNewEmployee";
import EmployeesTable from "../EmployeesTable";
import { IEmployee } from "../EmployeesMainArea";

const DUMMY_EMPLOYEES: any[] = [
  { id: 1, empName: "Alice Johnson", empCode: "EMP001", department: "Engineering", company: "Google", companyCode: "GOOG" },
  { id: 2, empName: "Bob Wilson", empCode: "EMP002", department: "Product", company: "Microsoft", companyCode: "MSFT" },
  { id: 3, empName: "Carol White", empCode: "EMP003", department: "Design", company: "Amazon", companyCode: "AMZN" },
  { id: 4, empName: "David Brown", empCode: "EMP004", department: "Sales", company: "Meta", companyCode: "META" },
  { id: 5, empName: "Eve Davis", empCode: "EMP005", department: "Engineering", company: "Google", companyCode: "GOOG" },
];

const CompanyEmployeesMainArea: React.FC<{ companyCode: string }> = ({ companyCode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    const filteredEmployees = DUMMY_EMPLOYEES.filter(
      (emp) => emp.companyCode?.toLowerCase() === companyCode.toLowerCase()
    );
    setEmployees(filteredEmployees);
  }, [companyCode]);

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
              <Link href="/super-admin/employees">Employees</Link>
            </li>
            <li className="breadcrumb-item active">
              {companyCode}
            </li>
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

      {/* Employees Table */}
      <EmployeesTable key={employees.length} data={employees} />

      {/* Add Modal */}
      {modalOpen && (
        <AddNewEmployeeModal open={modalOpen} setOpen={setModalOpen} />
      )}
    </div>
  );
};

export default CompanyEmployeesMainArea;
