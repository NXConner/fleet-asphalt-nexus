
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FleetOverviewStats } from "./FleetOverviewStats";
import { FleetStatusTab } from "./FleetStatusTab";
import { FleetMaintenanceTab } from "./FleetMaintenanceTab";
import { FleetRoutesTab } from "./FleetRoutesTab";
import { FleetAnalyticsTab } from "./FleetAnalyticsTab";

interface FleetVehicle {
  id: string;
  name: string;
  type: 'truck' | 'van' | 'trailer' | 'equipment';
  status: 'active' | 'inactive' | 'maintenance' | 'out-of-service';
  location: {
    lat: number;
    lng: number;
    address: string;
    lastUpdate: string;
  };
  driver?: string;
  fuelLevel: number;
  mileage: number;
  maintenanceScore: number;
  route?: string;
  speed: number;
  engineHours: number;
}

interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  type: 'scheduled' | 'overdue' | 'warning' | 'critical';
  message: string;
  dueDate: string;
  mileage?: number;
}

interface RouteOptimization {
  id: string;
  name: string;
  vehicles: string[];
  totalDistance: number;
  estimatedTime: number;
  fuelCost: number;
  efficiency: number;
}

export function FleetFocusIntegration() {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([
    {
      id: "FL-001",
      name: "Service Truck Alpha",
      type: "truck",
      status: "active",
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: "Downtown Manhattan, NY",
        lastUpdate: new Date().toISOString()
      },
      driver: "John Martinez",
      fuelLevel: 85,
      mileage: 45230,
      maintenanceScore: 92,
      route: "Route A - Midtown Loop",
      speed: 35,
      engineHours: 2847
    },
    {
      id: "FL-002", 
      name: "Utility Van Beta",
      type: "van",
      status: "active",
      location: {
        lat: 40.7589,
        lng: -73.9851,
        address: "Central Park West, NY",
        lastUpdate: new Date(Date.now() - 300000).toISOString()
      },
      driver: "Sarah Chen",
      fuelLevel: 62,
      mileage: 38950,
      maintenanceScore: 88,
      route: "Route B - Uptown Circuit",
      speed: 0,
      engineHours: 2156
    },
    {
      id: "FL-003",
      name: "Heavy Equipment Trailer",
      type: "trailer",
      status: "maintenance",
      location: {
        lat: 40.7505,
        lng: -73.9934,
        address: "Fleet Depot, Queens NY",
        lastUpdate: new Date(Date.now() - 7200000).toISOString()
      },
      fuelLevel: 0,
      mileage: 67890,
      maintenanceScore: 45,
      speed: 0,
      engineHours: 4521
    }
  ]);

  const [maintenanceAlerts, setMaintenanceAlerts] = useState<MaintenanceAlert[]>([
    {
      id: "ALT-001",
      vehicleId: "FL-003",
      type: "critical",
      message: "Hydraulic system pressure low - immediate attention required",
      dueDate: "2024-01-27",
      mileage: 67890
    },
    {
      id: "ALT-002", 
      vehicleId: "FL-002",
      type: "scheduled",
      message: "Oil change and filter replacement due",
      dueDate: "2024-02-05",
      mileage: 39000
    },
    {
      id: "ALT-003",
      vehicleId: "FL-001", 
      type: "warning",
      message: "Tire pressure monitoring - front left tire",
      dueDate: "2024-01-30"
    }
  ]);

  const [routes, setRoutes] = useState<RouteOptimization[]>([
    {
      id: "RT-001",
      name: "Manhattan Service Route",
      vehicles: ["FL-001", "FL-002"],
      totalDistance: 45.6,
      estimatedTime: 3.5,
      fuelCost: 28.50,
      efficiency: 94
    },
    {
      id: "RT-002",
      name: "Outer Borough Circuit", 
      vehicles: ["FL-002"],
      totalDistance: 67.2,
      estimatedTime: 4.8,
      fuelCost: 42.30,
      efficiency: 87
    }
  ]);

  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const criticalAlerts = maintenanceAlerts.filter(a => a.type === 'critical').length;
  const avgFuelLevel = Math.round(vehicles.reduce((sum, v) => sum + v.fuelLevel, 0) / vehicles.length);

  return (
    <div className="space-y-6">
      <FleetOverviewStats 
        totalVehicles={vehicles.length}
        activeVehicles={activeVehicles}
        criticalAlerts={criticalAlerts}
        avgFuelLevel={avgFuelLevel}
      />

      <Tabs defaultValue="fleet" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="routes">Route Optimization</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="fleet" className="space-y-4">
          <FleetStatusTab vehicles={vehicles} />
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <FleetMaintenanceTab 
            maintenanceAlerts={maintenanceAlerts} 
            vehicles={vehicles}
          />
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <FleetRoutesTab routes={routes} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <FleetAnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
