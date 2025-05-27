
import { useState } from "react";
import { VehicleSelector } from "./advanced/VehicleSelector";
import { VehicleDiagnostics } from "./advanced/VehicleDiagnostics";
import { MaintenanceStatus } from "./advanced/MaintenanceStatus";
import { PerformanceMetrics } from "./advanced/PerformanceMetrics";
import { FleetOverviewTable } from "./advanced/FleetOverviewTable";

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

  return (
    <div className="space-y-6">
      <VehicleSelector
        vehicles={vehicles}
        selectedVehicle={selectedVehicle}
        timeRange={timeRange}
        onVehicleChange={setSelectedVehicle}
        onTimeRangeChange={setTimeRange}
      />

      {selectedVehicleData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <VehicleDiagnostics vehicle={selectedVehicleData} />
            <MaintenanceStatus vehicle={selectedVehicleData} />
            <PerformanceMetrics vehicle={selectedVehicleData} />
          </div>

          <FleetOverviewTable 
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            onVehicleSelect={setSelectedVehicle}
          />
        </>
      )}
    </div>
  );
}
