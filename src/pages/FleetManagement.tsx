import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { FleetStats } from "@/components/fleet/FleetStats";
import { VehicleList } from "@/components/fleet/VehicleList";
import { Vehicle } from "@/types/fleet";
import { AdvancedFleetTracking } from "@/components/fleet/AdvancedFleetTracking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceAllocation } from "@/components/dashboard/ResourceAllocation";
import { DriverManagement } from "@/components/fleet/DriverManagement";
import { Driver } from "@/types/driver";

// Mock data - in a real app, this would come from your backend
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    type: "truck",
    make: "Ford",
    model: "F-350",
    year: 2022,
    licensePlate: "FL-ASP-123",
    vin: "1FDRF3G69NEA12345",
    status: "active",
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
    type: "paver",
    make: "Caterpillar",
    model: "AP555F",
    year: 2021,
    licensePlate: "FL-ASP-124",
    vin: "CAT123456789012345",
    status: "maintenance",
    location: {
      latitude: 28.5383,
      longitude: -81.3792,
      address: "Maintenance Facility, Orlando, FL",
      lastUpdated: "2024-01-26T15:45:00Z"
    },
    mileage: 1200,
    fuelLevel: 45,
    maintenanceSchedule: [],
    documents: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-26T15:45:00Z"
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

const FleetManagement = () => {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const fleetStats = {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === 'active').length,
    driversOnDuty: vehicles.filter(v => v.assignedDriver).length,
    vehiclesInMaintenance: vehicles.filter(v => v.status === 'maintenance').length
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    console.log('Selected vehicle:', vehicle);
  };

  const handleDriverSelect = (driver: Driver) => {
    console.log('Selected driver:', driver);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Fleet Management</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your asphalt equipment fleet
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>

      <FleetStats stats={fleetStats} />

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Diagnostics</TabsTrigger>
          <TabsTrigger value="management">Vehicle Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <VehicleList vehicles={vehicles} onVehicleSelect={handleVehicleSelect} />
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common fleet management tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Schedule Maintenance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Assign Drivers
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Generate Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Track Fuel Usage
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <AdvancedFleetTracking />
        </TabsContent>

        <TabsContent value="management" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResourceAllocation resources={mockResources} />
            <DriverManagement drivers={mockDrivers} onDriverSelect={handleDriverSelect} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FleetManagement;
