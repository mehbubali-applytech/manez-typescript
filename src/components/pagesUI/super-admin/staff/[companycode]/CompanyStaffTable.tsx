"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Pagination,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useRouter } from "next/navigation";

import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import TableControls from "@/components/elements/SharedInputs/TableControls";
import DeleteModal from "@/components/common/DeleteModal";
import { IStaff } from "../StaffMainArea";

const headCells = [
  { id: "staffName", label: "Staff Name" },
  { id: "staffCode", label: "Staff Code" },
  { id: "companyName", label: "Company" },
  { id: "department", label: "Department" },
];

interface Props {
  data: IStaff[];
}

const CompanyStaffTable: React.FC<Props> = ({ data }) => {
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const router = useRouter();

  const staffMemo = useMemo(() => data, [data]);

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
  } = useMaterialTableHook<IStaff>(staffMemo, 10);

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
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedRows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        selected={selected.includes(index)}
                        onClick={() => handleClick(index)}
                      >
                        <TableCell>{row.staffName}</TableCell>
                        <TableCell>{row.staffCode}</TableCell>
                        <TableCell>{row.companyName ?? "-"}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>
                          <div className="flex gap-[10px]">
                            {/* Edit */}
                            <button className="table__icon edit">
                              <i className="fa-light fa-pen"></i>
                            </button>

                            {/* View */}
                            <button
                              className="table__icon delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/super-admin/staff/${row.staffCode}`);
                              }}
                            >
                              <i className="fa-light fa-eye"></i>
                            </button>

                            {/* Delete */}
                            <button
                              className="table__icon delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteId(index);
                                setModalDeleteOpen(true);
                              }}
                            >
                              <i className="fa-regular fa-trash"></i>
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

      {modalDeleteOpen && (
        <DeleteModal
          open={modalDeleteOpen}
          setOpen={setModalDeleteOpen}
          deleteId={deleteId}
          handleDeleteFunc={handleDelete}
        />
      )}
    </>
  );
};

export default CompanyStaffTable;
