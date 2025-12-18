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
import { IExpense } from "./ExpenseTypes";

const headCells = [
  { id: "expenseTitle", label: "Title" },
  { id: "expenseCategory", label: "Category" },
  { id: "amount", label: "Amount" },
  { id: "expenseDate", label: "Date" },
  { id: "paymentMode", label: "Payment" },
  { id: "status", label: "Status" },
];

interface Props {
  data: IExpense[];
  onEdit?: (row: IExpense) => void;
  onDelete?: (id: number) => void;
}

const ExpenseTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
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
  } = useMaterialTableHook<IExpense>(memoData, 10);

  return (
    <div className="card__wrapper">
      <TableControls
        rowsPerPage={rowsPerPage}
        searchQuery={searchQuery}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSearchChange={handleSearchChange}
      />

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.length === filteredRows.length}
                    onChange={(e) =>
                      handleSelectAllClick(e.target.checked, filteredRows)
                    }
                  />
                </TableCell>

                {headCells.map((cell) => (
                  <TableCell key={cell.id}>
                    <TableSortLabel
                      active={orderBy === cell.id}
                      direction={order}
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
              {paginatedRows.map((row, index) => (
                <TableRow key={row.id} selected={selected.includes(index)}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(index)}
                      onChange={() => handleClick(index)}
                    />
                  </TableCell>

                  <TableCell>{row.expenseTitle}</TableCell>
                  <TableCell>{row.expenseCategory}</TableCell>
                  <TableCell>₹{row.amount}</TableCell>
                  <TableCell>{row.expenseDate}</TableCell>
                  <TableCell>{row.paymentMode}</TableCell>
                  <TableCell>
                    <span className={`bd-badge ${getTableStatusClass(row.status)}`}>
                      {row.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <IconButton onClick={() => onEdit?.(row)}>
                      <i className="fa-light fa-pen" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleDelete(index);
                        onDelete?.(row.id);
                      }}
                    >
                      <i className="fa-regular fa-trash" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Pagination
        count={Math.ceil(filteredRows.length / rowsPerPage)}
        page={page}
        onChange={(e, value) => handleChangePage(value)}
      />
    </div>
  );
};

export default ExpenseTable;
