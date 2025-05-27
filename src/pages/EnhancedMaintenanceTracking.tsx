
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Search, 
  AlertTriangle, 
  Calendar as CalendarIcon,
  Wrench, 
  Upload,
  Camera,
  FileText,
  Bell,
  Clock,
  Car,
  Shield,
  Settings
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, addDays } from "date-fns";

interface MaintenanceItem {
  id: string;
  vehicle_id: string;
  item_type: string;
  description: string;
  interval_type: 'mileage' | 'time' | 'hours';
  interval_value: number;
  last_service_date: string | null;
  last_service_mileage: number | null;
  next_due_date: string | null;
  next_due_mileage: number | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  cost_estimate: number | null;
  vendor_id: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
}

interface VehicleDocument {
  id: string;
  vehicle_id: string;
  document_type: 'registration' | 'insurance' | 'inspection' | 'title' | 'manual' | 'other';
  document_name: string;
  document_url: string;
  expiry_date: string | null;
  issued_date: string | null;
  issuing_authority: string | null;
  document_number: string | null;
  notes: string | null;
  uploaded_at: string;
}

interface MaintenanceNotification {
  id: string;
  vehicle_id: string;
  maintenance_item_id: string | null;
  notification_type: 'due_soon' | 'overdue' | 'critical';
  message: string;
  due_date: string | null;
  is_read: boolean;
  created_at: string;
}

const EnhancedMaintenanceTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isAddDocumentOpen, setIsAddDocumentOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const queryClient = useQueryClient();

  // Maintenance items query
  const { data: maintenanceItems, isLoading } = useQuery({
    queryKey: ['maintenance-items', selectedVehicle],
    queryFn: async () => {
      let query = supabase
        .from('maintenance_items')
        .select('*')
        .order('next_due_date', { ascending: true });
      
      if (selectedVehicle !== 'all') {
        query = query.eq('vehicle_id', selectedVehicle);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as MaintenanceItem[];
    }
  });

  // Vehicle documents query
  const { data: vehicleDocuments } = useQuery({
    queryKey: ['vehicle-documents', selectedVehicle],
    queryFn: async () => {
      let query = supabase
        .from('vehicle_documents')
        .select('*')
        .order('expiry_date', { ascending: true });
      
      if (selectedVehicle !== 'all') {
        query = query.eq('vehicle_id', selectedVehicle);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as VehicleDocument[];
    }
  });

  // Maintenance notifications query
  const { data: notifications } = useQuery({
    queryKey: ['maintenance-notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('maintenance_notifications')
        .select('*')
        .eq('is_read', false)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as MaintenanceNotification[];
    }
  });

  // Vendors query for dropdown
  const { data: vendors } = useQuery({
    queryKey: ['vendors-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('id, company_name')
        .eq('status', 'active')
        .order('company_name');
      
      if (error) throw error;
      return data;
    }
  });

  const addMaintenanceItemMutation = useMutation({
    mutationFn: async (itemData: Partial<MaintenanceItem>) => {
      const { data, error } = await supabase
        .from('maintenance_items')
        .insert([itemData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance-items'] });
      setIsAddItemOpen(false);
      toast.success("Maintenance item added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add maintenance item: " + error.message);
    }
  });

  const addDocumentMutation = useMutation({
    mutationFn: async (documentData: Partial<VehicleDocument>) => {
      const { data, error } = await supabase
        .from('vehicle_documents')
        .insert([documentData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle-documents'] });
      setIsAddDocumentOpen(false);
      toast.success("Document added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add document: " + error.message);
    }
  });

  const handleAddMaintenanceItem = (formData: FormData) => {
    const intervalType = formData.get('interval_type') as string;
    const intervalValue = parseInt(formData.get('interval_value') as string);
    
    let nextDueDate = null;
    let nextDueMileage = null;
    
    if (intervalType === 'time') {
      nextDueDate = addDays(new Date(), intervalValue * 30); // Convert months to days
    } else if (intervalType === 'mileage') {
      nextDueMileage = parseInt(formData.get('current_mileage') as string || '0') + intervalValue;
    }

    const itemData = {
      vehicle_id: formData.get('vehicle_id') as string,
      item_type: formData.get('item_type') as string,
      description: formData.get('description') as string,
      interval_type: intervalType as 'mileage' | 'time' | 'hours',
      interval_value: intervalValue,
      next_due_date: nextDueDate?.toISOString(),
      next_due_mileage: nextDueMileage,
      priority: formData.get('priority') as 'low' | 'medium' | 'high' | 'critical',
      cost_estimate: parseFloat(formData.get('cost_estimate') as string || '0'),
      vendor_id: formData.get('vendor_id') as string || null,
      notes: formData.get('notes') as string
    };
    
    addMaintenanceItemMutation.mutate(itemData);
  };

  const handleAddDocument = (formData: FormData) => {
    const documentData = {
      vehicle_id: formData.get('vehicle_id') as string,
      document_type: formData.get('document_type') as VehicleDocument['document_type'],
      document_name: formData.get('document_name') as string,
      document_url: formData.get('document_url') as string,
      expiry_date: formData.get('expiry_date') as string || null,
      issued_date: formData.get('issued_date') as string || null,
      issuing_authority: formData.get('issuing_authority') as string || null,
      document_number: formData.get('document_number') as string || null,
      notes: formData.get('notes') as string || null
    };
    
    addDocumentMutation.mutate(documentData);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'registration': return Car;
      case 'insurance': return Shield;
      case 'inspection': return Settings;
      default: return FileText;
    }
  };

  const overdueItems = maintenanceItems?.filter(item => 
    item.next_due_date && new Date(item.next_due_date) < new Date()
  ) || [];

  const dueSoonItems = maintenanceItems?.filter(item => 
    item.next_due_date && 
    new Date(item.next_due_date) >= new Date() &&
    new Date(item.next_due_date) <= addDays(new Date(), 30)
  ) || [];

  const expiringDocuments = vehicleDocuments?.filter(doc =>
    doc.expiry_date && new Date(doc.expiry_date) <= addDays(new Date(), 30)
  ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Enhanced Maintenance Tracking</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive vehicle maintenance, document management, and compliance tracking
        </p>
      </div>

      {/* Alerts Section */}
      {(overdueItems.length > 0 || dueSoonItems.length > 0 || expiringDocuments.length > 0) && (
        <div className="mb-6 space-y-2">
          {overdueItems.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-red-800">
                {overdueItems.length} overdue maintenance item{overdueItems.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
          {dueSoonItems.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800">
                {dueSoonItems.length} maintenance item{dueSoonItems.length > 1 ? 's' : ''} due within 30 days
              </span>
            </div>
          )}
          {expiringDocuments.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded">
              <FileText className="h-5 w-5 text-orange-600" />
              <span className="text-orange-800">
                {expiringDocuments.length} document{expiringDocuments.length > 1 ? 's' : ''} expiring within 30 days
              </span>
            </div>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{maintenanceItems?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{overdueItems.length}</div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{dueSoonItems.length}</div>
                <div className="text-sm text-muted-foreground">Due Soon</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{notifications?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Notifications</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search maintenance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vehicles</SelectItem>
              <SelectItem value="vehicle-1">Vehicle 1</SelectItem>
              <SelectItem value="vehicle-2">Vehicle 2</SelectItem>
              <SelectItem value="vehicle-3">Vehicle 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Maintenance Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Maintenance Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleAddMaintenanceItem(new FormData(e.currentTarget));
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicle_id">Vehicle *</Label>
                    <Select name="vehicle_id" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vehicle-1">Vehicle 1</SelectItem>
                        <SelectItem value="vehicle-2">Vehicle 2</SelectItem>
                        <SelectItem value="vehicle-3">Vehicle 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="item_type">Item Type *</Label>
                    <Select name="item_type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oil_change">Oil Change</SelectItem>
                        <SelectItem value="air_filter">Air Filter</SelectItem>
                        <SelectItem value="spark_plugs">Spark Plugs</SelectItem>
                        <SelectItem value="spark_plug_wires">Spark Plug Wires</SelectItem>
                        <SelectItem value="brake_pads">Brake Pads</SelectItem>
                        <SelectItem value="tire_rotation">Tire Rotation</SelectItem>
                        <SelectItem value="transmission_service">Transmission Service</SelectItem>
                        <SelectItem value="coolant_flush">Coolant Flush</SelectItem>
                        <SelectItem value="registration">Registration Renewal</SelectItem>
                        <SelectItem value="insurance">Insurance Renewal</SelectItem>
                        <SelectItem value="inspection">Safety Inspection</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Input id="description" name="description" required />
                  </div>
                  <div>
                    <Label htmlFor="interval_type">Interval Type *</Label>
                    <Select name="interval_type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mileage">Mileage</SelectItem>
                        <SelectItem value="time">Time (Months)</SelectItem>
                        <SelectItem value="hours">Engine Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="interval_value">Interval Value *</Label>
                    <Input id="interval_value" name="interval_value" type="number" required />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select name="priority" defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cost_estimate">Cost Estimate</Label>
                    <Input id="cost_estimate" name="cost_estimate" type="number" step="0.01" />
                  </div>
                  <div>
                    <Label htmlFor="current_mileage">Current Mileage</Label>
                    <Input id="current_mileage" name="current_mileage" type="number" />
                  </div>
                  <div>
                    <Label htmlFor="vendor_id">Vendor</Label>
                    <Select name="vendor_id">
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors?.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.company_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" name="notes" />
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={addMaintenanceItemMutation.isPending}>
                    {addMaintenanceItemMutation.isPending ? "Adding..." : "Add Item"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddItemOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDocumentOpen} onOpenChange={setIsAddDocumentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Vehicle Document</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleAddDocument(new FormData(e.currentTarget));
              }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vehicle_id">Vehicle *</Label>
                    <Select name="vehicle_id" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vehicle-1">Vehicle 1</SelectItem>
                        <SelectItem value="vehicle-2">Vehicle 2</SelectItem>
                        <SelectItem value="vehicle-3">Vehicle 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="document_type">Document Type *</Label>
                    <Select name="document_type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="registration">Registration</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="document_name">Document Name *</Label>
                  <Input id="document_name" name="document_name" required />
                </div>
                
                <div>
                  <Label htmlFor="document_url">Document URL *</Label>
                  <Input id="document_url" name="document_url" type="url" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issued_date">Issued Date</Label>
                    <Input id="issued_date" name="issued_date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="expiry_date">Expiry Date</Label>
                    <Input id="expiry_date" name="expiry_date" type="date" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="document_number">Document Number</Label>
                    <Input id="document_number" name="document_number" />
                  </div>
                  <div>
                    <Label htmlFor="issuing_authority">Issuing Authority</Label>
                    <Input id="issuing_authority" name="issuing_authority" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" name="notes" />
                </div>
                
                <div className="flex gap-2">
                  <Button type="submit" disabled={addDocumentMutation.isPending}>
                    Add Document
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddDocumentOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Items</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Overdue Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {overdueItems.map((item) => (
                    <div key={item.id} className="p-3 bg-red-50 border border-red-200 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.description}</h4>
                          <p className="text-sm text-muted-foreground">Vehicle: {item.vehicle_id}</p>
                          <p className="text-sm text-red-600">
                            Due: {item.next_due_date ? format(new Date(item.next_due_date), 'MMM dd, yyyy') : 'N/A'}
                          </p>
                        </div>
                        <Badge className={getPriorityColor(item.priority)} variant="secondary">
                          {item.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {overdueItems.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No overdue items</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  Due Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dueSoonItems.map((item) => (
                    <div key={item.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{item.description}</h4>
                          <p className="text-sm text-muted-foreground">Vehicle: {item.vehicle_id}</p>
                          <p className="text-sm text-yellow-600">
                            Due: {item.next_due_date ? format(new Date(item.next_due_date), 'MMM dd, yyyy') : 'N/A'}
                          </p>
                        </div>
                        <Badge className={getPriorityColor(item.priority)} variant="secondary">
                          {item.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {dueSoonItems.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No items due soon</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4">
            {maintenanceItems?.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{item.description}</h3>
                        <Badge className={getPriorityColor(item.priority)} variant="secondary">
                          {item.priority}
                        </Badge>
                        <Badge variant="outline">{item.item_type}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><strong>Vehicle:</strong> {item.vehicle_id}</div>
                        <div><strong>Interval:</strong> {item.interval_value} {item.interval_type}</div>
                        <div>
                          <strong>Next Due:</strong> {
                            item.next_due_date 
                              ? format(new Date(item.next_due_date), 'MMM dd, yyyy')
                              : item.next_due_mileage 
                                ? `${item.next_due_mileage} miles`
                                : 'Not scheduled'
                          }
                        </div>
                        <div><strong>Cost Estimate:</strong> ${item.cost_estimate || 0}</div>
                      </div>
                      
                      {item.notes && (
                        <div className="text-sm">
                          <strong>Notes:</strong> {item.notes}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm">
                        Complete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {vehicleDocuments?.map((doc) => {
              const IconComponent = getDocumentIcon(doc.document_type);
              const isExpiring = doc.expiry_date && new Date(doc.expiry_date) <= addDays(new Date(), 30);
              
              return (
                <Card key={doc.id} className={isExpiring ? 'border-orange-200 bg-orange-50' : ''}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                        <div className="space-y-1">
                          <h3 className="font-semibold">{doc.document_name}</h3>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Vehicle: {doc.vehicle_id}</div>
                            <div>Type: {doc.document_type}</div>
                            {doc.document_number && <div>Number: {doc.document_number}</div>}
                            {doc.issuing_authority && <div>Authority: {doc.issuing_authority}</div>}
                            {doc.expiry_date && (
                              <div className={isExpiring ? 'text-orange-600 font-medium' : ''}>
                                Expires: {format(new Date(doc.expiry_date), 'MMM dd, yyyy')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4">
            {notifications?.map((notification) => (
              <Card key={notification.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Bell className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{notification.message}</h4>
                          <div className="text-sm text-muted-foreground mt-1">
                            Vehicle: {notification.vehicle_id} | 
                            Type: {notification.notification_type} |
                            Created: {format(new Date(notification.created_at), 'MMM dd, yyyy HH:mm')}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Mark Read
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!notifications?.length && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No notifications</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedMaintenanceTracking;
