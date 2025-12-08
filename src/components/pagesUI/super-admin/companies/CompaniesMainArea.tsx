"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddNewCompanyModal from "./AddNewCompany";
import CompaniesTable from "./CompaniesTable";

export interface ICompany {
    [key: string]: any;
    id: number;
    companyName: string;
    companyCode: string;
}


const CompaniesMainArea = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [companies, setCompanies] = useState<ICompany[]>([]);

    useEffect(() => {
        const dummyData: ICompany[] = [
            { id: 10, companyName: "Google", companyCode: "GOOG" },
            { id: 11, companyName: "Microsoft", companyCode: "MSFT" },
            { id: 12, companyName: "Amazon", companyCode: "AMZN" },
            { id: 13, companyName: "Amazon", companyCode: "AMZN" },
            { id: 14, companyName: "Amazon", companyCode: "AMZN" },
            { id: 15, companyName: "Meta", companyCode: "META" },
            { id: 16, companyName: "Apple", companyCode: "AAPL" },
            { id: 17, companyName: "Netflix", companyCode: "NFLX" },
            { id: 18, companyName: "Tesla", companyCode: "TSLA" },
            { id: 19, companyName: "IBM", companyCode: "IBM" },
            { id: 20, companyName: "Intel", companyCode: "INTC" },
        ];
        setCompanies(dummyData);
    }, []);

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

            <CompaniesTable
                key={companies.length}
                data={companies}
            />


            {modalOpen && (
                <AddNewCompanyModal open={modalOpen} setOpen={setModalOpen} />
            )}
        </div>
    );
};

export default CompaniesMainArea;
