
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck } from "lucide-react";
import { VehicleMetrics } from "@/types/fleetTypes";

interface OptimizedVehicleSelectorProps {
  vehicles: VehicleMetrics[];
  selectedVehicle: string;
  timeRange: string;
  onVehicleChange: (vehicleId: string) => void;
  onTimeRangeChange: (timeRange: string) => void;
}

export const OptimizedVehicleSelector = React.memo(({ 
  vehicles, 
  selectedVehicle, 
  timeRange, 
  onVehicleChange, 
  onTimeRangeChange 
}: OptimizedVehicleSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Advanced Fleet Diagnostics
          </span>
          <div className="flex gap-2">
            <Select value={selectedVehicle} onValueChange={onVehicleChange}>
              <SelectTrigger className="w-48" aria-label="Select vehicle">
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
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger className="w-24" aria-label="Select time range">
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
  );
});

OptimizedVehicleSelector.displayName = "OptimizedVehicleSelector";
