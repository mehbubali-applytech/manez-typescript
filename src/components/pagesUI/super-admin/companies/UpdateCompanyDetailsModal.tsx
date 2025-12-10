"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputField from "@/components/elements/SharedInputs/InputField";
import SelectBox from "@/components/elements/SharedInputs/SelectBox";
import BoxStepWithIcon, {
  StepItem,
} from "@/components/elements/advanced-ui/steps/BoxStepWithIcon";

import { ICompany } from "./CompaniesMainArea";
import { countriesData } from "@/data/country-data";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData?: ICompany | null;
}

const steps: StepItem[] = [
  {
    step: 1,
    title: "Company Info",
    icon: "fa-solid fa-building",
  },
  {
    step: 2,
    title: "Primary Contact",
    icon: "fa-solid fa-user",
  },
  {
    step: 3,
    title: "Settings",
    icon: "fa-solid fa-sliders",
  },
  {
    step: 4,
    title: "Modules",
    icon: "fa-solid fa-layer-group",
  },
];

const UpdateCompanyDetailsModal: React.FC<Props> = ({
  open,
  setOpen,
  editData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<ICompany>();

  const attendanceEnabled = watch("attendance");

  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const handleToggle = () => setOpen(false);

  const onSubmit = async (data: ICompany) => {
    try {
      console.log("Updated Company:", data);
      toast.success("Company updated successfully ✅");
      setTimeout(() => setOpen(false), 1500);
    } catch {
      toast.error("Failed to update company ❌");
    }
  };

  return (
<Dialog
  open={open}
  onClose={handleToggle}
  fullWidth
  maxWidth="lg"
>


      <DialogTitle>
        <div className="flex justify-between items-center">
          <h5 className="modal-title">Update Company Details</h5>
          <button onClick={handleToggle} className="bd-btn-close">✕</button>
        </div>
      </DialogTitle>

      <DialogContent>
        <BoxStepWithIcon
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">

          {/* ================= STEP 1 ================= */}
          {currentStep === 1 && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <InputField
                  id="companyName"
                  label="Company Name"
                  register={register("companyName", { required: true })}
                  error={errors.companyName}
                />
              </div>

              <div className="col-span-6">
                <InputField
                  id="companyCode"
                  label="Company Code"
                  register={register("companyCode", { required: true })}
                  error={errors.companyCode}
                />
              </div>

              <div className="col-span-6">
                <InputField
                  id="domain"
                  label="Domain / Subdomain"
                  register={register("domain")}
                  error={errors.domain}
                />
              </div>

              <div className="col-span-12">
                <InputField
                  id="address1"
                  label="Address Line 1"
                  register={register("address1", { required: true })}
                  error={errors.address1}
                />
              </div>

              <div className="col-span-6">
                <InputField
                  id="city"
                  label="City"
                  register={register("city", { required: true })}
                  error={errors.city}
                />
              </div>

              <div className="col-span-6">
                <SelectBox
                  id="country"
                  label="Country"
                  options={countriesData}
                  control={control}
                  isRequired
                />
              </div>
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {currentStep === 2 && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <InputField
                  id="contactName"
                  label="Contact Person Name"
                  register={register("contactName", { required: true })}
                  error={errors.contactName}
                />
              </div>

              <div className="col-span-6">
                <InputField
                  id="contactEmail"
                  label="Contact Email"
                  register={register("contactEmail", { required: true })}
                  error={errors.contactEmail}
                />
              </div>

              <div className="col-span-6">
                <InputField
                  id="contactPhone"
                  label="Contact Phone"
                  register={register("contactPhone")}
                  error={errors.contactPhone}
                />
              </div>
            </div>
          )}

          {/* ================= STEP 3 ================= */}
          {currentStep === 3 && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4">
                <SelectBox
                  id="companyStatus"
                  label="Company Status"
                  control={control}
                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Suspended", value: "Suspended" },
                    { label: "Pending", value: "Pending" },
                  ]}
                  isRequired
                />
              </div>

              <div className="col-span-4">
                <SelectBox
                  id="assignedPlan"
                  label="Assigned Plan"
                  control={control}
                  options={[
                    { label: "Free", value: "Free" },
                    { label: "Pro", value: "Pro" },
                    { label: "Enterprise", value: "Enterprise" },
                  ]}
                />
              </div>

              <div className="col-span-4">
                <InputField
                  id="employeeLimit"
                  label="Employee Limit"
                  register={register("employeeLimit")}
                  error={errors.employeeLimit}
                />
              </div>
            </div>
          )}

          {/* ================= STEP 4 ================= */}
          {currentStep === 4 && (
            <div className="grid grid-cols-12 gap-4">
              <label className="col-span-6">
                <input type="checkbox" {...register("attendance")} /> Attendance
              </label>

              {attendanceEnabled && (
                <div className="col-span-6">
                  <SelectBox
                    id="attendanceLevel"
                    label="Attendance Level"
                    control={control}
                    options={[
                      { label: "Basic", value: "Basic" },
                      { label: "Advanced", value: "Advanced" },
                    ]}
                  />
                </div>
              )}

              <label className="col-span-6">
                <input type="checkbox" {...register("leaveManagement")} /> Leave
                Management
              </label>

              <label className="col-span-6">
                <input type="checkbox" {...register("payroll")} /> Payroll
              </label>

              <label className="col-span-6">
                <input type="checkbox" {...register("offerLetters")} /> Offer Letters
              </label>

              <label className="col-span-6">
                <input type="checkbox" {...register("compliance")} /> Compliance
              </label>
            </div>
          )}

          {/* ✅ ACTION BUTTONS */}
          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Back
              </button>
            )}

            {currentStep < steps.length ? (
              <button
                type="button"
                className="btn btn-primary ml-auto"
                onClick={() => setCurrentStep((s) => s + 1)}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-success ml-auto">
                Update Company
              </button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCompanyDetailsModal;
