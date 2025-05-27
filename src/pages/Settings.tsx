
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  MapPin,
  Truck,
  Users,
  DollarSign,
  Save,
  Download,
  Upload
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Company Settings
    companyName: "Fleet Asphalt Nexus",
    companyAddress: "123 Business Park Drive",
    companyPhone: "(555) 123-4567",
    companyEmail: "admin@fleetasphalt.com",
    
    // User Preferences
    theme: "dark",
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    autoSave: true,
    
    // Fleet Settings
    gpsUpdateInterval: 30,
    maintenanceAlerts: true,
    fuelTrackingEnabled: true,
    routeOptimization: true,
    
    // Employee Settings
    timeTrackingEnabled: true,
    geofenceRadius: 100,
    overtimeAlerts: true,
    performanceTracking: true,
    
    // Mapping Settings
    mapProvider: "google",
    autoDetectionSensitivity: 85,
    measurementUnits: "feet",
    showEmployeeTracking: true,
    
    // Financial Settings
    defaultCurrency: "USD",
    taxRate: 8.5,
    invoicePrefix: "INV-",
    estimatePrefix: "EST-",
    
    // Integration Settings
    quickbooksSync: false,
    googleMapsAPI: "",
    twilio: false,
    emailService: "enabled"
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    // Save settings to backend/localStorage
    localStorage.setItem('fleetSettings', JSON.stringify(settings));
    toast.success("Settings saved successfully");
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fleet-settings.json';
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Settings exported");
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          toast.success("Settings imported successfully");
        } catch (error) {
          toast.error("Invalid settings file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure your Fleet Asphalt Nexus system preferences and integrations
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button onClick={saveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
          <Button variant="outline" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <div>
            <Input
              type="file"
              accept=".json"
              onChange={importSettings}
              className="hidden"
              id="import-settings"
            />
            <Button variant="outline" onClick={() => document.getElementById('import-settings')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>
        <Badge variant="outline" className="text-sm">
          Auto-save: {settings.autoSave ? 'Enabled' : 'Disabled'}
        </Badge>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="fleet">Fleet</TabsTrigger>
          <TabsTrigger value="employee">Employee</TabsTrigger>
          <TabsTrigger value="mapping">Mapping</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Basic company details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={settings.companyName}
                    onChange={(e) => handleSettingChange('companyName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Phone</Label>
                  <Input
                    id="companyPhone"
                    value={settings.companyPhone}
                    onChange={(e) => handleSettingChange('companyPhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Email</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => handleSettingChange('companyEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Address</Label>
                  <Input
                    id="companyAddress"
                    value={settings.companyAddress}
                    onChange={(e) => handleSettingChange('companyAddress', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                User Preferences
              </CardTitle>
              <CardDescription>
                Customize your personal experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Theme</Label>
                  <p className="text-sm text-muted-foreground">Use dark mode interface</p>
                </div>
                <Switch
                  checked={settings.theme === 'dark'}
                  onCheckedChange={(checked) => handleSettingChange('theme', checked ? 'dark' : 'light')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-save</Label>
                  <p className="text-sm text-muted-foreground">Automatically save changes</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications</p>
                </div>
                <Switch
                  checked={settings.emailAlerts}
                  onCheckedChange={(checked) => handleSettingChange('emailAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive text message alerts</p>
                </div>
                <Switch
                  checked={settings.smsAlerts}
                  onCheckedChange={(checked) => handleSettingChange('smsAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Fleet Management
              </CardTitle>
              <CardDescription>
                Configure fleet tracking and monitoring settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gpsUpdate">GPS Update Interval (seconds)</Label>
                <Input
                  id="gpsUpdate"
                  type="number"
                  value={settings.gpsUpdateInterval}
                  onChange={(e) => handleSettingChange('gpsUpdateInterval', parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert when maintenance is due</p>
                </div>
                <Switch
                  checked={settings.maintenanceAlerts}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Fuel Tracking</Label>
                  <p className="text-sm text-muted-foreground">Track fuel consumption</p>
                </div>
                <Switch
                  checked={settings.fuelTrackingEnabled}
                  onCheckedChange={(checked) => handleSettingChange('fuelTrackingEnabled', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Route Optimization</Label>
                  <p className="text-sm text-muted-foreground">Optimize routes automatically</p>
                </div>
                <Switch
                  checked={settings.routeOptimization}
                  onCheckedChange={(checked) => handleSettingChange('routeOptimization', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employee" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employee Management
              </CardTitle>
              <CardDescription>
                Configure employee tracking and management settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Time Tracking</Label>
                  <p className="text-sm text-muted-foreground">Enable employee time tracking</p>
                </div>
                <Switch
                  checked={settings.timeTrackingEnabled}
                  onCheckedChange={(checked) => handleSettingChange('timeTrackingEnabled', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="geofence">Geofence Radius (meters)</Label>
                <Input
                  id="geofence"
                  type="number"
                  value={settings.geofenceRadius}
                  onChange={(e) => handleSettingChange('geofenceRadius', parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Overtime Alerts</Label>
                  <p className="text-sm text-muted-foreground">Alert when overtime is reached</p>
                </div>
                <Switch
                  checked={settings.overtimeAlerts}
                  onCheckedChange={(checked) => handleSettingChange('overtimeAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Performance Tracking</Label>
                  <p className="text-sm text-muted-foreground">Track employee performance metrics</p>
                </div>
                <Switch
                  checked={settings.performanceTracking}
                  onCheckedChange={(checked) => handleSettingChange('performanceTracking', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Mapping & Detection
              </CardTitle>
              <CardDescription>
                Configure mapping and asphalt detection settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="autoDetection">Auto-Detection Sensitivity (%)</Label>
                <Input
                  id="autoDetection"
                  type="number"
                  min="50"
                  max="100"
                  value={settings.autoDetectionSensitivity}
                  onChange={(e) => handleSettingChange('autoDetectionSensitivity', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="units">Measurement Units</Label>
                <select 
                  className="w-full p-2 border rounded"
                  value={settings.measurementUnits}
                  onChange={(e) => handleSettingChange('measurementUnits', e.target.value)}
                >
                  <option value="feet">Feet</option>
                  <option value="meters">Meters</option>
                  <option value="yards">Yards</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Employee Tracking</Label>
                  <p className="text-sm text-muted-foreground">Display employee locations on maps</p>
                </div>
                <Switch
                  checked={settings.showEmployeeTracking}
                  onCheckedChange={(checked) => handleSettingChange('showEmployeeTracking', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Financial Settings
              </CardTitle>
              <CardDescription>
                Configure financial and accounting preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <select 
                    className="w-full p-2 border rounded"
                    value={settings.defaultCurrency}
                    onChange={(e) => handleSettingChange('defaultCurrency', e.target.value)}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.1"
                    value={settings.taxRate}
                    onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                  <Input
                    id="invoicePrefix"
                    value={settings.invoicePrefix}
                    onChange={(e) => handleSettingChange('invoicePrefix', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estimatePrefix">Estimate Prefix</Label>
                  <Input
                    id="estimatePrefix"
                    value={settings.estimatePrefix}
                    onChange={(e) => handleSettingChange('estimatePrefix', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Third-Party Integrations
              </CardTitle>
              <CardDescription>
                Configure external service integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>QuickBooks Sync</Label>
                  <p className="text-sm text-muted-foreground">Sync with QuickBooks accounting</p>
                </div>
                <Switch
                  checked={settings.quickbooksSync}
                  onCheckedChange={(checked) => handleSettingChange('quickbooksSync', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="googleMaps">Google Maps API Key</Label>
                <Input
                  id="googleMaps"
                  type="password"
                  placeholder="Enter your Google Maps API key"
                  value={settings.googleMapsAPI}
                  onChange={(e) => handleSettingChange('googleMapsAPI', e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Twilio SMS Service</Label>
                  <p className="text-sm text-muted-foreground">Enable SMS notifications via Twilio</p>
                </div>
                <Switch
                  checked={settings.twilio}
                  onCheckedChange={(checked) => handleSettingChange('twilio', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Email Service Status</Label>
                <Badge variant={settings.emailService === 'enabled' ? 'default' : 'secondary'}>
                  {settings.emailService === 'enabled' ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
