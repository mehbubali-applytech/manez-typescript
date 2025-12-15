"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { toast } from "sonner";

import { IEmployee } from "./EmployeeTypes";
import { statePropsType } from "@/interface/common.interface";
import { employeeDesignationData } from "@/data/dropdown-data";

import InputField from "@/components/elements/SharedInputs/InputField";
import FormLabel from "@/components/elements/SharedInputs/FormLabel";
import SelectBox from "@/components/elements/SharedInputs/SelectBox";

interface UpdateEmployeeModalProps extends statePropsType {
  editData: IEmployee;
  onSave: (payload: Partial<IEmployee>) => void;
}

const UpdateEmployeeModal: React.FC<UpdateEmployeeModalProps> = ({
  open,
  setOpen,
  editData,
  onSave,
}) => {
  const [joiningDate, setJoiningDate] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IEmployee>();

  useEffect(() => {
    reset({
      ...editData,
      employeeID: editData.employeeId,
    });

    setJoiningDate(
      editData.joiningDate ? new Date(editData.joiningDate) : null
    );
  }, [editData, reset]);

  const onSubmit = (data: IEmployee) => {
    const payload: IEmployee = {
      ...editData,
      ...data,
      name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
      joiningDate: joiningDate
        ? joiningDate.toISOString().split("T")[0]
        : editData.joiningDate,
    };

    onSave(payload);
    toast.success("Employee updated successfully!");
    setTimeout(() => setOpen(false), 500);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <DialogTitle>Update Employee</DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <InputField
                id="first_name"
                label="First Name"
                register={register("first_name", { required: "Required" })}
                error={errors.first_name}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="last_name"
                label="Last Name"
                register={register("last_name", { required: "Required" })}
                error={errors.last_name}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="phone"
                label="Phone"
                register={register("phone", { required: "Required" })}
                error={errors.phone}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="email"
                label="Email"
                register={register("email")}
                error={errors.email}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="username"
                label="Username"
                register={register("username")}
                error={errors.username}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="employeeID"
                label="Employee ID"
                register={register("employeeID", { required: "Required" })}
                error={errors.employeeID}
              />
            </div>

            <div className="col-span-6">
              <SelectBox
                id="designation"
                label="Designation"
                options={employeeDesignationData}
                control={control}
                isRequired
              />
            </div>

            <div className="col-span-6">
              <FormLabel id="joining_date" label="Joining Date" />
              <DatePicker
                selected={joiningDate}
                onChange={setJoiningDate}
                className="w-full"
                dateFormat="dd/MM/yyyy"
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

export default UpdateEmployeeModal;
