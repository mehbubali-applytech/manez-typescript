"use client";
import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Grid,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useForm } from "react-hook-form";
import SelectBox from "@/components/elements/SharedInputs/SelectBox";

interface HrManagerFiltersProps {
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
    selectedDepartment: string;
    setSelectedDepartment: (department: string) => void;
    selectedCompany: string;
    setSelectedCompany: (company: string) => void;
    dateRange: { start: string; end: string };
    setDateRange: (range: { start: string; end: string }) => void;
}

const HrManagerFilters: React.FC<HrManagerFiltersProps> = ({
    selectedStatus,
    setSelectedStatus,
    selectedDepartment,
    setSelectedDepartment,
    selectedCompany,
    setSelectedCompany,
    dateRange,
    setDateRange,
}) => {
    const statusOptions = [
        { value: "all", label: "All Status" },
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
        { value: "On Leave", label: "On Leave" },
        { value: "Pending", label: "Pending" },
    ];

    const departmentOptions = [
        { value: "all", label: "All Departments" },
        { value: "Human Resources", label: "Human Resources" },
        { value: "HR Operations", label: "HR Operations" },
        { value: "Talent Acquisition", label: "Talent Acquisition" },
        { value: "Recruitment", label: "Recruitment" },
        { value: "Employee Relations", label: "Employee Relations" },
        { value: "Learning & Development", label: "Learning & Development" },
        { value: "Compensation & Benefits", label: "Compensation & Benefits" },
        { value: "HR Compliance", label: "HR Compliance" },
        { value: "HR Information Systems", label: "HR Information Systems" },
        { value: "Wellness & Engagement", label: "Wellness & Engagement" },
        { value: "International HR", label: "International HR" },
    ];

    const companyOptions = [
        { value: "all", label: "All Companies" },
        { value: "TechNova Solutions", label: "TechNova Solutions" },
        { value: "Global Finance Group", label: "Global Finance Group" },
        { value: "MediCare Innovations", label: "MediCare Innovations" },
        { value: "EcoManufacture Inc", label: "EcoManufacture Inc" },
        { value: "RetailMax Corporation", label: "RetailMax Corporation" },
        { value: "EduTech Solutions", label: "EduTech Solutions" },
        { value: "RealEstate Pro", label: "RealEstate Pro" },
        { value: "LogiTrans Global", label: "LogiTrans Global" },
        { value: "EnergyPlus Corp", label: "EnergyPlus Corp" },
        { value: "TeleConnect Ltd", label: "TeleConnect Ltd" },
    ];

    const handleResetFilters = () => {
        setSelectedStatus("all");
        setSelectedDepartment("all");
        setSelectedCompany("all");
        setDateRange({
            start: "2024-01-01",
            end: "2024-03-31"
        });
    };

    const handleQuickDateRange = (range: string) => {
        const today = new Date();
        let start = new Date();
        let end = new Date(today);

        switch (range) {
            case "week":
                start.setDate(today.getDate() - 7);
                break;
            case "month":
                start.setMonth(today.getMonth() - 1);
                break;
            case "quarter":
                start.setMonth(today.getMonth() - 3);
                break;
            case "year":
                start.setFullYear(today.getFullYear() - 1);
                break;
            default:
                start = new Date("2024-01-01");
                end = new Date("2024-03-31");
        }

        setDateRange({
            start: start.toISOString().split('T')[0],
            end: end.toISOString().split('T')[0]
        });
    };

    const handleStatusToggle = (event: React.MouseEvent<HTMLElement>, newStatus: string | null) => {
        if (newStatus !== null) {
            setSelectedStatus(newStatus);
        }
    };

    const { control } = useForm({
        defaultValues: {
            status: selectedStatus,
            department: selectedDepartment,
            company: selectedCompany,
            startDate: dateRange.start,
            endDate: dateRange.end
        },
    });

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange({ ...dateRange, start: e.target.value });
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange({ ...dateRange, end: e.target.value });
    };

    return (
        <Card variant="outlined" className="mb-6">
            <CardContent>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <FilterListIcon className="mr-2 text-primary" />
                        <Typography variant="h6" className="font-semibold">
                            HR Manager Filters
                        </Typography>
                    </div>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<RefreshIcon />}
                        onClick={handleResetFilters}
                        size="small"
                    >
                        Reset All
                    </Button>
                </div>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <SelectBox
                            id="status"
                            label="Status"
                            options={statusOptions}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <SelectBox
                            id="department"
                            label="Department"
                            options={departmentOptions}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <SelectBox
                            id="company"
                            label="Company"
                            options={companyOptions}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={1.5}>
                        <div className="form__input-box">
                            <div className="form__input-title">
                                <label htmlFor="startDate">
                                    From Date
                                </label>
                            </div>
                            <div className="form__input">
                                <input
                                    className="form-control"
                                    id="startDate"
                                    type="date"
                                    value={dateRange.start}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={1.5}>
                        <div className="form__input-box">
                            <div className="form__input-title">
                                <label htmlFor="endDate">
                                    To Date
                                </label>
                            </div>
                            <div className="form__input">
                                <input
                                    className="form-control"
                                    id="endDate"
                                    type="date"
                                    value={dateRange.end}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <Box className="mt-4">
                    <Typography variant="body2" color="text.secondary" className="mb-2">
                        Quick Status Filters:
                    </Typography>
                    <ToggleButtonGroup
                        value={selectedStatus}
                        exclusive
                        onChange={handleStatusToggle}
                        aria-label="hr manager status"
                        size="small"
                        className="flex-wrap"
                    >
                        <ToggleButton value="Active" aria-label="Active">
                            <PersonIcon className="mr-1" fontSize="small" />
                            Active
                        </ToggleButton>
                        <ToggleButton value="Inactive" aria-label="Inactive">
                            Inactive
                        </ToggleButton>
                        <ToggleButton value="On Leave" aria-label="On Leave">
                            On Leave
                        </ToggleButton>
                        <ToggleButton value="Pending" aria-label="Pending">
                            Pending
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box className="mt-4">
                    <Typography variant="body2" color="text.secondary" className="mb-2">
                        Quick Department Filters:
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setSelectedDepartment("Human Resources")}
                        >
                            <ApartmentIcon className="mr-1" fontSize="small" />
                            HR General
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setSelectedDepartment("Talent Acquisition")}
                        >
                            Talent Acquisition
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setSelectedDepartment("Employee Relations")}
                        >
                            Employee Relations
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setSelectedDepartment("Learning & Development")}
                        >
                            L&D
                        </Button>
                    </div>
                </Box>

                <Box className="mt-4">
                    <Typography variant="body2" color="text.secondary" className="mb-2">
                        Quick Date Filters:
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleQuickDateRange("week")}
                        >
                            Last 7 Days
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleQuickDateRange("month")}
                        >
                            Last Month
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleQuickDateRange("quarter")}
                        >
                            Last Quarter
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleQuickDateRange("year")}
                        >
                            Last Year
                        </Button>
                    </div>
                </Box>

                {(selectedStatus !== "all" || selectedDepartment !== "all" || selectedCompany !== "all") && (
                    <Box className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <Typography variant="body2" className="text-blue-800">
                            <strong>Active Filters:</strong>
                            {selectedStatus !== "all" && ` ${selectedStatus} status`}
                            {selectedDepartment !== "all" && ` • ${selectedDepartment}`}
                            {selectedCompany !== "all" && ` • ${selectedCompany}`}
                            {` • Hired between: ${dateRange.start} to ${dateRange.end}`}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default HrManagerFilters;