"use client";

import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";
import { IStaff } from "./staff.interface";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: IStaff | null;
}

const UpdateStaffModal: React.FC<Props> = ({
  open,
  setOpen,
  editData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IStaff>({
    defaultValues: {
      staffName: "",
      staffCode: "",
      companyName: "",
      department: "",
    },
  });

  const handleToggle = () => {
    reset();
    setOpen(false);
  };

  // ✅ Prefill data on edit
  useEffect(() => {
    if (editData) {
      reset({
        staffName: editData.staffName,
        staffCode: editData.staffCode,
        companyName: editData.companyName,
        department: editData.department,
      });
    }
  }, [editData, reset]);

  const onSubmit = async (data: IStaff) => {
    try {
      console.log("Updated Staff Payload:", data);
      toast.success("Staff updated successfully ✅");
      setTimeout(() => handleToggle(), 1200);
    } catch {
      toast.error("Failed to update staff ❌");
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <h5 className="modal-title">Update Staff</h5>
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
            {/* Staff Name */}
            <div className="col-span-12">
              <InputField
                id="staffName"
                label="Staff Name"
                register={register("staffName", {
                  required: "Staff name is required",
                })}
                error={errors.staffName}
              />
            </div>

            {/* Staff Code (READ ONLY ✅) */}
            <div className="col-span-12">
              <InputField
                id="staffCode"
                label="Staff Code"
                register={register("staffCode", {
                  disabled: true,
                })}
                error={errors.staffCode}
              />
            </div>

            {/* Company Name */}
            <div className="col-span-12">
              <InputField
                id="companyName"
                label="Company Name"
                register={register("companyName", {
                  required: "Company name is required",
                })}
                error={errors.companyName}
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

export default UpdateStaffModal;
