
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Map, 
  Layers, 
  Navigation, 
  Users, 
  Truck, 
  MapPin, 
  Activity,
  Settings,
  Eye,
  Route,
  Zap
} from "lucide-react";

interface MapLayer {
  id: string;
  name: string;
  type: 'employees' | 'vehicles' | 'jobs' | 'routes' | 'weather' | 'traffic';
  enabled: boolean;
  color: string;
}

interface MapMarker {
  id: string;
  type: 'employee' | 'vehicle' | 'job' | 'route';
  lat: number;
  lng: number;
  label: string;
  status: string;
  data: any;
}

export const UnifiedMapInterface = () => {
  const [mapSource, setMapSource] = useState("satellite");
  const [centerLocation] = useState({
    lat: 36.5951, // Patrick County, Virginia coordinates
    lng: -80.2734,
    zoom: 12
  });
  
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'employees', name: 'Employee Tracking', type: 'employees', enabled: true, color: '#3b82f6' },
    { id: 'vehicles', name: 'Fleet Vehicles', type: 'vehicles', enabled: true, color: '#10b981' },
    { id: 'jobs', name: 'Active Jobs', type: 'jobs', enabled: true, color: '#f59e0b' },
    { id: 'routes', name: 'Optimized Routes', type: 'routes', enabled: false, color: '#8b5cf6' },
    { id: 'weather', name: 'Weather Overlay', type: 'weather', enabled: false, color: '#06b6d4' },
    { id: 'traffic', name: 'Traffic Data', type: 'traffic', enabled: false, color: '#ef4444' }
  ]);

  const [mockMarkers] = useState<MapMarker[]>([
    {
      id: 'emp-1',
      type: 'employee',
      lat: 36.5951,
      lng: -80.2734,
      label: 'John Smith',
      status: 'active',
      data: { position: 'Crew Leader', currentJob: 'Highway 58 Repair' }
    },
    {
      id: 'emp-2',
      type: 'employee',
      lat: 36.6001,
      lng: -80.2684,
      label: 'Mike Johnson',
      status: 'active',
      data: { position: 'Equipment Operator', currentJob: 'Patrick Springs Paving' }
    },
    {
      id: 'veh-1',
      type: 'vehicle',
      lat: 36.5901,
      lng: -80.2784,
      label: 'Truck #1',
      status: 'in-use',
      data: { type: 'Dump Truck', driver: 'John Smith', fuelLevel: 85 }
    },
    {
      id: 'veh-2',
      type: 'vehicle',
      lat: 36.6051,
      lng: -80.2634,
      label: 'Paver #1',
      status: 'maintenance',
      data: { type: 'Asphalt Paver', driver: null, fuelLevel: 45 }
    },
    {
      id: 'job-1',
      type: 'job',
      lat: 36.5851,
      lng: -80.2834,
      label: 'Highway 58 Repair',
      status: 'in-progress',
      data: { progress: 65, estimatedCompletion: '2024-02-01' }
    },
    {
      id: 'job-2',
      type: 'job',
      lat: 36.6101,
      lng: -80.2584,
      label: 'Patrick Springs Paving',
      status: 'scheduled',
      data: { progress: 0, estimatedCompletion: '2024-02-15' }
    }
  ]);

  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const toggleLayer = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'employee': return Users;
      case 'vehicle': return Truck;
      case 'job': return MapPin;
      case 'route': return Route;
      default: return MapPin;
    }
  };

  const getStatusColor = (type: string, status: string) => {
    if (type === 'employee') {
      switch (status) {
        case 'active': return 'bg-green-500';
        case 'idle': return 'bg-yellow-500';
        case 'break': return 'bg-blue-500';
        default: return 'bg-gray-500';
      }
    } else if (type === 'vehicle') {
      switch (status) {
        case 'in-use': return 'bg-green-500';
        case 'idle': return 'bg-yellow-500';
        case 'maintenance': return 'bg-red-500';
        default: return 'bg-gray-500';
      }
    } else if (type === 'job') {
      switch (status) {
        case 'in-progress': return 'bg-blue-500';
        case 'scheduled': return 'bg-purple-500';
        case 'completed': return 'bg-green-500';
        default: return 'bg-gray-500';
      }
    }
    return 'bg-gray-500';
  };

  const enabledLayers = layers.filter(layer => layer.enabled);
  const filteredMarkers = mockMarkers.filter(marker => 
    enabledLayers.some(layer => layer.type === `${marker.type}s` || layer.type === marker.type)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Unified Map Interface</h2>
        <div className="flex gap-2">
          <Select value={mapSource} onValueChange={setMapSource}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="satellite">Satellite View</SelectItem>
              <SelectItem value="hybrid">Hybrid View</SelectItem>
              <SelectItem value="terrain">Terrain View</SelectItem>
              <SelectItem value="street">Street View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Map Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Patrick County, Virginia - Live Map
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {filteredMarkers.length} markers
                  </Badge>
                  <Badge variant="default" className="bg-green-500">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                    Live
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-green-100 h-96 rounded-lg overflow-hidden">
                {/* Mock Satellite Map Background */}
                <div 
                  className="w-full h-full bg-cover bg-center relative"
                  style={{
                    backgroundImage: `linear-gradient(45deg, #22c55e 25%, transparent 25%), 
                                     linear-gradient(-45deg, #22c55e 25%, transparent 25%), 
                                     linear-gradient(45deg, transparent 75%, #22c55e 75%), 
                                     linear-gradient(-45deg, transparent 75%, #22c55e 75%)`,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                >
                  {/* Satellite overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 via-green-300/20 to-lime-200/30"></div>
                  
                  {/* Patrick County Label */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded shadow">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-sm">Patrick County, VA</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Lat: {centerLocation.lat}, Lng: {centerLocation.lng}
                    </div>
                  </div>

                  {/* Map Markers */}
                  {filteredMarkers.map((marker, index) => {
                    const IconComponent = getMarkerIcon(marker.type);
                    const statusColor = getStatusColor(marker.type, marker.status);
                    
                    return (
                      <div
                        key={marker.id}
                        className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                          selectedMarker?.id === marker.id ? 'scale-125 z-10' : 'z-0'
                        }`}
                        style={{
                          left: `${30 + (index % 3) * 25}%`,
                          top: `${20 + Math.floor(index / 3) * 25}%`
                        }}
                        onClick={() => setSelectedMarker(selectedMarker?.id === marker.id ? null : marker)}
                      >
                        <div className={`w-8 h-8 ${statusColor} rounded-full flex items-center justify-center shadow-lg border-2 border-white`}>
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur px-2 py-1 rounded text-xs font-medium shadow-md min-w-max">
                          {marker.label}
                        </div>
                      </div>
                    );
                  })}

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
                      <Navigation className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
                      +
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
                      -
                    </Button>
                  </div>

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur p-3 rounded shadow">
                    <h4 className="text-sm font-medium mb-2">Map Legend</h4>
                    <div className="space-y-1">
                      {enabledLayers.map((layer) => (
                        <div key={layer.id} className="flex items-center gap-2 text-xs">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: layer.color }}
                          ></div>
                          <span>{layer.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real-time Status */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur p-2 rounded shadow">
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-green-500" />
                      <span>Real-time Updates</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Marker Details */}
              {selectedMarker && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-lg">{selectedMarker.label}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {selectedMarker.type} • {selectedMarker.status}
                      </p>
                      <div className="mt-2 text-sm space-y-1">
                        {Object.entries(selectedMarker.data).map(([key, value]) => (
                          <div key={key}>
                            <strong>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</strong> {value}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Badge className={getStatusColor(selectedMarker.type, selectedMarker.status).replace('bg-', 'bg-')} variant="secondary">
                      {selectedMarker.status}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Map Controls Panel */}
        <div className="space-y-6">
          {/* Layer Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {layers.map((layer) => (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: layer.color }}
                      ></div>
                      <Label htmlFor={layer.id} className="text-sm font-medium cursor-pointer">
                        {layer.name}
                      </Label>
                    </div>
                    <Switch
                      id={layer.id}
                      checked={layer.enabled}
                      onCheckedChange={() => toggleLayer(layer.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Employees</span>
                  <Badge variant="default">
                    {mockMarkers.filter(m => m.type === 'employee' && m.status === 'active').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vehicles in Use</span>
                  <Badge variant="default">
                    {mockMarkers.filter(m => m.type === 'vehicle' && m.status === 'in-use').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Jobs</span>
                  <Badge variant="default">
                    {mockMarkers.filter(m => m.type === 'job' && m.status === 'in-progress').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Markers</span>
                  <Badge variant="outline">{filteredMarkers.length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Center on Patrick County
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Route className="h-4 w-4 mr-2" />
                  Optimize Routes
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Track All Employees
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Truck className="h-4 w-4 mr-2" />
                  Fleet Overview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
