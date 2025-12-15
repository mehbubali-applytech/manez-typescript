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
import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import { getTableStatusClass } from "@/hooks/use-condition-class";

import { IEmployee } from "./EmployeeTypes";

const employeeHeadCells = [
  { id: "name", label: "Employee Name" },
  { id: "employeeId", label: "Employee ID" },
  { id: "designation", label: "Designation" },
  { id: "phone", label: "Phone" },
  { id: "joiningDate", label: "Joining Date" },
  { id: "status", label: "Status" },
];

interface Props {
  data: IEmployee[];
  onEdit?: (row: IEmployee) => void;
  onDelete?: (id: number) => void;
}

const EmployeeTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
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
  } = useMaterialTableHook<IEmployee>(memoData, 10);

  const confirmDeleteHandler = (index: number) => {
    const row = filteredRows[index];
    if (!row) return;
    handleDelete(index);
    onDelete?.(row.id);
  };

  return (
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

                    {employeeHeadCells.map((headCell) => (
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
                        selected={selected.includes(index)}
                        onClick={() => handleClick(index)}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selected.includes(index)}
                            size="small"
                            onChange={() => handleClick(index)}
                          />
                        </TableCell>

                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.employeeId}</TableCell>
                        <TableCell>{row.designation}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.joiningDate ?? "-"}</TableCell>

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
  );
};

export default EmployeeTable;
