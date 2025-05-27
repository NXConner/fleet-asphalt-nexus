
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, Clock, DollarSign, FileText } from "lucide-react";
import AddEstimateForm from "@/components/AddEstimateForm";
import SearchFilter from "@/components/SearchFilter";

const Estimates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const estimates = [
    {
      id: "EST-001",
      clientName: "ABC Construction",
      projectType: "Parking Lot",
      location: "123 Business Park",
      amount: 25000,
      status: "Pending",
      date: "2024-01-15",
      expiryDate: "2024-02-15",
      description: "New parking lot construction with drainage"
    },
    {
      id: "EST-002",
      clientName: "City Municipality",
      projectType: "Road Repair",
      location: "Main Street",
      amount: 45000,
      status: "Approved",
      date: "2024-01-20",
      expiryDate: "2024-02-20",
      description: "Pothole repairs and resurfacing"
    },
    {
      id: "EST-003",
      clientName: "Residential Client",
      projectType: "Driveway",
      location: "456 Oak Avenue",
      amount: 8500,
      status: "Draft",
      date: "2024-01-25",
      expiryDate: "2024-02-25",
      description: "Residential driveway paving"
    }
  ];

  const filterOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Draft", label: "Draft" },
    { value: "Rejected", label: "Rejected" }
  ];

  const filteredEstimates = estimates.filter(estimate => {
    const matchesSearch = estimate.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estimate.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         estimate.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "all" || estimate.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalValue = estimates.reduce((sum, est) => sum + est.amount, 0);
  const pendingCount = estimates.filter(est => est.status === "Pending").length;
  const approvedCount = estimates.filter(est => est.status === "Approved").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Estimates</h1>
            <p className="text-gray-600 mt-2">Manage project quotes and proposals</p>
          </div>
          <AddEstimateForm />
        </div>

        {/* Estimates Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Estimates</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estimates.length}</div>
              <p className="text-xs text-muted-foreground">Active proposals</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting client response</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Calculator className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">Ready to convert</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Potential revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterValue={statusFilter}
          onFilterChange={setStatusFilter}
          filterOptions={filterOptions}
          placeholder="Search estimates by client, project type, or ID..."
        />

        {/* Estimates List */}
        <Card>
          <CardHeader>
            <CardTitle>All Estimates ({filteredEstimates.length})</CardTitle>
            <CardDescription>Track and manage your project estimates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEstimates.map((estimate) => (
                <div key={estimate.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{estimate.clientName}</h3>
                        <Badge className={getStatusColor(estimate.status)}>
                          {estimate.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{estimate.id} • {estimate.projectType}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${estimate.amount.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-500">Estimated value</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Location</p>
                      <p className="text-sm text-gray-600">{estimate.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Created</p>
                      <p className="text-sm text-gray-600">{estimate.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Expires</p>
                      <p className="text-sm text-gray-600">{estimate.expiryDate}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{estimate.description}</p>
                  
                  <div className="flex gap-2">
                    <Button size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    {estimate.status === "Approved" && (
                      <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                        Convert to Job
                      </Button>
                    )}
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
