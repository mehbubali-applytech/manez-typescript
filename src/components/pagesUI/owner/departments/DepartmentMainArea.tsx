"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import DepartmentTable from "./DepartmentTable";
import { IDepartment } from "./DepartmentTypes";
import UpdateDepartmentModal from "./UpdateDepartmentModal";
import { useRouter } from "next/navigation";
import DepartmentSummary from "./DepartmentSummary";

const DepartmentMainArea: React.FC = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<IDepartment | null>(null);

  const router = useRouter();

  useEffect(() => {
    setDepartments([
      {
        id: 1,
        departmentCode: "DEP-001",
        name: "Engineering",
        head: "Rahul Sharma",
        phone: "+91 9876543210",
        email: "engineering@company.com",
        parentDepartmentId: 1,
        isActive: true,
        description: "Handles all engineering tasks",
        created_at: "2023-01-01",
        status: "Active",
      },
      {
        id: 2,
        departmentCode: "DEP-002",
        name: "Human Resources",
        head: "Priya Verma",
        phone: "+91 9123456780",
        email: "hr@company.com",
        parentDepartmentId: 1,
        isActive: true,
        description: "Manages employee relations",
        created_at: "2022-09-15",
        status: "Inactive",
      },
    ]);
  }, []);

  const handleAddClick = () => {
    router.push("/owner/departments/add-dept");
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
          <button className="btn btn-primary" onClick={handleAddClick}>
            Add Department
          </button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6 maxXs:gap-x-0">
        <DepartmentSummary />
      </div>
      <DepartmentTable
        key={departments.length}
        data={departments}
        onEdit={(dept) => {
          setEditingDepartment(dept);
          setModalOpen(true);
        }}
        onDelete={handleDeleteDepartment}
      />

      {modalOpen && (
        <UpdateDepartmentModal
          open={modalOpen}
          setOpen={setModalOpen}
          editData={editingDepartment}
          onSave={handleSaveDepartment}
        />
      )}
    </div>
  );
};

export default DepartmentMainArea;
