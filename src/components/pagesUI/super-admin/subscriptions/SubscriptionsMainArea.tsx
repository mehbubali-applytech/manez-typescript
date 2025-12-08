"use client";
import React from "react";
import Breadcrumb from "@/common/Breadcrumb/breadcrumb";

const SubscriptionsMainArea = () => {
  return (
    <>
      <div className="app__slide-wrapper">
        <Breadcrumb breadTitle="Subscriptions" subTitle="Super Admin" />
        <div className="card">
          <div className="card__header">
            <h5 className="card__title">Subscription Plans</h5>
          </div>
          <div className="card__body">
            <table className="table">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Price</th>
                  <th>Features</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic</td>
                  <td>$99/month</td>
                  <td>HRM, Basic Reports</td>
                  <td><span className="badge badge-success">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionsMainArea;
