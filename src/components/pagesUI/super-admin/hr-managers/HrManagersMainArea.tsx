"use client";
import Link from "next/link";
import React, { useState } from "react";
import HrManagersTable from "./HrManagersTable";
import AllHrManagersSummary from "./AllHrManagersSummary";
import HrManagerFilters from "./HrManagerFilters";
import { useRouter } from "next/navigation";

const HrManagersMainArea = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "2024-01-01",
    end: "2024-03-31"
  });

  const router = useRouter();

  const handleAddClick = () => {
    router.push("/super-admin/hr-managers/add-hr-manager");
  };

  return (
    <>
      <div className="app__slide-wrapper">
        <div className="breadcrumb__area">
          <div className="breadcrumb__wrapper mb-[25px]">
            <nav>
              <ol className="breadcrumb flex items-center mb-0">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item"><Link href="/super-admin">Super Admin</Link></li>
                <li className="breadcrumb-item active">HR Managers</li>
              </ol>
            </nav>
            <div className="breadcrumb__btn">
              <button
                type="button"
                onClick={handleAddClick}
                className="btn btn-primary"
              >
                <i className="fa-regular fa-plus mr-2"></i>
                Add New HR Manager
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-6 maxXs:gap-x-0">
          <AllHrManagersSummary />
        </div>

        <HrManagerFilters
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
        <HrManagersTable
          status={selectedStatus}
          department={selectedDepartment}
          company={selectedCompany}
          dateRange={dateRange}
        />
      </div>
    </>
  );
};

export default HrManagersMainArea;