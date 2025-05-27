
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Play, 
  Pause, 
  Square,
  Navigation,
  Activity,
  Car,
  Building,
  Coffee
} from "lucide-react";
import { toast } from "sonner";

interface EmployeeTimeTrackerProps {
  employeeId: string;
  employeeName: string;
}

interface MockTimeEntry {
  id: string;
  employee_id: string;
  date: string;
  clock_in: string;
  clock_out?: string;
  total_hours: number;
  status: 'active' | 'completed';
}

interface MockTimeSummary {
  employee_id: string;
  total_hours: number;
  on_site_hours: number;
  travel_hours: number;
  total_miles: number;
}

export const EmployeeTimeTracker = ({ employeeId, employeeName }: EmployeeTimeTrackerProps) => {
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [activityType, setActivityType] = useState<'on_site' | 'travel' | 'shop' | 'break' | 'lunch'>('on_site');
  const [watchId, setWatchId] = useState<number | null>(null);
  
  // Mock data - replace with real Supabase queries once tables are created
  const [currentTimeEntry, setCurrentTimeEntry] = useState<MockTimeEntry | null>(null);
  const [todaySummary, setTodaySummary] = useState<MockTimeSummary>({
    employee_id: employeeId,
    total_hours: 6.5,
    on_site_hours: 5.2,
    travel_hours: 1.3,
    total_miles: 42.5
  });

  const handleClockIn = () => {
    const now = new Date().toISOString();
    const newEntry: MockTimeEntry = {
      id: `entry-${Date.now()}`,
      employee_id: employeeId,
      date: new Date().toISOString().split('T')[0],
      clock_in: now,
      total_hours: 0,
      status: 'active'
    };
    
    setCurrentTimeEntry(newEntry);
    startLocationTracking();
    toast.success("Clocked in successfully");
  };

  const handleClockOut = () => {
    if (!currentTimeEntry) return;
    
    const now = new Date();
    const clockInTime = new Date(currentTimeEntry.clock_in);
    const totalHours = (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);
    
    setCurrentTimeEntry({
      ...currentTimeEntry,
      clock_out: now.toISOString(),
      total_hours: totalHours,
      status: 'completed'
    });
    
    stopLocationTracking();
    toast.success("Clocked out successfully");
  };

  const startLocationTracking = () => {
    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentLocation(position);
          console.log("Location updated:", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            speed: position.coords.speed,
            activity: activityType
          });
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

  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

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
                {!currentTimeEntry || currentTimeEntry.status === 'completed' ? (
                  <Button onClick={handleClockIn} className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Clock In
                  </Button>
                ) : (
                  <Button onClick={handleClockOut} variant="destructive" className="flex-1">
                    <Square className="h-4 w-4 mr-2" />
                    Clock Out
                  </Button>
                )}
              </div>

              {currentTimeEntry && currentTimeEntry.status === 'active' && (
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
                      disabled={!currentTimeEntry || currentTimeEntry.status !== 'active'}
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
    </div>
  );
};
