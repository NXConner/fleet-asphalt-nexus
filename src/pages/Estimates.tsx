import { useState } from "react";
import SearchFilter from "@/components/SearchFilter";
import EstimatesHeader from "@/components/estimates/EstimatesHeader";
import EstimatesStats from "@/components/estimates/EstimatesStats";
import EstimatesList from "@/components/estimates/EstimatesList";

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

  const totalValue = estimates.reduce((sum, est) => sum + est.amount, 0);
  const pendingCount = estimates.filter(est => est.status === "Pending").length;
  const approvedCount = estimates.filter(est => est.status === "Approved").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <EstimatesHeader />
        <EstimatesStats
          totalEstimates={estimates.length}
          pendingCount={pendingCount}
          approvedCount={approvedCount}
          totalValue={totalValue}
        />
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterValue={statusFilter}
          onFilterChange={setStatusFilter}
          filterOptions={filterOptions}
          placeholder="Search estimates by client, project type, or ID..."
        />
        <EstimatesList estimates={filteredEstimates} />
      </div>
    </div>
  );
};

export default Estimates;
