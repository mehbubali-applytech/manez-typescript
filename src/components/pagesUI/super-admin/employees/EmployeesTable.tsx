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
  Chip,
  Avatar,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useRouter } from "next/navigation";

import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import TableControls from "@/components/elements/SharedInputs/TableControls";
import DeleteModal from "@/components/common/DeleteModal";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import { IEmployee } from "../../owner/employees/EmployeeTypes";

const headCells = [
  { id: "employeeCode", label: "Employee ID" },
  { id: "firstName", label: "Name" },
  { id: "email", label: "Email" },
  { id: "departmentName", label: "Department" },
  { id: "roleName", label: "Role" },
  { id: "workType", label: "Work Type" },
  { id: "employmentStatus", label: "Status" },
];

interface Props {
  data: IEmployee[];
  onUpdateEmployee: (employee: IEmployee) => void;
  onDeleteEmployee: (employeeId: string) => void;
}

const EmployeesTable: React.FC<Props> = ({ data, onUpdateEmployee, onDeleteEmployee }) => {
  const router = useRouter();

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [editData, setEditData] = useState<IEmployee | null>(null);

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
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
  } = useMaterialTableHook<IEmployee>(memoData, 10);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Probation': return 'warning';
      case 'Resigned': return 'info';
      case 'Terminated': return 'error';
      default: return 'default';
    }
  };

  const getWorkTypeColor = (workType: string) => {
    switch (workType) {
      case 'Full-time': return 'primary';
      case 'Part-time': return 'secondary';
      case 'Contract': return 'info';
      case 'Intern': return 'warning';
      default: return 'default';
    }
  };


  return (
    <>
      <div className="card__wrapper">
        <div className="manaz-common-mat-list w-full table__wrapper">
          <TableControls
            rowsPerPage={rowsPerPage}
            searchQuery={searchQuery}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleSearchChange={handleSearchChange}
          />

          <Box>
            <Paper sx={{ mb: 2 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {headCells.map((headCell) => (
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
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedRows.map((row, index) => (
                      <TableRow
                        key={row.employeeId}
                        selected={selected.includes(index)}
                        hover
                        onClick={() => handleClick(index)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <span className="font-mono font-semibold">
                            {row.employeeCode}
                          </span>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar
                              sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                              src={row.profilePhoto}
                            >
                              {row.firstName[0]}{row.lastName[0]}
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {row.firstName} {row.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {row.preferredName || row.firstName}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>{row.email}</TableCell>

                        <TableCell>
                          <Chip
                            label={row.departmentName}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell>{row.roleName}</TableCell>

                        <TableCell>
                          <Chip
                            label={row.workType}
                            size="small"
                            color={getWorkTypeColor(row.workType) as any}
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={row.employmentStatus}
                            size="small"
                            color={getStatusColor(row.employmentStatus) as any}
                          />
                        </TableCell>

                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <button
                              className="table__icon edit p-2 hover:bg-blue-50 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditData(row);
                                setUpdateModalOpen(true);
                              }}
                              title="Edit"
                            >
                              <i className="fa-light fa-pen text-blue-600"></i>
                            </button>

                            <button
                              className="table__icon view p-2 hover:bg-green-50 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/super-admin/employees/${row.employeeId}`
                                );
                              }}
                              title="View Details"
                            >
                              <i className="fa-light fa-eye text-green-600"></i>
                            </button>

                            <button
                              className="table__icon delete p-2 hover:bg-red-50 rounded"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteId(row.employeeId);
                                setModalDeleteOpen(true);
                              }}
                              title="Delete"
                            >
                              <i className="fa-regular fa-trash text-red-600"></i>
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>

          <Box className="mt-[30px] flex justify-between items-center">
            <span className="text-gray-600">
              Showing {(page - 1) * rowsPerPage + 1} to{" "}
              {Math.min(page * rowsPerPage, filteredRows.length)} of{" "}
              {filteredRows.length} employees
            </span>
            <Pagination
              count={Math.ceil(filteredRows.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => handleChangePage(value)}
              color="primary"
            />
          </Box>
        </div>
      </div>

      {updateModalOpen && editData && (
        <UpdateEmployeeModal
          open={updateModalOpen}
          setOpen={setUpdateModalOpen}
          editData={editData}
          onUpdateEmployee={onUpdateEmployee}
        />
      )}

  {modalDeleteOpen && (
  <DeleteModal
    open={modalDeleteOpen}
    setOpen={setModalDeleteOpen}
    onConfirm={() => onDeleteEmployee(deleteId)}
  />
)}

    </>
  );
};

export default EmployeesTable;