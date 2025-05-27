
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter } from 'lucide-react';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import JobDetails from '@/components/JobDetails';
import CreateJobForm from '@/components/CreateJobForm';

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
    // For now, just show details. Edit functionality can be added later
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

  // Stats
  const stats = {
    total: jobs.length,
    pending: jobs.filter(j => j.status === 'pending').length,
    inProgress: jobs.filter(j => j.status === 'in-progress').length,
    completed: jobs.filter(j => j.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Job Management</h1>
            <p className="text-muted-foreground mt-2">Track and manage your asphalt projects</p>
          </div>
          <Button onClick={() => setView('create')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Job
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Jobs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.inProgress}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-gray-600">{stats.completed}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, clients, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Grid */}
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
