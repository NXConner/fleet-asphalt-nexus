
import { JobResourceOptimization } from "@/components/dashboard/JobResourceOptimization";
import { LiveFleetMap } from "@/components/dashboard/LiveFleetMap";
import { mockJobs, mockVehicles } from "@/data/mockData";

export const DashboardOptimization = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <JobResourceOptimization 
        jobs={mockJobs} 
        availableVehicles={5} 
        availableDrivers={3} 
      />
      <LiveFleetMap vehicles={mockVehicles} />
    </div>
  );
};
