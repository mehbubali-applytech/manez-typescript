"use client";

import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { IDepartment } from "./DepartmentTypes";
import { statePropsType } from "@/interface/common.interface";

import InputField from "@/components/elements/SharedInputs/InputField";

interface Props extends statePropsType {
  editData: IDepartment;
  onSave: (payload: Partial<IDepartment>) => void;
}

const UpdateDepartmentModal: React.FC<Props> = ({
  open,
  setOpen,
  editData,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDepartment>();

  useEffect(() => {
    reset(editData);
  }, [editData, reset]);

  const onSubmit = (data: IDepartment) => {
    onSave({ ...editData, ...data });
    toast.success("Department updated successfully!");
    setTimeout(() => setOpen(false), 500);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Update Department</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <InputField
                id="name"
                label="Department Name"
                register={register("name", { required: "Required" })}
                error={errors.name}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="departmentId"
                label="Department ID"
                register={register("departmentId")}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="head"
                label="Department Head"
                register={register("head")}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="phone"
                label="Phone"
                register={register("phone")}
              />
            </div>

            <div className="col-span-12">
              <InputField
                id="email"
                label="Email"
                register={register("email")}
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDepartmentModal;
