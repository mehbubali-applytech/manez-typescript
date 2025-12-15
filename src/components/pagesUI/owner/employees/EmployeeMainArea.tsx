"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { IEmployee } from "./EmployeeTypes";
import AddEmployeeModal from "./AddEmployeeModal";
import UpdateEmployeeModal from "./UpdateEmployeeModal";

const EmployeeMainArea: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(
    null
  );

  useEffect(() => {
    setEmployees([
      {
        id: 1,
        employeeId: "EMP-001",
        employee_id: 1001,
        image: {} as any,
        name: "Rahul Sharma",
        first_name: "Rahul",
        last_name: "Sharma",
        username: "rahulsharma",
        email: "rahul@company.com",
        phone: "+91 9876543210",
        designation: "Software Engineer",
        joiningDate: "2023-01-15",
        created_at: "2023-01-15",
        status: "Active",
      },
      {
        id: 2,
        employeeId: "EMP-002",
        employee_id: 1002,
        image: {} as any,
        name: "Priya Verma",
        first_name: "Priya",
        last_name: "Verma",
        username: "priyaverma",
        email: "priya@company.com",
        phone: "+91 9123456780",
        designation: "HR Manager",
        joiningDate: "2022-10-10",
        created_at: "2022-10-10",
        status: "Inactive",
      },
    ]);
  }, []);

  const openAddModal = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleSaveEmployee = (payload: Partial<IEmployee>) => {
    if (payload.id) {
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === payload.id ? { ...e, ...(payload as IEmployee) } : e
        )
      );
    } else {
      const newId =
        employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;

      setEmployees((prev) => [
        { ...(payload as IEmployee), id: newId },
        ...prev,
      ]);
    }

    setModalOpen(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

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
            <li className="breadcrumb-item active">All Employees</li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button className="btn btn-primary" onClick={openAddModal}>
            Add Employee
          </button>
        </div>
      </div>

      <EmployeeTable
        key={employees.length}
        data={employees}
        onEdit={(e) => {
          setEditingEmployee(e);
          console.log(e);
          setModalOpen(true);
        }}
        onDelete={handleDeleteEmployee}
      />

      {modalOpen && (
        <>
          {!editingEmployee ? (
            <AddEmployeeModal
              open={modalOpen}
              setOpen={setModalOpen}
              onSave={handleSaveEmployee}
            />
          ) : (
            <UpdateEmployeeModal
              open={modalOpen}
              setOpen={setModalOpen}
              editData={editingEmployee}
              onSave={handleSaveEmployee}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeMainArea;
