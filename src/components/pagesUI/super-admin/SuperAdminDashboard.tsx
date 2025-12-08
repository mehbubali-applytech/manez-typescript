"use client";
import React from "react";

const SuperAdminDashboard = () => {
  return (
    <>
      <div className="app__slide-wrapper">
        <div className="grid grid-cols-12 gap-x-5 maxXs:gap-x-0">
          {/* Overview Cards */}
          <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
            <div className="card">
              <div className="card__body">
                <div className="flex justify-between items-center mb-3">
                  <h6 className="card__title">Total Companies</h6>
                  <span className="text-primary text-xl">🏢</span>
                </div>
                <h2 className="text-3xl font-bold">24</h2>
                <p className="text-sm text-muted mt-2">Active companies</p>
              </div>
            </div>
          </div>

          <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
            <div className="card">
              <div className="card__body">
                <div className="flex justify-between items-center mb-3">
                  <h6 className="card__title">Active Users</h6>
                  <span className="text-success text-xl">👥</span>
                </div>
                <h2 className="text-3xl font-bold">1,240</h2>
                <p className="text-sm text-muted mt-2">Across all companies</p>
              </div>
            </div>
          </div>

          <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
            <div className="card">
              <div className="card__body">
                <div className="flex justify-between items-center mb-3">
                  <h6 className="card__title">Active Subscriptions</h6>
                  <span className="text-warning text-xl">📊</span>
                </div>
                <h2 className="text-3xl font-bold">18</h2>
                <p className="text-sm text-muted mt-2">Paid subscriptions</p>
              </div>
            </div>
          </div>

          <div className="col-span-3 maxXl:col-span-4 maxLg:col-span-6 maxSm:col-span-12">
            <div className="card">
              <div className="card__body">
                <div className="flex justify-between items-center mb-3">
                  <h6 className="card__title">System Health</h6>
                  <span className="text-success text-xl">✓</span>
                </div>
                <h2 className="text-3xl font-bold">98%</h2>
                <p className="text-sm text-muted mt-2">Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
