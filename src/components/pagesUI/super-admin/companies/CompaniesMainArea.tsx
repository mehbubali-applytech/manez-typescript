"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddNewCompanyModal from "./AddNewCompany";
import CompaniesTable from "./CompaniesTable";

/* ✅ Updated & Scalable Company Interface */
export interface ICompany {
  id: number;

  /* ===== Basic Info ===== */
  companyName: string;
  companyCode: string;
  domain?: string;
  companyLogo?: string;

  /* ===== Address ===== */
  address1: string;
  address2?: string;
  city: string;
  stateProvince?: string;
  country: string;
  postalCode?: string;

  /* ===== Contact ===== */
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;

  /* ===== Settings ===== */
  companyStatus?: "Active" | "Suspended" | "Pending";
  assignedPlan?: "Free" | "Pro" | "Enterprise";
  employeeLimit?: number;

  /* ===== Modules ===== */
  attendance?: boolean;
  attendanceLevel?: "Basic" | "Advanced";
  leaveManagement?: boolean;
  payroll?: boolean;
  offerLetters?: boolean;
  compliance?: boolean;

  /* ===== Audit ===== */
  createdAt?: string;
  updatedAt?: string;

  /* ✅ Escape hatch */
  [key: string]: any;
}

const CompaniesMainArea = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    const dummyData: ICompany[] = [
      {
        id: 10,
        companyName: "Google",
        companyCode: "GOOG",
        domain: "google.com",
        address1: "1600 Amphitheatre Parkway",
        city: "Mountain View",
        stateProvince: "California",
        country: "US",
        postalCode: "94043",
        companyStatus: "Active",
        assignedPlan: "Enterprise",
        attendance: true,
        payroll: true,
      },
      {
        id: 11,
        companyName: "Microsoft",
        companyCode: "MSFT",
        domain: "microsoft.com",
        address1: "One Microsoft Way",
        city: "Redmond",
        stateProvince: "Washington",
        country: "US",
        postalCode: "98052",
        companyStatus: "Active",
        assignedPlan: "Enterprise",
        attendance: true,
        leaveManagement: true,
      },
      {
        id: 12,
        companyName: "Amazon",
        companyCode: "AMZN",
        domain: "amazon.com",
        address1: "410 Terry Ave N",
        city: "Seattle",
        stateProvince: "Washington",
        country: "US",
        postalCode: "98109",
        companyStatus: "Active",
        assignedPlan: "Enterprise",
      },
      {
        id: 15,
        companyName: "Meta",
        companyCode: "META",
        domain: "meta.com",
        address1: "1 Hacker Way",
        city: "Menlo Park",
        stateProvince: "California",
        country: "US",
        postalCode: "94025",
        companyStatus: "Active",
        assignedPlan: "Pro",
      },
      {
        id: 16,
        companyName: "Apple",
        companyCode: "AAPL",
        domain: "apple.com",
        address1: "Apple Park",
        city: "Cupertino",
        stateProvince: "California",
        country: "US",
        postalCode: "95014",
        companyStatus: "Active",
        assignedPlan: "Enterprise",
      },
    ];

    setCompanies(dummyData);
  }, []);

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
            <li className="breadcrumb-item active">All Companies</li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Add Company
          </button>
        </div>
      </div>

      {/* Pass key to force remount when companies length changes (keeps prior behavior) */}
      <CompaniesTable key={companies.length} data={companies} />

      {/* Modal */}
      {modalOpen && (
        <AddNewCompanyModal open={modalOpen} setOpen={setModalOpen} />
      )}
    </div>
  );
};

export default CompaniesMainArea;
