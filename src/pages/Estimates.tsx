
import { useState } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import EstimatesHeader from "@/components/estimates/EstimatesHeader";
import EstimatesStats from "@/components/estimates/EstimatesStats";
import EstimatesList from "@/components/estimates/EstimatesList";
import { AdvancedFilters } from "@/components/filters/AdvancedFilters";
import { ExportUtility } from "@/components/export/ExportUtility";
import { EstimateFormEnhanced } from "@/components/forms/EstimateFormEnhanced";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Estimates = () => {
  const [filters, setFilters] = useState({
    dateRange: { from: '', to: '' },
    status: [],
    amountRange: { min: 0, max: 0 },
    projectType: [],
    searchTerm: ''
  });

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

  const filteredEstimates = estimates.filter(estimate => {
    const matchesSearch = !filters.searchTerm || 
      estimate.clientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      estimate.projectType.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      estimate.id.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.status.length === 0 || filters.status.includes(estimate.status);
    const matchesProjectType = filters.projectType.length === 0 || filters.projectType.includes(estimate.projectType);
    
    const matchesAmount = (!filters.amountRange.min || estimate.amount >= filters.amountRange.min) &&
                         (!filters.amountRange.max || estimate.amount <= filters.amountRange.max);

    return matchesSearch && matchesStatus && matchesProjectType && matchesAmount;
  });

  const totalValue = estimates.reduce((sum, est) => sum + est.amount, 0);
  const pendingCount = estimates.filter(est => est.status === "Pending").length;
  const approvedCount = estimates.filter(est => est.status === "Approved").length;

  const exportFields = [
    { key: 'id', label: 'Estimate ID' },
    { key: 'clientName', label: 'Client Name' },
    { key: 'projectType', label: 'Project Type' },
    { key: 'location', label: 'Location' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
    { key: 'expiryDate', label: 'Expiry Date' },
    { key: 'description', label: 'Description' }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <EstimatesHeader />
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Estimate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <EstimateFormEnhanced />
              </DialogContent>
            </Dialog>
          </div>

          <EstimatesStats
            totalEstimates={estimates.length}
            pendingCount={pendingCount}
            approvedCount={approvedCount}
            totalValue={totalValue}
          />

          <div className="flex justify-between items-center">
            <AdvancedFilters
              onFiltersChange={setFilters}
              availableStatuses={["Pending", "Approved", "Draft", "Rejected"]}
              availableProjectTypes={["Parking Lot", "Road Repair", "Driveway", "Paving", "Maintenance"]}
            />
            
            <ExportUtility
              data={filteredEstimates}
              filename="estimates"
              availableFields={exportFields}
              type="estimates"
            />
          </div>

          <EstimatesList estimates={filteredEstimates} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Estimates;
