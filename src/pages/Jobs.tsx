
import { useState } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { JobsHeader } from "@/components/jobs/JobsHeader";
import { JobsStats } from "@/components/jobs/JobsStats";
import { JobsList } from "@/components/jobs/JobsList";
import { JobsFilters } from "@/components/jobs/JobsFilters";
import { ExportUtility } from "@/components/export/ExportUtility";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MapPin, Calendar, BarChart3 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateJobForm from "@/components/CreateJobForm";
import { toast } from "sonner";

const Jobs = () => {
  const [filters, setFilters] = useState({
    dateRange: { from: '', to: '' },
    status: [],
    priority: [],
    projectType: [],
    searchTerm: ''
  });

  const [jobs, setJobs] = useState([
    {
      id: "JOB-001",
      title: "Main Street Resurfacing",
      clientName: "City Municipality",
      projectType: "Road Repair",
      location: "Main Street, Downtown",
      estimatedCost: 45000,
      actualCost: 43500,
      status: "In Progress",
      priority: "High",
      startDate: "2024-01-22",
      endDate: "2024-01-28",
      progress: 75,
      assignedCrew: ["John Smith", "Mike Johnson"],
      assignedVehicles: ["TRUCK-001", "PAVER-002"],
      description: "Complete resurfacing of Main Street including pothole repairs"
    },
    {
      id: "JOB-002",
      title: "ABC Construction Parking Lot",
      clientName: "ABC Construction",
      projectType: "Parking Lot",
      location: "123 Business Park",
      estimatedCost: 25000,
      actualCost: 0,
      status: "Scheduled",
      priority: "Medium",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      progress: 0,
      assignedCrew: ["Sarah Wilson", "David Brown"],
      assignedVehicles: ["TRUCK-002", "ROLLER-001"],
      description: "New parking lot construction with drainage and striping"
    },
    {
      id: "JOB-003",
      title: "Oak Avenue Driveway",
      clientName: "Residential Client",
      projectType: "Driveway",
      location: "456 Oak Avenue",
      estimatedCost: 8500,
      actualCost: 8200,
      status: "Completed",
      priority: "Low",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      progress: 100,
      assignedCrew: ["Tom Anderson"],
      assignedVehicles: ["TRUCK-003"],
      description: "Residential driveway paving with decorative edging"
    }
  ]);

  const handleCreateJob = (jobData: any) => {
    const newJob = {
      id: `JOB-${String(jobs.length + 1).padStart(3, '0')}`,
      ...jobData,
      progress: 0,
      actualCost: 0,
      status: "Scheduled"
    };
    setJobs([...jobs, newJob]);
    toast.success("Job created successfully");
  };

  const handleStatusChange = (id: string, status: string) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status } : job
    ));
    toast.success(`Job ${id} status updated to ${status}`);
  };

  const handleProgressUpdate = (id: string, progress: number) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, progress } : job
    ));
    toast.success(`Job ${id} progress updated to ${progress}%`);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !filters.searchTerm || 
      job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.clientName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.status.length === 0 || filters.status.includes(job.status);
    const matchesPriority = filters.priority.length === 0 || filters.priority.includes(job.priority);
    const matchesProjectType = filters.projectType.length === 0 || filters.projectType.includes(job.projectType);

    return matchesSearch && matchesStatus && matchesPriority && matchesProjectType;
  });

  const totalValue = jobs.reduce((sum, job) => sum + job.estimatedCost, 0);
  const completedJobs = jobs.filter(job => job.status === "Completed").length;
  const inProgressJobs = jobs.filter(job => job.status === "In Progress").length;
  const scheduledJobs = jobs.filter(job => job.status === "Scheduled").length;

  const exportFields = [
    { key: 'id', label: 'Job ID' },
    { key: 'title', label: 'Title' },
    { key: 'clientName', label: 'Client' },
    { key: 'projectType', label: 'Project Type' },
    { key: 'location', label: 'Location' },
    { key: 'estimatedCost', label: 'Estimated Cost' },
    { key: 'actualCost', label: 'Actual Cost' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'progress', label: 'Progress' }
  ];

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <JobsHeader />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <CreateJobForm onSubmit={handleCreateJob} />
              </DialogContent>
            </Dialog>
          </div>

          <JobsStats
            totalJobs={jobs.length}
            completedJobs={completedJobs}
            inProgressJobs={inProgressJobs}
            scheduledJobs={scheduledJobs}
            totalValue={totalValue}
          />

          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="scheduling">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="map">
                <MapPin className="h-4 w-4 mr-2" />
                Map View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-4">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <JobsFilters
                  onFiltersChange={setFilters}
                  availableStatuses={["Scheduled", "In Progress", "Completed", "On Hold", "Cancelled"]}
                  availablePriorities={["Low", "Medium", "High", "Urgent"]}
                  availableProjectTypes={["Road Repair", "Parking Lot", "Driveway", "Maintenance", "Striping"]}
                />
                
                <ExportUtility
                  data={filteredJobs}
                  filename="jobs"
                  availableFields={exportFields}
                  type="jobs"
                />
              </div>

              <JobsList
                jobs={filteredJobs}
                onStatusChange={handleStatusChange}
                onProgressUpdate={handleProgressUpdate}
              />
            </TabsContent>

            <TabsContent value="scheduling">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Job Scheduling Calendar</h3>
                <p className="text-gray-600">Calendar view for job scheduling coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="map">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Job Locations Map</h3>
                <p className="text-gray-600">Interactive map view coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Jobs;
