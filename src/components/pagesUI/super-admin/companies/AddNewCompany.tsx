"use client";

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";
import { statePropsType } from "@/interface/common.interface";
import { ICompany } from "./CompaniesMainArea";
import { countriesData } from "@/data/country-data";

const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const allowedLogoTypes = ["image/png", "image/jpeg", "image/svg+xml"];

const hostnameRegex =
  /^(?=.{1,253}$)((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,63}$|^[A-Za-z0-9.-]{1,253}$/;

const AddNewCompanyModal = ({ open, setOpen }: statePropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICompany>({
    defaultValues: {
      id: 0, // ✅ added (useful for edit)
      companyName: "",
      companyCode: "",
      domain: "",
      companyLogo: "",
      address1: "",
      address2: "",
      city: "",
      stateProvince: "",
      country: "",
      postalCode: "",
    },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleToggle = () => setOpen(!open);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedLogoTypes.includes(file.type)) {
      toast.error("Only PNG, JPG or SVG files are allowed.");
      return;
    }

    if (file.size > MAX_LOGO_SIZE) {
      toast.error("Logo must be 5MB or smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setLogoPreview(result);
      setValue("companyLogo", result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: ICompany) => {
    try {
      console.log("Company Payload:", data);
      toast.success("Company saved successfully 🎉");
      setTimeout(() => setOpen(false), 1200);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save company.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleToggle}
      fullWidth
      maxWidth="sm"
      sx={{ "& .MuiDialog-paper": { width: "600px" } }}
    >
      <DialogTitle>
        <div className="flex justify-between">
          <h5 className="modal-title">Add / Edit Company</h5>
          <button type="button" onClick={handleToggle} className="bd-btn-close">
            <i className="fa-solid fa-xmark-large" />
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ✅ hidden id field */}
          <input type="hidden" {...register("id")} />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <InputField
                label="Company Name"
                id="companyName"
                register={register("companyName", {
                  required: "Company name is required",
                  maxLength: { value: 150, message: "Max 150 characters" },
                })}
                error={errors.companyName}
              />
            </div>

            <div className="col-span-6">
              <InputField
                label="Company Code"
                id="companyCode"
                register={register("companyCode", {
                  required: "Company code is required",
                })}
                error={errors.companyCode}
              />
            </div>

            <div className="col-span-6">
              <InputField
                label="Domain / Subdomain"
                id="domain"
                register={register("domain", {
                  validate: (v) =>
                    !v || hostnameRegex.test(v) || "Invalid hostname",
                })}
                error={errors.domain}
              />
            </div>

            <div className="col-span-12">
              <label className="form-label">Company Logo</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleFileChange}
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="mt-2"
                  style={{ width: 120 }}
                />
              )}
            </div>

            <div className="col-span-12">
              <InputField
                label="Address Line 1"
                id="address1"
                register={register("address1", {
                  required: "Address is required",
                })}
                error={errors.address1}
              />
            </div>

            <div className="col-span-12">
              <InputField
                label="Address Line 2"
                id="address2"
                register={register("address2")}
                error={errors.address2}
              />
            </div>

            <div className="col-span-4">
              <InputField
                label="City"
                id="city"
                register={register("city", { required: "City is required" })}
                error={errors.city}
              />
            </div>

            <div className="col-span-4">
              <InputField
                label="State / Province"
                id="stateProvince"
                register={register("stateProvince", {
                  required: "State is required",
                })}
                error={errors.stateProvince}
              />
            </div>

            <div className="col-span-4">
              <label className="form-label">Country</label>
              <select
                className={`form-control ${errors.country ? "is-invalid" : ""}`}
                {...register("country", { required: "Country is required" })}
              >
                <option value="">Select country</option>
                {countriesData.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-danger text-sm">{errors.country.message}</p>
              )}
            </div>

            <div className="col-span-12">
              <InputField
                label="Postal Code / ZIP"
                id="postalCode"
                register={register("postalCode")}
                error={errors.postalCode}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-primary" type="submit">
              Save Company
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCompanyModal;
