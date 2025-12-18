import { SidebarCategory } from "@/interface";

const businessOwnerSidebarData: SidebarCategory[] = [
  {
    id: 1,
    category: "Business Owner",
    items: [
      // Dashboard
      {
        id: 2,
        label: "Dashboard",
        icon: "icon-house",
        link: "/owner",
      },

      // Company Management
      {
        id: 3,
        label: "Company Profile",
        icon: "fa-regular fa-building",
        subItems: [
          {
            label: "Overview",
            link: "/owner/overview",
          },
          {
            label: "Branches",
            link: "/owner/branches",
          },
          {
            label: "Departments",
            link: "/owner/company/departments",
          },
        ],
      },

      // Staff & HRM
      {
        id: 4,
        label: "HR Management",
        icon: "fa-light fa-users",
        subItems: [
          { label: "Employees", link: "/owner/employees" },
          { label: "Designations", link: "/owner/designations" },
          { label: "Attendance", link: "/owner/attendance" },
          { label: "Leaves", link: "/owner/leaves" },
          { label: "Holidays", link: "/owner/holidays" },
        ],
      },

      // Payroll
      {
        id: 5,
        label: "Payroll",
        icon: "fa-light fa-money-bill",
        subItems: [
          { label: "Salary Structure", link: "/owner/payroll/salary-structure" },
          // { label: "Salary Components", link: "/owner/payroll/components" },
          { label: "Monthly Payroll", link: "/owner/payroll/monthly" },
          { label: "Payroll Reports", link: "/owner/payroll/reports" },
        ],
      },

      // Finance
      {
        id: 6,
        label: "Finance",
        icon: "fa-light fa-wallet",
        subItems: [
          { label: "Invoices", link: "/owner/finance/invoices" },
          { label: "Expenses", link: "/owner/finance/expenses" },
          { label: "Vendor Payments", link: "/owner/finance/vendors" },
        ],
      },

      // Subscriptions
      {
        id: 7,
        label: "Subscriptions",
        icon: "fa-light fa-badge-check",
        subItems: [
          { label: "My Plan", link: "/owner/subscription" },
          { label: "Upgrade Plan", link: "/owner/subscription/upgrade" },
          { label: "Billing History", link: "/owner/subscription/billing" },
        ],
      },

      // Reports
      {
        id: 8,
        label: "Reports",
        icon: "fa-light fa-chart-simple",
        subItems: [
          { label: "HR Reports", link: "/owner/reports/hr" },
          { label: "Attendance", link: "/owner/reports/attendance" },
          { label: "Finance Reports", link: "/owner/reports/finance" },
          { label: "Performance", link: "/owner/reports/performance" },
        ],
      },

      // Support
      {
        id: 9,
        label: "Support",
        icon: "fa-light fa-life-ring",
        subItems: [
          { label: "Tickets", link: "/owner/support/tickets" },
          { label: "Knowledge Base", link: "/owner/support/knowledge-base" },
        ],
      },

      // Settings
      {
        id: 10,
        label: "Settings",
        icon: "icon-settings",
        subItems: [
          { label: "General", link: "/owner/settings/general" },
          { label: "Notifications", link: "/owner/settings/notifications" },
          { label: "Security", link: "/owner/settings/security" },
        ],
      },
    ],
  },
];

export default businessOwnerSidebarData;
