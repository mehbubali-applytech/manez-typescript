"use client";
import Link from "next/link";
import React, { useState } from "react";
import ComplianceOfficersTable from "./ComplianceOfficersTable";
import AddNewComplianceOfficerModal from "./AddNewComplianceOfficer";

export interface IComplianceOfficer {
  [key: string]: any;
  id: number;
  compName: string;
  compCode: string;
  department: string;
  company: string;
}

const dummyComplianceData: IComplianceOfficer[] = [
  { id: 1, compName: "Sanjay Gupta", compCode: "COMP001", department: "Legal", company: "Google" },
  { id: 2, compName: "Nisha Reddy", compCode: "COMP002", department: "Regulatory", company: "Microsoft" },
  { id: 3, compName: "Rohan Desai", compCode: "COMP003", department: "Risk Management", company: "Amazon" },
  { id: 4, compName: "Anjali Iyer", compCode: "COMP004", department: "Data Protection", company: "Meta" },
];

const ComplianceOfficersMainArea = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [complianceOfficers, setComplianceOfficers] = useState<IComplianceOfficer[]>(dummyComplianceData);

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
            <li className="breadcrumb-item active">Compliance Officers</li>
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

      <ComplianceOfficersTable key={complianceOfficers.length} data={complianceOfficers} />

      {modalOpen && (
        <AddNewComplianceOfficerModal open={modalOpen} setOpen={setModalOpen} />
      )}
    </div>
  );
};

export default ComplianceOfficersMainArea;
