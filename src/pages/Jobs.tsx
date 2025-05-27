import React, { useState } from 'react';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import JobDetails from '@/components/JobDetails';
import CreateJobForm from '@/components/CreateJobForm';
import JobsHeader from '@/components/jobs/JobsHeader';
import JobsStats from '@/components/jobs/JobsStats';
import JobsFilters from '@/components/jobs/JobsFilters';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 'JOB-001',
      title: 'Main Street Paving Project',
      client: {
        name: 'City of Springfield',
        email: 'public.works@springfield.gov',
        phone: '(555) 123-4567',
        address: '123 City Hall Plaza, Springfield'
      },
      project: {
        type: 'paving',
        description: 'Complete repaving of Main Street from 1st Avenue to 5th Avenue',
        location: 'Main Street, Downtown Springfield',
        estimatedArea: 12000,
        estimatedCost: 85000
      },
      status: 'in-progress',
      priority: 'high',
      schedule: {
        startDate: '2024-01-15T08:00:00Z',
        endDate: '2024-01-25T17:00:00Z',
        estimatedDuration: 10
      },
      assignedVehicles: ['VH-001', 'VH-003'],
      assignedCrew: ['John Doe', 'Jane Smith', 'Mike Wilson'],
      progress: 65,
      timeline: [
        {
          id: 'tl-001',
          type: 'progress',
          title: 'Progress Update',
          description: 'Completed section 3 of 5. Moving ahead of schedule.',
          timestamp: '2024-01-20T14:30:00Z',
          user: 'John Doe'
        },
        {
          id: 'tl-002',
          type: 'started',
          title: 'Project Started',
          description: 'Crew arrived on site and began prep work.',
          timestamp: '2024-01-15T08:00:00Z',
          user: 'Mike Wilson'
        }
      ],
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z'
    },
    {
      id: 'JOB-002',
      title: 'Shopping Center Sealcoating',
      client: {
        name: 'Westfield Shopping Center',
        email: 'maintenance@westfieldsc.com',
        phone: '(555) 987-6543',
        address: '456 Commerce Drive, Springfield'
      },
      project: {
        type: 'sealcoating',
        description: 'Sealcoating of entire parking lot and touch-up striping',
        location: 'Westfield Shopping Center Parking Lot',
        estimatedArea: 25000,
        estimatedCost: 15000
      },
      status: 'scheduled',
      priority: 'medium',
      schedule: {
        startDate: '2024-02-01T07:00:00Z',
        endDate: '2024-02-03T16:00:00Z',
        estimatedDuration: 3
      },
      assignedVehicles: ['VH-002'],
      assignedCrew: ['Sarah Johnson'],
      progress: 0,
      timeline: [
        {
          id: 'tl-003',
          type: 'scheduled',
          title: 'Job Scheduled',
          description: 'Job scheduled for February 1st. Weather conditions looking favorable.',
          timestamp: '2024-01-25T12:00:00Z',
          user: 'Sarah Johnson'
        }
      ],
      createdAt: '2024-01-20T15:00:00Z',
      updatedAt: '2024-01-25T12:00:00Z'
    }
  ]);

  const [view, setView] = useState<'list' | 'create' | 'details'>('list');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleJobCreated = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);
    setView('list');
  };

  const handleJobUpdate = (updatedJob: Job) => {
    setJobs(prev => prev.map(job => job.id === updatedJob.id ? updatedJob : job));
    setSelectedJob(updatedJob);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setView('details');
  };

  const handleEditJob = (job: Job) => {
    handleViewDetails(job);
  };

  if (view === 'create') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <CreateJobForm
            onJobCreated={handleJobCreated}
            onCancel={() => setView('list')}
          />
        </div>
      </div>
    );
  }

  if (view === 'details' && selectedJob) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <JobDetails
            job={selectedJob}
            onUpdate={handleJobUpdate}
            onClose={() => setView('list')}
          />
        </div>
      </div>
    );
  }

  const stats = {
    total: jobs.length,
    pending: jobs.filter(j => j.status === 'pending').length,
    inProgress: jobs.filter(j => j.status === 'in-progress').length,
    completed: jobs.filter(j => j.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <JobsHeader onCreateJob={() => setView('create')} />
        <JobsStats stats={stats} />
        <JobsFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={handleViewDetails}
              onEdit={handleEditJob}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
