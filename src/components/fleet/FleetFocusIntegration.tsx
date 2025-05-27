import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FleetOverviewStats } from "./FleetOverviewStats";
import { FleetStatusTab } from "./FleetStatusTab";

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

  const getStatusColor = (status: FleetVehicle['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'out-of-service': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: MaintenanceAlert['type']) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'overdue': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.round((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
    return `${Math.round(diff / 3600)}h ago`;
  };

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Maintenance Alerts & Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {maintenanceAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">
                          {vehicles.find(v => v.id === alert.vehicleId)?.name}
                        </h4>
                        <p className="text-sm mt-1">{alert.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs">
                          <span>Due: {alert.dueDate}</span>
                          {alert.mileage && <span>@ {alert.mileage.toLocaleString()} miles</span>}
                        </div>
                      </div>
                      <Badge variant="secondary">{alert.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button className="flex-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Maintenance
                </Button>
                <Button variant="outline" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5" />
                Route Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{route.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {route.vehicles.length} vehicles assigned
                        </p>
                      </div>
                      <Badge variant="secondary">{route.efficiency}% efficient</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{route.totalDistance} miles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{route.estimatedTime}h estimated</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${route.fuelCost} fuel cost</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>{route.efficiency}% efficiency</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <Button className="flex-1">
                  <Route className="h-4 w-4 mr-2" />
                  Optimize Routes
                </Button>
                <Button variant="outline" className="flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Fuel Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-sm">Fuel consumption chart</div>
                    <div className="text-xs">7-day rolling average</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <DollarSign className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-sm">Monthly maintenance spend</div>
                    <div className="text-xs">$4,250 this month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
