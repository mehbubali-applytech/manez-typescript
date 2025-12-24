"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { IDepartment } from "../DepartmentTypes";
import InputField from "@/components/elements/SharedInputs/InputField";

const AddDeptMainArea: React.FC = () => {
    const router = useRouter();
    const [status, setStatus] = useState<boolean>(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IDepartment>();

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
    ];

    const datalistOptions = [
        ...departmentList.map(dep => ({
            id: dep.id,
            label: `${dep.name} (${dep.departmentCode})`,
        })),
        ...departmentList.flatMap(dep =>
            dep.subDepartments.map(sub => ({
                id: sub.id,
                label: `${dep.name} → ${sub.name} (${sub.departmentCode})`,
            }))
        ),
    ];

    const onSubmit = (data: IDepartment) => {
        const payload: IDepartment = {
            ...data,
            id: Date.now(),
            created_at: new Date().toISOString(),
            status: status ? "Active" : "Inactive",
        };

        console.log(payload);
        toast.success("Department added successfully!");
        setTimeout(() => router.push("/owner/departments"), 500);
    };

    return (
        <div className="app__slide-wrapper">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-6">Add New Department</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    id="name"
                    label="Department Name"
                    register={register("name", { required: true })}
                    error={errors.name}
                />

                <InputField
                    id="departmentCode"
                    label="Department Code"
                    register={register("departmentCode", { required: true })}
                    error={errors.departmentCode}
                />

                {/* Guidelines */}
                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">
                        Department Creation Guidelines
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>
                            • Use consistent naming conventions (e.g., &quot;HR&quot;, &quot;IT&quot;, &quot;Finance&quot;)
                        </li>
                        <li>
                            • Department codes should be unique and follow your organization&apos;s pattern
                        </li>
                        <li>• Parent department is optional</li>
                        <li>• Active departments are immediately available</li>
                    </ul>
                </div>

                <button
                    type="submit"
                    className="mt-6 px-6 py-3 bg-primary text-white rounded-lg"
                >
                    Create Department
                </button>
            </form>
        </div>
    );
};

export default AddDeptMainArea;
