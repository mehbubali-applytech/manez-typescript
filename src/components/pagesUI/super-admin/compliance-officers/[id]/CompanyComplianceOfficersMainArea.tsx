"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddNewComplianceOfficerModal from "../AddNewComplianceOfficer";
import ComplianceOfficersTable from "../ComplianceOfficersTable";
import { IComplianceOfficer } from "../ComplianceOfficersMainArea";

const DUMMY_COMPLIANCE_OFFICERS: any[] = [
  { id: 1, compName: "Sanjay Gupta", compCode: "COMP001", department: "Legal", company: "Google", companyCode: "GOOG" },
  { id: 2, compName: "Nisha Reddy", compCode: "COMP002", department: "Regulatory", company: "Microsoft", companyCode: "MSFT" },
  { id: 3, compName: "Rohan Desai", compCode: "COMP003", department: "Risk Management", company: "Amazon", companyCode: "AMZN" },
  { id: 4, compName: "Anjali Iyer", compCode: "COMP004", department: "Data Protection", company: "Meta", companyCode: "META" },
  { id: 5, compName: "Vikram Singh", compCode: "COMP005", department: "Legal", company: "Google", companyCode: "GOOG" },
];

const CompanyComplianceOfficersMainArea: React.FC<{ id: number }> = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [complianceOfficers, setComplianceOfficers] = useState<IComplianceOfficer[]>([]);

  useEffect(() => {
    const filteredOfficers = DUMMY_COMPLIANCE_OFFICERS.filter(
      (officer) => officer.id === id
    );
    setComplianceOfficers(filteredOfficers);
  }, [id]);

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
              <Link href="/super-admin/compliance-officers">Compliance Officers</Link>
            </li>
            <li className="breadcrumb-item active">
              {id}
            </li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Add Compliance Officer
          </button>
        </div>
      </div>

      {/* Compliance Officers Table */}
      <ComplianceOfficersTable key={complianceOfficers.length} data={complianceOfficers} />

      {/* Add Modal */}
      {modalOpen && (
        <AddNewComplianceOfficerModal open={modalOpen} setOpen={setModalOpen} />
      )}
    </div>
  );
};

export default CompanyComplianceOfficersMainArea;
