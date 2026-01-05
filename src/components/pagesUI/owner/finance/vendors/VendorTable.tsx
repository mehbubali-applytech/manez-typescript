"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Pagination from "@mui/material/Pagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import { Checkbox } from "@mui/material";
import TableControls from "@/components/elements/SharedInputs/TableControls";
import DeleteModal from "@/components/common/DeleteModal";
import VendorDetailsModal from "./VendorDetailsModal";
import EditVendorModal from "./EditVendorModal";
import { getTableStatusClass } from "@/hooks/use-condition-class";

// Define Vendor interface
interface IVendor {
  id: number;
  vendorName: string;
  contactPerson: string;
  email: string;
  phone: string;
  vendorType: string;
  status: string;
  totalPurchases: number;
  outstandingBalance: number;
  lastTransaction: string;
  [key: string]: any;
}

// Mock data
const vendorsData: IVendor[] = [
  {
    id: 1,
    vendorName: "Tech Supplies Inc.",
    contactPerson: "John Smith",
    email: "john@techsupplies.com",
    phone: "+1 (555) 123-4567",
    vendorType: "IT Equipment",
    status: "Active",
    totalPurchases: 125000,
    outstandingBalance: 15000,
    lastTransaction: "2024-03-15"
  },
  {
    id: 2,
    vendorName: "Office Furniture Co.",
    contactPerson: "Sarah Johnson",
    email: "sarah@officefurniture.com",
    phone: "+1 (555) 987-6543",
    vendorType: "Furniture",
    status: "Active",
    totalPurchases: 75000,
    outstandingBalance: 5000,
    lastTransaction: "2024-03-10"
  },
  {
    id: 3,
    vendorName: "Cloud Services Ltd.",
    contactPerson: "Mike Wilson",
    email: "mike@cloudservices.com",
    phone: "+1 (555) 456-7890",
    vendorType: "Software",
    status: "Pending",
    totalPurchases: 45000,
    outstandingBalance: 10000,
    lastTransaction: "2024-03-05"
  },
  {
    id: 4,
    vendorName: "Cleaning Solutions",
    contactPerson: "Emily Brown",
    email: "emily@cleaningsolutions.com",
    phone: "+1 (555) 234-5678",
    vendorType: "Services",
    status: "Inactive",
    totalPurchases: 30000,
    outstandingBalance: 0,
    lastTransaction: "2024-02-28"
  },
  {
    id: 5,
    vendorName: "Marketing Pro Agency",
    contactPerson: "David Lee",
    email: "david@marketingpro.com",
    phone: "+1 (555) 876-5432",
    vendorType: "Marketing",
    status: "Active",
    totalPurchases: 95000,
    outstandingBalance: 25000,
    lastTransaction: "2024-03-12"
  },
  {
    id: 6,
    vendorName: "Legal Consultancy",
    contactPerson: "Robert Taylor",
    email: "robert@legalconsult.com",
    phone: "+1 (555) 345-6789",
    vendorType: "Legal",
    status: "Active",
    totalPurchases: 65000,
    outstandingBalance: 8000,
    lastTransaction: "2024-03-08"
  },
  {
    id: 7,
    vendorName: "Printing Services",
    contactPerson: "Lisa Anderson",
    email: "lisa@printservices.com",
    phone: "+1 (555) 765-4321",
    vendorType: "Printing",
    status: "Rejected",
    totalPurchases: 28000,
    outstandingBalance: 3000,
    lastTransaction: "2024-02-20"
  },
  {
    id: 8,
    vendorName: "Security Systems Co.",
    contactPerson: "James Miller",
    email: "james@securitysystems.com",
    phone: "+1 (555) 654-3210",
    vendorType: "Security",
    status: "Active",
    totalPurchases: 120000,
    outstandingBalance: 20000,
    lastTransaction: "2024-03-14"
  }
];

// Table head cells
const vendorHeadCells = [
  { id: "vendorName", label: "Vendor Name" },
  { id: "contactPerson", label: "Contact Person" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "vendorType", label: "Type" },
  { id: "status", label: "Status" },
  { id: "totalPurchases", label: "Total Purchases" },
  { id: "outstandingBalance", label: "Outstanding Balance" },
  { id: "lastTransaction", label: "Last Transaction" },
];

const VendorTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editData, setEditData] = useState<IVendor | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  
  const {
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
    searchQuery,
    paginatedRows,
    filteredRows,
    handleDelete,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
  } = useMaterialTableHook<IVendor>(vendorsData, 10);

  // Helper function for vendor type badge
  const getVendorTypeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case "it equipment":
        return "info-badge";
      case "furniture":
        return "warning-badge";
      case "software":
        return "primary-badge";
      case "services":
        return "success-badge";
      case "marketing":
        return "danger-badge";
      case "legal":
        return "secondary-badge";
      case "printing":
        return "info-badge";
      case "security":
        return "dark-badge";
      default:
        return "default-badge";
    }
  };

  return (
    <>
      <div className="col-span-12">
        <div className="card__wrapper">
          <div className="manaz-common-mat-list w-full table__wrapper table-responsive">
            <TableControls
              rowsPerPage={rowsPerPage}
              searchQuery={searchQuery}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleSearchChange={handleSearchChange}
            />
            
            <Box sx={{ width: "100%" }} className="table-responsive">
              <Paper sx={{ width: "100%", mb: 2 }}>
                <TableContainer className="table mb-[20px] hover multiple_tables w-full">
                  <Table aria-labelledby="tableTitle" className="whitespace-nowrap">
                    <TableHead>
                      <TableRow className="table__title">
                        <TableCell padding="checkbox">
                          <Checkbox
                            className="custom-checkbox checkbox-small"
                            color="primary"
                            indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                            checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                            onChange={(e) => handleSelectAllClick(e.target.checked, filteredRows)}
                            size="small"
                          />
                        </TableCell>
                        {vendorHeadCells.map((headCell) => (
                          <TableCell
                            className="table__title"
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}
                          >
                            <TableSortLabel
                              active={orderBy === headCell.id}
                              direction={orderBy === headCell.id ? order : "asc"}
                              onClick={() => handleRequestSort(headCell.id)}
                            >
                              {headCell.label}
                              {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                              ) : null}
                            </TableSortLabel>
                          </TableCell>
                        ))}
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    
                    <TableBody className="table__body">
                      {paginatedRows.map((row, index) => {
                        const statusClass = getTableStatusClass(row.status);
                        const typeClass = getVendorTypeClass(row.vendorType);
                        
                        return (
                          <TableRow
                            key={row.id}
                            selected={selected.includes(index)}
                            onClick={() => handleClick(index)}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                className="custom-checkbox checkbox-small"
                                checked={selected.includes(index)}
                                size="small"
                                onChange={() => handleClick(index)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <i className="fa-sharp fa-light fa-building mr-2 text-gray-500"></i>
                                {row.vendorName}
                              </div>
                            </TableCell>
                            <TableCell>{row.contactPerson}</TableCell>
                            <TableCell>
                              <a href={`mailto:${row.email}`} className="text-primary hover:underline">
                                {row.email}
                              </a>
                            </TableCell>
                            <TableCell>
                              <a href={`tel:${row.phone}`} className="text-gray-600">
                                {row.phone}
                              </a>
                            </TableCell>
                            <TableCell>
                              <span className={`bd-badge ${typeClass}`}>
                                {row.vendorType}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`bd-badge ${statusClass}`}>
                                {row.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="font-semibold">${row.totalPurchases.toLocaleString()}</span>
                            </TableCell>
                            <TableCell>
                              <span className={`font-semibold ${row.outstandingBalance > 0 ? 'text-danger' : 'text-success'}`}>
                                ${row.outstandingBalance.toLocaleString()}
                              </span>
                            </TableCell>
                            <TableCell>{row.lastTransaction}</TableCell>
                            <TableCell className="table__icon-box">
                              <div className="flex items-center justify-start gap-[10px]">
                                <button
                                  type="button"
                                  className="table__icon download"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditData(row);
                                    setDetailsModalOpen(true);
                                  }}
                                >
                                  <i className="fa-regular fa-eye"></i>
                                </button>
                                <button
                                  type="button"
                                  className="table__icon edit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditData(row);
                                    setModalOpen(true);
                                  }}
                                >
                                  <i className="fa-sharp fa-light fa-pen"></i>
                                </button>
                                <button
                                  className="removeBtn table__icon delete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteId(row.id);
                                    setModalDeleteOpen(true);
                                  }}
                                >
                                  <i className="fa-regular fa-trash"></i>
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
            
            <Box className="table-search-box mt-[30px]" sx={{ p: 2 }}>
              <Box>
                {`Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
                  page * rowsPerPage,
                  filteredRows.length
                )} of ${filteredRows.length} entries`}
              </Box>
              <Pagination
                count={Math.ceil(filteredRows.length / rowsPerPage)}
                page={page}
                onChange={(e, value) => handleChangePage(value)}
                variant="outlined"
                shape="rounded"
                className="manaz-pagination-button"
              />
            </Box>
          </div>
        </div>
      </div>

      {modalOpen && editData && (
        <EditVendorModal
          open={modalOpen}
          setOpen={setModalOpen}
          editData={editData}
        />
      )}
      
      {detailsModalOpen && editData && (
        <VendorDetailsModal
          open={detailsModalOpen}
          setOpen={setDetailsModalOpen}
          editData={editData}
        />
      )}

      {modalDeleteOpen && (
        <DeleteModal
  open={modalDeleteOpen}
  setOpen={setModalDeleteOpen}
  onConfirm={() => handleDelete(deleteId)}
/>

      )}
    </>
  );
};

export default VendorTable;