import { SidebarCategory } from "@/interface";

const superAdminSidebarData: SidebarCategory[] = [
  {
    id: 1,
    category: "Super Admin",
    items: [
      {
        id: 2,
        label: "Dashboard",
        icon: "icon-house",
         link: "/super-admin",
      },

      {
        id: 3,
        label: "Companies",
        icon: "fa-sharp fa-light fa-wallet",
        subItems: [
          {
            label: "All Companies",
            link: "/super-admin/companies",
          }
        ],
      },
       {
        id: 4,
        label: "Staff Management",
        icon: "fa-sharp fa-light fa-wallet",
        subItems: [
          {
            label: "All Staff",
            link: "/super-admin/staff",
          },
          {
            label:"HR Managers",
            link:"/super-admin/hr-manager"
          },
          {
            label:"Finance Executives",
            link:"/super-admin/finance-executives"
          },
          {
            label:"Compliance Officers",
            link:"/super-admin/compliance-officers"
          },
          {
            label:"Employees",
            link:"/super-admin/employees"
          }
        ],
      },

      {
        id: 5,
        label: "Module Management",
        icon: "fa-sharp fa-light fa-grid-2",
        subItems: [
          {
            label: "Enabled Modules",
            link: "/super-admin/modules",
          },
          {
            label: "Module Tiers",
            link: "/super-admin/modules/tiers",
          },
        ],
      },

      {
        id: 6,
        label: "Subscriptions",
        icon: "fa-sharp fa-light fa-wallet",
        subItems: [
          {
            label: "Plans",
            link: "/super-admin/subscriptions",
          },
          {
            label: "Company Subscriptions",
            link: "/super-admin/subscriptions/companies",
          },
        ],
      },

      {
        id: 7,
        label: "Reports & Analytics",
        icon: "fa-light fa-notebook",
        subItems: [
          {
            label: "Platform Usage",
            link: "/super-admin/reports/platform",
          },
          {
            label: "Attendance Summary",
            link: "/super-admin/reports/attendance",
          },
          {
            label: "Payroll Summary",
            link: "/super-admin/reports/payroll",
          },
          {
            label: "Compliance Overview",
            link: "/super-admin/reports/compliance",
          },
        ],
      },

      {
        id: 8,
        label: "Support & Logs",
        icon: "icon-apexcharts",
        subItems: [
          {
            label: "Activity Logs",
            link: "/super-admin/logs",
          },
          {
            label: "Audit Trail",
            link: "/super-admin/audit",
          },
          {
            label: "Support Tickets",
            link: "/super-admin/support/tickets",
          },
        ],
      },

      {
        id: 9,
        label: "Platform Settings",
        icon: "icon-crm",
        subItems: [
          {
            label: "General Settings",
            link: "/super-admin/settings/general",
          },
          {
            label: "Notification Templates",
            link: "/super-admin/settings/templates",
          },
          {
            label: "Security & Retention",
            link: "/super-admin/settings/security",
          },
        ],
      },
    ],
  },
];

export default superAdminSidebarData;
