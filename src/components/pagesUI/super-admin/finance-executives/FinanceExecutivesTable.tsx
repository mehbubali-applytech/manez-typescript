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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useRouter } from "next/navigation";

import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import TableControls from "@/components/elements/SharedInputs/TableControls";
import DeleteModal from "@/components/common/DeleteModal";
import { IFinanceExecutive } from "./FinanceExecutivesMainArea";
import UpdateFinanceExecutiveModal from "./UpdateFinanceExecutiveModal";

const headCells = [
  { id: "finName", label: "Finance Executive Name" },
  { id: "finCode", label: "Finance Code" },
  { id: "company", label: "Company" },
  { id: "department", label: "Department" },
];

interface Props {
  data: IFinanceExecutive[];
}

const FinanceExecutivesTable: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [editData, setEditData] = useState<IFinanceExecutive | null>(null);

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
  } = useMaterialTableHook<IFinanceExecutive>(memoData, 10);

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
                        <TableCell>{row.finName}</TableCell>
                        <TableCell>{row.finCode}</TableCell>
                        <TableCell>{row.company}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>
                          <div className="flex gap-[10px]">
                            <button className="table__icon edit"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setEditData(row);
                                    setModalEditOpen(true);
                                }}
                            >


                              <i className="fa-light fa-pen"></i>
                            </button>

                            <button
                              className="table__icon delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/super-admin/finance-executives/${row.finCode}`);
                              }}
                            >
                              <i className="fa-light fa-eye"></i>
                            </button>

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
        {modalEditOpen && (
        <UpdateFinanceExecutiveModal
            open={modalEditOpen}
            setOpen={setModalEditOpen}
            editData={editData}
        />
      )}
      
    </>
  );
};

export default FinanceExecutivesTable;
