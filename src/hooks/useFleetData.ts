
import { useState, useMemo } from "react";
import { FleetVehicle, MaintenanceAlert, RouteOptimization, FleetStats } from "@/types/fleetTypes";
import { mockFleetVehicles, mockMaintenanceAlerts, mockRoutes } from "@/data/mockFleetData";

export const useFleetData = () => {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>(mockFleetVehicles);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState<MaintenanceAlert[]>(mockMaintenanceAlerts);
  const [routes, setRoutes] = useState<RouteOptimization[]>(mockRoutes);

  const fleetStats: FleetStats = useMemo(() => {
    const activeVehicles = vehicles.filter(v => v.status === 'active').length;
    const criticalAlerts = maintenanceAlerts.filter(a => a.type === 'critical').length;
    const avgFuelLevel = Math.round(vehicles.reduce((sum, v) => sum + v.fuelLevel, 0) / vehicles.length);

    return {
      totalVehicles: vehicles.length,
      activeVehicles,
      criticalAlerts,
      avgFuelLevel
    };
  }, [vehicles, maintenanceAlerts]);

  return {
    vehicles,
    maintenanceAlerts,
    routes,
    fleetStats,
    setVehicles,
    setMaintenanceAlerts,
    setRoutes
  };
};
