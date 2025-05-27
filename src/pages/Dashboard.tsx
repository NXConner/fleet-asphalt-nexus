
import StatsGrid from "@/components/dashboard/StatsGrid";
import { EmployeeTrackingMap } from "@/components/dashboard/EmployeeTrackingMap";
import { UnifiedReports } from "@/components/dashboard/UnifiedReports";
import { FleetFocusIntegration } from "@/components/fleet/FleetFocusIntegration";
import { DashboardThemeIntegration } from "@/components/ui/dashboard-theme-integration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardFleet } from "@/components/dashboard/DashboardFleet";
import { DashboardOptimization } from "@/components/dashboard/DashboardOptimization";
import { mockStats } from "@/data/mockData";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Integrated Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Complete overview of your asphalt business operations and fleet management
        </p>
      </div>

      <StatsGrid stats={mockStats} />

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
          <TabsTrigger value="fleet-focus">Fleet Focus</TabsTrigger>
          <TabsTrigger value="tracking">Employee Tracking</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <DashboardOverview />
        </TabsContent>

        <TabsContent value="fleet" className="mt-6">
          <DashboardFleet />
        </TabsContent>

        <TabsContent value="fleet-focus" className="mt-6">
          <FleetFocusIntegration />
        </TabsContent>

        <TabsContent value="tracking" className="mt-6">
          <EmployeeTrackingMap />
        </TabsContent>

        <TabsContent value="optimization" className="mt-6">
          <DashboardOptimization />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <UnifiedReports />
        </TabsContent>

        <TabsContent value="themes" className="mt-6">
          <DashboardThemeIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
