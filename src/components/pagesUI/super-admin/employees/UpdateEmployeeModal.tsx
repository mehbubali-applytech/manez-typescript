"use client";
import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";
import { IEmployee } from "@/interface/employee.interface";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: IEmployee | null;
}

const UpdateEmployeeModal: React.FC<Props> = ({
  open,
  setOpen,
  editData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEmployee>();

  const handleToggle = () => setOpen(false);

  // ✅ Prefill form on edit
  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const onSubmit = async (data: IEmployee) => {
    try {
      console.log("Updated Employee Payload:", data);
      toast.success("Employee updated successfully! 🎉");
      setTimeout(() => setOpen(false), 1500);
    } catch {
      toast.error("Failed to update employee.");
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <h5 className="modal-title">Update Employee</h5>
          <button onClick={handleToggle} type="button" className="bd-btn-close">
            ✕
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4">
            {/* Employee Name */}
            <div className="col-span-12">
              <InputField
                id="empName"
                label="Employee Name"
                register={register("empName", {
                  required: "Employee name is required",
                })}
                error={errors.empName}
              />
            </div>

            {/* Employee Code */}
            <div className="col-span-12">
              <InputField
                id="empCode"
                label="Employee Code"
                register={register("empCode", {
                  required: "Employee code is required",
                })}
                error={errors.empCode}
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

export default UpdateEmployeeModal;
