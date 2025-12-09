"use client";
import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";

interface IEmployee {
  employeeName: string;
  employeeCode: string;
  company: string;
  department: string;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddNewEmployeeModal: React.FC<Props> = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployee>();

  const handleToggle = () => setOpen(false);

  const onSubmit = async (data: IEmployee) => {
    try {
      console.log("Employee Payload:", data);
      toast.success("Employee added successfully! 🎉");
      setTimeout(() => setOpen(false), 1500);
    } catch {
      toast.error("Failed to add employee.");
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <h5 className="modal-title">Add New Employee</h5>
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
                id="employeeName"
                label="Employee Name"
                register={register("employeeName", {
                  required: "Employee name is required",
                })}
                error={errors.employeeName}
              />
            </div>

            {/* Employee Code */}
            <div className="col-span-12">
              <InputField
                id="employeeCode"
                label="Employee Code"
                register={register("employeeCode", {
                  required: "Employee code is required",
                })}
                error={errors.employeeCode}
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
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewEmployeeModal;
