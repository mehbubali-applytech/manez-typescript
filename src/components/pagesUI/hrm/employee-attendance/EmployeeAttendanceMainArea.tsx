import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import React from "react";
import EmployeeAttendanceSummary from "./EmployeeAttendanceSummary";
import EmployeeAttendanceTable from "./EmployeeAttendanceTable";
import Link from "next/link";

const EmployeeAttendanceMainArea = () => {
  return (
    <>
      <div className="app__slide-wrapper">
        <div className="breadcrumb__wrapper mb-[25px]">
          <nav>
            <ol className="breadcrumb flex items-center mb-0">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Employee
              </li>
            </ol>
          </nav>
  
        </div>
        <EmployeeAttendanceTable/>
 
      </div>
    </>
  );
};

export default EmployeeAttendanceMainArea;
