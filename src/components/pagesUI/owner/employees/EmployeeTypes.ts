import { StaticImageData } from "next/image";

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

export interface IEmployee {
  id: number;
  [key: string]: any;
  employeeId: string;
  employee_id: number;
  image: StaticImageData;
  name: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  employeeID?: string;
  joiningDate?: string;
  designation: string;
  position?: string;
  phone: string;
  created_at: string;
  status: "Active" | "Inactive";
  socialLinks?: SocialLinks;
}
