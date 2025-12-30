// components/employee/AttendanceAccessCard.tsx
"use client";

import React from 'react';
import { IEmployee } from '../EmployeeTypes';
import { 
  Clock, MapPin, RadioTower, Smartphone, 
  Fingerprint, Shield, Wifi, Calendar,
  CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

interface AttendanceAccessCardProps {
  employee: IEmployee;
  onEditAccess?: () => void;
  onEditGeoFence?: () => void;
}

const AttendanceAccessCard: React.FC<AttendanceAccessCardProps> = ({ 
  employee, 
  onEditAccess,
  onEditGeoFence
}) => {
  const getAttendanceIcon = (type: string) => {
    switch(type) {
      case 'App': return <Smartphone className="w-5 h-5" />;
      case 'Biometric': return <Fingerprint className="w-5 h-5" />;
      case 'GPS': return <RadioTower className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getAttendanceLabel = (type: string) => {
    switch(type) {
      case 'App': return 'Mobile App Check-in';
      case 'Biometric': return 'Biometric Device';
      case 'GPS': return 'GPS Tracking';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Access & Attendance</h3>
              <p className="text-sm text-gray-500">System access and attendance settings</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onEditAccess && (
              <button
                onClick={onEditAccess}
                className="px-4 py-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                Edit Access
              </button>
            )}
          </div>
        </div>

        {/* System Access Status */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            System Access
          </h4>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {employee.systemUserEnabled ? (
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              ) : (
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {employee.systemUserEnabled ? 'Access Enabled' : 'Access Disabled'}
                </p>
                <p className="text-sm text-gray-500">
                  {employee.systemUserEnabled 
                    ? `Username: ${employee.username || 'Not set'}`
                    : 'System access is disabled for this employee'
                  }
                </p>
              </div>
            </div>
            {employee.systemUserEnabled && (
              <div className="flex items-center gap-2">
                {employee.roles?.map((role, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Attendance Settings */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Attendance Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                {getAttendanceIcon(employee.attendanceType)}
                <div>
                  <p className="font-medium text-gray-900">Attendance Type</p>
                  <p className="text-sm text-gray-500">
                    {getAttendanceLabel(employee.attendanceType)}
                  </p>
                </div>
              </div>
            </div>

            {employee.shiftName && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">Shift</p>
                    <p className="text-sm text-gray-500">{employee.shiftName}</p>
                  </div>
                </div>
              </div>
            )}

            {employee.temporaryAccessUntil && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Temporary Access</p>
                    <p className="text-sm text-gray-500">
                      Valid until {new Date(employee.temporaryAccessUntil).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Geo-fencing */}
        {employee.geoFence && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Geo-fencing Area
            </h4>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <Wifi className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-1">
                      {employee.geoFence.address || 'Designated Work Area'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Lat: {employee.geoFence.latitude.toFixed(6)}</span>
                      <span>Lng: {employee.geoFence.longitude.toFixed(6)}</span>
                      <span>Radius: {employee.geoFence.radius}m</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Employee can check-in within this designated area only
                    </p>
                  </div>
                </div>
                {onEditGeoFence && (
                  <button
                    onClick={onEditGeoFence}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Edit Area
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceAccessCard;