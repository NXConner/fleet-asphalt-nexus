
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Truck, 
  MapPin, 
  Fuel, 
  Wrench, 
  Clock,
  TrendingUp,
  AlertTriangle,
  Route,
  Zap,
  Thermometer,
  Gauge
} from "lucide-react";

interface VehicleMetrics {
  id: string;
  name: string;
  type: string;
  fuelEfficiency: number;
  engineTemp: number;
  oilPressure: number;
  brakePadLife: number;
  tireHealth: number;
  batteryLevel: number;
  diagnosticCode?: string;
  lastMaintenance: string;
  nextService: string;
  totalMiles: number;
  todayMiles: number;
}

export function AdvancedFleetTracking() {
  const [vehicles, setVehicles] = useState<VehicleMetrics[]>([
    {
      id: "ADV-001",
      name: "Asphalt Truck Alpha",
      type: "Heavy Duty Truck",
      fuelEfficiency: 7.2,
      engineTemp: 195,
      oilPressure: 45,
      brakePadLife: 78,
      tireHealth: 85,
      batteryLevel: 92,
      lastMaintenance: "2024-01-15",
      nextService: "2024-02-15",
      totalMiles: 87432,
      todayMiles: 127
    },
    {
      id: "ADV-002", 
      name: "Sealcoat Sprayer Beta",
      type: "Specialized Equipment",
      fuelEfficiency: 9.1,
      engineTemp: 188,
      oilPressure: 42,
      brakePadLife: 92,
      tireHealth: 91,
      batteryLevel: 88,
      diagnosticCode: "P0420",
      lastMaintenance: "2024-01-20",
      nextService: "2024-02-20",
      totalMiles: 45673,
      todayMiles: 89
    },
    {
      id: "ADV-003",
      name: "Line Striper Gamma", 
      type: "Utility Vehicle",
      fuelEfficiency: 12.5,
      engineTemp: 182,
      oilPressure: 38,
      brakePadLife: 45,
      tireHealth: 67,
      batteryLevel: 95,
      lastMaintenance: "2024-01-10",
      nextService: "2024-02-10",
      totalMiles: 62890,
      todayMiles: 156
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState<string>("ADV-001");
  const [timeRange, setTimeRange] = useState("24h");

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);

  const getHealthColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthBadge = (value: number) => {
    if (value >= 80) return "bg-green-100 text-green-800";
    if (value >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getTempStatus = (temp: number) => {
    if (temp < 180) return { color: "text-blue-600", status: "Cold" };
    if (temp < 200) return { color: "text-green-600", status: "Normal" };
    if (temp < 220) return { color: "text-yellow-600", status: "Warm" };
    return { color: "text-red-600", status: "Hot" };
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Advanced Fleet Diagnostics
            </span>
            <div className="flex gap-2">
              <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1H</SelectItem>
                  <SelectItem value="24h">24H</SelectItem>
                  <SelectItem value="7d">7D</SelectItem>
                  <SelectItem value="30d">30D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {selectedVehicleData && (
        <>
          {/* Real-time Diagnostics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engine Diagnostics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Engine Temp</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${getTempStatus(selectedVehicleData.engineTemp).color}`}>
                      {selectedVehicleData.engineTemp}°F
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getTempStatus(selectedVehicleData.engineTemp).status}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Oil Pressure</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{selectedVehicleData.oilPressure} PSI</div>
                    <div className="text-xs text-green-600">Normal</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Battery</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{selectedVehicleData.batteryLevel}%</div>
                    <Progress value={selectedVehicleData.batteryLevel} className="w-16 h-2" />
                  </div>
                </div>

                {selectedVehicleData.diagnosticCode && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Diagnostic Code</span>
                    </div>
                    <div className="text-sm text-yellow-800 mt-1">
                      {selectedVehicleData.diagnosticCode} - Catalytic Converter Efficiency
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maintenance Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Brake Pads</span>
                      <span className={`text-sm font-medium ${getHealthColor(selectedVehicleData.brakePadLife)}`}>
                        {selectedVehicleData.brakePadLife}%
                      </span>
                    </div>
                    <Progress value={selectedVehicleData.brakePadLife} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Tire Health</span>
                      <span className={`text-sm font-medium ${getHealthColor(selectedVehicleData.tireHealth)}`}>
                        {selectedVehicleData.tireHealth}%
                      </span>
                    </div>
                    <Progress value={selectedVehicleData.tireHealth} className="h-2" />
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Last Service:</span>
                    <span>{selectedVehicleData.lastMaintenance}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Service:</span>
                    <span className="text-blue-600">{selectedVehicleData.nextService}</span>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Wrench className="h-4 w-4 mr-2" />
                  Schedule Service
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Fuel Efficiency</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{selectedVehicleData.fuelEfficiency} MPG</div>
                    <div className="text-xs text-green-600">+8% vs avg</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Route className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Today's Miles</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{selectedVehicleData.todayMiles}</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedVehicleData.totalMiles.toLocaleString()} total
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Utilization</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">87%</div>
                    <div className="text-xs text-green-600">Above target</div>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Fleet Overview Table */}
          <Card>
            <CardHeader>
              <CardTitle>Fleet Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id} 
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-colors
                      ${selectedVehicle === vehicle.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
                    `}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{vehicle.name}</h3>
                        <p className="text-sm text-muted-foreground">{vehicle.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getHealthBadge(vehicle.tireHealth)}>
                          {vehicle.tireHealth}% Health
                        </Badge>
                        {vehicle.diagnosticCode && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Alert
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Fuel Efficiency:</span>
                        <div className="font-medium">{vehicle.fuelEfficiency} MPG</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Engine Temp:</span>
                        <div className={`font-medium ${getTempStatus(vehicle.engineTemp).color}`}>
                          {vehicle.engineTemp}°F
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Today's Miles:</span>
                        <div className="font-medium">{vehicle.todayMiles}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Service:</span>
                        <div className="font-medium text-blue-600">{vehicle.nextService}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
