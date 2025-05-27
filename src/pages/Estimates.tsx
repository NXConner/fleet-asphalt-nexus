import { useState } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import EstimatesHeader from "@/components/estimates/EstimatesHeader";
import EstimatesStats from "@/components/estimates/EstimatesStats";
import EstimatesList from "@/components/estimates/EstimatesList";
import { EstimateActions } from "@/components/estimates/EstimateActions";
import { EstimateTemplates } from "@/components/estimates/EstimateTemplates";
import { EstimateAnalytics } from "@/components/estimates/EstimateAnalytics";
import { EstimateFollowUp } from "@/components/estimates/EstimateFollowUp";
import { AdvancedFilters } from "@/components/filters/AdvancedFilters";
import { ExportUtility } from "@/components/export/ExportUtility";
import { EstimateFormEnhanced } from "@/components/forms/EstimateFormEnhanced";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, BarChart3, FileTemplate, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const Estimates = () => {
  const [filters, setFilters] = useState({
    dateRange: { from: '', to: '' },
    status: [],
    amountRange: { min: 0, max: 0 },
    projectType: [],
    searchTerm: ''
  });

  const [estimates, setEstimates] = useState([
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
  ]);

  const handleStatusChange = (id: string, status: string) => {
    setEstimates(estimates.map(est => 
      est.id === id ? { ...est, status } : est
    ));
  };

  const handleConvertToJob = (id: string) => {
    const estimate = estimates.find(est => est.id === id);
    if (estimate) {
      // In a real app, this would create a job record
      console.log('Converting estimate to job:', estimate);
      toast.success(`Estimate ${id} converted to job successfully`);
    }
  };

  const handleUseTemplate = (template: any) => {
    // In a real app, this would populate the estimate form
    console.log('Using template:', template);
    toast.success(`Template "${template.name}" applied to new estimate`);
  };

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
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <EstimatesHeader />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
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

          <Tabs defaultValue="estimates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="estimates">Estimates</TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="templates">
                <FileTemplate className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="followup">
                <Clock className="h-4 w-4 mr-2" />
                Follow-Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="estimates" className="space-y-4">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
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

              <div className="space-y-4">
                {filteredEstimates.map((estimate) => (
                  <div key={estimate.id} className="bg-white p-6 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold">{estimate.clientName}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            estimate.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            estimate.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            estimate.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {estimate.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{estimate.id} • {estimate.projectType}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Location:</span>
                            <p className="text-gray-600">{estimate.location}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Created:</span>
                            <p className="text-gray-600">{estimate.date}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Expires:</span>
                            <p className="text-gray-600">{estimate.expiryDate}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{estimate.description}</p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            ${estimate.amount.toLocaleString()}
                          </div>
                          <p className="text-sm text-gray-500">Estimated value</p>
                        </div>
                        <EstimateActions
                          estimate={estimate}
                          onStatusChange={handleStatusChange}
                          onConvertToJob={handleConvertToJob}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <EstimateAnalytics />
            </TabsContent>

            <TabsContent value="templates">
              <EstimateTemplates onUseTemplate={handleUseTemplate} />
            </TabsContent>

            <TabsContent value="followup">
              <EstimateFollowUp />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Estimates;
