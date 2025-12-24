"use client";

import Link from "next/link";
import React, { useState } from "react";
import { DialogTitle, FormControlLabel, Switch } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { IBranch } from "../BranchTypes";
import InputField from "@/components/elements/SharedInputs/InputField";

const AddBranchMainArea: React.FC = () => {
  const router = useRouter();
  const [status, setStatus] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBranch>();

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStatus(event.target.checked);
  };

  const onSubmit = (data: IBranch) => {
    const payload: IBranch = {
      ...data,
      id: Date.now(),
      status: status ? "Active" : "Inactive",
      createdAt: new Date().toISOString(),
    };

    console.log("Branch Payload:", payload);

    toast.success("Branch added successfully!");
    setTimeout(() => {
      router.push("/owner/branches");
    }, 500);
  };

  return (
    <div className="app__slide-wrapper">
   {/* Breadcrumb */}
            <div className="breadcrumb__wrapper mb-[25px]">
                <nav>
                    <ol className="breadcrumb flex items-center mb-0">
                        <li className="breadcrumb-item">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href="/owner">Owner</Link>
                        </li>
                        <li className="breadcrumb-item active">Add Branch</li>
                    </ol>
                </nav>
            </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add New Branch</h1>
        <p className="text-gray-600 mt-2">Fill in the details below to create a new branch</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Branch Information</h2>
              <p className="text-gray-600 text-sm">Enter branch details carefully</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8">
            <div className="grid grid-cols-12 gap-6">
              {/* Branch Name */}
              <div className="col-span-12 lg:col-span-6">
                <InputField
                  id="branchName"
                  label="Branch Name"
                  required
                  register={register("branchName", {
                    required: "Branch name is required",
                  })}
                  error={errors.branchName}
                />
                {errors.branchName && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.branchName.message}</p>
                )}
              </div>

              {/* Branch Code */}
              <div className="col-span-12 lg:col-span-6">
                <InputField
                  id="branchCode"
                  label="Branch Code"
                  required
                  register={register("branchCode", {
                    required: "Branch code is required",
                  })}
                  error={errors.branchCode}
                />
                {errors.branchCode && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.branchCode.message}</p>
                )}
              </div>

              {/* Section Title */}
              <div className="col-span-12 mt-6 mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-primary mr-3"></div>
                  <h3 className="text-lg font-medium text-gray-700">Location Details</h3>
                </div>
              </div>

              {/* Country */}
              <div className="col-span-12 md:col-span-4">
                <InputField
                  id="country"
                  label="Country"
                  register={register("country")}
                />
              </div>

              {/* State */}
              <div className="col-span-12 md:col-span-4">
                <InputField
                  id="state"
                  label="State/Province"
                  register={register("state")}
                />
              </div>

              {/* City */}
              <div className="col-span-12 md:col-span-4">
                <InputField
                  id="city"
                  label="City"
                  register={register("city")}
                />
              </div>

              {/* Address Line 1 */}
              <div className="col-span-12">
                <InputField
                  id="addressLine1"
                  label="Address Line 1"
                  register={register("addressLine1")}
                />
              </div>

              {/* Address Line 2 */}
              <div className="col-span-12">
                <InputField
                  id="addressLine2"
                  label="Address Line 2"
                  register={register("addressLine2")}
                />
              </div>

              {/* Zip Code */}
              <div className="col-span-12 md:col-span-4">
                <InputField
                  id="zipCode"
                  label="Zip/Postal Code"
                  register={register("zipCode")}
                />
              </div>

              {/* Phone */}
              <div className="col-span-12 md:col-span-4">
                <InputField
                  id="phone"
                  label="Phone Number"
                  register={register("phone")}
                  type="tel"
                />
              </div>

              {/* Email */}
              <div className="col-span-12 md:col-span-4">
                <InputField
                  id="email"
                  label="Email Address"
                  register={register("email")}
                  type="email"
                />
              </div>

              {/* Section Title */}
              <div className="col-span-12 mt-6 mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-primary mr-3"></div>
                  <h3 className="text-lg font-medium text-gray-700">Management Details</h3>
                </div>
              </div>

              {/* Manager Name */}
              <div className="col-span-12 md:col-span-6">
                <InputField
                  id="managerName"
                  label="Manager Name"
                  register={register("managerName")}
                />
              </div>

              {/* Manager Email */}
              <div className="col-span-12 md:col-span-4">
                <InputField
                  id="managerEmail"
                  label="Manager Email"
                  register={register("managerEmail")}
                  type="email"
                />
              </div>

              {/* Total Employees */}
              <div className="col-span-12 md:col-span-2">
                <InputField
                  id="totalEmployees"
                  label="Employees"
                  type="number"
                  register={register("totalEmployees")}
                />
              </div>

              {/* Status */}
              <div className="col-span-12 mt-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Branch Status</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {status 
                          ? "This branch will be active and visible" 
                          : "This branch will be inactive and hidden"}
                      </p>
                    </div>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={status}
                          onChange={handleStatusChange}
                          color="primary"
                          size="medium"
                        />
                      }
                      label={
                        <span className={`font-medium ${status ? 'text-green-600' : 'text-gray-600'}`}>
                          {status ? 'Active' : 'Inactive'}
                        </span>
                      }
                    />
                  </div>
                  <div className={`mt-4 px-4 py-3 rounded-md ${status ? 'bg-green-50 border border-green-200' : 'bg-gray-100 border border-gray-200'}`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${status ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className={`text-sm ${status ? 'text-green-700' : 'text-gray-600'}`}>
                        {status 
                          ? '✓ Branch is ready to accept operations and will be visible in listings.'
                          : '✗ Branch is currently disabled and will not be visible in listings.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-10 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/owner/branches")}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Create Branch
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Quick Tips */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-blue-800">Tips for adding a new branch</h4>
            <ul className="mt-2 text-blue-700 text-sm space-y-1">
              <li>• {"Ensure branch code is unique and follows your organization's naming convention"}</li>
              <li>• Double-check contact information before submission</li>
              <li>• Active branches will be immediately available in the system</li>
              <li>• You can update branch details later if needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBranchMainArea;