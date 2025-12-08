"use client";

import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";
import { statePropsType } from "@/interface/common.interface";
import { ICompany } from "./CompaniesMainArea";

const AddNewCompanyModal = ({ open, setOpen }: statePropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompany>();

  const handleToggle = () => setOpen(!open);

  const onSubmit = async (data: ICompany) => {
    try {
      console.log("Company Payload:", data);

      toast.success("Company added successfully! 🎉");
      setTimeout(() => setOpen(false), 1500);
    } catch {
      toast.error("Failed to add company. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleToggle}
      fullWidth
      maxWidth="sm"
      sx={{ "& .MuiDialog-paper": { width: "500px" } }}
    >
      <DialogTitle>
        <div className="flex justify-between">
          <h5 className="modal-title">Add New Company</h5>
          <button onClick={handleToggle} type="button" className="bd-btn-close">
            <i className="fa-solid fa-xmark-large"></i>
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card__wrapper">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <InputField
                  label="Company Name"
                  id="companyName"
                  type="text"
                  register={register("companyName", {
                    required: "Company name is required",
                  })}
                  error={errors.companyName}
                />
              </div>

              <div className="col-span-12">
                <InputField
                  label="Company Code"
                  id="companyCode"
                  type="text"
                  register={register("companyCode", {
                    required: "Company code is required",
                  })}
                  error={errors.companyCode}
                />
              </div>
            </div>
          </div>

          <div className="submit__btn text-center mt-4">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCompanyModal;
