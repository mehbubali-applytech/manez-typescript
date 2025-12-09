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
    domain?: string;
    companyLogo?: string; // url or filename
    address1: string;
    address2?: string;
    city: string;
    stateProvince: string;
    country: string;
    postalCode?: string;
}


const CompaniesMainArea = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [companies, setCompanies] = useState<ICompany[]>([]);

    useEffect(() => {
        const dummyData: ICompany[] = [
            { id: 10, companyName: "Google", companyCode: "GOOG", domain: "google.com", companyLogo: "", address1: "1600 Amphitheatre Parkway", address2: "", city: "Mountain View", stateProvince: "California", country: "US", postalCode: "94043" },
            { id: 11, companyName: "Microsoft", companyCode: "MSFT", domain: "microsoft.com", companyLogo: "", address1: "One Microsoft Way", address2: "", city: "Redmond", stateProvince: "Washington", country: "US", postalCode: "98052" },
            { id: 12, companyName: "Amazon", companyCode: "AMZN", domain: "amazon.com", companyLogo: "", address1: "410 Terry Ave N", address2: "", city: "Seattle", stateProvince: "Washington", country: "US", postalCode: "98109" },
            { id: 15, companyName: "Meta", companyCode: "META", domain: "meta.com", companyLogo: "", address1: "1 Hacker Way", address2: "", city: "Menlo Park", stateProvince: "California", country: "US", postalCode: "94025" },
            { id: 16, companyName: "Apple", companyCode: "AAPL", domain: "apple.com", companyLogo: "", address1: "Apple Park", address2: "", city: "Cupertino", stateProvince: "California", country: "US", postalCode: "95014" },
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
