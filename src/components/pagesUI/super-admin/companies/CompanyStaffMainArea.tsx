"use client";
import React from "react";
import Link from "next/link";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";

interface StaffItem {
  staffId: string;
  id: number;
  name: string;
  position: string;
  phone?: string;
  company: string;
  companyCode: string;
}

// Minimal dummy staff list — replace with API later
const DUMMY_STAFF: StaffItem[] = [
  { staffId: "STAFF001", id: 1, name: "Naira Muskan", position: "CEO", phone: "+15551234567", company: "Google", companyCode: "GOOG" },
  { staffId: "STAFF002", id: 2, name: "Emily Johnson", position: "CIO", phone: "+15551234567", company: "Microsoft", companyCode: "MSFT" },
  { staffId: "STAFF003", id: 3, name: "Jessica Miller", position: "Product Manager", phone: "+15551234567", company: "Amazon", companyCode: "AMZN" },
  { staffId: "STAFF004", id: 4, name: "David Chen", position: "HR Manager", phone: "+15551234567", company: "Meta", companyCode: "META" },
  { staffId: "STAFF005", id: 5, name: "Sarah Wilson", position: "Finance Executive", phone: "+15551234567", company: "Apple", companyCode: "AAPL" },
  { staffId: "STAFF006", id: 6, name: "Michael Brown", position: "Compliance Officer", phone: "+15551234567", company: "Netflix", companyCode: "NFLX" },
  { staffId: "STAFF007", id: 7, name: "Lisa Anderson", position: "Senior Developer", phone: "+15551234567", company: "Tesla", companyCode: "TSLA" },
  { staffId: "STAFF008", id: 8, name: "James Martinez", position: "Business Analyst", phone: "+15551234567", company: "IBM", companyCode: "IBM" },
];

const CompanyStaffMainArea: React.FC<{ companyCode: string }> = ({ companyCode }) => {
  const code = (companyCode || "").toLowerCase();
  const staffForCompany = DUMMY_STAFF.filter((s) => s.companyCode.toLowerCase() === code);

  return (
    <div className="app__slide-wrapper">
      <Breadcrumb breadTitle={`Staff • ${companyCode}`} subTitle="Super Admin" />

      <div className="grid grid-cols-12 gap-x-5 maxXs:gap-x-0">
        <div className="col-span-12">
          <div className="card">
            <div className="card__body">
              <p className="text-muted">Showing staff for company code <strong>{companyCode}</strong></p>
            </div>
          </div>
        </div>

        {staffForCompany.length > 0 ? (
          staffForCompany.map((staff) => (
            <div key={staff.staffId} className="col-span-6 maxLg:col-span-6 maxMd:col-span-6 maxSm:col-span-12">
              <div className="card">
                <div className="card__body">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="card__title">{staff.name}</h5>
                      <p className="text-sm text-muted">{staff.position}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {staff.staffId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted">Company</p>
                      <p className="font-semibold">{staff.company}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/super-admin/staff/${staff.staffId}`} className="btn btn-primary flex-1 text-center">View Details</Link>
                    <Link href={`/super-admin/companies/${staff.companyCode}`} className="btn btn-outline-info flex-1 text-center">Company</Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12">
            <div className="card">
              <div className="card__body text-center">
                <p className="text-muted">No staff found for company code <strong>{companyCode}</strong>.</p>
                <div className="mt-3">
                  <Link href="/super-admin/staff" className="btn btn-primary">View All Staff</Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CompanyStaffMainArea;
