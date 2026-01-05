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
  Checkbox
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import TableControls from "@/components/elements/SharedInputs/TableControls";
import DeleteModal from "@/components/common/DeleteModal";
import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import { getTableStatusClass } from "@/hooks/use-condition-class";
import { IPayroll } from "./PayrollTypes";

const headCells = [
  { id: "employeeName", label: "Employee" },
  { id: "month", label: "Month" },
  { id: "basic", label: "Basic" },
  { id: "hra", label: "HRA" },
  { id: "allowances", label: "Allowances" },
  { id: "deductions", label: "Deductions" },
  { id: "netSalary", label: "Net Salary" },
  { id: "status", label: "Status" },
];

interface Props {
  data: IPayroll[];
  onEdit?: (row: IPayroll) => void;
  onDelete?: (id: number) => void;
}

const PayrollTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
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
  } = useMaterialTableHook<IPayroll>(data, 10);

  const handleDelete = (id: number) => {
    // Find the index of the payroll with this ID
    const index = data.findIndex(row => row.id === id);
    if (index >= 0) {
      internalHandleDelete(index);
      onDelete?.(id);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'processing': return 'bg-info';
      case 'failed': return 'bg-danger';
      case 'draft': return 'bg-secondary';
      default: return 'default-badge';
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
                        {headCells.map((cell) => (
                          <TableCell
                            className="table__title text-left"
                            key={cell.id}
                            sortDirection={orderBy === cell.id ? order : false}
                          >
                            <TableSortLabel
                              active={orderBy === cell.id}
                              direction={orderBy === cell.id ? order : "asc"}
                              onClick={() => handleRequestSort(cell.id)}
                            >
                              {cell.label}
                              {orderBy === cell.id ? (
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
    const statusClass = getStatusClass(row.status);

    return (
      <TableRow
        key={row.id}
        selected={selected.includes(index)}
        onClick={() => handleClick(index)}
      >
        <TableCell padding="checkbox" align="left">
          <Checkbox
            className="custom-checkbox checkbox-small"
            checked={selected.includes(index)}
            size="small"
            onChange={() => handleClick(index)}
          />
        </TableCell>
        <TableCell align="left">
          <div className="font-medium">{row.employeeName}</div>
          {row.employeeCode && (
            <div className="text-sm text-gray-500">{row.employeeCode}</div>
          )}
        </TableCell>
        <TableCell align="left">
          <span className="font-semibold">{row.month}</span>
        </TableCell>
        <TableCell align="right">
          <span className="font-medium">{formatCurrency(row.basic)}</span>
        </TableCell>
        <TableCell align="right">
          <span className="font-medium">{formatCurrency(row.hra)}</span>
        </TableCell>
        <TableCell align="right">
          <span className="font-medium text-green-600">+{formatCurrency(row.allowances)}</span>
        </TableCell>
        <TableCell align="right">
          <span className="font-medium text-red-600">-{formatCurrency(row.deductions)}</span>
        </TableCell>
        <TableCell align="right">
          <span className="font-semibold text-blue-600">{formatCurrency(row.netSalary)}</span>
        </TableCell>
        <TableCell align="left">
          <span className={`bd-badge ${statusClass}`}>
            {row.status}
          </span>
        </TableCell>
        <TableCell className="table__icon-box" align="left">
          <div className="flex items-center justify-start gap-[10px]">
            <button
              type="button"
              className="table__icon edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(row);
              }}
              title="Edit Payroll"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              type="button"
              className="table__icon download"
              onClick={(e) => {
                e.stopPropagation();
                // Handle payroll download
                console.log(`Downloading payroll for ${row.employeeName} - ${row.month}`);
              }}
              title="Download Payslip"
            >
              <i className="fa-solid fa-download"></i>
            </button>
            <button
              className="removeBtn table__icon delete"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteId(row.id);
                setModalDeleteOpen(true);
              }}
              title="Delete Payroll"
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

            {/* Payroll Summary */}
            {filteredRows.length > 0 && (
              <div className="card__wrapper mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Total Payrolls</div>
                      <div className="text-xl font-semibold">{filteredRows.length}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Total Net Salary</div>
                      <div className="text-xl font-semibold text-blue-600">
                        {formatCurrency(filteredRows.reduce((sum, row) => sum + row.netSalary, 0))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Paid</div>
                      <div className="text-xl font-semibold text-green-600">
                        {filteredRows.filter(row => row.status === 'Paid').length}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Pending</div>
                      <div className="text-xl font-semibold text-yellow-600">
                        {filteredRows.filter(row => row.status === 'Pending').length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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

      {/* Bulk Actions Bar */}
      {selected.length > 0 && (
        <div className="card__wrapper mb-4">
          <div className="p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-primary-700 font-medium">
                {selected.length} payroll(s) selected
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 flex items-center gap-1 text-sm"
                  onClick={() => {
                    const selectedPayrolls = data.filter((_, idx) => selected.includes(idx));
                    console.log('Bulk action on payrolls:', selectedPayrolls);
                  }}
                >
                  <i className="fa-solid fa-paper-plane mr-1"></i>
                  Process Selected
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-1 text-sm"
                  onClick={() => {
                    const selectedPayrolls = data.filter((_, idx) => selected.includes(idx));
                    console.log('Bulk download payrolls:', selectedPayrolls);
                  }}
                >
                  <i className="fa-solid fa-download mr-1"></i>
                  Download Payslips
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-1 text-sm"
                  onClick={() => {
                    if (window.confirm(`Delete ${selected.length} payroll(s)?`)) {
                      selected.forEach(idx => {
                        const row = filteredRows[idx];
                        if (row) onDelete?.(row.id);
                      });
                      // Clear selection after deletion
                      selected.forEach(idx => handleClick(idx));
                    }
                  }}
                >
                  <i className="fa-regular fa-trash mr-1"></i>
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        </div>
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

export default PayrollTable;