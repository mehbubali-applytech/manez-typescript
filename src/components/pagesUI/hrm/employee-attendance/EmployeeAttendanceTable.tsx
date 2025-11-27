/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
import Image from "next/image";
import Link from "next/link";
import { IAdminAttendance } from "@/interface/table.interface";
import { useAttendanceHook } from "@/hooks/use-condition-class";
import AttendanceTypeIcons from "../attendance/AttendanceTypeIcons";
import { adminAttendanceHeadCells } from "@/data/table-head-cell/table-head";
import TableControls from "@/components/elements/SharedInputs/TableControls";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EmployeeAttendanceTable = () => {
  const [attendanceData, setAttendanceData] = useState<IAdminAttendance[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [loading, setLoading] = useState(false);
  const transformAttendanceData = (rawData: any[]) => {
    console.log("Raw API data:", rawData);
    
    if (!rawData || !Array.isArray(rawData)) {
      console.log("No raw data or not an array");
      return [];
    }

    const transformed = rawData.map((employee, index) => {
      console.log(`Processing employee ${index}:`, employee);

      const employeeInfo = employee.info || employee;
      
      const transformedEmployee: any = {
        employeeImg: "/default-avatar.jpg", 
        name: `${employeeInfo.first_name || ''} ${employeeInfo.last_name || ''}`.trim() || `Employee ${index + 1}`,
      };

      for (let i = 1; i <= 31; i++) {
        transformedEmployee[`date${i}`] = "Absent"; 
      }


      const attendanceArray = employeeInfo.attendance || employeeInfo.attendances || [];
      console.log(`Attendance data for ${transformedEmployee.name}:`, attendanceArray);
      
      if (Array.isArray(attendanceArray)) {
        attendanceArray.forEach((att: any) => {
          try {
            if (att && att.attendance_date && att.status) {
              const attendanceDate = new Date(att.attendance_date);
              if (!isNaN(attendanceDate.getTime())) {
                const day = attendanceDate.getDate();
                const dateKey = `date${day}`;
                
                console.log(`Setting ${dateKey} to ${att.status} for ${transformedEmployee.name}`);
                
                if (transformedEmployee.hasOwnProperty(dateKey)) {
                  transformedEmployee[dateKey] = att.status;
                }
              }
            }
          } catch (error) {
            console.error('Error processing attendance date:', error);
          }
        });
      }

      console.log("Final transformed employee:", transformedEmployee);
      return transformedEmployee;
    });

    console.log("Final transformed data:", transformed);
    return transformed;
  };


  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        console.log(`Fetching data for month: ${selectedMonth}, year: ${selectedYear}`);
        const response = await axios.get(
          `https://payroll-baas.onrender.com/api/employee/attendance?month=${selectedMonth}&year=${selectedYear}`
        );
        console.log("API Response:", response.data);
        
        const apiData = response.data.data || response.data || [];
        const transformedData = transformAttendanceData(apiData);
        setAttendanceData(transformedData);
        
        console.log("Transformed data length:", transformedData.length);
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
        setAttendanceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedMonth, selectedYear]);

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
  } = useMaterialTableHook<IAdminAttendance | any>(attendanceData, 15);

  const dateKeys = Array.from({ length: 31 }, (_, i) => `date${i + 1}`);

  console.log("Current state:", {
    loading,
    attendanceDataLength: attendanceData.length,
    paginatedRowsLength: paginatedRows?.length,
    filteredRowsLength: filteredRows?.length
  });

  return (
    <>
      <div className="col-span-12">
        <div className="card__wrapper">
          <AttendanceTypeIcons />
          
          {/* Month Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select Month:</h3>
            <Box className="flex gap-2 flex-wrap">
              {months.map((monthName, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMonth(index + 1)}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    selectedMonth === index + 1 ? "bg-blue-600" : "bg-blue-400"
                  } hover:bg-blue-700 transition`}
                >
                  {monthName}
                </button>
              ))}
            </Box>
          </div>

          {/* Year Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select Year:</h3>
            <Box className="flex gap-2 items-center">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[2023, 2024, 2025, 2026].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <span className="text-gray-600">
                Showing data for {months[selectedMonth - 1]} {selectedYear}
              </span>
            </Box>
          </div>



          <div className="manaz-common-mat-list mat-list-without-checkbox w-full table__wrapper">
            <TableControls
              rowsPerPage={rowsPerPage}
              searchQuery={searchQuery}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleSearchChange={handleSearchChange}
            />

            <Box
              className="table-search-box mb-[20px] multiple_tables dataTable no-footer table-responsive"
              sx={{ width: "100%" }}
            >
              <Paper sx={{ width: "100%", mb: 2 }}>
                <TableContainer className="table mb-[20px] hover multiple_tables w-full">
                  <Table
                    aria-labelledby="tableTitle"
                    className="whitespace-nowrap"
                  >
                    <TableHead>
                      <TableRow className="table__title">
                        {adminAttendanceHeadCells.map((headCell) => (
                          <TableCell
                            className="table__title table_head_custom"
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
                      </TableRow>
                    </TableHead>
                    <TableBody className="table__body">
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={adminAttendanceHeadCells.length} className="text-center py-8">
                            <div className="flex justify-center items-center py-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                              <span className="ml-2">Loading attendance data...</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : attendanceData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={adminAttendanceHeadCells.length} className="text-center py-8">
                            <div className="text-gray-500">
                              <i className="fas fa-inbox text-4xl mb-2"></i>
                              <p>No attendance data available</p>
                              <p className="text-sm">Try selecting a different month or year</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : paginatedRows.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={adminAttendanceHeadCells.length} className="text-center py-8">
                            <div className="text-gray-500">
                              <i className="fas fa-search text-4xl mb-2"></i>
                              <p>No matching records found</p>
                              <p className="text-sm">Try adjusting your search criteria</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedRows.map((row, index) => {
                          console.log(`Rendering row ${index}:`, row);
                          return (
                            <TableRow
                              key={index}
                              selected={selected.includes(index)}
                              onClick={() => handleClick(index)}
                            >
                              <TableCell className="sorting_1">
                                <span className="table-avatar flex justify-start items-center">
                                  <Link
                                    className="me-2.5 avatar-img"
                                    href={`/hrm/employee-profile/${index + 1}`}
                                  >
                                    <Image
                                      className=" border-circle"
                                      src={row?.employeeImg || "/default-avatar.jpg"}
                                      alt="User Image"
                                      width={40}
                                      height={40}
                                    />
                                  </Link>
                                  <Link
                                    href={`/hrm/employee-profile/${index + 1}`}
                                    className="avatar-name"
                                  >
                                    {row?.name}
                                  </Link>
                                </span>
                              </TableCell>
                              {dateKeys.map((dateKey) => {
                                const attendanceStatus = useAttendanceHook(
                                  row?.[dateKey] || "Absent" 
                                );

                                return (
                                  <TableCell key={dateKey}>
                                    <button title={row?.[dateKey] || "Absent"}>
                                      <i className={attendanceStatus}></i>
                                    </button>
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })
                      )}
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
    </>
  );
};

export default EmployeeAttendanceTable;