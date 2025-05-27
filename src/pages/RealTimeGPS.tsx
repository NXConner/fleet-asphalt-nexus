
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Navigation, 
  MapPin, 
  Zap, 
  Clock, 
  Users, 
  Truck,
  Activity,
  Route,
  AlertTriangle
} from "lucide-react";

interface GPSLocation {
  id: string;
  vehicleId: string;
  vehicleName: string;
  driverId: string;
  driverName: string;
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  timestamp: string;
  status: 'moving' | 'stopped' | 'idle' | 'offline';
  jobId?: string;
  jobTitle?: string;
}

interface Geofence {
  id: string;
  name: string;
  type: 'job-site' | 'depot' | 'restricted';
  center: { lat: number; lng: number };
  radius: number;
  active: boolean;
}

const RealTimeGPS = () => {
  const [vehicles] = useState<GPSLocation[]>([
    {
      id: "gps-001",
      vehicleId: "truck-001",
      vehicleName: "Sealcoat Truck #1",
      driverId: "driver-001",
      driverName: "John Smith",
      lat: 40.7128,
      lng: -74.0060,
      speed: 25,
      heading: 45,
      timestamp: new Date().toISOString(),
      status: "moving",
      jobId: "job-001",
      jobTitle: "City Mall Sealcoating"
    },
    {
      id: "gps-002", 
      vehicleId: "truck-002",
      vehicleName: "Maintenance Truck #2",
      driverId: "driver-002",
      driverName: "Mike Wilson",
      lat: 40.7589,
      lng: -73.9851,
      speed: 0,
      heading: 90,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: "stopped",
      jobId: "job-002",
      jobTitle: "Parking Lot Repair"
    }
  ]);

  const [geofences] = useState<Geofence[]>([
    {
      id: "geo-001",
      name: "City Mall Job Site",
      type: "job-site",
      center: { lat: 40.7128, lng: -74.0060 },
      radius: 100,
      active: true
    },
    {
      id: "geo-002",
      name: "Main Depot",
      type: "depot", 
      center: { lat: 40.7480, lng: -73.9857 },
      radius: 50,
      active: true
    }
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  const getStatusColor = (status: GPSLocation['status']) => {
    switch (status) {
      case 'moving': return 'bg-green-100 text-green-800';
      case 'stopped': return 'bg-yellow-100 text-yellow-800';
      case 'idle': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: GPSLocation['status']) => {
    switch (status) {
      case 'moving': return <Navigation className="h-4 w-4" />;
      case 'stopped': return <MapPin className="h-4 w-4" />;
      case 'idle': return <Clock className="h-4 w-4" />;
      case 'offline': return <AlertTriangle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.round((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
    return `${Math.round(diff / 3600)}h ago`;
  };

  const stats = {
    totalVehicles: vehicles.length,
    moving: vehicles.filter(v => v.status === 'moving').length,
    stopped: vehicles.filter(v => v.status === 'stopped').length,
    avgSpeed: Math.round(vehicles.reduce((sum, v) => sum + v.speed, 0) / vehicles.length)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Real-Time GPS Tracking</h1>
        <p className="text-muted-foreground mt-2">
          Live vehicle tracking, geofencing, and route optimization
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.totalVehicles}</div>
                <div className="text-sm text-muted-foreground">Total Vehicles</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.moving}</div>
                <div className="text-sm text-muted-foreground">Moving</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{stats.stopped}</div>
                <div className="text-sm text-muted-foreground">Stopped</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{stats.avgSpeed} mph</div>
                <div className="text-sm text-muted-foreground">Avg Speed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Live Map
                </span>
                <div className="flex gap-2">
                  <Badge className={trackingEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    Tracking: {trackingEnabled ? "ON" : "OFF"}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setTrackingEnabled(!trackingEnabled)}
                  >
                    {trackingEnabled ? "Disable" : "Enable"} Tracking
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 h-96 rounded-lg flex items-center justify-center relative">
                {/* Mock Map Interface */}
                <div className="text-center">
                  <Navigation className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600">Live GPS Map</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Real-time vehicle positions and geofences
                  </p>
                </div>
                
                {/* Vehicle Markers Overlay */}
                <div className="absolute top-4 left-4 space-y-2">
                  {vehicles.map((vehicle) => (
                    <div 
                      key={vehicle.id}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm cursor-pointer
                        ${selectedVehicle === vehicle.id ? 'ring-2 ring-blue-500' : ''}
                      `}
                      onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
                    >
                      {getStatusIcon(vehicle.status)}
                      <span className="text-sm font-medium">{vehicle.vehicleName}</span>
                      <Badge className={getStatusColor(vehicle.status)} variant="secondary">
                        {vehicle.speed} mph
                      </Badge>
                    </div>
                  ))}
                </div>
                
                {/* Geofence Legend */}
                <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium mb-2">Geofences</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-green-500 rounded-full opacity-30"></div>
                      <span>Job Sites</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-blue-500 rounded-full opacity-30"></div>
                      <span>Depots</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 bg-red-500 rounded-full opacity-30"></div>
                      <span>Restricted</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle List & Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Vehicle Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id} 
                    className={`
                      p-4 border rounded-lg cursor-pointer transition-colors
                      ${selectedVehicle === vehicle.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
                    `}
                    onClick={() => setSelectedVehicle(selectedVehicle === vehicle.id ? null : vehicle.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{vehicle.vehicleName}</h4>
                      <Badge className={getStatusColor(vehicle.status)} variant="secondary">
                        {vehicle.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        {vehicle.driverName}
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3" />
                        {vehicle.speed} mph
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(vehicle.timestamp)}
                      </div>
                      {vehicle.jobTitle && (
                        <div className="flex items-center gap-2">
                          <Activity className="h-3 w-3" />
                          {vehicle.jobTitle}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Vehicle Details */}
          {selectedVehicle && (
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Details</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const vehicle = vehicles.find(v => v.id === selectedVehicle);
                  if (!vehicle) return null;
                  
                  return (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">{vehicle.vehicleName}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Driver:</span>
                            <span>{vehicle.driverName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Speed:</span>
                            <span>{vehicle.speed} mph</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Heading:</span>
                            <span>{vehicle.heading}°</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Location:</span>
                            <span className="font-mono text-xs">
                              {vehicle.lat.toFixed(4)}, {vehicle.lng.toFixed(4)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Update:</span>
                            <span>{formatTimestamp(vehicle.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Route className="h-4 w-4 mr-2" />
                          Route
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MapPin className="h-4 w-4 mr-2" />
                          Center
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          )}

          {/* Geofences */}
          <Card>
            <CardHeader>
              <CardTitle>Geofences</CardTitle>
              <CardDescription>Location-based automation zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {geofences.map((geofence) => (
                  <div key={geofence.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <div className="font-medium text-sm">{geofence.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {geofence.type} • {geofence.radius}m radius
                      </div>
                    </div>
                    <Badge variant={geofence.active ? "default" : "secondary"}>
                      {geofence.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealTimeGPS;
