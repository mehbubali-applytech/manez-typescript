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

import { IDepartment } from "./DepartmentTypes";

const headCells = [
  { id: "name", label: "Department Name" },
  { id: "departmentId", label: "Department ID" },
  { id: "head", label: "Head" },
  { id: "phone", label: "Phone" },
  { id: "status", label: "Status" },
];

interface Props {
  data: IDepartment[];
  onEdit?: (row: IDepartment) => void;
  onDelete?: (id: number) => void;
}

const DepartmentTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
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
  } = useMaterialTableHook<IDepartment>(memoData, 10);

  const confirmDeleteHandler = (index: number) => {
    const row = filteredRows[index];
    if (!row) return;
    handleDelete(index);
    onDelete?.(row.id);
  };

  return (
    <div className="card__wrapper">
      <TableControls
        rowsPerPage={rowsPerPage}
        searchQuery={searchQuery}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSearchChange={handleSearchChange}
      />

      <Box sx={{ width: "100%" }}>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
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

                  {headCells.map((cell) => (
                    <TableCell key={cell.id}>
                      <TableSortLabel
                        active={orderBy === cell.id}
                        direction={orderBy === cell.id ? order : "asc"}
                        onClick={() => handleRequestSort(cell.id)}
                      >
                        {cell.label}
                        {orderBy === cell.id && (
                          <Box component="span" sx={visuallyHidden} />
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
                        <Checkbox checked={selected.includes(index)} />
                      </TableCell>

                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.head ?? "-"}</TableCell>
                      <TableCell>{row.phone ?? "-"}</TableCell>

                      <TableCell>
                        <span className={`bd-badge ${statusClass}`}>
                          {row.status}
                        </span>
                      </TableCell>

                      <TableCell>
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
  );
};

export default DepartmentTable;
