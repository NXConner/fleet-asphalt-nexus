
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
  Activity
} from "lucide-react";

const AdvancedMapping = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapMode, setMapMode] = useState<"measure" | "pressure-wash" | "detect">("measure");
  const [isDetecting, setIsDetecting] = useState(false);
  const [measurements, setMeasurements] = useState({
    area: 0,
    perimeter: 0,
    dirtyZones: 0,
    cleanZones: 0
  });
  const [detectedAsphalt, setDetectedAsphalt] = useState([]);
  const [pciData, setPciData] = useState([]);

  const handleGeocodeSearch = async () => {
    if (!searchQuery.trim()) return;
    
    // Mock geocoding - replace with real Mapbox/Google API
    console.log("Geocoding address:", searchQuery);
    // Simulate map pan/zoom to location
    setSearchQuery("");
  };

  const handleAsphaltDetection = async () => {
    setIsDetecting(true);
    
    // Mock auto-detection API call
    try {
      console.log("Calling /api/detect-asphalt endpoint...");
      
      // Simulate detection response
      setTimeout(() => {
        const mockDetectedAreas = [
          { id: 1, area: 2500, confidence: 0.94, type: "parking-lot" },
          { id: 2, area: 800, confidence: 0.87, type: "driveway" }
        ];
        setDetectedAsphalt(mockDetectedAreas);
        setMeasurements(prev => ({ 
          ...prev, 
          area: mockDetectedAreas.reduce((sum, area) => sum + area.area, 0) 
        }));
        setIsDetecting(false);
      }, 2000);
    } catch (error) {
      console.error("Detection failed:", error);
      setIsDetecting(false);
    }
  };

  const handleModeSwitch = (mode: typeof mapMode) => {
    setMapMode(mode);
    if (mode === "pressure-wash") {
      // Reset dirty/clean zones
      setMeasurements(prev => ({ ...prev, dirtyZones: 0, cleanZones: 0 }));
    }
  };

  const exportToGeoJSON = () => {
    const geoData = {
      type: "FeatureCollection",
      features: detectedAsphalt.map(area => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[[-74.0059, 40.7128], [-74.0059, 40.7138], [-74.0049, 40.7138], [-74.0049, 40.7128], [-74.0059, 40.7128]]]
        },
        properties: {
          id: area.id,
          area: area.area,
          confidence: area.confidence,
          type: area.type
        }
      }))
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
          Satellite-driven measurement tools with auto-detection and compliance overlays
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
          <div className="flex gap-4 items-center">
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
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Interactive Map
                </span>
                <div className="flex gap-2">
                  {mapMode === "detect" && (
                    <Button 
                      onClick={handleAsphaltDetection}
                      disabled={isDetecting}
                      size="sm"
                    >
                      {isDetecting ? "Detecting..." : "Run Detection"}
                    </Button>
                  )}
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
                    {mapMode === "detect" && "AI-powered asphalt detection overlay"}
                  </p>
                </div>
                
                {/* Mode-specific overlays */}
                {mapMode === "pressure-wash" && (
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-red-100 text-red-800">Dirty Zones</Badge>
                    <Badge className="bg-green-100 text-green-800">Clean Zones</Badge>
                  </div>
                )}
                
                {isDetecting && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <div className="text-white text-center">
                      <Activity className="h-8 w-8 mx-auto mb-2 animate-spin" />
                      <p>Running AI Detection...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
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
            </CardContent>
          </Card>

          {/* Detected Asphalt */}
          {detectedAsphalt.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Detected Asphalt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {detectedAsphalt.map((area) => (
                    <div key={area.id} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                      <div>
                        <div className="font-medium">{area.type}</div>
                        <div className="text-sm text-muted-foreground">
                          {area.area.toLocaleString()} sq ft
                        </div>
                      </div>
                      <Badge variant="outline">
                        {Math.round(area.confidence * 100)}% confidence
                      </Badge>
                    </div>
                  ))}
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
