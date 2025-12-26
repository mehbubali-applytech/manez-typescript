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
import HrManagerDetailsModal from "./HrManagerDetailsModal";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IHrManager } from "./hr-managers.interface";
import { useRouter } from "next/navigation";

const hrManagersData: IHrManager[] = [
  {
    id: 1,
    hrName: "John Smith",
    hrCode: "HR-001",
    department: "Human Resources",
    company: "TechNova Solutions",
    email: "john.smith@technova.com",
    phone: "+1 (555) 123-4567",
    mobile: "+1 (555) 987-6543",
    extension: "123",
    jobTitle: "HR Director",
    location: "San Francisco, CA",
    status: "Active",
    hireDate: "2020-03-15",
    yearsOfExperience: 12,
    qualifications: ["MBA", "PHR Certification", "MS in HR"],
    certifications: ["SHRM-CP", "PHR"],
    specializations: ["Talent Acquisition", "Employee Relations", "Compensation"],
    managedEmployees: 1250,
    reportingTo: "CEO",
    address: "123 Tech Street, San Francisco, CA 94105",
    city: "San Francisco",
    state: "California",
    country: "USA",
    zipCode: "94105",
    dateOfBirth: "1985-05-20",
    gender: "Male",
    maritalStatus: "Married",
    emergencyContact: "Jane Smith",
    emergencyPhone: "+1 (555) 555-1212",
    profileImage: "",
    rating: 4.8,
    tag: "Senior HR",
    notes: "Excellent leadership skills"
  },
  {
    id: 2,
    hrName: "Sarah Johnson",
    hrCode: "HR-002",
    department: "HR Operations",
    company: "Global Finance Group",
    email: "sarah.j@globalfinance.com",
    phone: "+1 (555) 234-5678",
    jobTitle: "HR Manager",
    location: "New York, NY",
    status: "Active",
    hireDate: "2021-06-10",
    yearsOfExperience: 8,
    qualifications: ["MS in HRM", "BBA"],
    certifications: ["SPHR"],
    specializations: ["HR Analytics", "Performance Management"],
    managedEmployees: 850,
    reportingTo: "HR Director",
    rating: 4.5,
    tag: "Operations"
  },
  {
    id: 3,
    hrName: "Michael Chen",
    hrCode: "HR-003",
    department: "Talent Acquisition",
    company: "MediCare Innovations",
    email: "michael.chen@medicareinnovations.com",
    phone: "+1 (555) 345-6789",
    jobTitle: "Recruitment Manager",
    location: "Boston, MA",
    status: "Active",
    hireDate: "2019-11-22",
    yearsOfExperience: 10,
    qualifications: ["MBA", "BS in Psychology"],
    specializations: ["Executive Search", "Campus Recruitment"],
    managedEmployees: 620,
    reportingTo: "HR Director",
    rating: 4.7,
    tag: "Recruitment"
  },
  {
    id: 4,
    hrName: "Emma Wilson",
    hrCode: "HR-004",
    department: "Employee Relations",
    company: "RetailMax Corporation",
    email: "emma.w@retailmax.co.uk",
    phone: "+44 20 7123 4567",
    jobTitle: "Employee Relations Specialist",
    location: "London, UK",
    status: "Active",
    hireDate: "2022-01-15",
    yearsOfExperience: 6,
    qualifications: ["LLB", "MA in Industrial Relations"],
    specializations: ["Conflict Resolution", "Labor Laws"],
    managedEmployees: 750,
    reportingTo: "HR Manager",
    rating: 4.6,
    tag: "Relations"
  },
  {
    id: 5,
    hrName: "David Brown",
    hrCode: "HR-005",
    department: "Learning & Development",
    company: "EduTech Solutions",
    email: "david.b@edutechsolutions.au",
    phone: "+61 2 8765 4321",
    jobTitle: "L&D Manager",
    location: "Sydney, NSW",
    status: "Pending",
    hireDate: "2023-03-01",
    yearsOfExperience: 7,
    qualifications: ["M.Ed", "Certified Trainer"],
    certifications: ["CPLP", "ATD Master Trainer"],
    specializations: ["Leadership Development", "e-Learning"],
    managedEmployees: 180,
    reportingTo: "HR Director",
    rating: 4.4,
    tag: "Training"
  },
  {
    id: 6,
    hrName: "Robert Williams",
    hrCode: "HR-006",
    department: "Compensation & Benefits",
    company: "EcoManufacture Inc",
    email: "robert.w@ecomanufacture.ca",
    phone: "+1 (416) 555-7890",
    jobTitle: "Compensation Analyst",
    location: "Toronto, ON",
    status: "Active",
    hireDate: "2018-09-12",
    yearsOfExperience: 9,
    qualifications: ["MBA Finance", "CPA"],
    specializations: ["Salary Benchmarking", "Benefits Design"],
    managedEmployees: 420,
    reportingTo: "HR Manager",
    rating: 4.3,
    tag: "Compensation"
  },
  {
    id: 7,
    hrName: "Ahmed Al-Mansoori",
    hrCode: "HR-007",
    department: "HR Compliance",
    company: "RealEstate Pro",
    email: "ahmed@realestatepro.ae",
    phone: "+971 4 123 4567",
    jobTitle: "Compliance Officer",
    location: "Dubai, UAE",
    status: "Active",
    hireDate: "2020-08-05",
    yearsOfExperience: 11,
    qualifications: ["LLM", "Certified Compliance Professional"],
    specializations: ["Legal Compliance", "Audit"],
    managedEmployees: 320,
    reportingTo: "HR Director",
    rating: 4.2,
    tag: "Compliance"
  },
  {
    id: 8,
    hrName: "Klaus Schmidt",
    hrCode: "HR-008",
    department: "HR Information Systems",
    company: "LogiTrans Global",
    email: "klaus.s@logitrans.de",
    phone: "+49 69 12345678",
    jobTitle: "HRIS Manager",
    location: "Frankfurt, DE",
    status: "Inactive",
    hireDate: "2017-05-20",
    yearsOfExperience: 13,
    qualifications: ["MS IT", "MBA"],
    certifications: ["HRIP", "PMP"],
    specializations: ["HR Software", "Data Analytics"],
    managedEmployees: 280,
    reportingTo: "CIO",
    rating: 4.1,
    tag: "HRIS"
  },
  {
    id: 9,
    hrName: "Mark Thompson",
    hrCode: "HR-009",
    department: "Wellness & Engagement",
    company: "EnergyPlus Corp",
    email: "mark.t@energyplus.com",
    phone: "+1 (713) 555-9012",
    jobTitle: "Wellness Coordinator",
    location: "Houston, TX",
    status: "Active",
    hireDate: "2021-02-14",
    yearsOfExperience: 5,
    qualifications: ["MS Psychology", "Wellness Coach"],
    specializations: ["Employee Wellness", "Engagement Surveys"],
    managedEmployees: 190,
    reportingTo: "HR Manager",
    rating: 4.0,
    tag: "Wellness"
  },
  {
    id: 10,
    hrName: "Yuki Tanaka",
    hrCode: "HR-010",
    department: "International HR",
    company: "TeleConnect Ltd",
    email: "yuki.t@teleconnect.co.jp",
    phone: "+81 3 1234 5678",
    jobTitle: "International HR Manager",
    location: "Tokyo, Japan",
    status: "On Leave",
    hireDate: "2019-07-30",
    yearsOfExperience: 14,
    qualifications: ["MBA International Business", "BA Languages"],
    specializations: ["Expat Management", "Cross-cultural Training"],
    managedEmployees: 150,
    reportingTo: "Global HR Director",
    rating: 4.3,
    tag: "International"
  }
];

const hrManagerHeadCells = [
  { id: "hrName", label: "HR Manager" },
  { id: "hrCode", label: "HR Code" },
  { id: "department", label: "Department" },
  { id: "company", label: "Company" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "jobTitle", label: "Job Title" },
  { id: "status", label: "Status" },
  { id: "managedEmployees", label: "Managed Employees" },
  { id: "yearsOfExperience", label: "Experience (Years)" },
  { id: "hireDate", label: "Hire Date" },
  { id: "rating", label: "Rating" },
];

interface HrManagersTableProps {
  status?: string;
  department?: string;
  company?: string;
  dateRange?: { start: string; end: string };
}

const HrManagersTable: React.FC<HrManagersTableProps> = ({
  status = "all",
  department = "all",
  company = "all",
  dateRange
}) => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedHrManager, setSelectedHrManager] = useState<IHrManager | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const router = useRouter();

  const filteredData = hrManagersData.filter(manager => {
    if (status !== "all" && manager.status !== status) return false;
    if (department !== "all" && manager.department !== department) return false;
    if (company !== "all" && manager.company !== company) return false;
    
    if (dateRange) {
      const hireDate = new Date(manager.hireDate);
      const start = new Date(dateRange.start);
      const end = new Date(dateRange.end);
      if (hireDate < start || hireDate > end) return false;
    }
    
    return true;
  });

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
  } = useMaterialTableHook<IHrManager>(filteredData, 10);

  const getStatusClass = (status?: string) => {
    if (!status) return "default";
    switch (status.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "on leave":
        return "warning";
      case "pending":
        return "info";
      default:
        return "default";
    }
  };

  const getDepartmentClass = (department?: string) => {
    if (!department) return "default";
    const deptLower = department.toLowerCase();
    if (deptLower.includes("human resources") || deptLower.includes("hr")) return "primary";
    if (deptLower.includes("talent")) return "info";
    if (deptLower.includes("recruitment")) return "secondary";
    if (deptLower.includes("employee")) return "success";
    if (deptLower.includes("compensation")) return "warning";
    if (deptLower.includes("compliance")) return "error";
    if (deptLower.includes("learning") || deptLower.includes("training")) return "info";
    if (deptLower.includes("wellness")) return "success";
    if (deptLower.includes("international")) return "primary";
    return "default";
  };

  const handleViewHrManager = (manager: IHrManager) => {
    router.push(`/super-admin/hr-managers/${manager.id}`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
                        {hrManagerHeadCells.map((headCell) => (
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
                          <TableCell colSpan={hrManagerHeadCells.length + 2} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center">
                              <PersonIcon className="text-gray-400 mb-2" fontSize="large" />
                              <Typography variant="body1" className="text-gray-600">
                                No HR managers found
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {filteredData.length === 0
                                  ? "Try adjusting your filters to see more results"
                                  : "Check your search query or try different keywords"}
                              </Typography>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedRows.map((row, index) => {
                          const statusClass = getStatusClass(row.status);
                          const departmentClass = getDepartmentClass(row.department);
                          const isRowSelected = selected.includes(index);
                          const initials = getInitials(row.hrName);

                          return (
                            <TableRow
                              key={row.id}
                              selected={isRowSelected}
                              onClick={() => handleClick(index)}
                              className={`hover:bg-blue-50 ${isRowSelected ? 'bg-blue-50' : ''}`}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  className="custom-checkbox checkbox-small"
                                  checked={isRowSelected}
                                  size="small"
                                  onChange={() => handleClick(index)}
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="mr-3 bg-primary" sx={{ bgcolor: getStatusColor(row.status) }}>
                                    {initials}
                                  </Avatar>
                                  <div>
                                    <Typography variant="body2" className="font-medium">
                                      {row.hrName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      ID: {row.hrCode}
                                    </Typography>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={row.hrCode}
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                  className="font-medium"
                                />
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={row.department}
                                  size="small"
                                  color={departmentClass as any}
                                  variant="filled"
                                  className="font-medium"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <BusinessIcon className="mr-1 text-gray-500" fontSize="small" />
                                  <Typography variant="body2" className="truncate max-w-[150px]">
                                    {row.company}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <EmailIcon className="mr-1 text-gray-500" fontSize="small" />
                                  <Typography variant="body2" className="truncate max-w-[150px]">
                                    {row.email}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <PhoneIcon className="mr-1 text-gray-500" fontSize="small" />
                                  <Typography variant="body2">
                                    {row.phone}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" className="font-medium">
                                  {row.jobTitle}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={row.status}
                                  size="small"
                                  color={statusClass as any}
                                  variant="filled"
                                  className="font-medium"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <PersonIcon className="mr-1 text-gray-500" fontSize="small" />
                                  <Typography variant="body2" className="font-semibold">
                                    {row.managedEmployees?.toLocaleString() || "0"}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" className="font-semibold">
                                  {row.yearsOfExperience || "0"} yrs
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <CalendarTodayIcon className="mr-1 text-gray-500" fontSize="small" />
                                  <Typography variant="body2">
                                    {formatDate(row.hireDate)}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Rating
                                    value={row.rating}
                                    readOnly
                                    size="small"
                                    precision={0.1}
                                  />
                                  <Typography variant="body2" className="ml-2 font-semibold">
                                    {row.rating.toFixed(1)}
                                  </Typography>
                                </div>
                              </TableCell>
                              <TableCell className="table__icon-box">
                                <div className="flex items-center justify-start gap-2">
                                  <button
                                    type="button"
                                    className="table__icon view p-1.5 hover:bg-blue-100 rounded"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleViewHrManager(row);
                                    }}
                                    title="View HR Manager Details"
                                  >
                                    <VisibilityIcon fontSize="small" className="text-blue-600" />
                                  </button>
                                  <button
                                    type="button"
                                    className="table__icon edit p-1.5 hover:bg-green-100 rounded"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push(`/super-admin/hr-managers/edit/${row.id}`);
                                    }}
                                    title="Edit HR Manager"
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
                                    title="Delete HR Manager"
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

            {selected.length > 0 && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-4 z-50">
                <Typography variant="body2">
                  {selected.length} HR manager{selected.length > 1 ? 's' : ''} selected
                </Typography>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-white text-blue-600 rounded text-sm font-medium hover:bg-blue-50"
                    onClick={() => {
                      const selectedManagers = selected.map(index => filteredRows[index]);
                      alert(`Exporting ${selected.length} HR managers...`);
                    }}
                  >
                    <i className="fa-regular fa-download mr-1"></i>
                    Export Selected
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete ${selected.length} HR manager${selected.length > 1 ? 's' : ''}?`)) {
                        selected.forEach(index => {
                          const manager = filteredRows[index];
                          if (manager) handleDelete(manager.id);
                        });
                      }
                    }}
                  >
                    <i className="fa-regular fa-trash mr-1"></i>
                    Delete Selected
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {detailsModalOpen && selectedHrManager && (
        <HrManagerDetailsModal
          open={detailsModalOpen}
          setOpen={setDetailsModalOpen}
          hrManagerData={selectedHrManager}
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

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "active":
      return "#4caf50";
    case "inactive":
      return "#f44336";
    case "on leave":
      return "#ff9800";
    case "pending":
      return "#2196f3";
    default:
      return "#9e9e9e";
  }
}

export default HrManagersTable;