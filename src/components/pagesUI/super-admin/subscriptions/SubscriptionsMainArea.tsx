"use client";

import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Divider,
} from "@mui/material";

const moduleOptions = [
  "CRM",
  "HR",
  "Projects",
  "Payroll",
  "Inventory",
  "Finance",
  "Support",
];

const planOptions = [
  { value: "free", label: "Free", limits: "Up to 5 users, Basic Support" },
  { value: "pro", label: "Pro", limits: "Unlimited users, Priority Support" },
  { value: "enterprise", label: "Enterprise", limits: "Custom limit, Dedicated Support" },
];

const timezoneList = [
  "Asia/Kolkata",
  "America/New_York",
  "Europe/London",
  "Asia/Dubai",
];

const currencyList = [
  "INR",
  "USD",
  "GBP",
  "AED",
];

const SubscriptionsMainArea = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currency, setCurrency] = useState("INR");

  const handleModuleChange = (module: string) => {
    setSelectedModules(prev =>
      prev.includes(module)
        ? prev.filter(item => item !== module)
        : [...prev, module]
    );
  };

  const isPayrollSelected = selectedModules.includes("Payroll");
  const isNextDisabled = selectedModules.length === 0;

  return (
    <Grid container spacing={4}>
      
      {/* LEFT — MODULES */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Select Modules <span style={{ color: "red" }}>*</span>
            </Typography>

            <FormGroup>
              {moduleOptions.map(module => (
                <FormControlLabel
                  key={module}
                  control={
                    <Checkbox
                      checked={selectedModules.includes(module)}
                      onChange={() => handleModuleChange(module)}
                    />
                  }
                  label={module}
                />
              ))}
            </FormGroup>

            {isPayrollSelected && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Payroll requires bank configuration later.
              </Alert>
            )}

            {selectedModules.length === 0 && (
              <Typography variant="body2" color="error" mt={1}>
                Please select at least one module to continue.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      {/* RIGHT — PLAN + DEFAULTS */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>

            {/* Subscription Plan */}
            <FormControl fullWidth>
              <FormLabel>Subscription Plan *</FormLabel>
              <RadioGroup
                value={selectedPlan}
                onChange={e => setSelectedPlan(e.target.value)}
              >
                {planOptions.map(plan => (
                  <div key={plan.value} style={{ marginBottom: 12 }}>
                    <FormControlLabel
                      value={plan.value}
                      control={<Radio />}
                      label={plan.label}
                    />

                    <Typography variant="body2" sx={{ ml: 4 }} color="text.secondary">
                      {plan.limits}
                    </Typography>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 2 }} />

            {/* Timezone */}
            <FormControl fullWidth>
              <FormLabel>Default Timezone *</FormLabel>
              <Select
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                sx={{ mt: 1 }}
              >
                {timezoneList.map(tz => (
                  <MenuItem key={tz} value={tz}>
                    {tz}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Divider sx={{ my: 2 }} />

            {/* Currency */}
            <FormControl fullWidth>
              <FormLabel>Default Currency *</FormLabel>
              <Select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                sx={{ mt: 1 }}
              >
                {currencyList.map(cur => (
                  <MenuItem key={cur} value={cur}>
                    {cur}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </CardContent>
        </Card>
      </Grid>

      {/* ACTION BUTTONS */}
      <Grid item xs={12} mt={2} display="flex" justifyContent="flex-end">
        <Button variant="outlined" sx={{ mr: 2 }}>
          Back
        </Button>

        <Button
          variant="contained"
          disabled={isNextDisabled}
        >
          Next
        </Button>
      </Grid>

    </Grid>
  );
};

export default SubscriptionsMainArea;
