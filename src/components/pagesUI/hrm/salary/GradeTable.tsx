"use client";
import React, { useEffect, useState } from "react";
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
import useMaterialTableHook from "@/hooks/useMaterialTableHook";
import Link from "next/link";
import Image from "next/image";
import { biomattricAttendanceData } from "@/data/hrm/biomattric-attendance-data";
import { IBiomattricsAttendance } from "@/interface/table.interface";
import TableControls from "@/components/elements/SharedInputs/TableControls";
import DeleteModal from "@/components/common/DeleteModal";
import axios from "axios";


interface GradeData {
    id: string;
    grade_name: string;
    ctc_range_min: string;
    ctc_range_max: string;
}
const headCells = [
    {
        id: "id",
        numeric: true,
        disablePadding: false,
        label: "ID",
    },
    {
        id: "grade_name",
        numeric: false,
        disablePadding: false,
        label: "Grade Name",
    },
    {
        id: "ctc_range_min",
        numeric: false,
        disablePadding: false,
        label: "CTC Range Min",
    },
    {
        id: "ctc_range_max",
        numeric: false,
        disablePadding: false,
        label: "CTC Range Max",
    },
    {
        id: "options",
        numeric: false,
        disablePadding: false,
        label: "Options",
    }
];

const GradeTable = () => {
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [gradeData, setGradeData] = useState<GradeData[]>([]);
const [loading, setLoading] = useState(true);

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
        handleRequestSort,
        handleClick,
        handleChangePage,
        handleDelete,
        handleChangeRowsPerPage,
        handleSearchChange,
    } = useMaterialTableHook<GradeData | any>(
        gradeData,
        15
    );

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("https://payroll-baas.onrender.com/api/grades");

            console.log("API RESULT:", response.data.data);

            const transformed = (response.data?.data || []).map((item:any) => ({
                id: Number(item.id),
                grade_name: item.grade_name || "",
                ctc_range_min: String(item.ctc_range_min || ""),
                ctc_range_max: String(item.ctc_range_max || "")
            }));

            setGradeData(transformed);
            console.log("Transformed RESULT:",transformed);
        } catch (e) {
            console.error("Failed loading grade data:", e);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);

    return (
        <>
            <div className="col-span-12">
                <div className="card__wrapper">
                    <div className="manaz-common-mat-list w-full table__wrapper table-responsive mat-list-without-checkbox">
                        <TableControls
                            rowsPerPage={rowsPerPage}
                            searchQuery={searchQuery}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            handleSearchChange={handleSearchChange}
                        />

                        <Box sx={{ width: "100%" }} className="table-responsive">
                            <Paper sx={{ width: "100%", mb: 2 }}>
                                <TableContainer className="table mb-[20px] hover multiple_tables w-full">
                                    <Table
                                        aria-labelledby="tableTitle"
                                        className="whitespace-nowrap"
                                    >
                                        <TableHead>
                                            <TableRow className="table__title">
                                                {headCells.map((headCell) => (
                                                    <TableCell
                                                        className="table__title"
                                                        key={headCell.id}
                                                        sortDirection={
                                                            orderBy === headCell.id ? order : false
                                                        }
                                                    >
                                                        <TableSortLabel
                                                            active={orderBy === headCell.id}
                                                            direction={
                                                                orderBy === headCell.id ? order : "asc"
                                                            }
                                                            onClick={() => handleRequestSort(headCell.id)}
                                                        >
                                                            {headCell.label}
                                                            {orderBy === headCell.id ? (
                                                                <Box component="span" sx={visuallyHidden}>
                                                                    {order === "desc"
                                                                        ? "sorted descending"
                                                                        : "sorted ascending"}
                                                                </Box>
                                                            ) : null}
                                                        </TableSortLabel>
                                                    </TableCell>
                                                ))}
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="table__body">
                                            {paginatedRows.map((row, index) => (
                                                <TableRow
                                                    key={row.id}
                                                    selected={selected.includes(index)}
                                                    onClick={() => handleClick(index)}
                                                >
                                                    <TableCell>{row.id}</TableCell>

                                                    <TableCell>{row.grade_name}</TableCell>

                                                    <TableCell>{row.ctc_range_min}</TableCell>

                                                    <TableCell>{row.ctc_range_max}</TableCell>

                                                    <TableCell className="table__icon-box">
                                                        <div className="flex items-center justify-start gap-[10px]">
                                                            <button
                                                                type="button"
                                                                className="table__icon edit"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                }}
                                                            >
                                                                <i className="fa-sharp fa-light fa-pen"></i>
                                                            </button>

                                                            <button
                                                                className="removeBtn table__icon delete"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setDeleteId(row.id);
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
                        <Box className="table-search-box mt-[30px]" sx={{ p: 2 }}>
                            <Box>
                                {`Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
                                    page * rowsPerPage,
                                    filteredRows.length
                                )} of ${filteredRows.length} entries`}
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
                    handleDeleteFunc={handleDelete}
                    deleteId={deleteId}
                />
            )}
        </>
    );
};

export default GradeTable;
