"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AddNewFinanceExecutiveModal from "../AddNewFinanceExecutive";
import FinanceExecutivesTable from "../FinanceExecutivesTable";
import { IFinanceExecutive } from "../FinanceExecutivesMainArea";

const DUMMY_FINANCE_EXECUTIVES: IFinanceExecutive[] = [
  { id: 1, finName: "Rajesh Kumar", finCode: "FIN001", department: "Accounting", company: "Google", companyCode: "GOOG" },
  { id: 2, finName: "Priya Sharma", finCode: "FIN002", department: "Payroll", company: "Microsoft", companyCode: "MSFT" },
  { id: 3, finName: "Amit Patel", finCode: "FIN003", department: "Treasury", company: "Amazon", companyCode: "AMZN" },
  { id: 4, finName: "Deepika Singh", finCode: "FIN004", department: "Audit", company: "Meta", companyCode: "META" },
  { id: 5, finName: "Arjun Verma", finCode: "FIN005", department: "Accounting", company: "Google", companyCode: "GOOG" },
];

interface IFinanceExecutiveExtended extends IFinanceExecutive {
  companyCode?: string;
}

const CompanyFinanceExecutivesMainArea: React.FC<{ id: number }> = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [financeExecutives, setFinanceExecutives] = useState<IFinanceExecutive[]>([]);

  useEffect(() => {
    const filteredExecutives = DUMMY_FINANCE_EXECUTIVES.filter(
      (exec: any) => exec.id === id
    );
    setFinanceExecutives(filteredExecutives);
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
              <Link href="/super-admin/finance-executives">Finance Executives</Link>
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
            Add Finance Executive
          </button>
        </div>
      </div>

      {/* Finance Executives Table */}
      <FinanceExecutivesTable key={financeExecutives.length} data={financeExecutives} />

      {/* Add Modal */}
      {modalOpen && (
        <AddNewFinanceExecutiveModal open={modalOpen} setOpen={setModalOpen} />
      )}
    </div>
  );
};

export default CompanyFinanceExecutivesMainArea;
