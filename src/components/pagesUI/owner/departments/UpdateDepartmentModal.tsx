"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { IDepartment } from "./DepartmentTypes";
import { statePropsType } from "@/interface/common.interface";
import InputField from "@/components/elements/SharedInputs/InputField";

interface Props extends statePropsType {
  editData: IDepartment | null; // ✅ FIXED
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

  const [status, setStatus] = useState<boolean>(true);

  useEffect(() => {
    if (editData) {
      reset(editData);
      setStatus(editData.status === "Active");
    }
  }, [editData, reset]);

      const departmentList = [
        {
            id: 1,
            name: "HR",
            departmentCode: "HR01",
            subDepartments: [
                { id: 3, name: "Recruitment", departmentCode: "HR01-1" },
                { id: 4, name: "Employee Relations", departmentCode: "HR01-2" },
            ],
        },
        {
            id: 2,
            name: "IT",
            departmentCode: "IT01",
            subDepartments: [
                { id: 5, name: "Infrastructure", departmentCode: "IT01-1" },
                { id: 6, name: "Software Development", departmentCode: "IT01-2" },
            ],
        },
        {
            id: 7,
            name: "Finance",
            departmentCode: "FIN01",
            subDepartments: [
                { id: 8, name: "Accounts Payable", departmentCode: "FIN01-1" },
                { id: 9, name: "Accounts Receivable", departmentCode: "FIN01-2" },
            ],
        },
        {
            id: 10,
            name: "Marketing",
            departmentCode: "MKT01",
            subDepartments: [
                { id: 11, name: "Digital Marketing", departmentCode: "MKT01-1" },
                { id: 12, name: "Content Creation", departmentCode: "MKT01-2" },
            ],
        },
    ];

    // Flatten departments + sub-departments for datalist
    const datalistOptions = departmentList.map((dep) => ({
        id: dep.id,
        label: `${dep.name} (${dep.departmentCode})`,
    }));

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStatus(event.target.checked);
  };

  const onSubmit = (data: IDepartment) => {
    if (!editData) return; // ✅ SAFETY GUARD

    onSave({
      ...editData,
      ...data,
      status: status ? "Active" : "Inactive",
    });

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
                id="departmentCode"
                label="Department Code"
                register={register("departmentCode", { required: "Required" })}
                error={errors.departmentCode}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="head"
                label="Department Head"
                register={register("head")}
              />
            </div>

            <div className="col-span-2 items-center mt-5">
              <FormControlLabel
                label="Status"
                control={
                  <Switch
                    checked={status}
                    onChange={handleStatusChange}
                    size="medium"
                    color="primary"
                  />
                }
              />
            </div>

            <div className="col-span-4">
              <InputField
                id="phone"
                label="Phone"
                register={register("phone")}
              />
            </div>

            <div className="col-span-6">
              <InputField
                id="email"
                label="Email"
                register={register("email")}
              />
            </div>

            {/* Parent Department (Datalist) */}
            <div className="col-span-6">
              <label className="form-label">Parent Department</label>
              <input
                className="form-control"
                list="departmentOptions"
                placeholder="Type to search department"
                {...register("parentDepartmentId")}
              />

              <datalist id="departmentOptions">
                {datalistOptions.map((opt) => (
                  <option key={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </datalist>

            </div>

            <div className="col-span-12">
              <InputField
                id="description"
                label="Description"
                register={register("description")}
                isTextArea
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
