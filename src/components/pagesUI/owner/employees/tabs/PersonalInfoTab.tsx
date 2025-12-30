// tabs/PersonalInfoTab.tsx
"use client";

import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  FormControlLabel,
  Checkbox,
  Chip,
  Tooltip,
  Alert
} from "@mui/material";
import {
  Person,
  Phone,
  Email,
  Cake,
  Home,
  Emergency,
  CloudUpload,
  Delete,
  Male,
  Female,
  Transgender
} from "@mui/icons-material";
import { useFormContext, Controller, FieldError } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";

interface PersonalInfoTabProps {
  profileImage: string | null;
  onProfileImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  watchSameAsPresentAddress: boolean;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
  profileImage,
  onProfileImageUpload,
  watchSameAsPresentAddress
}) => {
  const {
    control,
    watch,
    setValue,
    register,
    formState: { errors }
  } = useFormContext();


  const presentAddress = watch('presentAddress');
  const sameAsPresent = watch('sameAsPresentAddress');

  // Auto-fill permanent address if same as present
  useEffect(() => {
    if (sameAsPresent && presentAddress) {
      setValue('permanentAddress', presentAddress);
    }
  }, [sameAsPresent, presentAddress, setValue]);

  const handleGenderSelect = (gender: string) => {
    setValue('gender', gender as any);
  };

  const getGenderIcon = (gender?: string) => {
    switch (gender) {
      case 'Male': return <Male fontSize="small" />;
      case 'Female': return <Female fontSize="small" />;
      case 'Other': return <Transgender fontSize="small" />;
      default: return null;
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 3
      }}>
        <Person sx={{ mr: 1 }} />
        Personal Information
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Basic Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Profile Photo */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={profileImage || ''}
                  sx={{
                    width: 100,
                    height: 100,
                    border: '3px solid',
                    borderColor: 'primary.light'
                  }}
                >
                  <Person sx={{ fontSize: 48 }} />
                </Avatar>
                <input
                  accept="image/jpeg,image/png,image/jpg"
                  type="file"
                  id="profile-photo-upload"
                  style={{ display: 'none' }}
                  onChange={onProfileImageUpload}
                />
                <label htmlFor="profile-photo-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    }}
                  >
                    <CloudUpload fontSize="small" />
                  </IconButton>
                </label>
              </Box>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Profile Photo
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  JPG or PNG, max 5MB
                </Typography>
                {profileImage && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setValue('profilePhoto', '');
                      // @ts-ignore
                      setProfileImage(null);
                    }}
                    color="error"
                    sx={{ mt: 1 }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>

            {/* Name Fields */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <InputField
                  label="First Name *"
                  id="firstName"
                  type="text"
                  required={true}
                  register={register("firstName", {
                    required: "First name is required",
                    minLength: { value: 2, message: "Minimum 2 characters" }
                  })}
                />

              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="Middle Name"
                  id="middleName"
                  type="text"
                  required={false}
                  register={useFormContext().register("middleName")}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputField
                  label="Last Name *"
                  id="lastName"
                  type="text"
                  required={true}
                  register={useFormContext().register("lastName", {
                    required: "Last name is required"
                  })}
                />
              </Grid>
            </Grid>

            {/* Preferred Name */}
            <InputField
              label="Preferred Name (Display Name)"
              id="preferredName"
              type="text"
              required={false}
              register={useFormContext().register("preferredName")}
            />

            {/* Email */}
            <InputField
              label="Email Address *"
              id="email"
              type="email"
              required={true}
              register={useFormContext().register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />

            {/* Phone Number */}
            <InputField
              label="Phone Number"
              id="phoneNumber"
              type="tel"
              required={false}
              register={useFormContext().register("phoneNumber", {
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$/,
                  message: "Invalid phone number format"
                }
              })}
            />

            {/* Date of Birth */}
            <InputField
              label="Date of Birth"
              id="dateOfBirth"
              type="date"
              required={false}
              register={useFormContext().register("dateOfBirth")}
            />

            {/* Gender Selection */}
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                Gender
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['Male', 'Female', 'Other'].map((gender) => (
                  <Chip
                    key={gender}
                    label={gender}
                    onClick={() => handleGenderSelect(gender)}
                    variant={watch('gender') === gender ? "filled" : "outlined"}
                    color={watch('gender') === gender ? "primary" : "default"}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Column - Address & Emergency */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Present Address */}
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Home sx={{ mr: 1 }} />
                Present Address *
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputField
                    label="Address Line 1"
                    id="presentAddress.addressLine1"
                    type="text"
                    required={true}
                    register={useFormContext().register("presentAddress.addressLine1", {
                      required: "Address line 1 is required"
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    label="Address Line 2"
                    id="presentAddress.addressLine2"
                    type="text"
                    required={false}
                    register={useFormContext().register("presentAddress.addressLine2")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    label="City"
                    id="presentAddress.city"
                    type="text"
                    required={true}
                    register={useFormContext().register("presentAddress.city", {
                      required: "City is required"
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    label="State"
                    id="presentAddress.state"
                    type="text"
                    required={true}
                    register={useFormContext().register("presentAddress.state", {
                      required: "State is required"
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    label="Country"
                    id="presentAddress.country"
                    type="text"
                    required={true}
                    register={useFormContext().register("presentAddress.country", {
                      required: "Country is required"
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    label="ZIP Code"
                    id="presentAddress.zipCode"
                    type="text"
                    required={true}
                    register={useFormContext().register("presentAddress.zipCode", {
                      required: "ZIP code is required"
                    })}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Permanent Address */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                  Permanent Address
                </Typography>
                <Controller
                  name="sameAsPresentAddress"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={field.onChange}
                          size="small"
                        />
                      }
                      label={
                        <Typography variant="body2">
                          Same as Present Address
                        </Typography>
                      }
                    />
                  )}
                />
              </Box>

              {!sameAsPresent && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputField
                      label="Address Line 1"
                      id="permanentAddress.addressLine1"
                      type="text"
                      required={!sameAsPresent}
                      register={register("permanentAddress.addressLine1")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      label="Address Line 2"
                      id="permanentAddress.addressLine2"
                      type="text"
                      required={false}
                      register={register("permanentAddress.addressLine2")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      label="City"
                      id="permanentAddress.city"
                      type="text"
                      required={!sameAsPresent}
                      register={register("permanentAddress.city")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputField
                      label="State"
                      id="permanentAddress.state"
                      type="text"
                      required={!sameAsPresent}
                      register={register("permanentAddress.state")}
                    />
                  </Grid>
                </Grid>
              )}
            </Box>

            {/* Emergency Contact */}
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Emergency sx={{ mr: 1 }} />
                Emergency Contact *
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <InputField
                    label="Contact Name"
                    id="emergencyContactName"
                    type="text"
                    required={true}
                    register={useFormContext().register("emergencyContactName", {
                      required: "Emergency contact name is required"
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputField
                    label="Relation"
                    id="emergencyContactRelation"
                    type="text"
                    required={true}
                    register={useFormContext().register("emergencyContactRelation", {
                      required: "Relation is required"
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    label="Phone Number"
                    id="emergencyContactPhone"
                    type="tel"
                    required={true}
                    register={useFormContext().register("emergencyContactPhone", {
                      required: "Emergency contact phone is required",
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: "Invalid phone number format"
                      }
                    })}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mt: 3 }}>
          <Typography variant="subtitle2">
            Please fix the following errors:
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2 }}>
            {Object.entries(errors).map(([key, error]) => (
              <li key={key}>
                <Typography variant="body2">
                  {(error as any)?.message || 'Invalid field'}
                </Typography>
              </li>
            ))}
          </Box>
        </Alert>
      )}
    </Box>
  );
};

export default PersonalInfoTab;