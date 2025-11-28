"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";
import EmployeeAttendanceTable from "./EmployeeAttendanceTable";
import Link from "next/link";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EmployeeAttendanceMainArea = () => {
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [selectedYear, setSelectedYear] = useState(2025);

  const transformAttendanceData = useCallback((rawData: any[]) => {
    return rawData.map((employee, index) => {
      const employeeInfo = employee.info || employee;

      const transformedEmployee: any = {
        employeeImg: "/default-avatar.jpg",
        name:
          `${employeeInfo.first_name || ""} ${employeeInfo.last_name || ""}`.trim() ||
          `Employee ${index + 1}`,
      };

      // initialize 31 days
      for (let i = 1; i <= 31; i++) {
        transformedEmployee[`date${i}`] = "Absent";
      }

      // fill actual attendance
      const attendanceArray = employeeInfo.attendance || employeeInfo.attendances || [];
      attendanceArray.forEach((att: any) => {
        const d = new Date(att.attendance_date);
        const day = d.getDate();
        transformedEmployee[`date${day}`] = att.status;
      });

      return transformedEmployee;
    });
  }, []);

  const fetchAttendance = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://payroll-baas.onrender.com/api/employee/attendance?month=${selectedMonth}&year=${selectedYear}`
      );

      const apiData = response.data.data || [];
      const transformed = transformAttendanceData(apiData);

      setAttendanceData(transformed);
    } catch (err) {
      console.error("Error loading attendance:", err);
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  }, [selectedMonth, selectedYear, transformAttendanceData]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return (
    <div className="app__slide-wrapper">
      <div className="breadcrumb__wrapper mb-[25px]">
        <nav>
          <ol className="breadcrumb flex items-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Employee</li>
          </ol>
        </nav>
      </div>

      {loading ? (
        <p className="text-center mt-5">Loading...</p>
      ) : (
        <EmployeeAttendanceTable
          attendance={attendanceData}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
      )}
    </div>
  );
};

export default EmployeeAttendanceMainArea;
