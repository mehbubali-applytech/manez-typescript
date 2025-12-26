"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import StaffTable from "../StaffTable";
import { useRouter } from "next/navigation";

export interface IStaff {
  [key: string]: any;
  id: number;
  staffName: string;
  staffCode: string;
  department: string;
  companyName: string;
  companyCode: string;
}

const DUMMY_STAFF: IStaff[] = [
  { id: 1, staffName: "John Doe", staffCode: "EMP001", department: "HR", companyName: "Google", companyCode: "GOOG" },
  { id: 2, staffName: "Emily Johnson", staffCode: "EMP002", department: "IT", companyName: "Microsoft", companyCode: "MSFT" },
  { id: 3, staffName: "Jessica Miller", staffCode: "EMP003", department: "Finance", companyName: "Amazon", companyCode: "AMZN" },
  { id: 4, staffName: "David Chen", staffCode: "EMP004", department: "HR", companyName: "Meta", companyCode: "META" },
  { id: 5, staffName: "Sarah Wilson", staffCode: "EMP005", department: "Marketing", companyName: "Apple", companyCode: "AAPL" },
];



const CompanyStaffMainArea: React.FC<{ companyCode: string }> = ({ companyCode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [staff, setStaff] = useState<IStaff[]>([]);

  const router = useRouter();
  const handleAddClick = ()=>{
    router.push("/super-admin/staff/add-staff")
  }

  useEffect(() => {
    const filteredStaff = DUMMY_STAFF.filter(
      (s) => s.companyCode?.toLowerCase() === companyCode.toLowerCase()
    );
    setStaff(filteredStaff);
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
              <Link href="/super-admin/companies">Companies</Link>
            </li>
            <li className="breadcrumb-item active">
              Staff • {companyCode}
            </li>
          </ol>
        </nav>

                 <div className="breadcrumb__btn">
              <button
                type="button"
                onClick={handleAddClick}
                className="btn btn-primary"
              >
                <i className="fa-regular fa-plus mr-2"></i>
                Add New Staff
              </button>
            </div>
      </div>

      {/* Staff Table */}
      <StaffTable/>
    </div>
  );
};

export default CompanyStaffMainArea;
