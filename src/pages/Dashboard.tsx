
import { Truck, Calculator, Users, DollarSign, Calendar, FileText, Briefcase, Clock } from "lucide-react";
import DashboardChart from "@/components/DashboardChart";
import NotificationSystem from "@/components/NotificationSystem";
import StatsGrid from "@/components/dashboard/StatsGrid";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingJobs from "@/components/dashboard/UpcomingJobs";
import RecentActivity from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Vehicles",
      value: "24",
      description: "Fleet vehicles in operation",
      icon: Truck,
      color: "text-blue-600",
      trend: { value: "8%", positive: true }
    },
    {
      title: "Active Jobs",
      value: "8",
      description: "Currently in progress",
      icon: Briefcase,
      color: "text-green-600",
      trend: { value: "15%", positive: true }
    },
    {
      title: "Pending Estimates",
      value: "12",
      description: "Awaiting client approval",
      icon: Calculator,
      color: "text-orange-600",
      trend: { value: "3%", positive: false }
    },
    {
      title: "Monthly Revenue",
      value: "$125,430",
      description: "This month's earnings",
      icon: DollarSign,
      color: "text-purple-600",
      trend: { value: "12%", positive: true }
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "job",
      title: "Main Street Paving project progress updated (65%)",
      time: "30 minutes ago",
      icon: Briefcase
    },
    {
      id: 2,
      type: "fleet",
      title: "Vehicle #FL-001 completed maintenance",
      time: "2 hours ago",
      icon: Truck
    },
    {
      id: 3,
      type: "estimate",
      title: "New estimate request from ABC Company",
      time: "4 hours ago",
      icon: Calculator
    },
    {
      id: 4,
      type: "job",
      title: "Shopping Center Sealcoating scheduled for Feb 1st",
      time: "1 day ago",
      icon: Calendar
    },
    {
      id: 5,
      type: "invoice",
      title: "Invoice #INV-2024-001 paid",
      time: "2 days ago",
      icon: FileText
    }
  ];

  const upcomingJobs = [
    {
      id: 'JOB-002',
      title: 'Shopping Center Sealcoating',
      client: 'Westfield Shopping Center',
      startDate: '2024-02-01',
      status: 'scheduled'
    },
    {
      id: 'JOB-003',
      title: 'Industrial Park Striping',
      client: 'Springfield Industrial',
      startDate: '2024-02-05',
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Business Dashboard</h1>
            <p className="text-muted-foreground mt-2">Fleet Management & Asphalt Business Operations</p>
          </div>
          <NotificationSystem />
        </div>

        <StatsGrid stats={stats} />
        <DashboardChart />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <QuickActions />
          <UpcomingJobs jobs={upcomingJobs} />
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
