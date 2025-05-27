
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  MapPin, 
  Ruler, 
  Layers, 
  Navigation, 
  Camera,
  Download,
  Zap,
  Droplets,
  Activity,
  Users
} from "lucide-react";
import { AsphaltDetection } from "@/components/mapping/AsphaltDetection";

const AdvancedMapping = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapMode, setMapMode] = useState<"measure" | "pressure-wash" | "detect">("detect");
  const [showEmployeeTracking, setShowEmployeeTracking] = useState(true);
  const [measurements, setMeasurements] = useState({
    area: 0,
    perimeter: 0,
    dirtyZones: 0,
    cleanZones: 0
  });
  const [selectedArea, setSelectedArea] = useState<any>(null);

  const handleGeocodeSearch = async () => {
    if (!searchQuery.trim()) return;
    
    // Mock geocoding - replace with real Mapbox/Google API
    console.log("Geocoding address:", searchQuery);
    // Simulate map pan/zoom to location
    setSearchQuery("");
  };

  const handleModeSwitch = (mode: typeof mapMode) => {
    setMapMode(mode);
    if (mode === "pressure-wash") {
      // Reset dirty/clean zones
      setMeasurements(prev => ({ ...prev, dirtyZones: 0, cleanZones: 0 }));
    }
  };

  const handleAreaSelect = (area: any) => {
    setSelectedArea(area);
    setMeasurements(prev => ({
      ...prev,
      area: area.area,
      perimeter: (area.length + area.width) * 2
    }));
  };

  const exportToEstimate = () => {
    if (selectedArea) {
      // Navigate to estimates with pre-filled data
      console.log('Exporting to estimate:', selectedArea);
      // This would integrate with the estimates system
      window.location.href = `/estimates-management?area=${selectedArea.area}&length=${selectedArea.length}&width=${selectedArea.width}`;
    }
  };

  const exportToGeoJSON = () => {
    const geoData = {
      type: "FeatureCollection",
      features: selectedArea ? [{
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [selectedArea.coordinates.map((coord: any) => [coord.x, coord.y])]
        },
        properties: {
          id: selectedArea.id,
          area: selectedArea.area,
          length: selectedArea.length,
          width: selectedArea.width,
          confidence: selectedArea.confidence,
          manuallyEdited: selectedArea.manuallyEdited
        }
      }] : []
    };
    
    const blob = new Blob([JSON.stringify(geoData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asphalt-detection.geojson';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Advanced Mapping & Measurement</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered asphalt detection with manual editing and real-time employee tracking
        </p>
      </div>

      {/* Search & Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Geocoding & Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Enter address (e.g., 123 Main St, City, State)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGeocodeSearch()}
              />
            </div>
            <Button onClick={handleGeocodeSearch}>
              <MapPin className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          {/* Mode Switcher */}
          <div className="flex gap-4 items-center flex-wrap">
            <span className="text-sm font-medium">Mode:</span>
            <div className="flex gap-2">
              <Button 
                variant={mapMode === "measure" ? "default" : "outline"}
                size="sm"
                onClick={() => handleModeSwitch("measure")}
              >
                <Ruler className="h-4 w-4 mr-2" />
                Measure
              </Button>
              <Button 
                variant={mapMode === "pressure-wash" ? "default" : "outline"}
                size="sm"
                onClick={() => handleModeSwitch("pressure-wash")}
              >
                <Droplets className="h-4 w-4 mr-2" />
                Pressure Wash
              </Button>
              <Button 
                variant={mapMode === "detect" ? "default" : "outline"}
                size="sm"
                onClick={() => handleModeSwitch("detect")}
              >
                <Zap className="h-4 w-4 mr-2" />
                Auto-Detect
              </Button>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <Users className="h-4 w-4" />
              <span className="text-sm">Employee Tracking</span>
              <Switch 
                checked={showEmployeeTracking} 
                onCheckedChange={setShowEmployeeTracking}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          {mapMode === "detect" ? (
            <AsphaltDetection 
              onAreaSelect={handleAreaSelect}
              showEmployeeTracking={showEmployeeTracking}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Interactive Map
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={exportToGeoJSON}>
                      <Download className="h-4 w-4 mr-2" />
                      Export GeoJSON
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 h-96 rounded-lg flex items-center justify-center relative">
                  {/* Mock Map Interface */}
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-slate-600">Interactive Satellite Map</p>
                    <p className="text-sm text-slate-500 mt-2">
                      {mapMode === "measure" && "Draw shapes to measure area & perimeter"}
                      {mapMode === "pressure-wash" && "Mark dirty (red) and clean (green) zones"}
                    </p>
                  </div>
                  
                  {/* Mode-specific overlays */}
                  {mapMode === "pressure-wash" && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-red-100 text-red-800">Dirty Zones</Badge>
                      <Badge className="bg-green-100 text-green-800">Clean Zones</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Measurement Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Measurements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <span>Total Area:</span>
                  <span className="font-mono">{measurements.area.toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Perimeter:</span>
                  <span className="font-mono">{measurements.perimeter.toLocaleString()} ft</span>
                </div>
              </div>
              
              {mapMode === "pressure-wash" && (
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span>Dirty Zones:</span>
                    <span className="font-mono text-red-600">{measurements.dirtyZones.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clean Zones:</span>
                    <span className="font-mono text-green-600">{measurements.cleanZones.toLocaleString()} sq ft</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Est. Water: {Math.round(measurements.dirtyZones * 0.5)} gallons
                  </div>
                </div>
              )}
              
              {selectedArea && (
                <div className="pt-2 border-t">
                  <Button onClick={exportToEstimate} className="w-full">
                    Export to Estimate
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Employee Tracking Panel */}
          {showEmployeeTracking && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Live Employee Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">John Doe</span>
                    </div>
                    <Badge variant="outline" className="text-green-600">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium">Jane Smith</span>
                    </div>
                    <Badge variant="outline" className="text-orange-600">Break</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Mike Johnson</span>
                    </div>
                    <Badge variant="outline" className="text-blue-600">Travel</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* PCI Heatmap Control */}
          <Card>
            <CardHeader>
              <CardTitle>PCI Heatmap</CardTitle>
              <CardDescription>Pavement Condition Index overlay</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span>Show Heatmap</span>
                <Switch />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">Excellent (85-100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm">Fair (55-85)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm">Poor (0-55)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMapping;
