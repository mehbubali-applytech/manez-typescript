// SalaryTab.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  IconButton,
  Button,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel
} from "@mui/material";
import {
  AttachMoney,
  AccountBalance,
  Add,
  Delete,
  ExpandMore,
  ExpandLess,
  AccountBalanceWallet,
  Savings,
  Receipt,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";

const SalaryTab: React.FC = () => {
  const { control, watch, setValue, formState: { errors } } = useFormContext();
  
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [maskAccountNumber, setMaskAccountNumber] = useState(true);
  
  // Use field arrays for dynamic allowances and deductions
  const { fields: allowanceFields, append: appendAllowance, remove: removeAllowance } = useFieldArray({
    control,
    name: "allowances"
  });

  const { fields: deductionFields, append: appendDeduction, remove: removeDeduction } = useFieldArray({
    control,
    name: "deductions"
  });

    const getMultiplierForFrequency = (frequency: string) => {
    switch(frequency) {
      case 'Monthly': return 12;
      case 'Weekly': return 52;
      case 'Bi-weekly': return 26;
      default: return 12;
    }
  };

  const watchCTC = watch('costToCompany') || 0;
  const watchBasicPay = watch('basicPay') || 0;
  const watchHRA = watch('hra') || 0;
  const watchAllowances = watch('allowances') || [];
  const watchDeductions = watch('deductions') || [];
  const watchPayFrequency = watch('payFrequency');

  // Calculate totals
  const totalAllowances = watchAllowances.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
  const totalDeductions = watchDeductions.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
  
  const totalEarnings = watchBasicPay + watchHRA + totalAllowances;
  const netSalary = totalEarnings - totalDeductions;
  const annualSalary = netSalary * getMultiplierForFrequency(watchPayFrequency);

  const handleAddAllowance = () => {
    appendAllowance({
      name: '',
      amount: 0,
      type: 'Fixed',
      taxable: true
    });
  };

  const handleAddDeduction = () => {
    appendDeduction({
      name: '',
      amount: 0,
      type: 'Fixed'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const maskAccountNumberDisplay = (accountNumber?: string) => {
    if (!accountNumber) return '';
    if (maskAccountNumber) {
      return `XXXXXX${accountNumber.slice(-4)}`;
    }
    return accountNumber;
  };



  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center',
        mb: 3 
      }}>
        <AttachMoney sx={{ mr: 1 }} />
        Salary & Compensation
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Salary Structure */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Cost to Company */}
            <InputField
              label="Cost to Company (CTC) *"
              id="costToCompany"
              type="number"
              required={true}
              register={useFormContext().register("costToCompany", { 
                required: "CTC is required",
                min: { value: 0, message: "CTC must be positive" }
              })}
            />

            {/* Salary Grade */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Salary Grade
              </Typography>
              <Controller
                name="salaryGrade"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth size="small">
                    <Select {...field}>
                      <MenuItem value="">Select Grade</MenuItem>
                      {['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'].map(grade => (
                        <MenuItem key={grade} value={grade}>
                          <Chip label={grade} size="small" variant="outlined" />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>

            {/* Basic Pay */}
            <InputField
              label="Basic Pay"
              id="basicPay"
              type="number"
              required={false}
              register={useFormContext().register("basicPay", { 
                min: { value: 0, message: "Basic pay must be positive" }
              })}
            />

            {/* HRA */}
            <InputField
              label="House Rent Allowance (HRA)"
              id="hra"
              type="number"
              required={false}
              register={useFormContext().register("hra", { 
                min: { value: 0, message: "HRA must be positive" }
              })}
            />

            {/* Pay Frequency */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Pay Frequency *
              </Typography>
              <Controller
                name="payFrequency"
                control={control}
                rules={{ required: "Pay frequency is required" }}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth size="small" error={fieldState.invalid}>
                    <Select {...field}>
                      {['Monthly', 'Weekly', 'Bi-weekly'].map(freq => (
                        <MenuItem key={freq} value={freq}>
                          {freq}
                        </MenuItem>
                      ))}
                    </Select>
                    {fieldState.error && (
                      <Typography variant="caption" color="error">
                        {fieldState.error.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Box>

            {/* Allowances */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Allowances
                </Typography>
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={handleAddAllowance}
                  variant="outlined"
                >
                  Add Allowance
                </Button>
              </Box>

              {allowanceFields.length === 0 ? (
                <Alert severity="info">
                  No allowances added. Add special allowances like travel, medical, etc.
                </Alert>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Taxable</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allowanceFields.map((field, index) => (
                        <TableRow key={field.id}>
                          <TableCell>
                            <Controller
                              name={`allowances.${index}.name`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  size="small"
                                  fullWidth
                                  placeholder="e.g., Travel Allowance"
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              name={`allowances.${index}.amount`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  size="small"
                                  fullWidth
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              name={`allowances.${index}.type`}
                              control={control}
                              render={({ field }) => (
                                <Select {...field} size="small" fullWidth>
                                  <MenuItem value="Fixed">Fixed</MenuItem>
                                  <MenuItem value="Variable">Variable</MenuItem>
                                </Select>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              name={`allowances.${index}.taxable`}
                              control={control}
                              render={({ field }) => (
                                <Switch
                                  checked={field.value}
                                  onChange={field.onChange}
                                  size="small"
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => removeAllowance(index)}
                              color="error"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>

            {/* Deductions */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Deductions
                </Typography>
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={handleAddDeduction}
                  variant="outlined"
                >
                  Add Deduction
                </Button>
              </Box>

              {deductionFields.length === 0 ? (
                <Alert severity="info">
                  No deductions added. Add deductions like PF, TDS, etc.
                </Alert>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deductionFields.map((field, index) => (
                        <TableRow key={field.id}>
                          <TableCell>
                            <Controller
                              name={`deductions.${index}.name`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  size="small"
                                  fullWidth
                                  placeholder="e.g., Provident Fund"
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              name={`deductions.${index}.amount`}
                              control={control}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  size="small"
                                  fullWidth
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <Controller
                              name={`deductions.${index}.type`}
                              control={control}
                              render={({ field }) => (
                                <Select {...field} size="small" fullWidth>
                                  <MenuItem value="Fixed">Fixed</MenuItem>
                                  <MenuItem value="Percentage">Percentage</MenuItem>
                                </Select>
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => removeDeduction(index)}
                              color="error"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Box>
        </Grid>

        {/* Right Column - Bank Details & Summary */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Bank Details Toggle */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => setShowBankDetails(!showBankDetails)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountBalance />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Bank Account Details
                  </Typography>
                </Box>
                <IconButton size="small">
                  {showBankDetails ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>

              <Collapse in={showBankDetails}>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <InputField
                    label="Account Holder Name"
                    id="bankAccountName"
                    type="text"
                    required={false}
                    register={useFormContext().register("bankAccountName")}
                  />

                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2">
                        Account Number
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={maskAccountNumber}
                            onChange={(e) => setMaskAccountNumber(e.target.checked)}
                            size="small"
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {maskAccountNumber ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            <Typography variant="caption">
                              {maskAccountNumber ? 'Show' : 'Hide'}
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>
                    <Controller
                      name="bankAccountNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          type={maskAccountNumber ? "password" : "text"}
                          value={maskAccountNumber ? maskAccountNumberDisplay(field.value) : field.value}
                          onChange={(e) => {
                            // Allow only numbers
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                          }}
                        />
                      )}
                    />
                  </Box>

                  <InputField
                    label="IFSC Code"
                    id="ifscCode"
                    type="text"
                    required={false}
                    register={useFormContext().register("ifscCode", {
                      pattern: {
                        value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                        message: "Invalid IFSC code format"
                      }
                    })}
                 
                  />

                  <InputField
                    label="Bank Name"
                    id="bankName"
                    type="text"
                    required={false}
                    register={useFormContext().register("bankName")}
                  />
                </Box>
              </Collapse>
            </Paper>

            {/* Salary Summary */}
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Salary Summary
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              {/* Earnings */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'success.main' }}>
                  Earnings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Basic Pay</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {formatCurrency(watchBasicPay)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">House Rent Allowance (HRA)</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {formatCurrency(watchHRA)}
                    </Typography>
                  </Box>
                  {totalAllowances > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">Other Allowances</Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {formatCurrency(totalAllowances)}
                      </Typography>
                    </Box>
                  )}
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" fontWeight={600}>Total Earnings</Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      {formatCurrency(totalEarnings)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Deductions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ color: 'error.main' }}>
                  Deductions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {totalDeductions > 0 ? (
                    <>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Total Deductions</Typography>
                        <Typography variant="body2" fontWeight={600} color="error.main">
                          {formatCurrency(totalDeductions)}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No deductions added
                    </Typography>
                  )}
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Net Salary */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Net Salary (per {watchPayFrequency?.toLowerCase() || 'month'})
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    {formatCurrency(netSalary)}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  After all deductions
                </Typography>
              </Box>

              {/* Annual Summary */}
              <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Annual Summary
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Annual CTC
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {formatCurrency(watchCTC || annualSalary)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Take Home
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {formatCurrency(annualSalary)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Pay Frequency
                    </Typography>
                    <Typography variant="body2">
                      {watchPayFrequency || 'Monthly'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Info Alert */}
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="caption">
                  Note: Salary components are calculated based on the provided data. 
                  Tax calculations are approximate and may vary based on actual deductions.
                </Typography>
              </Alert>
            </Paper>

            {/* Quick Actions */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    // Auto-calculate based on CTC
                    const ctc = watchCTC || 0;
                    if (ctc > 0) {
                      const basic = Math.round(ctc * 0.4 / 12); // 40% of annual CTC
                      const hra = Math.round(basic * 0.5); // 50% of basic
                      setValue('basicPay', basic);
                      setValue('hra', hra);
                    }
                  }}
                >
                  Auto-calculate from CTC
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    // Clear all salary data
                    setValue('costToCompany', 0);
                    setValue('basicPay', 0);
                    setValue('hra', 0);
                    setValue('allowances', []);
                    setValue('deductions', []);
                  }}
                >
                  Clear All
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalaryTab;