// EmployeeTypes.ts
export interface IEmployee {
    [key: string]: any;
  employeeId: string;
  employeeCode?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  profilePhoto?: string;
  
  // Personal Address
  presentAddress: IAddress;
  permanentAddress?: IAddress;
  sameAsPresentAddress: boolean;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  
  // Job Details
  dateOfJoining: string;
  probationEndDate?: string;
  roleId: number;
  roleName: string;
  departmentId: number;
  departmentName: string;
  reportingManagerId?: string;
  reportingManagerName?: string;
  workLocationId: number;
  workLocationName: string;
  shiftId?: number;
  shiftName?: string;
  workType: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
  employmentStatus: 'Active' | 'On Probation' | 'Resigned' | 'Terminated' | 'Draft';
  contractStartDate?: string;
  contractEndDate?: string;
  
  // Salary & Compensation
  salaryGrade?: string;
  costToCompany?: number;
  salaryStructure?: ISalaryStructure;
  bankDetails?: IBankDetails;
  payFrequency: 'Monthly' | 'Weekly' | 'Bi-weekly';
  
  // Documents
  documents: IDocument[];
  
  // Attendance & Access
  attendanceType: 'App' | 'Biometric' | 'GPS';
  geoFence?: IGeoFence;
  systemUserEnabled: boolean;
  username?: string;
  roles?: string[];
  temporaryAccessUntil?: string;
  
  // System
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  status: 'Active' | 'Inactive' | 'Draft';
}

export interface IAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface ISalaryStructure {
  basicPay: number;
  hra: number;
  allowances: IAllowance[];
  deductions: IDeduction[];
}

export interface IAllowance {
  name: string;
  amount: number;
  type: 'Fixed' | 'Variable';
  taxable: boolean;
}

export interface IDeduction {
  name: string;
  amount: number;
  type: 'Fixed' | 'Percentage';
}

export interface IBankDetails {
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName?: string;
}

export interface IDocument {
  id: string;
  type: 'ID Proof' | 'Offer Letter' | 'Joining Form' | 'Other';
  documentType?: 'Aadhaar' | 'PAN' | 'Passport' | 'Driving License';
  documentNumber?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedDate: string;
  verified: boolean;
}

export interface IGeoFence {
  latitude: number;
  longitude: number;
  radius: number; // in meters
  address?: string;
}

export interface IEmployeeForm {
  // Personal Info
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  profilePhoto?: File | string;
  
  // Address
  presentAddress: IAddress;
  sameAsPresentAddress: boolean;
  permanentAddress?: IAddress;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  
  // Job Details
  dateOfJoining: string;
  probationEndDate?: string;
  roleId: number;
  departmentId: number;
  reportingManagerId?: string;
  workLocationId: number;
  shiftId?: number;
  workType: 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
  employmentStatus: 'Active' | 'On Probation' | 'Resigned' | 'Terminated' | 'Draft';
  contractStartDate?: string;
  contractEndDate?: string;
  
  // Salary
  salaryGrade?: string;
  costToCompany?: number;
  basicPay?: number;
  hra?: number;
  allowances: IAllowance[];
  deductions: IDeduction[];
  
  // Bank Details
  bankAccountName?: string;
  bankAccountNumber?: string;
  ifscCode?: string;
  bankName?: string;
  payFrequency: 'Monthly' | 'Weekly' | 'Bi-weekly';
  
  // Documents
  documents: IDocument[];
  newDocuments: File[];
  
  // Attendance & Access
  attendanceType: 'App' | 'Biometric' | 'GPS';
  geoFence?: IGeoFence;
  systemUserEnabled: boolean;
  username?: string;
  roleIds?: number[];
  temporaryAccessUntil?: string;
}

// Mock Data
export const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male', icon: '♂' },
  { value: 'Female', label: 'Female', icon: '♀' },
  { value: 'Other', label: 'Other', icon: '⚧' }
];

export const WORK_TYPE_OPTIONS = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Intern', label: 'Intern' }
];

export const EMPLOYMENT_STATUS_OPTIONS = [
  { value: 'Active', label: 'Active', color: 'success' },
  { value: 'On Probation', label: 'On Probation', color: 'warning' },
  { value: 'Resigned', label: 'Resigned', color: 'info' },
  { value: 'Terminated', label: 'Terminated', color: 'error' },
  { value: 'Draft', label: 'Draft', color: 'default' }
];

export const ATTENDANCE_TYPE_OPTIONS = [
  { value: 'App', label: 'Mobile App' },
  { value: 'Biometric', label: 'Biometric' },
  { value: 'GPS', label: 'GPS Tracking' }
];

export const ID_PROOF_TYPES = [
  { value: 'Aadhaar', label: 'Aadhaar Card' },
  { value: 'PAN', label: 'PAN Card' },
  { value: 'Passport', label: 'Passport' },
  { value: 'Driving License', label: 'Driving License' }
];

export const PAY_FREQUENCY_OPTIONS = [
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Bi-weekly', label: 'Bi-weekly' }
];

// Helper function to create a mock employee
export const createMockEmployee = (overrides?: Partial<IEmployee>): IEmployee => {
  const baseEmployee: IEmployee = {
    employeeId: `EMP${Date.now().toString().slice(-6)}`,
    employeeCode: `EMP${Math.floor(1000 + Math.random() * 9000)}`,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+91 9876543210',
    dateOfJoining: new Date().toISOString().split('T')[0],
    roleId: 1,
    roleName: 'Software Engineer',
    departmentId: 1,
    departmentName: 'Engineering',
    workLocationId: 1,
    workLocationName: 'Bangalore Branch',
    workType: 'Full-time',
    employmentStatus: 'Active',
    attendanceType: 'Biometric',
    status: 'Active',
    presentAddress: {
      addressLine1: '123 Tech Park',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      zipCode: '560001'
    },
    emergencyContactName: 'Suresh Kumar',
    emergencyContactRelation: 'Father',
    emergencyContactPhone: '+91 9876543211',
    documents: [],
    costToCompany: 1200000,
    payFrequency: 'Monthly',
    systemUserEnabled: true,
    username: 'john.doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'Admin',
    updatedBy: 'Admin',
    sameAsPresentAddress: true
  };

  return { ...baseEmployee, ...overrides };
};

// Helper function to create mock employees
export const createMockEmployees = (count: number): IEmployee[] => {
  const names = [
    { first: 'Rajesh', last: 'Kumar' },
    { first: 'Priya', last: 'Sharma' },
    { first: 'Amit', last: 'Patel' },
    { first: 'Sneha', last: 'Reddy' },
    { first: 'Vikram', last: 'Singh' },
    { first: 'Anjali', last: 'Gupta' },
    { first: 'Rahul', last: 'Verma' },
    { first: 'Meera', last: 'Joshi' }
  ];

  const departments = [
    { id: 1, name: 'Engineering' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Sales' },
    { id: 4, name: 'HR' }
  ];

  const roles = [
    { id: 1, name: 'Software Engineer' },
    { id: 2, name: 'Senior Software Engineer' },
    { id: 3, name: 'Team Lead' },
    { id: 4, name: 'Project Manager' }
  ];

  return Array.from({ length: count }, (_, index) => {
    const name = names[index % names.length];
    const department = departments[index % departments.length];
    const role = roles[index % roles.length];
    
    return createMockEmployee({
      employeeId: `EMP${String(index + 1).padStart(3, '0')}`,
      employeeCode: `EMP${index + 1000}`,
      firstName: name.first,
      lastName: name.last,
      email: `${name.first.toLowerCase()}.${name.last.toLowerCase()}@company.com`,
      roleId: role.id,
      roleName: role.name,
      departmentId: department.id,
      departmentName: department.name,
      workLocationId: (index % 3) + 1,
      workLocationName: ['Mumbai HQ', 'Delhi Office', 'Bangalore Branch'][index % 3],
      employmentStatus: index % 4 === 0 ? 'On Probation' : 'Active',
      workType: index % 5 === 0 ? 'Contract' : 'Full-time',
      costToCompany: 800000 + (index * 50000),
      systemUserEnabled: index % 3 !== 0
    });
  });
};