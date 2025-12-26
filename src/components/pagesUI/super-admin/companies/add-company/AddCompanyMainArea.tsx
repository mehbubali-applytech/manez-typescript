"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel, Autocomplete, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { ICompany, ICompanyForm } from "../companies.interface";
import InputField from "@/components/elements/SharedInputs/InputField";

// Mock data for dropdowns (you can replace with API data)
interface CountryOption {
    code: string;
    name: string;
}

interface StateOption {
    code: string;
    name: string;
}

const countries: CountryOption[] = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "JP", name: "Japan" },
    { code: "IN", name: "India" },
    { code: "CN", name: "China" },
    { code: "BR", name: "Brazil" },
];

// States data (you can load this based on selected country)
const usStates: StateOption[] = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
];

// Cities data (you can load this based on selected state)
const cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
    "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte",
    "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington"
];

// Postal codes (mock data)
const postalCodes = [
    "10001", "90001", "60601", "77001", "85001",
    "19101", "78201", "92101", "75201", "95101",
    "73301", "32201", "76101", "43201", "28201",
    "94101", "46201", "98101", "80201", "20001"
];

const AddCompanyMainArea: React.FC = () => {
    const router = useRouter();
    const [status, setStatus] = useState<"Active" | "Inactive" | "Pending">("Active");
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
    const [selectedState, setSelectedState] = useState<StateOption | null>(null);
    const [cityOptions, setCityOptions] = useState<string[]>(cities);
    const [postalCodeOptions, setPostalCodeOptions] = useState<string[]>(postalCodes);
    const [formData, setFormData] = useState<Partial<ICompanyForm>>({});

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<ICompanyForm>({
        defaultValues: {
            rating: 0,
            employees: 0,
            departments: 0,
            projects: 0,
            revenue: 0,
        }
    });

    // Watch country and state to filter cities and postal codes
    const watchCountry = watch("country");
    const watchState = watch("state");

    useEffect(() => {
        if (watchCountry) {
            // Find the country object from the string value
            const countryObj = countries.find(c => c.name === watchCountry) || null;
            setSelectedCountry(countryObj);
        }
    }, [watchCountry]);

    useEffect(() => {
        if (watchState) {
            // Find the state object from the string value
            const stateObj = usStates.find(s => s.name === watchState) || null;
            setSelectedState(stateObj);
            // Filter cities based on state (mock logic)
            const filteredCities = cities.filter(city =>
                city.toLowerCase().includes(watchState.toLowerCase().substring(0, 3))
            );
            setCityOptions(filteredCities.length > 0 ? filteredCities : cities);
        }
    }, [watchState]);

    const steps = [
        {
            label: "Basic Information",
            fields: ['name', 'owner', 'industry', 'location', 'source', 'currencyType', 'language', 'tag', 'description']
        },
        {
            label: "Contact Details",
            fields: ['email', 'phone', 'mobile', 'fax', 'websites']
        },
        {
            label: "Location Information",
            fields: ['country', 'state', 'city', 'zipCode', 'address']
        },
        {
            label: "Business Details",
            fields: ['established', 'licenseNumber', 'taxId', 'rating', 'employees', 'departments', 'projects', 'revenue']
        },
        {
            label: "Review & Status",
            fields: [] // Review step has no form fields
        },
    ];

    const handleNextStep = async () => {
        // Validate current step fields
        const currentStepFields = steps[activeIndex].fields;
        const isValid = await trigger(currentStepFields as any);

        if (isValid) {
            // Save current step data
            const currentValues = getValues();
            setFormData(prev => ({ ...prev, ...currentValues }));

            // Move to next step
            if (activeIndex < steps.length - 1) {
                setActiveIndex(activeIndex + 1);
            }
        } else {
            toast.error("Please fill in all required fields correctly");
        }
    };

    const handlePreviousStep = () => {
        if (activeIndex > 0) {
            // Save current step data before moving back
            const currentValues = getValues();
            setFormData(prev => ({ ...prev, ...currentValues }));
            setActiveIndex(activeIndex - 1);
        }
    };

    // Load form data when step changes
    useEffect(() => {
        // Set form values from saved formData
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                // Cast key to string first, then to keyof ICompanyForm
                const formKey = key as Extract<keyof ICompanyForm, string>;
                setValue(formKey, value as any);
            }
        });

        // Also update selectedCountry and selectedState when loading formData
        if (formData.country) {
            const countryObj = countries.find(c => c.name === formData.country) || null;
            setSelectedCountry(countryObj);
        }
        if (formData.state) {
            const stateObj = usStates.find(s => s.name === formData.state) || null;
            setSelectedState(stateObj);
        }
    }, [activeIndex, formData, setValue]);

    const onSubmit = (data: ICompanyForm) => {
        const payload: ICompany = {
            ...formData, // Use the saved form data from all steps
            ...data, // Include any data from the current step
            id: Date.now(),
            status: status,
            rating: data.rating || formData.rating || 0,
            tag: data.tag || formData.tag || "General",
            location: data.city || formData.city || data.country || formData.country || "Not specified",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        console.log("Company Payload:", payload);

        toast.success("Company added successfully!");
        setTimeout(() => {
            router.push("/owner/companies");
        }, 500);
    };

    const renderStepContent = (index: number) => {
        switch (index) {
            case 0:
                return (
                    <div className="grid grid-cols-12 gap-6">
                        {/* Company Name */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="name"
                                label="Company Name"
                                required
                                register={register("name", {
                                    required: "Company name is required",
                                })}
                                error={errors.name}
                            />
                        </div>

                        {/* Owner */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="owner"
                                label="Owner/CEO Name"
                                required
                                register={register("owner", {
                                    required: "Owner name is required",
                                })}
                                error={errors.owner}
                            />
                        </div>

                        {/* Industry */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="industry"
                                label="Industry"
                                required
                                register={register("industry", {
                                    required: "Industry is required",
                                })}
                                error={errors.industry}
                            />
                        </div>

                        {/* Location - Add this field */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="location"
                                label="Location (General)"
                                register={register("location")}
                            />
                        </div>

                        {/* Source */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="source"
                                label="Source"
                                register={register("source")}
                            />
                        </div>

                        {/* Currency Type */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="currencyType"
                                label="Currency Type"
                                register={register("currencyType")}
                            />
                        </div>

                        {/* Language */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="language"
                                label="Primary Language"
                                register={register("language")}
                            />
                        </div>

                        {/* Tag */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="tag"
                                label="Company Tag"
                                register={register("tag")}
                            />
                        </div>

                        {/* Description */}
                        <div className="col-span-12">
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                                    {...register("description")}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="grid grid-cols-12 gap-6">
                        {/* Email */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="email"
                                label="Email Address"
                                required
                                type="email"
                                register={register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                error={errors.email}
                            />
                        </div>

                        {/* Phone */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="phone"
                                label="Phone Number"
                                type="tel"
                                register={register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{6,15}$/,
                                        message: "Phone number must contain only digits",
                                    },
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(/\D/g, "");
                                    },
                                })}
                                error={errors.phone}
                            />

                        </div>

                        {/* Mobile */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="mobile"
                                label="Mobile Number"
                                type="tel"
                                register={register("mobile", {
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^[0-9]{10,15}$/,
                                        message: "Mobile number must contain only digits (10–15)",
                                    },
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(/\D/g, "");
                                    },
                                })}
                                error={errors.mobile}
                            />

                        </div>

                        {/* Fax */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="fax"
                                label="Fax Number"
                                type="tel"
                                register={register("fax")}
                            />
                        </div>

                        {/* Websites */}
                        <div className="col-span-12">
                            <InputField
                                id="websites"
                                label="Website(s)"
                                register={register("websites")}
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="grid grid-cols-12 gap-6">
                        {/* Country - Searchable Dropdown */}
                        <div className="col-span-12 md:col-span-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: "Country is required" }}
                                render={({ field, fieldState }) => (
                                    <Autocomplete
                                        value={selectedCountry}
                                        options={countries}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => option.code === value.code}
                                        onChange={(_, newValue) => {
                                            setSelectedCountry(newValue);
                                            field.onChange(newValue ? newValue.name : '');
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                size="small"
                                                placeholder="Search or select country"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                className="w-full"
                                            />
                                        )}
                                        className="w-full"
                                    />
                                )}
                            />
                        </div>

                        {/* State/Province - Searchable Dropdown */}
                        <div className="col-span-12 md:col-span-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                State/Province <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="state"
                                control={control}
                                rules={{ required: "State is required" }}
                                render={({ field, fieldState }) => (
                                    <Autocomplete
                                        value={selectedState}
                                        options={usStates}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => option.code === value.code}
                                        onChange={(_, newValue) => {
                                            setSelectedState(newValue);
                                            field.onChange(newValue ? newValue.name : '');
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                size="small"
                                                placeholder="Search or select state"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                className="w-full"
                                            />
                                        )}
                                        className="w-full"
                                    />
                                )}
                            />
                        </div>

                        {/* City - Searchable Dropdown */}
                        <div className="col-span-12 md:col-span-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: "City is required" }}
                                render={({ field, fieldState }) => (
                                    <Autocomplete
                                        freeSolo
                                        options={cityOptions}
                                        value={field.value || ''}
                                        onChange={(_, newValue) => {
                                            field.onChange(newValue || '');
                                        }}
                                        onInputChange={(_, newInputValue) => {
                                            // Filter cities based on input
                                            const filtered = cities.filter(city =>
                                                city.toLowerCase().includes(newInputValue.toLowerCase())
                                            );
                                            setCityOptions(filtered.length > 0 ? filtered : cities);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                size="small"
                                                placeholder="Search or type city"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                className="w-full"
                                            />
                                        )}
                                        className="w-full"
                                    />
                                )}
                            />
                        </div>

                        {/* Zip/Postal Code - Searchable Dropdown */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Zip/Postal Code <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="zipCode"
                                control={control}
                                rules={{
                                    required: "Zip code is required",
                                    pattern: {
                                        value: /^[A-Z0-9\s-]+$/i,
                                        message: "Invalid zip/postal code format"
                                    }
                                }}
                                render={({ field, fieldState }) => (
                                    <Autocomplete
                                        freeSolo
                                        options={postalCodeOptions}
                                        value={field.value || ''}
                                        onChange={(_, newValue) => {
                                            field.onChange(newValue || '');
                                        }}
                                        onInputChange={(_, newInputValue) => {
                                            // Filter postal codes based on input
                                            const filtered = postalCodes.filter(code =>
                                                code.includes(newInputValue)
                                            );
                                            setPostalCodeOptions(filtered.length > 0 ? filtered : postalCodes);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                size="small"
                                                placeholder="Search or type zip code"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                className="w-full"
                                            />
                                        )}
                                        className="w-full"
                                    />
                                )}
                            />
                        </div>

                        {/* Address */}
                        <div className="col-span-12">
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Address <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="address"
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                                    {...register("address", {
                                        required: "Address is required",
                                    })}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1 ml-1">{errors.address.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="grid grid-cols-12 gap-6">
                        {/* Established Date */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="established"
                                label="Established Date"
                                type="date"
                                register={register("established")}
                            />
                        </div>

                        {/* License Number */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="licenseNumber"
                                label="Business License Number"
                                register={register("licenseNumber")}
                            />
                        </div>

                        {/* Tax ID */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="taxId"
                                label="Tax ID / VAT Number"
                                register={register("taxId")}
                            />
                        </div>

                        {/* Rating */}
                        <div className="col-span-12 lg:col-span-6">
                            <InputField
                                id="rating"
                                label="Rating (0–5)"
                                type="number"
                                register={register("rating", {
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Minimum rating is 0" },
                                    max: { value: 5, message: "Maximum rating is 5" },
                                })}
                                error={errors.rating}
                            />

                        </div>

                        {/* Employees */}
                        <div className="col-span-12 md:col-span-3">
                            <InputField
                                id="employees"
                                label="Total Employees"
                                type="number"
                                register={register("employees", {
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Must be a positive number" },
                                    validate: (v) =>
                                        Number.isInteger(v) || "Only whole numbers allowed",
                                })}
                                error={errors.employees}
                            />

                        </div>

                        {/* Departments */}
                        <div className="col-span-12 md:col-span-3">
                            <InputField
                                id="departments"
                                label="Departments"
                                type="number"
                                register={register("departments")}
                            />
                        </div>

                        {/* Projects */}
                        <div className="col-span-12 md:col-span-3">
                            <InputField
                                id="projects"
                                label="Active Projects"
                                type="number"
                                register={register("projects")}
                            />
                        </div>

                        {/* Revenue */}
                        <div className="col-span-12 md:col-span-3">
                            <InputField
                                id="revenue"
                                label="Annual Revenue ($)"
                                type="number"
                                register={register("revenue", {
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Revenue cannot be negative" },
                                })}
                                error={errors.revenue}
                            />

                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        {/* Status Toggle */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-800">Company Status</h4>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {status === "Active"
                                            ? "This company will be active and visible"
                                            : status === "Pending"
                                                ? "This company will be pending review"
                                                : "This company will be inactive and hidden"}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as "Active" | "Inactive" | "Pending")}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`mt-4 px-4 py-3 rounded-md ${status === "Active"
                                ? "bg-green-50 border border-green-200"
                                : status === "Pending"
                                    ? "bg-yellow-50 border border-yellow-200"
                                    : "bg-gray-100 border border-gray-200"
                                }`}>
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-3 ${status === "Active"
                                        ? "bg-green-500"
                                        : status === "Pending"
                                            ? "bg-yellow-500"
                                            : "bg-gray-400"
                                        }`}></div>
                                    <span className={`text-sm ${status === "Active"
                                        ? "text-green-700"
                                        : status === "Pending"
                                            ? "text-yellow-700"
                                            : "text-gray-600"
                                        }`}>
                                        {status === "Active"
                                            ? '✓ Company is active and will be visible in all listings.'
                                            : status === "Pending"
                                                ? '⚠ Company is pending review and requires approval.'
                                                : '✗ Company is inactive and will not be visible in listings.'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                            <h4 className="font-medium text-blue-800 mb-4">Ready to Create Company</h4>
                            <p className="text-blue-700 text-sm mb-3">
                                Review all information before submitting. You can edit any step by going back.
                            </p>
                            <ul className="text-blue-700 text-sm space-y-2">
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    All required fields are completed
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Contact information is verified
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Status is set appropriately
                                </li>
                            </ul>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="app__slide-wrapper">
            {/* Breadcrumb */}
            <div className="breadcrumb__wrapper mb-[25px]">
                <nav>
                    <ol className="breadcrumb flex items-center mb-0">
                        <li className="breadcrumb-item">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/owner">Owner</Link>
                        </li>
                        <li className="breadcrumb-item active">Add Company</li>
                    </ol>
                </nav>
            </div>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Add New Company</h1>
                <p className="text-gray-600 mt-2">Fill in the company details step by step</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Stepper */}
                <div className="p-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Step {activeIndex + 1} of {steps.length}: {steps[activeIndex].label}
                        </h2>
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                                {Math.round(((activeIndex + 1) / steps.length) * 100)}% Complete
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center">
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${index <= activeIndex
                                            ? "bg-primary text-white"
                                            : "bg-gray-200 text-gray-500"
                                            }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <span
                                        className={`text-xs mt-2 font-medium ${index <= activeIndex ? "text-primary" : "text-gray-500"
                                            }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-1 mx-4 ${index < activeIndex ? "bg-primary" : "bg-gray-200"
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{steps[activeIndex].label}</h2>
                            <p className="text-gray-600 text-sm">
                                {activeIndex === 0 && "Enter basic company information"}
                                {activeIndex === 1 && "Provide contact details"}
                                {activeIndex === 2 && "Add location information"}
                                {activeIndex === 3 && "Enter business statistics and details"}
                                {activeIndex === 4 && "Review and set company status"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-8">
                        {renderStepContent(activeIndex)}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => router.push("/super-admin/companies")}
                                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>

                            <div className="flex items-center space-x-4">
                                {activeIndex > 0 && (
                                    <button
                                        type="button"
                                        className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        onClick={handlePreviousStep}
                                    >
                                        Previous
                                    </button>
                                )}

                                {activeIndex < steps.length - 1 ? (
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        onClick={handleNextStep}
                                    >
                                        Next Step
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Create Company
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Quick Tips */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h4 className="font-medium text-blue-800">Tips for adding a new company</h4>
                        <ul className="mt-2 text-blue-700 text-sm space-y-1">
                            <li>• Use the searchable dropdowns for location fields for accurate data</li>
                            <li>• Start typing in dropdowns to filter options quickly</li>
                            <li>• Ensure email and phone numbers are correct for communication</li>
                            <li>• Set appropriate status based on company relationship</li>
                            <li>• All fields marked with * are required</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCompanyMainArea;