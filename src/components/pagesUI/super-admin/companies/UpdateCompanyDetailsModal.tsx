"use client";
import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import SelectBox from "@/components/elements/SharedInputs/SelectBox";
import { toast } from "sonner";
import { ICompany } from "./CompaniesMainArea";
import { countriesData } from "@/data/country-data";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData?: ICompany | null;
}

const UpdateCompanyDetailsModal: React.FC<Props> = ({
  open,
  setOpen,
  editData,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICompany>();

  const handleToggle = () => setOpen(!open);

  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const onSubmit = async (data: ICompany) => {
    try {
      console.log("Updated Company:", data);
      toast.success("Company details updated successfully!");
      setTimeout(() => setOpen(false), 1500);
    } catch (error) {
      toast.error("Failed to update company details.");
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
          <h5 className="modal-title">Update Company Details</h5>
          <button onClick={handleToggle} type="button" className="bd-btn-close">
            <i className="fa-solid fa-xmark-large"></i>
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card__wrapper">
            <div className="grid grid-cols-12 gap-x-4 gap-y-4">

              {/* Company Name */}
              <div className="col-span-12">
                <InputField
                  label="Company Name"
                  id="companyName"
                  register={register("companyName", {
                    required: "Company name is required",
                  })}
                  error={errors.companyName}
                />
              </div>

              {/* Company Code */}
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

              {/* Domain */}
              <div className="col-span-6">
                <InputField
                  label="Domain / Subdomain"
                  id="domain"
                  register={register("domain")}
                  error={errors.domain}
                />
              </div>

              {/* Address 1 */}
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

              {/* Address 2 */}
              <div className="col-span-12">
                <InputField
                  label="Address Line 2"
                  id="address2"
                  register={register("address2")}
                  error={errors.address2}
                />
              </div>

              {/* City */}
              <div className="col-span-4">
                <InputField
                  label="City"
                  id="city"
                  register={register("city", { required: "City is required" })}
                  error={errors.city}
                />
              </div>

              {/* State */}
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

              {/* Country */}
              <div className="col-span-4">
                <SelectBox
                  id="country"
                  label="Country"
                  options={countriesData}
                  control={control}
                  isRequired
                  defaultValue={editData?.country}
                />
              </div>

              {/* Postal Code */}
              <div className="col-span-6">
                <InputField
                  label="Postal Code"
                  id="postalCode"
                  register={register("postalCode")}
                  error={errors.postalCode}
                />
              </div>

            </div>
          </div>

          <div className="submit__btn text-center mt-4">
            <button className="btn btn-primary" type="submit">
              Update Company
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCompanyDetailsModal;
