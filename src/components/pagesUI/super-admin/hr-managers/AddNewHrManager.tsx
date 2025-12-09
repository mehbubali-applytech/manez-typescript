"use client";
import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";
import { statePropsType } from "@/interface/common.interface";
import { IHrManager } from "./HrManagersMainArea";

const AddNewHrManagerModal = ({ open, setOpen }: statePropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHrManager>();

  const handleToggle = () => setOpen(!open);

  const onSubmit = async (data: IHrManager) => {
    try {
      console.log("HR Manager Payload:", data);
      toast.success("HR Manager added successfully! 🎉");
      setTimeout(() => setOpen(false), 1500);
    } catch {
      toast.error("Failed to add HR Manager.");
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between">
          <h5 className="modal-title">Add HR Manager</h5>
          <button onClick={handleToggle} type="button" className="bd-btn-close">
            ✕
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <InputField
                id="hrName"
                label="HR Name"
                register={register("hrName", { required: "HR name is required" })}
                error={errors.hrName}
              />
            </div>

            <div className="col-span-12">
              <InputField
                id="hrCode"
                label="HR Code"
                register={register("hrCode", { required: "HR code is required" })}
                error={errors.hrCode}
              />
            </div>

            <div className="col-span-12">
              <InputField
                id="department"
                label="Department"
                register={register("department", { required: "Department is required" })}
                error={errors.department}
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewHrManagerModal;
