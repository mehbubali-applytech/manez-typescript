export interface IDepartment {
  id: number;
  [key: string]: any;
  departmentCode: string;
  name: string;
  head?: string;
  phone?: string;
  email?: string;
  parentDepartmentId?: number;
  isActive: boolean;
  description?: string;
  created_at: string;
  status: "Active" | "Inactive";
}
