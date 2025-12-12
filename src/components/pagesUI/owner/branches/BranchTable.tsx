// BranchTable.tsx
"use client";

import React, { useMemo } from "react";
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
  IconButton,
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
  } = useMaterialTableHook<IBranch>(memoData, 10);

  const confirmDeleteHandler = (index: number) => {
    const row = filteredRows[index];
    if (!row) return;
    // open parent delete UI by calling onDelete after confirmation via DeleteModal
    // We rely on DeleteModal usage below which will call handleDelete + onDelete
    // So setDeleteId/Modal state are kept inside DeleteModal invocation below
    // For simplicity, we'll call onDelete directly here after doing internal handleDelete conversion.
    const idx = filteredRows.findIndex((r) => r.id === row.id);
    if (idx >= 0) {
      handleDelete(idx);
      onDelete?.(row.id);
    }
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

                      {branchHeadCells.map((headCell) => (
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

                          <TableCell>{row.branchName}</TableCell>
                          <TableCell>{row.branchCode}</TableCell>
                          <TableCell>{row.city}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{row.managerName}</TableCell>
                          <TableCell>{row.totalEmployees ?? "-"}</TableCell>

                          <TableCell>
                            <span className={`bd-badge ${statusClass}`}>
                              {row.status}
                            </span>
                          </TableCell>

                          <TableCell>
                            <div className="flex gap-[10px]">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEdit?.(row);
                                }}
                                className="table__icon edit"
                              >
                                <i className="fa-light fa-pen" />
                              </IconButton>

                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDeleteHandler(index);
                                }}
                                className="table__icon delete"
                              >
                                <i className="fa-regular fa-trash" />
                              </IconButton>
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
    </>
  );
};

export default BranchTable;
