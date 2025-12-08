"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import { ICompany } from "./CompaniesMainArea";

interface Props {
  companyCode: string;
}

// Dummy data for now (replace with API later)
const dummyCompaniesData: ICompany[] = [
  { id: 10, companyName: "Google", companyCode: "GOOG" },
  { id: 11, companyName: "Microsoft", companyCode: "MSFT" },
  { id: 12, companyName: "Amazon", companyCode: "AMZN" },
  { id: 15, companyName: "Meta", companyCode: "META" },
  { id: 16, companyName: "Apple", companyCode: "AAPL" },
  { id: 17, companyName: "Netflix", companyCode: "NFLX" },
  { id: 18, companyName: "Tesla", companyCode: "TSLA" },
  { id: 19, companyName: "IBM", companyCode: "IBM" },
  { id: 20, companyName: "Intel", companyCode: "INTC" },
];

const CompanyDetailMainArea: React.FC<Props> = ({ companyCode }) => {
  const [company, setCompany] = useState<ICompany | null>(null);

  useEffect(() => {
    const foundCompany = dummyCompaniesData.find(
      (c) => c.companyCode.toLowerCase() === companyCode.toLowerCase()
    );
    setCompany(foundCompany || null);
  }, [companyCode]);

  if (!company) {
    return (
      <div className="app__slide-wrapper">
        <Breadcrumb breadTitle="Company Not Found" subTitle="Super Admin" />
        <div className="card">
          <div className="card__body text-center">
            <p className="text-danger mb-4">
              Company with code "{companyCode}" not found.
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

      <div className="grid grid-cols-12 gap-x-5 maxXs:gap-x-0">
        {/* Navigation/Go to Card - MOVED TO TOP */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__header">
              <h5 className="card__title">Go to</h5>
            </div>
            <div className="card__body">
              <div className="flex gap-3 flex-wrap">
                <Link href={`/super-admin/staff/${company.companyCode}`} className="btn btn-primary">All Staff</Link>
                <button className="btn btn-primary">HR Manager</button>
                <button className="btn btn-secondary">Finance Executive</button>
                <button className="btn btn-info">Compliance Officer</button>
                <button className="btn btn-warning">Employees</button>

                <Link
                  href="/super-admin/companies"
                  className="btn btn-outline-secondary"
                >
                  Back to Companies
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Company Information Card (As Requested) */}
        <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
          <div className="card">
            <div className="card__body">
              <div className="flex justify-between items-center mb-3">
                <h6 className="card__title">Company Name</h6>
                <span className="text-primary text-xl">🏢</span>
              </div>
              <h2 className="text-3xl font-bold">{company.companyName}</h2>
              <p className="text-sm text-muted mt-2">Code: {company.companyCode}</p>
            </div>
          </div>
        </div>

        {/* Company Code Card */}
        <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
          <div className="card">
            <div className="card__body">
              <div className="flex justify-between items-center mb-3">
                <h6 className="card__title">Company Code</h6>
                <span className="text-success text-xl">📋</span>
              </div>
              <h2 className="text-3xl font-bold">{company.companyCode}</h2>
              <p className="text-sm text-muted mt-2">ID: {company.id}</p>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
          <div className="card">
            <div className="card__body">
              <div className="flex justify-between items-center mb-3">
                <h6 className="card__title">Status</h6>
                <span className="text-success text-xl">✓</span>
              </div>
              <h2 className="text-3xl font-bold">Active</h2>
              <p className="text-sm text-muted mt-2">
                <span className="badge badge-success">Active</span>
              </p>
            </div>
          </div>
        </div>

        {/* Total Employees Card */}
        <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
          <div className="card">
            <div className="card__body">
              <div className="flex justify-between items-center mb-3">
                <h6 className="card__title">Total Employees</h6>
                <span className="text-warning text-xl">👥</span>
              </div>
              <h2 className="text-3xl font-bold">245</h2>
              <p className="text-sm text-muted mt-2">Active employees</p>
            </div>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
          <div className="card">
            <div className="card__body">
              <div className="flex justify-between items-center mb-3">
                <h6 className="card__title">Active Users</h6>
                <span className="text-info text-xl">🔗</span>
              </div>
              <h2 className="text-3xl font-bold">189</h2>
              <p className="text-sm text-muted mt-2">System users</p>
            </div>
          </div>
        </div>

        {/* Departments Card */}
        <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
          <div className="card">
            <div className="card__body">
              <div className="flex justify-between items-center mb-3">
                <h6 className="card__title">Departments</h6>
                <span className="text-secondary text-xl">🏛️</span>
              </div>
              <h2 className="text-3xl font-bold">12</h2>
              <p className="text-sm text-muted mt-2">Departments</p>
            </div>
          </div>
        </div>

        {/* Projects Card */}
        <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
          <div className="card">
            <div className="card__body">
              <div className="flex justify-between items-center mb-3">
                <h6 className="card__title">Projects</h6>
                <span className="text-danger text-xl">📊</span>
              </div>
              <h2 className="text-3xl font-bold">28</h2>
              <p className="text-sm text-muted mt-2">Active projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailMainArea;
