// EmployeeTable.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Switch,
  Button
} from "@mui/material";
import {
  MoreVert,
  Edit,
  Delete,
  Email,
  Phone,
  Business,
  LocationOn,
  AccessTime,
  PersonOff,
  FileDownload,
  Send,
  Visibility
} from "@mui/icons-material";
import { IEmployee } from "./EmployeeTypes";

interface EmployeeTableProps {
  data: IEmployee[];
  onEdit: (employee: IEmployee) => void;
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
  onSendOnboardingEmail?: (employee: IEmployee) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data,
  onEdit,
  onDelete,
  onStatusChange,
  onSendOnboardingEmail
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(data.map(emp => emp.employeeId));
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, employee: IEmployee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'success';
      case 'On Probation': return 'warning';
      case 'Resigned': return 'info';
      case 'Terminated': return 'error';
      case 'Draft': return 'default';
      default: return 'default';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const formatPhone = (phone?: string) => {
    if (!phone) return '-';
    // Format phone number for display
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Job Details</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((employee) => (
                <TableRow
                  key={employee.employeeId}
                  hover
                  selected={selected.includes(employee.employeeId)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(employee.employeeId)}
                      onChange={() => handleClick(employee.employeeId)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={employee.profilePhoto}
                        sx={{ bgcolor: 'primary.main' }}
                      >
                        {getInitials(employee.firstName, employee.lastName)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {employee.preferredName || `${employee.firstName} ${employee.lastName}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {employee.employeeCode || employee.employeeId}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Email fontSize="small" color="action" />
                        <Typography variant="body2">{employee.email}</Typography>
                      </Box>
                      {employee.phoneNumber && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Phone fontSize="small" color="action" />
                          <Typography variant="body2">
                            {formatPhone(employee.phoneNumber)}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Business fontSize="small" color="action" />
                        <Typography variant="body2">{employee.roleName}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2">{employee.departmentName}</Typography>
                      </Box>
                      {employee.shiftName && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime fontSize="small" color="action" />
                          <Typography variant="body2">{employee.shiftName}</Typography>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={employee.employmentStatus}
                        size="small"
                        color={getStatusColor(employee.employmentStatus) as any}
                        variant="outlined"
                      />
                      {onStatusChange && (
                        <Tooltip title="Toggle Active Status">
                          <Switch
                            size="small"
                            checked={employee.employmentStatus === 'Active'}
                            onChange={(e) => {
                              e.stopPropagation();
                              onStatusChange(
                                employee.employeeId,
                                e.target.checked ? 'Active' : 'Inactive'
                              );
                            }}
                            color="success"
                          />
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(employee.dateOfJoining)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Tooltip title="View Profile">
                        <IconButton
                          size="small"
                          onClick={() => window.location.href = `/admin/employees/${employee.employeeId}`}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(employee)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, employee)}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedEmployee && (
          <>
            <MenuItem onClick={() => {
              onEdit(selectedEmployee);
              handleMenuClose();
            }}>
              <Edit fontSize="small" sx={{ mr: 1 }} />
              Edit Employee
            </MenuItem>
            
            {onSendOnboardingEmail && selectedEmployee.systemUserEnabled && (
              <MenuItem onClick={() => {
                onSendOnboardingEmail(selectedEmployee);
                handleMenuClose();
              }}>
                <Send fontSize="small" sx={{ mr: 1 }} />
                Send Onboarding Email
              </MenuItem>
            )}
            
            <MenuItem onClick={() => {
              // Handle export employee data
              handleMenuClose();
            }}>
              <FileDownload fontSize="small" sx={{ mr: 1 }} />
              Export Profile
            </MenuItem>
            
            <MenuItem onClick={() => {
              if (onStatusChange) {
                const newStatus = selectedEmployee.employmentStatus === 'Active' ? 'Inactive' : 'Active';
                onStatusChange(selectedEmployee.employeeId, newStatus);
              }
              handleMenuClose();
            }}>
              <PersonOff fontSize="small" sx={{ mr: 1 }} />
              {selectedEmployee.employmentStatus === 'Active' ? 'Deactivate' : 'Activate'}
            </MenuItem>
            
            <MenuItem onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${selectedEmployee.firstName} ${selectedEmployee.lastName}?`)) {
                onDelete(selectedEmployee.employeeId);
              }
              handleMenuClose();
            }} sx={{ color: 'error.main' }}>
              <Delete fontSize="small" sx={{ mr: 1 }} />
              Delete Employee
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Bulk Actions Bar */}
      {selected.length > 0 && (
        <Paper sx={{ 
          p: 2, 
          mb: 2, 
          bgcolor: 'primary.light',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="body2" color="primary.contrastText">
            {selected.length} employee(s) selected
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className="!text-white"
              onClick={() => {
                // Bulk action: Send onboarding emails
                const selectedEmployees = data.filter(emp => selected.includes(emp.employeeId));
                console.log('Bulk send onboarding:', selectedEmployees);
              }}
            >
              <Send fontSize="small" sx={{ mr: 1 }} />
              Send Onboarding
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              className="!text-white"
              onClick={() => {
                // Bulk action: Export selected
                console.log('Bulk export:', selected);
              }}
            >
              <FileDownload fontSize="small" sx={{ mr: 1 }} />
              Export Selected
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              className="!text-white"
              onClick={() => {
                if (window.confirm(`Delete ${selected.length} employee(s)?`)) {
                  selected.forEach(id => onDelete(id));
                  setSelected([]);
                }
              }}
            >
              <Delete fontSize="small" sx={{ mr: 1, color: 'white' }} />
              Delete Selected
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default EmployeeTable;