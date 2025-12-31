// SalaryGradeTable.tsx
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
  Chip,
  IconButton,
  Button,
  Tooltip,
  Typography,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Alert
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  CopyAll,
  Download,
  Add,
  Search,
  FilterList,
  TrendingUp,
  AttachMoney
} from "@mui/icons-material";
import { ISalaryGrade, calculateMonthlyGross, calculateTotalCTC } from "./SalaryGradeTypes";

interface SalaryGradeTableProps {
  data: ISalaryGrade[];
  onEdit: (grade: ISalaryGrade) => void;
  onDelete: (id: string) => void;
  onView: (grade: ISalaryGrade) => void;
  onDuplicate: (grade: ISalaryGrade) => void;
  onStatusChange: (id: string, status: boolean) => void;
}

const SalaryGradeTable: React.FC<SalaryGradeTableProps> = ({
  data,
  onEdit,
  onDelete,
  onView,
  onDuplicate,
  onStatusChange
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<string>("All");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gradeToDelete, setGradeToDelete] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ISalaryGrade; direction: 'asc' | 'desc' } | null>(null);

  const filteredData = data.filter(grade => {
    // Filter by search query
    if (searchQuery && 
        !grade.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !grade.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !grade.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by active status
    if (filterActive === "Active" && !grade.isActive) return false;
    if (filterActive === "Inactive" && grade.isActive) return false;
    
    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];
    
    if (aValue == null || bValue == null) return 0;
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof ISalaryGrade) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleDeleteConfirm = () => {
    if (gradeToDelete) {
      onDelete(gradeToDelete);
      setDeleteDialogOpen(false);
      setGradeToDelete(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSortIcon = (key: keyof ISalaryGrade) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <Box>
      {/* Table Header with Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoney /> Salary Grades ({data.length})
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search grades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ width: 250 }}
            />
            
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {
                setSearchQuery("");
                setFilterActive("All");
              }}
            >
              Clear Filters
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip
            label="All"
            variant={filterActive === "All" ? "filled" : "outlined"}
            onClick={() => setFilterActive("All")}
          />
          <Chip
            label="Active"
            color="success"
            variant={filterActive === "Active" ? "filled" : "outlined"}
            onClick={() => setFilterActive("Active")}
          />
          <Chip
            label="Inactive"
            color="default"
            variant={filterActive === "Inactive" ? "filled" : "outlined"}
            onClick={() => setFilterActive("Inactive")}
          />
          
          <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
            Showing {sortedData.length} of {data.length} grades
          </Typography>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100' }}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
                  onClick={() => handleSort('name')}
                >
                  Grade Name {getSortIcon('name')}
                </Box>
              </TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Components</TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', justifyContent: 'flex-end' }}
                  onClick={() => handleSort('totalCTC')}
                >
                  Total CTC {getSortIcon('totalCTC')}
                </Box>
              </TableCell>
              <TableCell align="right">Monthly Gross</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {sortedData.map((grade) => (
              <TableRow key={grade.id} hover>
                {/* Grade Name */}
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {grade.name}
                    </Typography>
                    {grade.description && (
                      <Typography variant="caption" color="text.secondary">
                        {grade.description}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                
                {/* Code */}
                <TableCell>
                  <Chip label={grade.code} size="small" variant="outlined" />
                </TableCell>
                
                {/* Components */}
                <TableCell>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {grade.components.slice(0, 3).map((comp, idx) => (
                      <Tooltip key={idx} title={`${comp.name}: ${comp.value}${comp.calculationType === 'Percentage' ? '%' : ''}`}>
                        <Chip
                          label={comp.name}
                          size="small"
                          color={comp.calculationType === 'Percentage' ? 'primary' : 'secondary'}
                          variant="outlined"
                        />
                      </Tooltip>
                    ))}
                    {grade.components.length > 3 && (
                      <Chip
                        label={`+${grade.components.length - 3}`}
                        size="small"
                      />
                    )}
                  </Box>
                </TableCell>
                
                {/* Total CTC */}
                <TableCell align="right">
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(grade.totalCTC)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Annual
                  </Typography>
                </TableCell>
                
                {/* Monthly Gross */}
                <TableCell align="right">
                  <Typography variant="body2">
                    {formatCurrency(grade.monthlyGross)}
                  </Typography>
                </TableCell>
                
                {/* Status */}
                <TableCell align="center">
                  <Tooltip title={grade.isActive ? "Active" : "Inactive"}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={grade.isActive}
                          onChange={(e) => onStatusChange(grade.id, e.target.checked)}
                          size="small"
                          color="success"
                        />
                      }
                      label={
                        <Chip
                          label={grade.isActive ? "Active" : "Inactive"}
                          size="small"
                          color={grade.isActive ? "success" : "default"}
                          variant="outlined"
                        />
                      }
                    />
                  </Tooltip>
                </TableCell>
                
                {/* Actions */}
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => onView(grade)}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => onEdit(grade)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Duplicate">
                      <IconButton
                        size="small"
                        onClick={() => onDuplicate(grade)}
                      >
                        <CopyAll fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setGradeToDelete(grade.id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Empty State */}
      {sortedData.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography>
            No salary grades found. Create your first salary grade to get started.
          </Typography>
        </Alert>
      )}

      {/* Summary Stats */}
      {sortedData.length > 0 && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Summary</Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Active Grades</Typography>
              <Typography variant="h6">
                {sortedData.filter(g => g.isActive).length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Avg. CTC</Typography>
              <Typography variant="h6">
                {formatCurrency(sortedData.reduce((sum, g) => sum + g.totalCTC, 0) / sortedData.length)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Total Components</Typography>
              <Typography variant="h6">
                {sortedData.reduce((sum, g) => sum + g.components.length, 0)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Salary Grade</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this salary grade? This action cannot be undone.
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Note: Deleting this grade will affect employees assigned to it. Consider deactivating instead.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalaryGradeTable;