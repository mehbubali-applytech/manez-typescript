"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import DepartmentTable from "./DepartmentTable";
import { IDepartment } from "./DepartmentTypes";
import AddDepartmentModal from "./AddDepartmentModal";
import UpdateDepartmentModal from "./UpdateDepartmentModal";

const DepartmentMainArea: React.FC = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<IDepartment | null>(null);

  useEffect(() => {
    setDepartments([
      {
        id: 1,
        departmentId: "DEP-001",
        name: "Engineering",
        head: "Rahul Sharma",
        phone: "+91 9876543210",
        email: "engineering@company.com",
        created_at: "2023-01-01",
        status: "Active",
      },
      {
        id: 2,
        departmentId: "DEP-002",
        name: "Human Resources",
        head: "Priya Verma",
        phone: "+91 9123456780",
        email: "hr@company.com",
        created_at: "2022-09-15",
        status: "Inactive",
      },
    ]);
  }, []);

  const openAddModal = () => {
    setEditingDepartment(null);
    setModalOpen(true);
  };

  const handleSaveDepartment = (payload: Partial<IDepartment>) => {
    if (payload.id) {
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === payload.id ? { ...d, ...(payload as IDepartment) } : d
        )
      );
    } else {
      const newId =
        departments.length > 0
          ? Math.max(...departments.map((d) => d.id)) + 1
          : 1;

      setDepartments((prev) => [
        { ...(payload as IDepartment), id: newId },
        ...prev,
      ]);
    }

    setModalOpen(false);
    setEditingDepartment(null);
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
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
            <li className="breadcrumb-item active">All Departments</li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button className="btn btn-primary" onClick={openAddModal}>
            Add Department
          </button>
        </div>
      </div>

      <DepartmentTable
        key={departments.length}
        data={departments}
        onEdit={(d) => {
          setEditingDepartment(d);
          setModalOpen(true);
        }}
        onDelete={handleDeleteDepartment}
      />

      {modalOpen &&
        (!editingDepartment ? (
          <AddDepartmentModal
            open={modalOpen}
            setOpen={setModalOpen}
            onSave={handleSaveDepartment}
          />
        ) : (
          <UpdateDepartmentModal
            open={modalOpen}
            setOpen={setModalOpen}
            editData={editingDepartment}
            onSave={handleSaveDepartment}
          />
        ))}
    </div>
  );
};

export default DepartmentMainArea;
