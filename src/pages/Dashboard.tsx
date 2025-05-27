
import { useState } from "react";
import StatsGrid from "@/components/dashboard/StatsGrid";
import UpcomingJobs from "@/components/dashboard/UpcomingJobs";
import QuickActions from "@/components/dashboard/QuickActions";
import { ResourceAllocation } from "@/components/dashboard/ResourceAllocation";
import { UnifiedReports } from "@/components/dashboard/UnifiedReports";
import { JobResourceOptimization } from "@/components/dashboard/JobResourceOptimization";
import { LiveFleetMap } from "@/components/dashboard/LiveFleetMap";
import { EmployeeTrackingMap } from "@/components/dashboard/EmployeeTrackingMap";
import { DriverManagement } from "@/components/fleet/DriverManagement";
import { DashboardThemeIntegration } from "@/components/ui/dashboard-theme-integration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calculator, Briefcase, TrendingUp, Truck, Users, DollarSign, Clock, MapPin } from "lucide-react";
import { Job } from "@/types/job";
import { Driver } from "@/types/driver";

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Active Jobs",
      value: "12",
      description: "Currently in progress",
      icon: Briefcase,
      color: "text-blue-600",
      trend: { value: "8%", positive: true }
    },
    {
      title: "Fleet Utilization",
      value: "87%",
      description: "Average fleet usage",
      icon: Truck,
      color: "text-green-600", 
      trend: { value: "5%", positive: true }
    },
    {
      title: "Monthly Revenue",
      value: "$324k",
      description: "This month's earnings",
      icon: DollarSign,
      color: "text-purple-600",
      trend: { value: "12%", positive: true }
    },
    {
      title: "Pending Estimates",
      value: "8",
      description: "Awaiting client response",
      icon: Clock,
      color: "text-orange-600",
      trend: { value: "3%", positive: false }
    }
  ];

  const upcomingJobs = [
    {
      id: "1",
      title: "Main Street Resurfacing",
      client: "City Municipality",
      startDate: "Tomorrow 8:00 AM",
      status: "scheduled"
    },
    {
      id: "2", 
      title: "Shopping Center Parking Lot",
      client: "Plaza Properties",
      startDate: "Jan 30, 2024",
      status: "pending"
    },
    {
      id: "3",
      title: "Highway 95 Maintenance",
      client: "State DOT",
      startDate: "Feb 1, 2024", 
      status: "scheduled"
    }
  ];

  const mockResources = [
    {
      id: "1",
      name: "Truck #001",
      type: "vehicle" as const,
      status: "assigned" as const,
      currentJob: "Main Street Project",
      utilization: 95
    },
    {
      id: "2", 
      name: "Paver Team A",
      type: "crew" as const,
      status: "available" as const,
      utilization: 45
    },
    {
      id: "3",
      name: "Roller #203",
      type: "vehicle" as const,
      status: "maintenance" as const,
      utilization: 0
    },
    {
      id: "4",
      name: "Crew Alpha",
      type: "crew" as const,
      status: "assigned" as const,
      currentJob: "Highway Project",
      utilization: 88
    },
    {
      id: "5",
      name: "Dump Truck #105",
      type: "vehicle" as const,
      status: "available" as const,
      utilization: 62
    }
  ];

  const mockJobs: Job[] = [
    {
      id: "JOB-001",
      title: "Main Street Resurfacing",
      client: {
        name: "City Municipality",
        email: "projects@city.gov",
        phone: "(555) 123-4567",
        address: "100 City Hall Plaza"
      },
      project: {
        type: "paving",
        description: "Complete resurfacing of Main Street from 1st to 10th Ave",
        location: "Main Street, Downtown",
        estimatedArea: 2500,
        estimatedCost: 85000
      },
      status: "scheduled",
      priority: "high",
      schedule: {
        startDate: "2024-01-25T08:00:00Z",
        endDate: "2024-01-30T17:00:00Z",
        estimatedDuration: 5
      },
      assignedVehicles: ["vehicle-1", "vehicle-2"],
      assignedCrew: ["crew-alpha", "crew-beta"],
      progress: 0,
      timeline: [],
      createdAt: "2024-01-20T00:00:00Z",
      updatedAt: "2024-01-27T10:30:00Z"
    },
    {
      id: "JOB-002",
      title: "Highway Maintenance",
      client: {
        name: "State DOT",
        email: "contracts@dot.gov",
        phone: "(555) 789-0123",
        address: "500 State Building"
      },
      project: {
        type: "maintenance",
        description: "Pothole repairs and line striping",
        location: "Highway 95 North",
        estimatedArea: 3000,
        estimatedCost: 45000
      },
      status: "in-progress",
      priority: "medium",
      schedule: {
        startDate: "2024-01-20T07:00:00Z",
        endDate: "2024-01-28T16:00:00Z",
        estimatedDuration: 8
      },
      assignedVehicles: ["vehicle-3"],
      assignedCrew: ["crew-gamma"],
      progress: 60,
      timeline: [],
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-01-27T11:00:00Z"
    }
  ];

  const mockVehicles = [
    {
      id: "1",
      type: "truck" as const,
      make: "Ford",
      model: "F-350",
      year: 2022,
      licensePlate: "FL-ASP-123",
      vin: "1FDRF3G69NEA12345",
      status: "active" as const,
      location: {
        latitude: 28.5383,
        longitude: -81.3792,
        address: "Orlando, FL",
        lastUpdated: "2024-01-27T10:30:00Z"
      },
      mileage: 25000,
      fuelLevel: 85,
      assignedDriver: "driver-1",
      maintenanceSchedule: [],
      documents: [],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-27T10:30:00Z"
    },
    {
      id: "2",
      type: "paver" as const,
      make: "Caterpillar",
      model: "AP555F",
      year: 2021,
      licensePlate: "FL-ASP-124",
      vin: "CAT123456789012345",
      status: "active" as const,
      location: {
        latitude: 28.5383,
        longitude: -81.3792,
        address: "Job Site A, Orlando, FL",
        lastUpdated: "2024-01-27T09:15:00Z"
      },
      mileage: 1200,
      fuelLevel: 20,
      maintenanceSchedule: [],
      documents: [],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-27T09:15:00Z"
    }
  ];

  const mockDrivers: Driver[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@company.com",
      phone: "(555) 123-4567",
      licenseNumber: "D12345678",
      licenseClass: "CDL-A",
      licenseExpiry: "2025-12-31",
      certifications: ["Asphalt Paving", "Heavy Equipment"],
      status: "active",
      assignedVehicle: "vehicle-1",
      currentJob: "Main Street Project",
      address: {
        street: "123 Main St",
        city: "Orlando",
        state: "FL",
        zipCode: "32801"
      },
      emergencyContact: {
        name: "Jane Smith",
        phone: "(555) 987-6543",
        relationship: "Spouse"
      },
      hireDate: "2022-03-15",
      hourlyRate: 28.50,
      skills: ["Paving", "Equipment Operation", "Safety"],
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false
      },
      performanceRating: 4.8,
      totalHours: 2080,
      createdAt: "2022-03-15T00:00:00Z",
      updatedAt: "2024-01-27T10:30:00Z"
    },
    {
      id: "2",
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@company.com",
      phone: "(555) 234-5678",
      licenseNumber: "D87654321",
      licenseClass: "CDL-B",
      licenseExpiry: "2025-08-15",
      certifications: ["Equipment Maintenance"],
      status: "active",
      address: {
        street: "456 Oak Ave",
        city: "Orlando",
        state: "FL",
        zipCode: "32802"
      },
      emergencyContact: {
        name: "Sarah Johnson",
        phone: "(555) 876-5432",
        relationship: "Sister"
      },
      hireDate: "2023-01-10",
      hourlyRate: 26.00,
      skills: ["Maintenance", "Equipment Operation"],
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false
      },
      performanceRating: 4.2,
      totalHours: 1560,
      createdAt: "2023-01-10T00:00:00Z",
      updatedAt: "2024-01-27T10:30:00Z"
    }
  ];

  const handleDriverSelect = (driver: Driver) => {
    console.log('Selected driver:', driver);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Integrated Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Complete overview of your asphalt business operations and fleet management
        </p>
      </div>

      <StatsGrid stats={stats} />

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
          <TabsTrigger value="tracking">Employee Tracking</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <UpcomingJobs jobs={upcomingJobs} />
              <ResourceAllocation resources={mockResources} />
            </div>
            <div className="space-y-6">
              <QuickActions />
              <LiveFleetMap vehicles={mockVehicles} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fleet" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourceAllocation resources={mockResources} />
            <DriverManagement drivers={mockDrivers} onDriverSelect={handleDriverSelect} />
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="mt-6">
          <EmployeeTrackingMap />
        </TabsContent>

        <TabsContent value="optimization" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <JobResourceOptimization 
              jobs={mockJobs} 
              availableVehicles={5} 
              availableDrivers={3} 
            />
            <LiveFleetMap vehicles={mockVehicles} />
          </div>
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <UnifiedReports />
        </TabsContent>

        <TabsContent value="themes" className="mt-6">
          <DashboardThemeIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
