
import { Employee, Department, Payroll } from "@/types/employee";
import { Customer, Vendor, Account, Transaction } from "@/types/accounting";

export const mockEmployees: Employee[] = [
  {
    id: "emp-001",
    employeeId: "EMP001",
    personalInfo: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@company.com",
      phone: "(555) 123-4567",
      dateOfBirth: "1985-03-15",
      address: {
        street: "123 Main St",
        city: "Austin",
        state: "TX",
        zipCode: "78701"
      }
    },
    employment: {
      hireDate: "2022-01-15",
      status: "active",
      department: "Operations",
      position: "Equipment Operator",
      employeeType: "full-time",
      manager: "emp-003",
      workLocation: "field"
    },
    compensation: {
      payType: "hourly",
      baseRate: 28.50,
      overtimeRate: 42.75,
      currency: "USD",
      payFrequency: "weekly",
      effectiveDate: "2024-01-01"
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: false,
      retirement401k: true,
      paidTimeOff: 80,
      sickLeave: 40
    },
    skills: ["Heavy Equipment Operation", "Safety Protocols", "Maintenance"],
    certifications: [
      {
        id: "cert-001",
        name: "CDL Class A",
        issuingOrganization: "Texas DMV",
        issueDate: "2022-01-01",
        expirationDate: "2026-01-01",
        status: "active"
      }
    ],
    performanceReviews: [
      {
        id: "review-001",
        reviewDate: "2024-01-15",
        reviewPeriod: {
          startDate: "2023-01-15",
          endDate: "2024-01-15"
        },
        reviewer: "emp-003",
        overallRating: 4.2,
        goals: ["Improve equipment efficiency", "Complete safety training"],
        achievements: ["Zero accidents", "100% on-time completion"],
        areasForImprovement: ["Equipment maintenance documentation"],
        comments: "Excellent performance with great safety record",
        nextReviewDate: "2025-01-15"
      }
    ],
    timeTracking: {
      totalHoursWorked: 2080,
      overtime: 120,
      currentWeekHours: 42
    },
    emergencyContact: {
      name: "Jane Smith",
      relationship: "Spouse",
      phone: "(555) 123-4568"
    },
    documents: [],
    createdAt: "2022-01-15T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z"
  },
  {
    id: "emp-002",
    employeeId: "EMP002",
    personalInfo: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@company.com",
      phone: "(555) 234-5678",
      dateOfBirth: "1990-07-22",
      address: {
        street: "456 Oak Ave",
        city: "Austin",
        state: "TX",
        zipCode: "78702"
      }
    },
    employment: {
      hireDate: "2023-03-01",
      status: "active",
      department: "Administration",
      position: "Project Coordinator",
      employeeType: "full-time",
      workLocation: "office"
    },
    compensation: {
      payType: "salary",
      baseRate: 65000,
      currency: "USD",
      payFrequency: "bi-weekly",
      effectiveDate: "2024-01-01"
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: true,
      retirement401k: true,
      paidTimeOff: 120,
      sickLeave: 80
    },
    skills: ["Project Management", "Communication", "Scheduling"],
    certifications: [
      {
        id: "cert-002",
        name: "PMP Certification",
        issuingOrganization: "PMI",
        issueDate: "2023-06-01",
        expirationDate: "2026-06-01",
        status: "active"
      }
    ],
    performanceReviews: [],
    timeTracking: {
      totalHoursWorked: 1560,
      overtime: 0,
      currentWeekHours: 40
    },
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Father",
      phone: "(555) 234-5679"
    },
    documents: [],
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z"
  }
];

export const mockDepartments: Department[] = [
  {
    id: "dept-001",
    name: "Operations",
    manager: "emp-003",
    budget: 2500000,
    employeeCount: 15,
    description: "Field operations and equipment management"
  },
  {
    id: "dept-002",
    name: "Administration",
    manager: "emp-004",
    budget: 500000,
    employeeCount: 8,
    description: "Administrative and support functions"
  }
];

export const mockAccounts: Account[] = [
  {
    id: "acc-001",
    accountNumber: "1000",
    name: "Cash - Operating",
    type: "asset",
    subType: "current-asset",
    balance: 125000,
    description: "Primary operating cash account",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z"
  },
  {
    id: "acc-002",
    accountNumber: "1200",
    name: "Accounts Receivable",
    type: "asset",
    subType: "current-asset",
    balance: 85000,
    description: "Customer receivables",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z"
  },
  {
    id: "acc-003",
    accountNumber: "4000",
    name: "Revenue - Paving Services",
    type: "revenue",
    subType: "operating-revenue",
    balance: 850000,
    description: "Revenue from asphalt paving services",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z"
  },
  {
    id: "acc-004",
    accountNumber: "5000",
    name: "Equipment Expense",
    type: "expense",
    subType: "operating-expense",
    balance: 125000,
    description: "Equipment maintenance and operation costs",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z"
  }
];

export const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    customerNumber: "CUST001",
    type: "business",
    name: "Austin City Government",
    email: "procurement@austintexas.gov",
    phone: "(512) 555-0100",
    address: {
      street: "301 W 2nd St",
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      country: "USA"
    },
    billing: {
      terms: "Net 30",
      creditLimit: 500000,
      taxExempt: true,
      taxId: "74-0000000"
    },
    contact: {
      primaryContact: "Maria Rodriguez",
      title: "Procurement Manager",
      email: "maria.rodriguez@austintexas.gov",
      phone: "(512) 555-0101"
    },
    balance: 45000,
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z"
  }
];

export const mockVendors: Vendor[] = [
  {
    id: "vend-001",
    vendorNumber: "VEND001",
    name: "Texas Asphalt Supply Co.",
    email: "orders@texasasphalt.com",
    phone: "(512) 555-0200",
    address: {
      street: "1500 Industrial Blvd",
      city: "Austin",
      state: "TX",
      zipCode: "78741",
      country: "USA"
    },
    payment: {
      terms: "Net 15",
      method: "ach",
      taxId: "74-1234567"
    },
    contact: {
      primaryContact: "Bob Wilson",
      title: "Sales Manager",
      email: "bob.wilson@texasasphalt.com",
      phone: "(512) 555-0201"
    },
    balance: 12500,
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z"
  }
];
