
import { useState } from "react";
import JobsHeader from "@/components/jobs/JobsHeader";
import JobsStats from "@/components/jobs/JobsStats";
import JobsFilters from "@/components/jobs/JobsFilters";
import { JobsList } from "@/components/jobs/JobsList";
import { Job } from "@/types/job";

// Mock data - in a real app, this would come from your backend
const mockJobs: Job[] = [
  {
    id: "JOB-001",
    title: "Main Street Resurfacing",
    client: {
      name: "City Municipality",
      email: "projects@city.gov",
      phone: "(555) 123-4567",
      address: "100 City Hall Plaza"
    },
    project: {
      type: "paving",
      description: "Complete resurfacing of Main Street from 1st to 10th Ave",
      location: "Main Street, Downtown",
      estimatedArea: 2500,
      estimatedCost: 85000
    },
    status: "in-progress",
    priority: "high",
    schedule: {
      startDate: "2024-01-25T08:00:00Z",
      endDate: "2024-01-30T17:00:00Z",
      estimatedDuration: 5
    },
    assignedVehicles: ["vehicle-1", "vehicle-2"],
    assignedCrew: ["crew-alpha", "crew-beta"],
    progress: 65,
    timeline: [],
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-27T10:30:00Z"
  },
  {
    id: "JOB-002",
    title: "Shopping Center Parking Lot",
    client: {
      name: "Plaza Properties",
      email: "maintenance@plaza.com",
      phone: "(555) 987-6543",
      address: "200 Commerce Blvd"
    },
    project: {
      type: "maintenance",
      description: "Crack sealing and patching for shopping center parking",
      location: "Plaza Shopping Center",
      estimatedArea: 1800,
      estimatedCost: 35000
    },
    status: "scheduled",
    priority: "medium",
    schedule: {
      startDate: "2024-02-01T09:00:00Z",
      endDate: "2024-02-03T16:00:00Z",
      estimatedDuration: 3
    },
    assignedVehicles: ["vehicle-3"],
    assignedCrew: ["crew-gamma"],
    progress: 0,
    timeline: [],
    createdAt: "2024-01-22T00:00:00Z",
    updatedAt: "2024-01-26T14:20:00Z"
  }
];

const Jobs = () => {
  const [jobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleCreateJob = () => {
    console.log("Create new job");
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    console.log("Selected job:", job);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || job.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const jobStats = {
    total: jobs.length,
    pending: jobs.filter(j => j.status === 'pending').length,
    inProgress: jobs.filter(j => j.status === 'in-progress').length,
    completed: jobs.filter(j => j.status === 'completed').length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <JobsHeader onCreateJob={handleCreateJob} />
      
      <div className="mt-8">
        <JobsStats stats={jobStats} />
      </div>

      <div className="mt-8">
        <JobsFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />
      </div>

      <div className="mt-8">
        <JobsList jobs={filteredJobs} onJobSelect={handleJobSelect} />
      </div>
    </div>
  );
};

export default Jobs;
