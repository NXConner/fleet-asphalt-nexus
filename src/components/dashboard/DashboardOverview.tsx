
import UpcomingJobs from "@/components/dashboard/UpcomingJobs";
import QuickActions from "@/components/dashboard/QuickActions";
import { ResourceAllocation } from "@/components/dashboard/ResourceAllocation";
import { LiveFleetMap } from "@/components/dashboard/LiveFleetMap";
import { mockUpcomingJobs, mockResources, mockVehicles } from "@/data/mockData";

export const DashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <UpcomingJobs jobs={mockUpcomingJobs} />
        <ResourceAllocation resources={mockResources} />
      </div>
      <div className="space-y-6">
        <QuickActions />
        <LiveFleetMap vehicles={mockVehicles} />
      </div>
    </div>
  );
};
