"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import { ICompany } from "./CompaniesMainArea";

interface Props {
  companyCode: string;
}

const dummyCompaniesData: ICompany[] = [
  {
    id: 1,
    companyName: "Google LLC",
    companyCode: "GOOG",
    domain: "google.com",
    companyLogo: "",
    address1: "1600 Amphitheatre Parkway",
    city: "Mountain View",
    stateProvince: "California",
    country: "US",
    postalCode: "94043",
    contactName: "John Doe",
    contactEmail: "admin@google.com",
    contactPhone: "+1 555-1234",
    companyStatus: "Active",
    assignedPlan: "Enterprise",
    employeeLimit: 10000,
    attendance: true,
    attendanceLevel: "Advanced",
    leaveManagement: true,
    payroll: true,
    offerLetters: true,
    compliance: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-06-10",
  },
];

const CompanyDetailMainArea: React.FC<Props> = ({ companyCode }) => {
  const [company, setCompany] = useState<ICompany | null>(null);

  useEffect(() => {
    const found = dummyCompaniesData.find(
      (c) => c.companyCode.toLowerCase() === companyCode.toLowerCase()
    );
    setCompany(found || null);
  }, [companyCode]);

  if (!company) {
    return (
      <div className="app__slide-wrapper">
        <Breadcrumb breadTitle="Company Not Found" subTitle="Super Admin" />
        <div className="card">
          <div className="card__body text-center">
            <p className="text-danger mb-4">
              Company with code &quot;{companyCode}&quot; not found.
            </p>
            <Link href="/super-admin/companies" className="btn btn-primary">
              Back to Companies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app__slide-wrapper">
      <Breadcrumb
        breadTitle={`${company.companyName} Details`}
        subTitle="Super Admin"
      />

      <div className="grid grid-cols-12 gap-5">

        {/* ✅ Navigation */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__body flex gap-3 flex-wrap">
              <Link href={`/super-admin/staff/${company.companyCode}`} className="btn btn-primary">
                All Staff
              </Link>
              <Link href={`/super-admin/hr-manager/${company.companyCode}`} className="btn btn-primary">
                HR Manager
              </Link>
              <Link href={`/super-admin/finance-executives/${company.companyCode}`} className="btn btn-secondary">
                Finance Executive
              </Link>
                <Link href={`/super-admin/compliance-officers/${company.companyCode}`} className="btn btn-danger">
                Compliance Officer
              </Link>
              <Link href={`/super-admin/companies`} className="btn btn-outline-secondary">
                Back to Companies
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ BASIC INFO */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__header">
              <h5 className="card__title">Basic Information</h5>
            </div>
            <div className="card__body grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <strong>Company Name:</strong>
                <p>{company.companyName}</p>
              </div>
              <div className="col-span-4">
                <strong>Company Code:</strong>
                <p>{company.companyCode}</p>
              </div>
              <div className="col-span-4">
                <strong>Domain:</strong>
                <p>{company.domain || "—"}</p>
              </div>

              <div className="col-span-12">
                <strong>Logo:</strong>
                {company.companyLogo ? (
                  <img src={company.companyLogo} alt="Logo" style={{ width: 120 }} />
                ) : (
                  <p className="text-muted">No logo uploaded</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ ADDRESS */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__header">
              <h5 className="card__title">Address</h5>
            </div>
            <div className="card__body grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <strong>Address Line 1:</strong>
                <p>{company.address1}</p>
              </div>
              <div className="col-span-6">
                <strong>Address Line 2:</strong>
                <p>{company.address2 || "—"}</p>
              </div>
              <div className="col-span-4">
                <strong>City:</strong>
                <p>{company.city}</p>
              </div>
              <div className="col-span-4">
                <strong>State:</strong>
                <p>{company.stateProvince || "—"}</p>
              </div>
              <div className="col-span-4">
                <strong>Country:</strong>
                <p>{company.country}</p>
              </div>
              <div className="col-span-4">
                <strong>Postal Code:</strong>
                <p>{company.postalCode || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ CONTACT */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__header">
              <h5 className="card__title">Primary Contact</h5>
            </div>
            <div className="card__body grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <strong>Name:</strong>
                <p>{company.contactName || "—"}</p>
              </div>
              <div className="col-span-4">
                <strong>Email:</strong>
                <p>{company.contactEmail || "—"}</p>
              </div>
              <div className="col-span-4">
                <strong>Phone:</strong>
                <p>{company.contactPhone || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ SETTINGS */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__header">
              <h5 className="card__title">Settings</h5>
            </div>
            <div className="card__body grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <strong>Status:</strong>
                <p>{company.companyStatus || "—"}</p>
              </div>
              <div className="col-span-4">
                <strong>Plan:</strong>
                <p>{company.assignedPlan || "—"}</p>
              </div>
              <div className="col-span-4">
                <strong>Employee Limit:</strong>
                <p>{company.employeeLimit ?? "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ MODULES */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__header">
              <h5 className="card__title">Modules</h5>
            </div>
            <div className="card__body grid grid-cols-12 gap-4">
              <div className="col-span-3">Attendance: {company.attendance ? "✅" : "❌"}</div>
              <div className="col-span-3">Attendance Level: {company.attendanceLevel || "—"}</div>
              <div className="col-span-3">Leave: {company.leaveManagement ? "✅" : "❌"}</div>
              <div className="col-span-3">Payroll: {company.payroll ? "✅" : "❌"}</div>
              <div className="col-span-3">Offer Letters: {company.offerLetters ? "✅" : "❌"}</div>
              <div className="col-span-3">Compliance: {company.compliance ? "✅" : "❌"}</div>
            </div>
          </div>
        </div>

        {/* ✅ AUDIT */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__header">
              <h5 className="card__title">Audit</h5>
            </div>
            <div className="card__body grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <strong>Created At:</strong>
                <p>{company.createdAt || "—"}</p>
              </div>
              <div className="col-span-6">
                <strong>Updated At:</strong>
                <p>{company.updatedAt || "—"}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyDetailMainArea;
