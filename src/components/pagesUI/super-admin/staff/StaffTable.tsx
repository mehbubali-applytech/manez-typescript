"use client";
import React, { useState, useEffect } from "react";
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
import { Checkbox, Avatar, Rating, Typography, Chip } from "@mui/material";
import TableControls from "@/components/elements/SharedInputs/TableControls";
import DeleteModal from "@/components/common/DeleteModal";
import StaffDetailsModal from "./StaffDetailsModal";
import { getTableStatusClass } from "@/hooks/use-condition-class";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IStaff } from "./staff.interface";


// Mock data for all staff across companies
const allStaffData: IStaff[] = [
  {
    id: 1,
    employeeId: "EMP-001",
    firstName: "John",
    lastName: "Smith",
    fullName: "John Smith",
    email: "john.smith@technova.com",
    phone: "+1 (555) 123-4567",
    mobile: "+1 (555) 987-6543",
    position: "Senior Software Engineer",
    department: "Engineering",
    company: "TechNova Solutions",
    companyId: 1,
    location: "San Francisco, CA",
    joinDate: "2020-03-15",
    status: "Active",
    employmentType: "Full-time",
    salary: 125000,
    currency: "USD",
    supervisor: "Sarah Johnson",
    gender: "Male",
    dateOfBirth: "1990-05-20",
    address: "123 Tech Street, San Francisco, CA 94105",
    city: "San Francisco",
    country: "USA",
    zipCode: "94105",
    emergencyContact: "+1 (555) 111-2222",
    skills: ["JavaScript", "React", "Node.js", "AWS", "TypeScript"],
    education: "MS Computer Science, Stanford University",
    experience: 8,
    performanceRating: 4.8,
    attendanceRate: 97.5,
    projectsCompleted: 42,
    lastLogin: "2024-03-28 09:15:23",
    notes: "Top performer, leads the React team"
  }
];

// Table head cells
const staffHeadCells = [
  { id: "fullName", label: "Staff Name" },
  { id: "employeeId", label: "Employee ID" },
  { id: "company", label: "Company" },
  { id: "department", label: "Department" },
  { id: "position", label: "Position" },
  { id: "status", label: "Status" },
  { id: "employmentType", label: "Type" },
  { id: "joinDate", label: "Join Date" },
  { id: "performanceRating", label: "Rating" },
  { id: "salary", label: "Salary" },
];

interface AllStaffTableProps {
  status?: string;
  department?: string;
  company?: string;
  dateRange?: { start: string; end: string };
}

const StaffTable: React.FC<AllStaffTableProps> = ({ 
  status = "all",
  department = "all",
  company = "all",
  dateRange 
}) => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Debug logging
  useEffect(() => {
    console.log('AllStaffTable Props:', { status, department, company, dateRange });
    console.log('Total staff:', allStaffData.length);
  }, [status, department, company, dateRange]);

const filteredData = allStaffData.filter(staff => {
  if (status !== "all" && staff.status.toLowerCase() !== status.toLowerCase()) return false;
  if (department !== "all" && staff.department.toLowerCase() !== department.toLowerCase()) return false;
  if (company !== "all" && staff.company.toLowerCase() !== company.toLowerCase()) return false;

 if (
  dateRange &&
  dateRange.start &&
  dateRange.end &&
  !isNaN(new Date(dateRange.start).getTime()) &&
  !isNaN(new Date(dateRange.end).getTime())
) {
  const joinDate = new Date(staff.joinDate);
  const startDate = new Date(dateRange.start);
  const endDate = new Date(dateRange.end);

  if (joinDate < startDate || joinDate > endDate) return false;
}


  return true;
});


  // Update debug info
  useEffect(() => {
    setDebugInfo(`Showing ${filteredData.length} of ${allStaffData.length} staff. Filters: status=${status}, department=${department}, company=${company}`);
  }, [filteredData, status, department, company]);

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
  } = useMaterialTableHook<IStaff>(filteredData, 10);

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success";
      case "inactive":
        return "bg-danger";
      case "on leave":
        return "bg-warning";
      case "terminated":
        return "bg-error";
      default:
        return "default";
    }
  };

  const getEmploymentTypeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "primary";
      case "part-time":
        return "info";
      case "contract":
        return "warning";
      case "intern":
        return "secondary";
      default:
        return "default";
    }
  };

  const getDepartmentClass = (dept: string) => {
    switch (dept.toLowerCase()) {
      case "engineering":
        return "primary";
      case "sales":
        return "success";
      case "marketing":
        return "info";
      case "operations":
        return "warning";
      case "finance":
        return "error";
      case "human resources":
        return "secondary";
      case "it":
        return "info";
      case "customer support":
        return "success";
      case "research & development":
        return "primary";
      case "legal":
        return "default";
      case "medical":
        return "info";
      case "design":
        return "warning";
      case "logistics":
        return "success";
      default:
        return "default";
    }
  };

  const handleViewStaff = (staff: IStaff) => {
    setSelectedStaff(staff);
    setDetailsModalOpen(true);
  };

  const formatCurrency = (amount: number, currency: string) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return `$${amount.toLocaleString()}`;
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
                  <Table aria-labelledby="tableTitle" className="whitespace-nowrap" key={allStaffData.length}>
                    <TableHead>
                      <TableRow className="table__title bg-gray-50">
                        <TableCell padding="checkbox" className="!font-semibold">
                          <Checkbox
                            className="custom-checkbox checkbox-small"
                            color="primary"
                            indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                            checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                            onChange={(e) => handleSelectAllClick(e.target.checked, filteredRows)}
                            size="small"
                          />
                        </TableCell>
                        {staffHeadCells.map((headCell) => (
                          <TableCell
                            className="table__title !font-semibold"
                            key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}
                          >
                            <TableSortLabel
                              active={orderBy === headCell.id}
                              direction={orderBy === headCell.id ? order : "asc"}
                              onClick={() => handleRequestSort(headCell.id)}
                            >
                              {headCell.label}
                              {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                              ) : null}
                            </TableSortLabel>
                          </TableCell>
                        ))}
                        <TableCell className="!font-semibold">Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody className="table__body">
                      {paginatedRows.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={staffHeadCells.length + 2} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center">
                              <PersonIcon className="text-gray-400 mb-2" fontSize="large" />
                              <Typography variant="body1" className="text-gray-600">
                                No staff found
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {filteredData.length === 0
                                  ? "Try adjusting your filters to see more results"
                                  : "Check your search query or try different keywords"}
                              </Typography>
                              {(status !== "all" || department !== "all" || company !== "all") && (
                                <div className="mt-2">
                                  <button
                                    onClick={() => window.location.reload()}
                                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                                  >
                                    Clear All Filters
                                  </button>
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedRows.map((row, index) => {
                          const statusClass = getTableStatusClass(row.status);
                          const typeClass = getEmploymentTypeClass(row.employmentType);
                          const deptClass = getDepartmentClass(row.department);
                          const isRowSelected = selected.includes(index);


                          return (
                            <TableRow
                              key={row.id}
                              selected={isRowSelected}
                              onClick={() =>  handleClick(row.id)}
                              className={`hover:bg-blue-50 ${isRowSelected ? 'bg-blue-50' : ''}`}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  className="custom-checkbox checkbox-small"
                                  checked={isRowSelected}
                                  size="small"
                                  onChange={() => handleClick(row.id)}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="mr-3 bg-primary">
                                    {row.firstName?.charAt(0)}{row.lastName?.charAt(0)}
                                  </Avatar>
                                  <div>
                                    <Typography variant="body2" className="font-medium">
                                      {row.fullName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {row.email}
                                    </Typography>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                  {row.employeeId}
                                </code>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <BusinessIcon className="mr-1 text-gray-500" fontSize="small" />
                                  <div>
                                    <Typography variant="body2">
                                      {row.company}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {row.location}
                                    </Typography>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={row.department}
                                  size="small"
                                  color={deptClass as any}
                                  variant="filled"
                                  className="font-medium"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <WorkIcon className="mr-1 text-gray-500" fontSize="small" />
                                  <Typography variant="body2">
                                    {row.position}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={row.status}
                                  size="small"
                                  color={getStatusClass(row.status) as any}
                                  variant="filled"
                                  className="font-medium"
                                />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={row.employmentType}
                                  size="small"
                                  color={typeClass as any}
                                  variant="filled"
                                  className="font-medium"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <CalendarTodayIcon className="mr-1 text-gray-500" fontSize="small" />
                                  <Typography variant="body2">
                                    {row.joinDate}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Rating
                                    value={row.performanceRating || 0}
                                    readOnly
                                    size="small"
                                    precision={0.1}
                                  />
                                  <Typography variant="body2" className="ml-2 font-semibold">
                                    {(row.performanceRating || 0).toFixed(1)}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" className="font-semibold text-green-600">
                                  {formatCurrency(row.salary, row.currency)}
                                </Typography>
                              </TableCell>
                              <TableCell className="table__icon-box">
                                <div className="flex items-center justify-start gap-2">
                                  <button
                                    type="button"
                                    className="table__icon view p-1.5 hover:bg-blue-100 rounded"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewStaff(row);
                                    }}
                                    title="View Staff Details"
                                  >
                                    <VisibilityIcon fontSize="small" className="text-blue-600" />
                                  </button>
                                  <button
                                    type="button"
                                    className="table__icon edit p-1.5 hover:bg-green-100 rounded"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      alert(`Editing ${row.fullName}...`);
                                    }}
                                    title="Edit Staff"
                                  >
                                    <EditIcon fontSize="small" className="text-green-600" />
                                  </button>
                                  <button
                                    type="button"
                                    className="table__icon delete p-1.5 hover:bg-red-100 rounded"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setDeleteId(row.id);
                                      setModalDeleteOpen(true);
                                    }}
                                    title="Delete Staff"
                                  >
                                    <i className="fa-regular fa-trash text-red-600"></i>
                                  </button>
                                </div>
                              </TableCell>
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
                <Typography variant="body2">
                  {`Showing ${(page - 1) * rowsPerPage + 1} to ${Math.min(
                    page * rowsPerPage,
                    filteredRows.length
                  )} of ${filteredRows.length} entries`}
                </Typography>
                {(status !== "all" || department !== "all" || company !== "all") && (
                  <Typography variant="caption" className="ml-2 text-gray-600">
                    (Filtered: {status !== "all" ? `Status: ${status}` : ""}
                    {department !== "all" ? ` • Department: ${department}` : ""}
                    {company !== "all" ? ` • Company: ${company}` : ""})
                  </Typography>
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

            {/* Bulk Actions Bar */}
            {selected.length > 0 && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-4 z-50">
                <Typography variant="body2">
                  {selected.length} staff member{selected.length > 1 ? 's' : ''} selected
                </Typography>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-white text-blue-600 rounded text-sm font-medium hover:bg-blue-50"
                    onClick={() => {
                      const selectedStaff = selected.map(i => filteredRows[i]);

                      alert(`Exporting ${selected.length} staff members...`);
                      console.log('Selected staff:', selectedStaff);
                    }}
                  >
                    <i className="fa-regular fa-download mr-1"></i>
                    Export Selected
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${selected.length} staff member${selected.length > 1 ? 's' : ''}?`)) {
                        selected.forEach(index => {
                          const staff = filteredRows[index];
                          if (staff) handleDelete(staff.id);
                        });
                      }
                    }}
                  >
                    <i className="fa-regular fa-trash mr-1"></i>
                    Delete Selected
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300"
                    onClick={() => handleSelectAllClick(false, [])}
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {detailsModalOpen && selectedStaff && (
        <StaffDetailsModal
          open={detailsModalOpen}
          setOpen={setDetailsModalOpen}
          staffData={selectedStaff}
        />
      )}

      {modalDeleteOpen && (
        <DeleteModal
          open={modalDeleteOpen}
          setOpen={setModalDeleteOpen}
          handleDeleteFunc={() => handleDelete(deleteId)}
          deleteId={deleteId}
        />
      )}
    </>
  );
};

export default StaffTable;