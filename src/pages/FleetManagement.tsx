
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Wrench, MapPin, Plus, AlertTriangle } from "lucide-react";

const FleetManagement = () => {
  const vehicles = [
    {
      id: "FL-001",
      name: "Dump Truck Alpha",
      type: "Dump Truck",
      status: "Active",
      location: "Main Yard",
      mileage: "45,230",
      nextMaintenance: "2024-06-15",
      driver: "John Smith"
    },
    {
      id: "FL-002",
      name: "Paver Beta",
      type: "Asphalt Paver",
      status: "In Use",
      location: "Oak Street Project",
      mileage: "32,150",
      nextMaintenance: "2024-06-20",
      driver: "Mike Johnson"
    },
    {
      id: "FL-003",
      name: "Roller Gamma",
      type: "Road Roller",
      status: "Maintenance",
      location: "Service Center",
      mileage: "28,900",
      nextMaintenance: "Overdue",
      driver: "Unassigned"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100";
      case "In Use":
        return "text-blue-600 bg-blue-100";
      case "Maintenance":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
            <p className="text-gray-600 mt-2">Manage your vehicles, maintenance, and drivers</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>

        {/* Fleet Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Truck className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">2 added this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">75% utilization rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Schedule maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle List */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Fleet</CardTitle>
            <CardDescription>Overview of all vehicles in your fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{vehicle.name}</h3>
                      <p className="text-sm text-gray-500">{vehicle.id} • {vehicle.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm font-medium">Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status}
                      </span>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-gray-500">{vehicle.location}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium">Mileage</p>
                      <p className="text-sm text-gray-500">{vehicle.mileage} mi</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium">Driver</p>
                      <p className="text-sm text-gray-500">{vehicle.driver}</p>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      <Wrench className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FleetManagement;
