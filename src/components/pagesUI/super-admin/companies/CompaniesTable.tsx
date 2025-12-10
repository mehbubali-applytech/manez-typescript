"use client";
import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Pagination from "@mui/material/Pagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useRouter } from "next/navigation";

import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import TableControls from "@/components/elements/SharedInputs/TableControls";
import UpdateCompanyDetailsModal from "./UpdateCompanyDetailsModal";
import { ICompany } from "./CompaniesMainArea";

/* ✅ Table Headers */
const headCells = [
  { id: "companyName", label: "Company Name" },
  { id: "companyCode", label: "Company Code" },
];

interface Props {
  data: ICompany[];
}

const CompaniesTable: React.FC<Props> = ({ data }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<ICompany | null>(null);

  const router = useRouter();

  const companiesMemo = useMemo(() => data, [data]);

  const {
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
    searchQuery,
    paginatedRows,
    filteredRows,
    handleRequestSort,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSearchChange,
  } = useMaterialTableHook<ICompany>(companiesMemo, 10);

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

          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
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
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {paginatedRows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        hover
                        selected={selected.includes(index)}
                        onClick={() => handleClick(index)}
                      >
                        <TableCell>{row.companyName}</TableCell>
                        <TableCell>{row.companyCode}</TableCell>

                        <TableCell align="center">
                          <div className="flex justify-center gap-[10px]">
                            {/* Edit */}
                            <button
                              className="table__icon edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditData(row);
                                setEditModalOpen(true);
                              }}
                            >
                              <i className="fa-light fa-pen"></i>
                            </button>

                            {/* View */}
                            <button
                              className="table__icon edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(
                                  `/super-admin/companies/${row.companyCode}`
                                );
                              }}
                            >
                              <i className="fa-light fa-eye"></i>
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
              onChange={(_, value) => handleChangePage(value)}
            />
          </Box>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <UpdateCompanyDetailsModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          editData={editData}
        />
      )}
    </>
  );
};

export default CompaniesTable;
