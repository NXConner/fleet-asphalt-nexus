
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  MapPin, 
  Play, 
  Pause, 
  Square,
  Navigation,
  Timer,
  Activity,
  Car,
  Building,
  Coffee
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { TimeEntry, LocationData, EmployeeTimeSummary } from "@/types/timeTracking";

interface EmployeeTimeTrackerProps {
  employeeId: string;
  employeeName: string;
}

export const EmployeeTimeTracker = ({ employeeId, employeeName }: EmployeeTimeTrackerProps) => {
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [activityType, setActivityType] = useState<'on_site' | 'travel' | 'shop' | 'break' | 'lunch'>('on_site');
  const [watchId, setWatchId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Get current time entry
  const { data: currentTimeEntry } = useQuery({
    queryKey: ['current-time-entry', employeeId],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .eq('employee_id', employeeId)
        .eq('date', today)
        .eq('status', 'active')
        .maybeSingle();
      
      if (error) throw error;
      return data as TimeEntry | null;
    }
  });

  // Get today's summary
  const { data: todaySummary } = useQuery({
    queryKey: ['time-summary', employeeId],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('employee_time_summaries')
        .select('*')
        .eq('employee_id', employeeId)
        .eq('date', today)
        .maybeSingle();
      
      if (error) throw error;
      return data as EmployeeTimeSummary | null;
    }
  });

  // Clock in mutation
  const clockInMutation = useMutation({
    mutationFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('time_entries')
        .insert({
          employee_id: employeeId,
          date: today,
          clock_in: now,
          status: 'active',
          total_hours: 0,
          regular_hours: 0,
          overtime_hours: 0,
          location_data: []
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-time-entry', employeeId] });
      startLocationTracking();
      toast.success("Clocked in successfully");
    },
    onError: (error) => {
      toast.error("Failed to clock in: " + error.message);
    }
  });

  // Clock out mutation
  const clockOutMutation = useMutation({
    mutationFn: async () => {
      if (!currentTimeEntry) throw new Error("No active time entry");
      
      const now = new Date().toISOString();
      const clockInTime = new Date(currentTimeEntry.clock_in);
      const clockOutTime = new Date(now);
      const totalHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
      const regularHours = Math.min(totalHours, 8);
      const overtimeHours = Math.max(0, totalHours - 8);
      
      const { data, error } = await supabase
        .from('time_entries')
        .update({
          clock_out: now,
          total_hours: totalHours,
          regular_hours: regularHours,
          overtime_hours: overtimeHours,
          status: 'completed'
        })
        .eq('id', currentTimeEntry.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-time-entry', employeeId] });
      queryClient.invalidateQueries({ queryKey: ['time-summary', employeeId] });
      stopLocationTracking();
      toast.success("Clocked out successfully");
    },
    onError: (error) => {
      toast.error("Failed to clock out: " + error.message);
    }
  });

  // Location tracking functions
  const startLocationTracking = () => {
    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation(position);
          if (currentTimeEntry) {
            recordLocationData(position);
          }
        },
        (error) => {
          console.error("Location error:", error);
          toast.error("Location tracking error");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 10000
        }
      );
      setWatchId(id);
      setIsTracking(true);
    }
  };

  const stopLocationTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
  };

  const recordLocationData = async (position: GeolocationPosition) => {
    if (!currentTimeEntry) return;

    const locationData: Omit<LocationData, 'id' | 'created_at'> = {
      time_entry_id: currentTimeEntry.id,
      timestamp: new Date().toISOString(),
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      speed: position.coords.speed || undefined,
      activity_type: activityType
    };

    try {
      const { error } = await supabase
        .from('location_data')
        .insert(locationData);
      
      if (error) throw error;
    } catch (error) {
      console.error("Failed to record location:", error);
    }
  };

  const handleClockIn = () => {
    clockInMutation.mutate();
  };

  const handleClockOut = () => {
    clockOutMutation.mutate();
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'on_site': return <MapPin className="h-4 w-4" />;
      case 'travel': return <Car className="h-4 w-4" />;
      case 'shop': return <Building className="h-4 w-4" />;
      case 'break':
      case 'lunch': return <Coffee className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'on_site': return 'bg-green-500';
      case 'travel': return 'bg-blue-500';
      case 'shop': return 'bg-purple-500';
      case 'break':
      case 'lunch': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    if (currentTimeEntry && !isTracking) {
      startLocationTracking();
    }
    
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [currentTimeEntry]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Tracker - {employeeName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clock In/Out Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {!currentTimeEntry ? (
                  <Button 
                    onClick={handleClockIn} 
                    className="flex-1"
                    disabled={clockInMutation.isPending}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Clock In
                  </Button>
                ) : (
                  <Button 
                    onClick={handleClockOut} 
                    variant="destructive"
                    className="flex-1"
                    disabled={clockOutMutation.isPending}
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Clock Out
                  </Button>
                )}
              </div>

              {currentTimeEntry && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Clock In:</span>
                    <span className="font-mono">{formatTime(currentTimeEntry.clock_in)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Time:</span>
                    <span className="font-mono">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hours Worked:</span>
                    <span className="font-mono">
                      {((Date.now() - new Date(currentTimeEntry.clock_in).getTime()) / (1000 * 60 * 60)).toFixed(1)}h
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Activity Selection */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Current Activity</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['on_site', 'travel', 'shop', 'break'] as const).map((activity) => (
                    <Button
                      key={activity}
                      variant={activityType === activity ? "default" : "outline"}
                      onClick={() => setActivityType(activity)}
                      className="justify-start"
                      disabled={!currentTimeEntry}
                    >
                      {getActivityIcon(activity)}
                      <span className="ml-2 capitalize">{activity.replace('_', ' ')}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Location Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  <span className="text-sm font-medium">Location Tracking</span>
                  <Badge variant={isTracking ? "default" : "secondary"}>
                    {isTracking ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {currentLocation && (
                  <div className="text-xs text-muted-foreground">
                    Lat: {currentLocation.coords.latitude.toFixed(6)}, 
                    Lng: {currentLocation.coords.longitude.toFixed(6)}
                    {currentLocation.coords.speed && (
                      <span> • Speed: {(currentLocation.coords.speed * 2.237).toFixed(1)} mph</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Summary */}
      {todaySummary && (
        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{todaySummary.total_hours.toFixed(1)}h</div>
                <div className="text-sm text-muted-foreground">Total Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{todaySummary.on_site_hours.toFixed(1)}h</div>
                <div className="text-sm text-muted-foreground">On Site</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{todaySummary.travel_hours.toFixed(1)}h</div>
                <div className="text-sm text-muted-foreground">Travel</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{todaySummary.total_miles.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Miles</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
