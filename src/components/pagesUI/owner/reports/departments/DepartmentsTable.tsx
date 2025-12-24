"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IDepartment } from "./departments.interface";

interface Props {
  data: IDepartment[];
  onEdit?: (department: IDepartment) => void;
  onDelete?: (id: number) => void;
}

const DepartmentsTable: React.FC<Props> = ({
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper} className="mt-6">
      <Table size="medium">
        {/* TABLE HEADER */}
        <TableHead>
          <TableRow>
            <TableCell>Department Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell>Employees</TableCell>
            <TableCell>Projects</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Status</TableCell>
            {(onEdit || onDelete) && (
              <TableCell align="center">Actions</TableCell>
            )}
          </TableRow>
        </TableHead>

        {/* TABLE BODY */}
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No departments found
              </TableCell>
            </TableRow>
          ) : (
            data.map((dept) => (
              <TableRow key={dept.id} hover>
                <TableCell>{dept.departmentName}</TableCell>
                <TableCell>{dept.departmentCode}</TableCell>
                <TableCell>{dept.departmentType}</TableCell>
                <TableCell>{dept.managerName}</TableCell>
                <TableCell>{dept.employeeCount}</TableCell>
                <TableCell>{dept.projectsCount}</TableCell>
                <TableCell>
                  {dept.currency} {dept.budget.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={dept.status}
                    color={
                      dept.status === "Active"
                        ? "success"
                        : "default"
                    }
                    size="small"
                  />
                </TableCell>

                {(onEdit || onDelete) && (
                  <TableCell align="center">
                    {onEdit && (
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(dept)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}

                    {onDelete && (
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDelete(dept.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DepartmentsTable;
