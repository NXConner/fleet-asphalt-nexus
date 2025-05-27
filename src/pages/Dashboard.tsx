
import StatsGrid from "@/components/dashboard/StatsGrid";
import { EmployeeTrackingMap } from "@/components/dashboard/EmployeeTrackingMap";
import { UnifiedReports } from "@/components/dashboard/UnifiedReports";
import { FleetFocusIntegration } from "@/components/fleet/FleetFocusIntegration";
import { DashboardThemeIntegration } from "@/components/ui/dashboard-theme-integration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DashboardFleet } from "@/components/dashboard/DashboardFleet";
import { DashboardOptimization } from "@/components/dashboard/DashboardOptimization";
import { EnhancedDashboard } from "@/components/dashboard/EnhancedDashboard";
import { MobileDashboard } from "@/components/mobile/MobileDashboard";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockStats } from "@/data/mockStats";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Users } from "lucide-react";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  if (isMobile) {
    return (
      <div className="container mx-auto px-4 py-4">
        <MobileDashboard />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Fleet Asphalt Nexus</h1>
        <p className="text-muted-foreground mt-2">
          Complete overview of your asphalt business operations and fleet management
        </p>
      </div>

      <StatsGrid stats={mockStats} />
      
      {/* New feature announcement cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium">Advanced Employee Management</h3>
              </div>
              <p className="text-muted-foreground mt-2">
                Comprehensive HR solution with payroll, benefits administration, performance reviews, and more.
              </p>
              <div className="mt-4">
                <Button 
                  variant="default" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/employee-management')}
                >
                  Explore Employee Management
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-6 border border-green-200 dark:border-green-900">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-medium">Business Accounting Platform</h3>
              </div>
              <p className="text-muted-foreground mt-2">
                Complete financial management with invoicing, expense tracking, financial reports, and accounting tools.
              </p>
              <div className="mt-4">
                <Button 
                  variant="default" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/accounting')}
                >
                  Access Accounting Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="enhanced" className="mt-8">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
          <TabsTrigger value="fleet-focus">Fleet Focus</TabsTrigger>
          <TabsTrigger value="tracking">Employee Tracking</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enhanced" className="mt-6">
          <EnhancedDashboard />
        </TabsContent>

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
      </Tabs>
    </div>
  );
};

export default Dashboard;
