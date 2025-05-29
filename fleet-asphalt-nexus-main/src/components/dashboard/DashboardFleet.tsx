
import { ResourceAllocation } from "@/components/dashboard/ResourceAllocation";
import { DriverManagement } from "@/components/fleet/DriverManagement";
import { mockResources, mockDrivers } from "@/data/mockData";
import { useDriverManagement } from "@/hooks/useDriverManagement";

export const DashboardFleet = () => {
  const { handleDriverSelect } = useDriverManagement();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ResourceAllocation resources={mockResources} />
      <DriverManagement drivers={mockDrivers} onDriverSelect={handleDriverSelect} />
    </div>
  );
};
