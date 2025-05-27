
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Calculator, Users, DollarSign, Calendar, FileText } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Vehicles",
      value: "24",
      description: "Fleet vehicles in operation",
      icon: Truck,
      color: "text-blue-600"
    },
    {
      title: "Pending Estimates",
      value: "12",
      description: "Awaiting client approval",
      icon: Calculator,
      color: "text-orange-600"
    },
    {
      title: "Active Jobs",
      value: "8",
      description: "Currently in progress",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Monthly Revenue",
      value: "$125,430",
      description: "This month's earnings",
      icon: DollarSign,
      color: "text-purple-600"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "fleet",
      title: "Vehicle #FL-001 completed maintenance",
      time: "2 hours ago",
      icon: Truck
    },
    {
      id: 2,
      type: "estimate",
      title: "New estimate request from ABC Company",
      time: "4 hours ago",
      icon: Calculator
    },
    {
      id: 3,
      type: "job",
      title: "Main Street Paving project started",
      time: "1 day ago",
      icon: Calendar
    },
    {
      id: 4,
      type: "invoice",
      title: "Invoice #INV-2024-001 paid",
      time: "2 days ago",
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-gray-600 mt-2">Fleet Management & Asphalt Business Operations</p>
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
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2">
                  <Truck className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium">Add Vehicle</span>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2">
                  <Calculator className="h-6 w-6 text-orange-600" />
                  <span className="text-sm font-medium">New Estimate</span>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <span className="text-sm font-medium">Schedule Job</span>
                </button>
                <button className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                  <span className="text-sm font-medium">Create Invoice</span>
                </button>
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
                  <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                    <activity.icon className="h-5 w-5 text-gray-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
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
