"use client";
import React, { useState } from "react";
import Link from "next/link";
import CompanyStaffTable from "./CompanyStaffTable";
import AllCompanyStaffSummary from "./AllCompanyStaffSummary";
import CompanyStaffFilters from "./CompanyStaffFilters";
import { useRouter } from "next/navigation";

// Company data mapping
const COMPANY_DATA: Record<string, { name: string; code: string }> = {
  '1': { name: 'TechNova Solutions', code: 'TECH' },
  '2': { name: 'Global Finance Group', code: 'GFG' },
  '3': { name: 'MediCare Innovations', code: 'MEDI' },
  '4': { name: 'RetailMax Corporation', code: 'RMAX' },
  '5': { name: 'Alpha Industries', code: 'ALPH' },
  '6': { name: 'Beta Technologies', code: 'BETA' },
};

interface CompanyStaffMainAreaProps {
  id: string | number;
}

const CompanyStaffMainArea: React.FC<CompanyStaffMainAreaProps> = ({ id }) => {
  if (!id) {
    return null; // or a loader / skeleton
  }

  const companyId = id.toString();

  const companyData = COMPANY_DATA[companyId] || {
    name: `Company ${companyId}`,
    code: `COMP${companyId}`,
  };
  
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const router = useRouter();

  return (
    <>
      <div className="app__slide-wrapper">
        <div className="breadcrumb__area">
          <div className="breadcrumb__wrapper mb-[25px]">
            <nav>
              <ol className="breadcrumb flex items-center mb-0">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/super-admin">Super Admin</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/super-admin/staff">Staff</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/super-admin/companies">Companies</Link>
                </li>
                <li className="breadcrumb-item active">
                  {companyData.name} Staff
                </li>
              </ol>
            </nav>
            <div className="breadcrumb__btn">
              <button
                type="button"
                onClick={() => router.push(`/super-admin/staff/add-staff?companyId=${companyId}`)}
                className="btn btn-primary"
              >
                <i className="fa-regular fa-plus mr-2"></i>
                Add Staff Member
              </button>
            </div>
          </div>
        </div>

        {/* Company Info Banner */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{companyData.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-600">Company ID: {companyId}</span>
                  <span className="text-sm text-gray-600">Code: {companyData.code}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Showing Staff for</div>
              <div className="font-semibold text-gray-800">{companyData.name}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6">
          <AllCompanyStaffSummary companyId={companyId} companyName={companyData.name} />
        </div>

        {/* Filters Section */}
        <CompanyStaffFilters
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
          selectedEmploymentType={selectedEmploymentType}
          setSelectedEmploymentType={setSelectedEmploymentType}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        {/* Table Section */}
        <CompanyStaffTable
          companyId={companyId}
          companyName={companyData.name}
          status={selectedStatus}
          department={selectedDepartment}
          position={selectedPosition}
          employmentType={selectedEmploymentType}
          dateRange={dateRange}
        />
      </div>
    </>
  );
};

export default CompanyStaffMainArea;