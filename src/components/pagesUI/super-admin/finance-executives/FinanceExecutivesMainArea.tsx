"use client";
import Link from "next/link";
import React, { useState } from "react";
import FinanceExecutivesTable from "./FinanceExecutivesTable";
import AddNewFinanceExecutiveModal from "./AddNewFinanceExecutive";

export interface IFinanceExecutive {
  [key: string]: any;
  id: number;
  finName: string;
  finCode: string;
  department: string;
  company: string;
}

const dummyFinanceData: IFinanceExecutive[] = [
  { id: 1, finName: "Rajesh Kumar", finCode: "FIN001", department: "Accounting", company: "Google" },
  { id: 2, finName: "Priya Sharma", finCode: "FIN002", department: "Payroll", company: "Microsoft" },
  { id: 3, finName: "Amit Patel", finCode: "FIN003", department: "Treasury", company: "Amazon" },
  { id: 4, finName: "Deepika Singh", finCode: "FIN004", department: "Audit", company: "Meta" },
];

const FinanceExecutivesMainArea = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [financeExecutives, setFinanceExecutives] = useState<IFinanceExecutive[]>(dummyFinanceData);

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
            <li className="breadcrumb-item active">Finance Executives</li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Add Finance Executive
          </button>
        </div>
      </div>

      <FinanceExecutivesTable key={financeExecutives.length} data={financeExecutives} />

      {modalOpen && (
        <AddNewFinanceExecutiveModal open={modalOpen} setOpen={setModalOpen} />
      )}
    </div>
  );
};

export default FinanceExecutivesMainArea;
