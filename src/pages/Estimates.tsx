
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Plus, Clock, CheckCircle, XCircle } from "lucide-react";

const Estimates = () => {
  const estimates = [
    {
      id: "EST-2024-001",
      client: "ABC Construction",
      project: "Main Street Resurfacing",
      area: "2,500 sq ft",
      amount: "$15,750",
      status: "Pending",
      createdDate: "2024-05-20",
      expiryDate: "2024-06-20"
    },
    {
      id: "EST-2024-002",
      client: "City Municipal",
      project: "Downtown Parking Lot",
      area: "8,000 sq ft",
      amount: "$48,000",
      status: "Approved",
      createdDate: "2024-05-18",
      expiryDate: "2024-06-18"
    },
    {
      id: "EST-2024-003",
      client: "Green Valley HOA",
      project: "Community Road Repair",
      area: "1,200 sq ft",
      amount: "$9,600",
      status: "Rejected",
      createdDate: "2024-05-15",
      expiryDate: "2024-06-15"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-orange-600" />;
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "text-orange-600 bg-orange-100";
      case "Approved":
        return "text-green-600 bg-green-100";
      case "Rejected":
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
            <h1 className="text-3xl font-bold text-gray-900">Estimates</h1>
            <p className="text-gray-600 mt-2">Create and manage project estimates</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Estimate
          </Button>
        </div>

        {/* Estimates Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Estimates</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">59% approval rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Calculator className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$485K</div>
              <p className="text-xs text-muted-foreground">Pending estimates</p>
            </CardContent>
          </Card>
        </div>

        {/* Estimates List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Estimates</CardTitle>
            <CardDescription>Overview of all project estimates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {estimates.map((estimate) => (
                <div key={estimate.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calculator className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{estimate.project}</h3>
                      <p className="text-sm text-gray-500">{estimate.id} • {estimate.client}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm font-medium">Area</p>
                      <p className="text-sm text-gray-500">{estimate.area}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium">Amount</p>
                      <p className="text-sm font-semibold text-green-600">{estimate.amount}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium">Status</p>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(estimate.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(estimate.status)}`}>
                          {estimate.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium">Expires</p>
                      <p className="text-sm text-gray-500">{estimate.expiryDate}</p>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      View Details
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

export default Estimates;
