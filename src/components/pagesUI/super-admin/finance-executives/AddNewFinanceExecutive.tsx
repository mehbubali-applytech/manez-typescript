"use client";
import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";
import { statePropsType } from "@/interface/common.interface";
import { IFinanceExecutive } from "./FinanceExecutivesMainArea";

const AddNewFinanceExecutiveModal = ({ open, setOpen }: statePropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFinanceExecutive>();

  const handleToggle = () => setOpen(!open);

  const onSubmit = async (data: IFinanceExecutive) => {
    try {
      console.log("Finance Executive Payload:", data);
      toast.success("Finance Executive added successfully! 🎉");
      setTimeout(() => setOpen(false), 1500);
    } catch {
      toast.error("Failed to add Finance Executive.");
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between">
          <h5 className="modal-title">Add Finance Executive</h5>
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
                id="finName"
                label="Finance Executive Name"
                register={register("finName", { required: "Name is required" })}
                error={errors.finName}
              />
            </div>

            <div className="col-span-12">
              <InputField
                id="finCode"
                label="Finance Code"
                register={register("finCode", { required: "Code is required" })}
                error={errors.finCode}
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

export default AddNewFinanceExecutiveModal;
