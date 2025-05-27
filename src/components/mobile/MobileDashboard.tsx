
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Users, AlertTriangle, DollarSign, MapPin, Clock } from 'lucide-react';
import { enhancedVehicles, enhancedJobs } from '@/data/enhancedMockData';
import { useCrossComponentLinks } from '@/hooks/useCrossComponentLinks';

export const MobileDashboard = () => {
  const { linkToVehicle, linkToJob } = useCrossComponentLinks();

  const activeVehicles = enhancedVehicles.filter(v => v.status === 'active');
  const lowFuelVehicles = enhancedVehicles.filter(v => v.fuelLevel < 25);
  const activeJobs = enhancedJobs.filter(j => j.status === 'in-progress');

  return (
    <div className="space-y-4">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-lg font-bold">{activeVehicles.length}</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <div>
                <div className="text-lg font-bold">{lowFuelVehicles.length}</div>
                <div className="text-xs text-muted-foreground">Low Fuel</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Jobs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Active Jobs
            <Button size="sm" variant="outline" onClick={() => linkToJob('all')}>
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {activeJobs.slice(0, 2).map((job) => (
            <div 
              key={job.id}
              className="p-2 border rounded-lg"
              onClick={() => linkToJob(job.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{job.title}</h4>
                  <p className="text-xs text-muted-foreground">{job.customer}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs">{job.address}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">{job.priority}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Fleet Status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Fleet Status
            <Button size="sm" variant="outline" onClick={() => linkToVehicle('all')}>
              View Fleet
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {activeVehicles.slice(0, 3).map((vehicle) => (
            <div 
              key={vehicle.id}
              className="p-2 border rounded-lg"
              onClick={() => linkToVehicle(vehicle.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-medium">{vehicle.licensePlate}</h4>
                  <p className="text-xs text-muted-foreground">{vehicle.assignedDriver}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs">{vehicle.fuelLevel}% fuel</div>
                  <Badge variant="secondary" className="text-xs">{vehicle.status}</Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-12" onClick={() => linkToJob('new')}>
          <div className="text-center">
            <div className="text-sm font-medium">New Job</div>
          </div>
        </Button>
        <Button variant="outline" className="h-12">
          <div className="text-center">
            <div className="text-sm font-medium">GPS Tracking</div>
          </div>
        </Button>
      </div>
    </div>
  );
};
