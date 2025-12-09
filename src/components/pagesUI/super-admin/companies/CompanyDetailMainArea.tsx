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
      address2: "Building 43",
      city: "Mountain View",
      stateProvince: "California",
      country: "US",
      postalCode: "94043",
    },
    {
      id: 2,
      companyName: "Microsoft Corporation",
      companyCode: "MSFT",
      domain: "microsoft.com",
      companyLogo: "",
      address1: "One Microsoft Way",
      address2: "",
      city: "Redmond",
      stateProvince: "Washington",
      country: "US",
      postalCode: "98052",
    },
    {
      id: 3,
      companyName: "Amazon Inc",
      companyCode: "AMZN",
      domain: "amazon.com",
      companyLogo: "",
      address1: "410 Terry Ave North",
      address2: "",
      city: "Seattle",
      stateProvince: "Washington",
      country: "US",
      postalCode: "98109",
    },
    {
      id: 4,
      companyName: "Meta Platforms",
      companyCode: "META",
      domain: "meta.com",
      companyLogo: "",
      address1: "1 Hacker Way",
      address2: "",
      city: "Menlo Park",
      stateProvince: "California",
      country: "US",
      postalCode: "94025",
    },
    {
      id: 5,
      companyName: "Apple Inc",
      companyCode: "AAPL",
      domain: "apple.com",
      companyLogo: "",
      address1: "Apple Park Way",
      address2: "",
      city: "Cupertino",
      stateProvince: "California",
      country: "US",
      postalCode: "95014",
    },
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

      <div className="grid grid-cols-12 gap-x-5 maxXs:gap-x-0">

        {/* ✅ Navigation */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__header">
              <h5 className="card__title">Go to</h5>
            </div>
            <div className="card__body flex gap-3 flex-wrap">
              <Link href={`/super-admin/staff/${company.companyCode}`} className="btn btn-primary">All Staff</Link>
              <Link href={`/super-admin/hr-manager/${company.companyCode}`} className="btn btn-primary">HR Manager</Link>
              <Link href={`/super-admin/finance-executives/${company.companyCode}`} className="btn btn-secondary">Finance Executive</Link>
              <Link href={`/super-admin/compliance-officers/${company.companyCode}`} className="btn btn-info">Compliance Officer</Link>
              <Link href={`/super-admin/employees/${company.companyCode}`} className="btn btn-warning">Employees</Link>

              <Link href="/super-admin/companies" className="btn btn-outline-secondary">
                Back to Companies
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ Summary Cards */}
        {[
          { title: "Company Name", value: company.companyName, icon: "🏢" },
          { title: "Company Code", value: company.companyCode, icon: "📋", sub: `ID: ${company.id}` },
          { title: "Domain", value: company.domain || "—", icon: "🌐" },
          { title: "Status", value: "Active", icon: "✓" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12"
          >
            <div className="card">
              <div className="card__body">
                <div className="flex justify-between items-center mb-3">
                  <h6 className="card__title">{item.title}</h6>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <h2 className="text-2xl font-bold">{item.value}</h2>
                {item.sub && <p className="text-sm text-muted mt-2">{item.sub}</p>}
              </div>
            </div>
          </div>
        ))}

        {/* ✅ Company Information (FULL DETAILS) */}
        <div className="col-span-12">
          <div className="card">
            <div className="card__header">
              <h5 className="card__title">Company Information</h5>
            </div>

            <div className="card__body">
              <div className="grid grid-cols-12 gap-4">

                {/* Logo */}
                <div className="col-span-12">
                  <strong>Company Logo:</strong>
                  {company.companyLogo ? (
                    <img
                      src={company.companyLogo}
                      alt="Company Logo"
                      className="mt-2"
                      style={{ width: 120 }}
                    />
                  ) : (
                    <p className="text-muted mt-1">No logo uploaded</p>
                  )}
                </div>

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
                  <strong>State / Province:</strong>
                  <p>{company.stateProvince}</p>
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
        </div>

      </div>
    </div>
  );
};


export default CompanyDetailMainArea;
