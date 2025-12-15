export interface IDepartment {
  id: number;
  [key: string]: any;
  departmentId: string;
  name: string;
  head?: string;
  phone?: string;
  email?: string;
  created_at: string;
  status: "Active" | "Inactive";
}
