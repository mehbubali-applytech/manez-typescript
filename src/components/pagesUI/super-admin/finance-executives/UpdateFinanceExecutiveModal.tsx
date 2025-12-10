"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputField from "@/components/elements/SharedInputs/InputField";
import BoxStepWithIcon, {
  StepItem,
} from "@/components/elements/advanced-ui/steps/BoxStepWithIcon";
import { IFinanceExecutive } from "./FinanceExecutivesMainArea";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: IFinanceExecutive | null;
}

const steps: StepItem[] = [
  {
    step: 1,
    title: "Basic Info",
    icon: "fa-solid fa-user",
  },
  {
    step: 2,
    title: "Work Info",
    icon: "fa-solid fa-building",
  },
  {
    step: 3,
    title: "Review",
    icon: "fa-solid fa-circle-check",
  },
];

const UpdateFinanceExecutiveModal: React.FC<Props> = ({
  open,
  setOpen,
  editData,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

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
    <Dialog open={open} onClose={handleToggle} fullWidth maxWidth="md">
      <DialogTitle>
        <div className="flex justify-between items-center">
          <h5 className="modal-title">Update Finance Executive</h5>
          <button onClick={handleToggle} type="button" className="bd-btn-close">
            ✕
          </button>
        </div>
      </DialogTitle>

      <DialogContent>
        {/* ✅ STEP UI (NOW CORRECT) */}
        <BoxStepWithIcon
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />

        {/* ✅ FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="grid grid-cols-12 gap-4">
            {/* STEP 1 */}
            {currentStep === 1 && (
              <>
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
              </>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <>
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
              </>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="col-span-12 text-center">
                <p className="text-gray-600">
                  ✅ Review all details before updating.
                </p>
              </div>
            )}
          </div>

          <div className="submit__btn text-center mt-6 flex justify-center gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Back
              </button>
            )}

            {currentStep < steps.length ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setCurrentStep((s) => s + 1)}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFinanceExecutiveModal;
