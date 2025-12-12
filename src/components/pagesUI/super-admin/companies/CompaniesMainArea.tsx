"use client";
import Link from "next/link";
import { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import AddNewCompanyModal from "./AddNewCompany";
import CompaniesTable from "./CompaniesTable";

export interface ICompany {
  [key: string]: any;

  id: number;
  name: string;
  location: string; 
  phone?: string;
  mobile?: string;
  fax?: string;
  websites?: string;
  industry?: string;
  currencyType?: string;
  source?: string;
  description?: string;
  language?: string;
  country?: string;
  city?: string;
  zipCode?: string;
  state?: string;
  address?: string;
  email: string;
  owner: string;
  rating: number;
  tag: string; 
  status: "Active" | "Inactive" | "Pending";
  companyImg?: StaticImageData;
}

const CompaniesMainArea: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [editingCompany, setEditingCompany] = useState<ICompany | null>(null);

  useEffect(() => {
    const dummyData: ICompany[] = [
      {
        id: 1,
        name: "TechVision Pvt Ltd",
        location: "Bangalore, India",
        phone: "080-23456789",
        mobile: "+91-9876543210",
        fax: "080-987654",
        websites: "https://techvision.com",
        industry: "Software",
        currencyType: "INR",
        source: "LinkedIn",
        description: "A leading software development company",
        language: "English",
        country: "India",
        city: "Bangalore",
        zipCode: "560001",
        state: "Karnataka",
        address: "MG Road, Bangalore",
        email: "contact@techvision.com",
        owner: "Rahul Sharma",
        rating: 4.5,
        tag: "IT",
        status: "Active",
      },
      {
        id: 2,
        name: "Global Traders Inc",
        location: "Mumbai, India",
        phone: "022-28976543",
        mobile: "+91-9123456780",
        fax: "022-345678",
        websites: "https://globaltraders.com",
        industry: "Import/Export",
        currencyType: "USD",
        source: "Website",
        description: "Deals in international trade and logistics",
        language: "English",
        country: "India",
        city: "Mumbai",
        zipCode: "400001",
        state: "Maharashtra",
        address: "Andheri East, Mumbai",
        email: "info@globaltraders.com",
        owner: "Sanjay Mehta",
        rating: 4.2,
        tag: "Trading",
        status: "Active",
      },
    ];

    setCompanies(dummyData);
  }, []);

  // open modal for creating new
  const openAddModal = () => {
    setEditingCompany(null);
    setModalOpen(true);
  };

  // open modal for editing a specific company
  const openEditModal = (company: ICompany) => {
    setEditingCompany(company);
    setModalOpen(true);
  };

  // Replace this with actual create/update logic (API)
  const handleSaveCompany = (payload: ICompany) => {
    if (payload.id) {
      // update existing
      setCompanies((prev) =>
        prev.map((c) => (c.id === payload.id ? { ...c, ...payload } : c))
      );
    } else {
      // create new - assign a new ID
      const newId = companies.length ? Math.max(...companies.map((c) => c.id)) + 1 : 1;
      setCompanies((prev) => [{ ...payload, id: newId }, ...prev]);
    }
    setModalOpen(false);
    setEditingCompany(null);
  };

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
            <li className="breadcrumb-item active">All Companies</li>
          </ol>
        </nav>

        <div className="breadcrumb__btn">
          <button type="button" className="btn btn-primary" onClick={openAddModal}>
            Add Company
          </button>
        </div>
      </div>

      {/* Companies Table - pass data + edit opener */}
      <CompaniesTable
        key={companies.length}
        data={companies}
        onEdit={(company: ICompany) => openEditModal(company)}
        onDelete={(id: number) => setCompanies((prev) => prev.filter((c) => c.id !== id))}
      />

      {/* Modal for Add / Edit */}
      {modalOpen && (
        <AddNewCompanyModal
          open={modalOpen}
          setOpen={setModalOpen}
          editData={editingCompany}
          onSave={handleSaveCompany}
        />
      )}
    </div>
  );
};

export default CompaniesMainArea;
