// BranchTable.tsx
"use client";

import React, { useState } from "react";
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

import TableControls from "@/components/elements/SharedInputs/TableControls";
import DeleteModal from "@/components/common/DeleteModal";

import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import { getTableStatusClass } from "@/hooks/use-condition-class";

import { IBranch } from "./BranchTypes";

const branchHeadCells = [
  { id: "branchName", label: "Branch Name" },
  { id: "branchCode", label: "Code" },
  { id: "city", label: "City" },
  { id: "phone", label: "Phone" },
  { id: "managerName", label: "Manager" },
  { id: "totalEmployees", label: "Employees" },
  { id: "status", label: "Status" },
];

interface Props {
  data: IBranch[];
  onEdit?: (row: IBranch) => void;
  onDelete?: (id: number) => void;
}

const BranchTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
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
    handleDelete: internalHandleDelete,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
  } = useMaterialTableHook<IBranch>(data, 10);

  const handleDelete = (id: number) => {
    // Find the index of the branch with this ID
    const index = data.findIndex(row => row.id === id);
    if (index >= 0) {
      internalHandleDelete(index);
      onDelete?.(id);
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

                        {branchHeadCells.map((headCell) => (
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
                              <div className="font-medium">{row.branchName}</div>
                            </TableCell>
                            <TableCell>
                              <span className="font-semibold">{row.branchCode}</span>
                            </TableCell>
                            <TableCell>{row.city}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>
                              <span className="font-medium">{row.managerName}</span>
                            </TableCell>
                            <TableCell>
                              <span className="font-semibold">{row.totalEmployees ?? "-"}</span>
                            </TableCell>

                            <TableCell>
                              <span className={`bd-badge ${statusClass}`}>
                                {row.status}
                              </span>
                            </TableCell>

                            <TableCell className="table__icon-box">
                              <div className="flex items-center justify-start gap-[10px]">
                                <button
                                  type="button"
                                  className="table__icon edit"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit?.(row);
                                  }}
                                  title="Edit Branch"
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                </button>
                                <button
                                  className="removeBtn table__icon delete"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteId(row.id);
                                    setModalDeleteOpen(true);
                                  }}
                                  title="Delete Branch"
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
                {searchQuery && (
                  <span className="ml-2 text-sm text-gray-600">
                    (Filtered by: `{searchQuery}`)
                  </span>
                )}
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

export default BranchTable;