
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Calculator, Users, DollarSign, Calendar, FileText, Briefcase, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardChart from "@/components/DashboardChart";
import NotificationSystem from "@/components/NotificationSystem";

const Dashboard = () => {
  const navigate = useNavigate();

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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                {stat.trend && (
                  <div className="flex items-center pt-1">
                    <span className={`text-xs font-medium ${stat.trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend.positive ? '+' : ''}{stat.trend.value}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">from last month</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <DashboardChart />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex flex-col items-center gap-2 hover:bg-accent"
                  onClick={() => navigate('/fleet')}
                >
                  <Truck className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium">Add Vehicle</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex flex-col items-center gap-2 hover:bg-accent"
                  onClick={() => navigate('/jobs')}
                >
                  <Briefcase className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium">New Job</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex flex-col items-center gap-2 hover:bg-accent"
                  onClick={() => navigate('/estimates')}
                >
                  <Calculator className="h-6 w-6 text-orange-600" />
                  <span className="text-sm font-medium">New Estimate</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex flex-col items-center gap-2 hover:bg-accent"
                  onClick={() => navigate('/invoices')}
                >
                  <FileText className="h-6 w-6 text-purple-600" />
                  <span className="text-sm font-medium">Create Invoice</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Jobs</CardTitle>
              <CardDescription>Jobs scheduled for the next week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingJobs.map((job) => (
                  <div key={job.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer">
                    <div className="flex-shrink-0">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{job.title}</p>
                      <p className="text-xs text-muted-foreground">{job.client}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{job.startDate}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/jobs')}
                >
                  View All Jobs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates across your business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent">
                    <activity.icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
