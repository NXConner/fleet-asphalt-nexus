
import { Vehicle, Driver, MaintenanceRecord } from "@/types/fleet";
import { VehicleMetrics, FleetVehicle, MaintenanceAlert, RouteOptimization } from "@/types/fleetTypes";

// Enhanced Vehicles Data
export const enhancedVehicles: Vehicle[] = [
  {
    id: "VH-001",
    type: "truck",
    make: "Peterbilt",
    model: "567",
    year: 2021,
    licensePlate: "ASP-2021",
    vin: "1XPWD40X1ED215379",
    status: "active",
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: "Downtown Manhattan, NY",
      lastUpdated: new Date().toISOString()
    },
    mileage: 45230,
    fuelLevel: 85,
    assignedDriver: "John Martinez",
    assignedJob: "JOB-2024-001",
    maintenanceSchedule: [],
    documents: [],
    createdAt: "2021-06-15T08:00:00Z",
    updatedAt: new Date().toISOString()
  },
  {
    id: "VH-002",
    type: "paver",
    make: "Caterpillar",
    model: "AP1055F",
    year: 2020,
    licensePlate: "PAV-2020",
    vin: "CAT0AP1055F123456",
    status: "maintenance",
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
      address: "Fleet Depot, Queens NY",
      lastUpdated: new Date(Date.now() - 7200000).toISOString()
    },
    mileage: 38950,
    fuelLevel: 62,
    assignedDriver: "Sarah Chen",
    maintenanceSchedule: [],
    documents: [],
    createdAt: "2020-08-20T10:30:00Z",
    updatedAt: new Date().toISOString()
  },
  {
    id: "VH-003",
    type: "roller",
    make: "Hamm",
    model: "HD+ 120i",
    year: 2022,
    licensePlate: "ROL-2022",
    vin: "HAMM120I789012",
    status: "active",
    location: {
      latitude: 40.7505,
      longitude: -73.9934,
      address: "Central Park West, NY",
      lastUpdated: new Date(Date.now() - 300000).toISOString()
    },
    mileage: 22100,
    fuelLevel: 78,
    assignedDriver: "Mike Rodriguez",
    assignedJob: "JOB-2024-002",
    maintenanceSchedule: [],
    documents: [],
    createdAt: "2022-03-10T14:15:00Z",
    updatedAt: new Date().toISOString()
  },
  {
    id: "VH-004",
    type: "excavator",
    make: "John Deere",
    model: "350G LC",
    year: 2021,
    licensePlate: "EXC-2021",
    vin: "JD350GLC345678",
    status: "active",
    location: {
      latitude: 40.6892,
      longitude: -74.0445,
      address: "Brooklyn Heights, NY",
      lastUpdated: new Date(Date.now() - 600000).toISOString()
    },
    mileage: 31200,
    fuelLevel: 45,
    assignedDriver: "Lisa Thompson",
    assignedJob: "JOB-2024-003",
    maintenanceSchedule: [],
    documents: [],
    createdAt: "2021-09-05T11:20:00Z",
    updatedAt: new Date().toISOString()
  },
  {
    id: "VH-005",
    type: "dump-truck",
    make: "Mack",
    model: "Granite 64FR",
    year: 2020,
    licensePlate: "DMP-2020",
    vin: "MACK64FR567890",
    status: "out-of-service",
    location: {
      latitude: 40.8176,
      longitude: -73.9782,
      address: "Bronx Depot, NY",
      lastUpdated: new Date(Date.now() - 86400000).toISOString()
    },
    mileage: 67890,
    fuelLevel: 0,
    maintenanceSchedule: [],
    documents: [],
    createdAt: "2020-05-12T09:45:00Z",
    updatedAt: new Date().toISOString()
  }
];

// Enhanced Drivers Data
export const enhancedDrivers: Driver[] = [
  {
    id: "DR-001",
    firstName: "John",
    lastName: "Martinez",
    email: "john.martinez@asphaltco.com",
    phone: "+1-555-0101",
    licenseNumber: "CDL-NY-123456789",
    licenseExpiry: "2025-12-31",
    certifications: ["CDL Class A", "Hazmat", "Asphalt Operations"],
    status: "active",
    assignedVehicle: "VH-001",
    currentJob: "JOB-2024-001",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    emergencyContact: {
      name: "Maria Martinez",
      phone: "+1-555-0102",
      relationship: "Spouse"
    },
    hireDate: "2019-03-15",
    createdAt: "2019-03-15T08:00:00Z",
    updatedAt: new Date().toISOString()
  },
  {
    id: "DR-002",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@asphaltco.com",
    phone: "+1-555-0201",
    licenseNumber: "CDL-NY-987654321",
    licenseExpiry: "2026-06-30",
    certifications: ["CDL Class A", "Heavy Equipment Operation", "Safety Coordinator"],
    status: "active",
    assignedVehicle: "VH-002",
    address: {
      street: "456 Oak Ave",
      city: "Queens",
      state: "NY",
      zipCode: "11101"
    },
    emergencyContact: {
      name: "David Chen",
      phone: "+1-555-0202",
      relationship: "Spouse"
    },
    hireDate: "2020-01-20",
    createdAt: "2020-01-20T08:00:00Z",
    updatedAt: new Date().toISOString()
  },
  {
    id: "DR-003",
    firstName: "Mike",
    lastName: "Rodriguez",
    email: "mike.rodriguez@asphaltco.com",
    phone: "+1-555-0301",
    licenseNumber: "CDL-NY-456789123",
    licenseExpiry: "2025-09-15",
    certifications: ["CDL Class A", "Roller Operation", "Quality Control"],
    status: "active",
    assignedVehicle: "VH-003",
    currentJob: "JOB-2024-002",
    address: {
      street: "789 Pine St",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201"
    },
    emergencyContact: {
      name: "Ana Rodriguez",
      phone: "+1-555-0302",
      relationship: "Sister"
    },
    hireDate: "2018-07-10",
    createdAt: "2018-07-10T08:00:00Z",
    updatedAt: new Date().toISOString()
  }
];

// Enhanced Jobs Data
export const enhancedJobs = [
  {
    id: "JOB-2024-001",
    title: "Main Street Resurfacing",
    customer: "NYC Department of Transportation",
    address: "Main Street, Manhattan, NY",
    status: "in-progress",
    priority: "high",
    startDate: "2024-01-25",
    estimatedCompletion: "2024-02-05",
    assignedVehicles: ["VH-001"],
    assignedDrivers: ["DR-001"],
    estimatedValue: 125000,
    actualCosts: 45000,
    description: "Complete resurfacing of Main Street from 1st to 10th Avenue"
  },
  {
    id: "JOB-2024-002",
    title: "Parking Lot Renovation",
    customer: "Metro Shopping Center",
    address: "Queens, NY",
    status: "scheduled",
    priority: "medium",
    startDate: "2024-02-10",
    estimatedCompletion: "2024-02-15",
    assignedVehicles: ["VH-003"],
    assignedDrivers: ["DR-003"],
    estimatedValue: 85000,
    actualCosts: 0,
    description: "Complete parking lot resurfacing and line striping"
  },
  {
    id: "JOB-2024-003",
    title: "Highway Repair Section A",
    customer: "State Highway Department",
    address: "I-95 Brooklyn, NY",
    status: "pending",
    priority: "critical",
    startDate: "2024-02-01",
    estimatedCompletion: "2024-02-20",
    assignedVehicles: ["VH-004"],
    assignedDrivers: ["DR-002"],
    estimatedValue: 250000,
    actualCosts: 0,
    description: "Emergency highway repair on I-95 southbound"
  }
];

// Enhanced Maintenance Records
export const enhancedMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: "MAINT-001",
    vehicleId: "VH-002",
    type: "scheduled",
    title: "Oil Change & Filter Replacement",
    description: "Routine oil change and hydraulic filter replacement",
    status: "in-progress",
    priority: "medium",
    scheduledDate: "2024-01-28",
    cost: 450,
    mileage: 38950,
    performedBy: "Fleet Maintenance Team",
    notes: "Found minor hydraulic leak, addressed during service",
    parts: [
      {
        id: "PART-001",
        name: "Engine Oil Filter",
        partNumber: "CAT-242-8878",
        quantity: 2,
        cost: 45,
        supplier: "Caterpillar"
      },
      {
        id: "PART-002",
        name: "Hydraulic Oil",
        partNumber: "CAT-415-9999",
        quantity: 15,
        cost: 300,
        supplier: "Caterpillar"
      }
    ],
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: new Date().toISOString()
  }
];

// Enhanced Fleet Metrics
export const enhancedFleetMetrics: VehicleMetrics[] = [
  {
    id: "VH-001",
    name: "Peterbilt 567 - ASP-2021",
    type: "Heavy Duty Truck",
    fuelEfficiency: 7.2,
    engineTemp: 195,
    oilPressure: 45,
    brakePadLife: 78,
    tireHealth: 85,
    batteryLevel: 92,
    lastMaintenance: "2024-01-15",
    nextService: "2024-04-15",
    totalMiles: 45230,
    todayMiles: 127
  },
  {
    id: "VH-002",
    name: "Caterpillar AP1055F - PAV-2020",
    type: "Asphalt Paver",
    fuelEfficiency: 4.8,
    engineTemp: 188,
    oilPressure: 42,
    brakePadLife: 92,
    tireHealth: 91,
    batteryLevel: 88,
    diagnosticCode: "P0420",
    lastMaintenance: "2024-01-28",
    nextService: "2024-05-28",
    totalMiles: 38950,
    todayMiles: 0
  },
  {
    id: "VH-003",
    name: "Hamm HD+ 120i - ROL-2022",
    type: "Road Roller",
    fuelEfficiency: 5.5,
    engineTemp: 182,
    oilPressure: 38,
    brakePadLife: 45,
    tireHealth: 67,
    batteryLevel: 95,
    lastMaintenance: "2024-01-10",
    nextService: "2024-03-10",
    totalMiles: 22100,
    todayMiles: 89
  }
];

export const enhancedRoutes: RouteOptimization[] = [
  {
    id: "RT-001",
    name: "Manhattan Express Route",
    vehicles: ["VH-001", "VH-003"],
    totalDistance: 45.6,
    estimatedTime: 3.5,
    fuelCost: 185.50,
    efficiency: 94
  },
  {
    id: "RT-002",
    name: "Outer Borough Circuit",
    vehicles: ["VH-002"],
    totalDistance: 67.2,
    estimatedTime: 4.8,
    fuelCost: 142.30,
    efficiency: 87
  },
  {
    id: "RT-003",
    name: "Highway Maintenance Route",
    vehicles: ["VH-004"],
    totalDistance: 89.4,
    estimatedTime: 6.2,
    fuelCost: 245.75,
    efficiency: 91
  }
];
