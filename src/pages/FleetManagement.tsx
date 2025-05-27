
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { FleetStats } from "@/components/fleet/FleetStats";
import { VehicleList } from "@/components/fleet/VehicleList";
import { Vehicle } from "@/types/fleet";

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

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default FleetManagement;
