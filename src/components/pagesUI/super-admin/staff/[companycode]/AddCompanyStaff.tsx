"use client";
import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";
import { statePropsType } from "@/interface/common.interface";
import { IStaff } from "../staff.interface";

const AddCompanyStaff = ({ open, setOpen }: statePropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStaff>();

  const handleToggle = () => setOpen(!open);

  const onSubmit = async (data: IStaff) => {
    try {
      console.log("Staff Payload:", data);
      toast.success("Staff added successfully! 🎉");
      setTimeout(() => setOpen(false), 1500);
    } catch {
      toast.error("Failed to add staff. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between">
          <h5>Add New Staff</h5>
          <button onClick={handleToggle} className="bd-btn-close">
            <i className="fa-solid fa-xmark-large"></i>
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card__wrapper grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <InputField
                id="staffName"
                label="Staff Name"
                type="text"
                register={register("staffName", { required: "Name is required" })}
                error={errors.staffName}
              />
            </div>

            <div className="col-span-12">
              <InputField
                id="staffCode"
                label="Staff Code"
                type="text"
                register={register("staffCode", { required: "Code is required" })}
                error={errors.staffCode}
              />
            </div>

              <div className="col-span-12">
                <InputField
                  id="companyName"
                  label="Company Name"
                  type="text"
                  register={register("companyName")}
                  error={errors.companyName}
                />
              </div>

              <div className="col-span-12">
                <InputField
                  id="department"
                  label="Department"
                  type="text"
                  register={register("department", {
                    required: "Department is required",
                  })}
                  error={errors.department}
                />
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

export default AddCompanyStaff;
