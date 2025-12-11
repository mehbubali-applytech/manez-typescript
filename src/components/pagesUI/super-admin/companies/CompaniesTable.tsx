"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Pagination,
  Checkbox,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import TableControls from "@/components/elements/SharedInputs/TableControls";
import DeleteModal from "@/components/common/DeleteModal";

import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import { getTableStatusClass } from "@/hooks/use-condition-class";
import { ICompany } from "./CompaniesMainArea";
import UpdateCompanyDetailsModal from "./UpdateCompanyDetailsModal";

const companyHeadCells = [
  { id: "name", label: "Company Name" },
  { id: "location", label: "Location" },
  { id: "phone", label: "Phone" },
  { id: "email", label: "Email" },
  { id: "owner", label: "Owner" },
  { id: "rating", label: "Rating" },
  { id: "tag", label: "Tag" },
  { id: "status", label: "Status" },
];

interface Props {
  data: ICompany[];
  onEdit?: (company: ICompany) => void;
  onDelete?: (id: number) => void;
}

const CompaniesTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [editData, setEditData] = useState<ICompany | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  /** ✅ Memoized data */
  const memoData = useMemo(() => data, [data]);

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
  } = useMaterialTableHook<ICompany>(memoData, 10);

  const openEditModal = (company: ICompany) => {
    setEditData(company);
    setModalOpen(true);
  };

  const confirmDelete = (index: number) => {
    // map paginated/filtered index to actual company id
    const row = filteredRows[index];
    if (!row) return;
    setDeleteId(row.id);
    setModalDeleteOpen(true);
  };

  const handleDeleteConfirmed = (idx: number) => {
    // remove from local hook data using handleDelete (it expects index)
    handleDelete(idx);
    // also inform parent if they passed onDelete
    if (deleteId && onDelete) onDelete(deleteId);
    setModalDeleteOpen(false);
    setDeleteId(null);
  };

  return (
    <>
      <div className="card__wrapper">
        <div className="manaz-common-mat-list w-full table__wrapper table-responsive">
          <TableControls
            rowsPerPage={rowsPerPage}
            searchQuery={searchQuery}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleSearchChange={handleSearchChange}
          />

          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer className="table mb-[20px] hover multiple_tables w-full">
                <Table className="whitespace-nowrap">
                  <TableHead>
                    <TableRow className="table__title">
                      <TableCell padding="checkbox">
                        <Checkbox
                          className="custom-checkbox checkbox-small"
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < filteredRows.length
                          }
                          checked={
                            filteredRows.length > 0 &&
                            selected.length === filteredRows.length
                          }
                          onChange={(e) =>
                            handleSelectAllClick(e.target.checked, filteredRows)
                          }
                          size="small"
                        />
                      </TableCell>

                      {companyHeadCells.map((headCell) => (
                        <TableCell key={headCell.id}>
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={() => handleRequestSort(headCell.id)}
                          >
                            {headCell.label}
                            {orderBy === headCell.id && (
                              <Box component="span" sx={visuallyHidden}>
                                {order === "desc"
                                  ? "sorted descending"
                                  : "sorted ascending"}
                              </Box>
                            )}
                          </TableSortLabel>
                        </TableCell>
                      ))}

                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedRows.map((row, index) => {
                      const statusClass = getTableStatusClass(row.status);

                      return (
                        <TableRow
                          key={row.id}
                          onClick={() => handleClick(index)}
                          selected={selected.includes(index)}
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
                            <span className="table-avatar flex items-center">
                              {row.companyImg && (
                                <Image
                                  src={row.companyImg}
                                  alt="Company"
                                  className="img-36 me-[10px]"
                                />
                              )}

                              <Link href={`/company/company-details/${row.id}`}>
                                {row.name}
                              </Link>
                            </span>
                          </TableCell>

                          <TableCell>{row.location}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.owner}</TableCell>

                          <TableCell>
                            {row.rating}
                            <span className="company__rating ms-[2px]">
                              <i className="fa-sharp fa-solid fa-star"></i>
                            </span>
                          </TableCell>

                          <TableCell>
                            <span className="tag-badge">{row.tag}</span>
                          </TableCell>

                          <TableCell>
                            <span className={`bd-badge ${statusClass}`}>
                              {row.status}
                            </span>
                          </TableCell>

                          <TableCell>
                            <div className="flex gap-[10px]">
                              <button
                                className="table__icon download"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/super-admin/companies/${row.id}`);
                                }}
                              >
                                <i className="fa-regular fa-eye"></i>
                              </button>

                              <button
                                className="table__icon edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal(row);
                                }}
                              >
                                <i className="fa-light fa-pen"></i>
                              </button>

                              <button
                                className="table__icon delete"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDelete(index);
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

          {/* Pagination */}
          <Box className="mt-[30px] flex justify-between">
            <span>
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, filteredRows.length)} of{" "}
              {filteredRows.length} entries
            </span>

            <Pagination
              count={Math.ceil(filteredRows.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => handleChangePage(value)}
            />
          </Box>
        </div>
      </div>


      {/* Delete Modal */}
      {modalDeleteOpen && (
        <DeleteModal
          open={modalDeleteOpen}
          setOpen={setModalDeleteOpen}
          deleteId={deleteId ?? 0}
          handleDeleteFunc={() => {
            // call handleDelete from hook - expects index; easier to map id -> index if needed
            if (deleteId == null) return;
            const idx = filteredRows.findIndex((r) => r.id === deleteId);
            if (idx >= 0) handleDelete(idx);
            if (onDelete) onDelete(deleteId);
            setModalDeleteOpen(false);
            setDeleteId(null);
          }}
        />
      )}
      {
        modalOpen && editData && (
          <UpdateCompanyDetailsModal
            open={modalOpen}
            setOpen={setModalOpen}
            editData={editData}
          />
        )
      }
    </>
  );
};

export default CompaniesTable;
