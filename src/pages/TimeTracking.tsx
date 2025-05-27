
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  MapPin, 
  Users, 
  Calendar,
  Activity,
  Route,
  Timer
} from "lucide-react";

interface TimeEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  jobId: string;
  jobTitle: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  type: 'on-site' | 'travel' | 'break' | 'office';
  status: 'active' | 'completed' | 'paused';
  notes?: string;
}

const TimeTracking = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeEntries, setActiveEntries] = useState<TimeEntry[]>([
    {
      id: "time-001",
      employeeId: "emp-001",
      employeeName: "John Smith",
      jobId: "job-001",
      jobTitle: "City Mall Sealcoating",
      startTime: "2024-01-28T08:00:00Z",
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: "123 Commerce Drive"
      },
      type: "on-site",
      status: "active"
    }
  ]);

  const [completedEntries] = useState<TimeEntry[]>([
    {
      id: "time-002",
      employeeId: "emp-002",
      employeeName: "Mike Wilson",
      jobId: "job-002",
      jobTitle: "Parking Lot Maintenance",
      startTime: "2024-01-27T09:00:00Z",
      endTime: "2024-01-27T17:00:00Z",
      duration: 8,
      location: {
        lat: 40.7589,
        lng: -73.9851,
        address: "456 Industrial Blvd"
      },
      type: "on-site",
      status: "completed",
      notes: "Completed crack filling and surface preparation"
    }
  ]);

  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Request geolocation permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setGeolocationEnabled(true);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, []);

  const startTimeEntry = (type: TimeEntry['type'], jobId: string, jobTitle: string) => {
    const newEntry: TimeEntry = {
      id: `time-${Date.now()}`,
      employeeId: "current-user",
      employeeName: "Current User",
      jobId,
      jobTitle,
      startTime: new Date().toISOString(),
      location: currentLocation ? {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        address: "Current Location"
      } : {
        lat: 0,
        lng: 0,
        address: "Location unavailable"
      },
      type,
      status: "active"
    };

    setActiveEntries(prev => [...prev, newEntry]);
  };

  const stopTimeEntry = (entryId: string) => {
    setActiveEntries(prev => 
      prev.filter(entry => {
        if (entry.id === entryId) {
          const endTime = new Date();
          const duration = Math.round((endTime.getTime() - new Date(entry.startTime).getTime()) / (1000 * 60 * 60));
          
          // Add to completed entries (in real app, this would be saved to backend)
          console.log("Time entry completed:", {
            ...entry,
            endTime: endTime.toISOString(),
            duration,
            status: "completed"
          });
          
          return false; // Remove from active entries
        }
        return true;
      })
    );
  };

  const formatDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : currentTime;
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60)); // minutes
    
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    
    return `${hours}h ${minutes}m`;
  };

  const getTypeColor = (type: TimeEntry['type']) => {
    switch (type) {
      case 'on-site': return 'bg-green-100 text-green-800';
      case 'travel': return 'bg-blue-100 text-blue-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      case 'office': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todaysHours = completedEntries
    .filter(entry => entry.endTime && new Date(entry.startTime).toDateString() === new Date().toDateString())
    .reduce((total, entry) => total + (entry.duration || 0), 0);

  const activeHours = activeEntries.reduce((total, entry) => {
    const duration = (currentTime.getTime() - new Date(entry.startTime).getTime()) / (1000 * 60 * 60);
    return total + duration;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Time Tracking & GPS</h1>
        <p className="text-muted-foreground mt-2">
          Track work hours, travel time, and location with automated geofencing
        </p>
      </div>

      {/* Current Time & Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold font-mono">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-sm text-muted-foreground">Current Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{activeEntries.length}</div>
                <div className="text-sm text-muted-foreground">Active Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{todaysHours.toFixed(1)}h</div>
                <div className="text-sm text-muted-foreground">Today's Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">
                  {geolocationEnabled ? "ON" : "OFF"}
                </div>
                <div className="text-sm text-muted-foreground">GPS Tracking</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Sessions</TabsTrigger>
          <TabsTrigger value="history">Time History</TabsTrigger>
          <TabsTrigger value="geofencing">Geofencing</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Quick Start Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Timer</CardTitle>
              <CardDescription>Start tracking time for different activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  onClick={() => startTimeEntry('on-site', 'job-001', 'Current Job')}
                  className="flex flex-col gap-2 h-auto py-4"
                >
                  <Play className="h-6 w-6" />
                  Start On-Site
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => startTimeEntry('travel', 'travel-001', 'Travel Time')}
                  className="flex flex-col gap-2 h-auto py-4"
                >
                  <Route className="h-6 w-6" />
                  Start Travel
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => startTimeEntry('break', 'break-001', 'Break Time')}
                  className="flex flex-col gap-2 h-auto py-4"
                >
                  <Pause className="h-6 w-6" />
                  Start Break
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => startTimeEntry('office', 'office-001', 'Office Work')}
                  className="flex flex-col gap-2 h-auto py-4"
                >
                  <Users className="h-6 w-6" />
                  Start Office
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Time Entries */}
          <div className="space-y-4">
            {activeEntries.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Active Sessions</h3>
                  <p className="text-muted-foreground">
                    Start tracking your time using the buttons above
                  </p>
                </CardContent>
              </Card>
            ) : (
              activeEntries.map((entry) => (
                <Card key={entry.id} className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{entry.jobTitle}</h3>
                          <Badge className={getTypeColor(entry.type)} variant="secondary">
                            {entry.type}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800" variant="secondary">
                            ACTIVE
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            {entry.employeeName}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            Started: {new Date(entry.startTime).toLocaleTimeString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {entry.location.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="h-3 w-3" />
                            Duration: {formatDuration(entry.startTime)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => stopTimeEntry(entry.id)}
                        >
                          <Square className="h-4 w-4 mr-2" />
                          Stop
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {completedEntries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{entry.jobTitle}</h3>
                        <Badge className={getTypeColor(entry.type)} variant="secondary">
                          {entry.type}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(entry.startTime).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {new Date(entry.startTime).toLocaleTimeString()} - {entry.endTime && new Date(entry.endTime).toLocaleTimeString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="h-3 w-3" />
                          Duration: {entry.duration}h
                        </div>
                        {entry.notes && (
                          <div className="mt-2 text-sm">
                            <strong>Notes:</strong> {entry.notes}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="geofencing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geofencing Setup</CardTitle>
              <CardDescription>
                Automatic time tracking based on location boundaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>GPS Tracking</span>
                  <Badge className={geolocationEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {geolocationEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                
                {currentLocation && (
                  <div className="text-sm text-muted-foreground">
                    Current Location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                  </div>
                )}
                
                <div className="bg-slate-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-slate-600">Geofencing Map</p>
                    <p className="text-sm text-slate-500 mt-2">
                      Job site boundaries and automatic check-in zones
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Time Reports</CardTitle>
              <CardDescription>
                Generate timesheet reports and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">This Week Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>On-Site Hours:</span>
                      <span className="font-mono">32.5h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travel Hours:</span>
                      <span className="font-mono">4.2h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Break Hours:</span>
                      <span className="font-mono">2.5h</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span><strong>Total Hours:</strong></span>
                      <span className="font-mono font-bold">39.2h</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Export Options</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Export Weekly Timesheet
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Export Monthly Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Export GPS Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TimeTracking;
