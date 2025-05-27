
import { useState } from "react";
import StatsGrid from "@/components/dashboard/StatsGrid";
import UpcomingJobs from "@/components/dashboard/UpcomingJobs";
import QuickActions from "@/components/dashboard/QuickActions";
import { ResourceAllocation } from "@/components/dashboard/ResourceAllocation";
import { UnifiedReports } from "@/components/dashboard/UnifiedReports";
import { DashboardThemeIntegration } from "@/components/ui/dashboard-theme-integration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calculator, Briefcase, TrendingUp, Truck, Users, DollarSign, Clock } from "lucide-react";

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: "Active Jobs",
      value: "12",
      description: "Currently in progress",
      icon: Briefcase,
      color: "text-blue-600",
      trend: { value: "8%", positive: true }
    },
    {
      title: "Fleet Utilization",
      value: "87%",
      description: "Average fleet usage",
      icon: Truck,
      color: "text-green-600", 
      trend: { value: "5%", positive: true }
    },
    {
      title: "Monthly Revenue",
      value: "$324k",
      description: "This month's earnings",
      icon: DollarSign,
      color: "text-purple-600",
      trend: { value: "12%", positive: true }
    },
    {
      title: "Pending Estimates",
      value: "8",
      description: "Awaiting client response",
      icon: Clock,
      color: "text-orange-600",
      trend: { value: "3%", positive: false }
    }
  ];

  const upcomingJobs = [
    {
      id: "1",
      title: "Main Street Resurfacing",
      client: "City Municipality",
      startDate: "Tomorrow 8:00 AM",
      status: "scheduled"
    },
    {
      id: "2", 
      title: "Shopping Center Parking Lot",
      client: "Plaza Properties",
      startDate: "Jan 30, 2024",
      status: "pending"
    },
    {
      id: "3",
      title: "Highway 95 Maintenance",
      client: "State DOT",
      startDate: "Feb 1, 2024", 
      status: "scheduled"
    }
  ];

  const mockResources = [
    {
      id: "1",
      name: "Truck #001",
      type: "vehicle" as const,
      status: "assigned" as const,
      currentJob: "Main Street Project",
      utilization: 95
    },
    {
      id: "2", 
      name: "Paver Team A",
      type: "crew" as const,
      status: "available" as const,
      utilization: 45
    },
    {
      id: "3",
      name: "Roller #203",
      type: "vehicle" as const,
      status: "maintenance" as const,
      utilization: 0
    },
    {
      id: "4",
      name: "Crew Alpha",
      type: "crew" as const,
      status: "assigned" as const,
      currentJob: "Highway Project",
      utilization: 88
    },
    {
      id: "5",
      name: "Dump Truck #105",
      type: "vehicle" as const,
      status: "available" as const,
      utilization: 62
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your asphalt business operations and fleet management
        </p>
      </div>

      <StatsGrid stats={stats} />

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="themes">Themes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <UpcomingJobs jobs={upcomingJobs} />
              <ResourceAllocation resources={mockResources} />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fleet" className="mt-6">
          <ResourceAllocation resources={mockResources} />
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
