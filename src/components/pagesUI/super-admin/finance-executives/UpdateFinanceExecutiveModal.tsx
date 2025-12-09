"use client";
import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "@/components/elements/SharedInputs/InputField";
import { toast } from "sonner";
import { IFinanceExecutive } from "./FinanceExecutivesMainArea";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: IFinanceExecutive | null;
}

const UpdateFinanceExecutiveModal: React.FC<Props> = ({
  open,
  setOpen,
  editData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFinanceExecutive>();

  const handleToggle = () => setOpen(false);

  // ✅ Prefill form values
  useEffect(() => {
    if (editData) {
      reset({
        finName: editData.finName,
        finCode: editData.finCode,
        department: editData.department,
        company: editData.company,
      });
    }
  }, [editData, reset]);

  const onSubmit = async (data: IFinanceExecutive) => {
    try {
      console.log("Updated Finance Executive:", data);
      toast.success("Finance Executive updated successfully ✅");
      setTimeout(() => setOpen(false), 1500);
    } catch {
      toast.error("Failed to update Finance Executive ❌");
    }
  };

  return (
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <h5 className="modal-title">Update Finance Executive</h5>
          <button onClick={handleToggle} type="button" className="bd-btn-close">
            ✕
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4">
            {/* ✅ Name */}
            <div className="col-span-12">
              <InputField
                id="finName"
                label="Finance Executive Name"
                register={register("finName", {
                  required: "Name is required",
                })}
                error={errors.finName}
              />
            </div>

            {/* ✅ Code (read-only logically, but unchanged on submit) */}
            <div className="col-span-12">
              <InputField
                id="finCode"
                label="Finance Executive Code"
                register={register("finCode", {
                  required: "Code is required",
                })}
                error={errors.finCode}
              />
            </div>

            {/* ✅ Department */}
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

            {/* ✅ Company */}
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
          </div>

          <div className="submit__btn text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFinanceExecutiveModal;
