"use client";

import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";
import { IHrManager } from "./HrManagersMainArea";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: IHrManager | null;
}

const UpdateHrManagerModal: React.FC<Props> = ({
  open,
  setOpen,
  editData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IHrManager>({
    defaultValues: {
      hrName: "",
      hrCode: "",
      company: "",
      department: "",
    },
  });

  const handleToggle = () => {
    reset();
    setOpen(false);
  };

  // ✅ Prefill form on edit
  useEffect(() => {
    if (editData) {
      reset({
        hrName: editData.hrName,
        hrCode: editData.hrCode,
        company: editData.company,
        department: editData.department,
      });
    }
  }, [editData, reset]);

  const onSubmit = async (data: IHrManager) => {
    try {
      console.log("Updated HR Manager:", data);
      toast.success("HR Manager updated successfully ✅");
      setTimeout(() => handleToggle(), 1200);
    } catch {
      toast.error("Failed to update HR Manager ❌");
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <h5 className="modal-title">Update HR Manager</h5>
          <button
            type="button"
            className="bd-btn-close"
            onClick={handleToggle}
          >
            ✕
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4">
            {/* HR Name */}
            <div className="col-span-12">
              <InputField
                id="hrName"
                label="HR Manager Name"
                register={register("hrName", {
                  required: "HR Manager name is required",
                })}
                error={errors.hrName}
              />
            </div>

            {/* HR Code (READ ONLY ✅) */}
            <div className="col-span-12">
              <InputField
                id="hrCode"
                label="HR Code"
                register={register("hrCode", {
                  disabled: true, // ✅ CORRECT WAY
                })}
                error={errors.hrCode}
              />
            </div>

            {/* Company */}
            <div className="col-span-12">
              <InputField
                id="company"
                label="Company"
                register={register("company", {
                  required: "Company is required",
                })}
                error={errors.company}
              />
            </div>

            {/* Department */}
            <div className="col-span-12">
              <InputField
                id="department"
                label="Department"
                register={register("department", {
                  required: "Department is required",
                })}
                error={errors.department}
              />
            </div>
          </div>

          <div className="submit__btn text-center mt-4">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateHrManagerModal;
