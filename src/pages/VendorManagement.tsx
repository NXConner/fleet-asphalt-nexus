
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Phone, Mail, MapPin, User, Building, Eye } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Vendor {
  id: string;
  vendor_number: string;
  company_name: string;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  address: any;
  payment_terms: string;
  tax_id: string | null;
  website: string | null;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface VendorContact {
  id: string;
  vendor_id: string;
  name: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  is_primary: boolean;
  notes: string | null;
}

const VendorManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [isAddVendorOpen, setIsAddVendorOpen] = useState(false);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: vendors, isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('company_name');
      
      if (error) throw error;
      return data as Vendor[];
    }
  });

  const { data: vendorContacts } = useQuery({
    queryKey: ['vendor-contacts', selectedVendor?.id],
    queryFn: async () => {
      if (!selectedVendor?.id) return [];
      const { data, error } = await supabase
        .from('vendor_contacts')
        .select('*')
        .eq('vendor_id', selectedVendor.id)
        .order('is_primary', { ascending: false });
      
      if (error) throw error;
      return data as VendorContact[];
    },
    enabled: !!selectedVendor
  });

  const addVendorMutation = useMutation({
    mutationFn: async (vendorData: Partial<Vendor>) => {
      const { data, error } = await supabase
        .from('vendors')
        .insert([vendorData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      setIsAddVendorOpen(false);
      toast.success("Vendor added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add vendor: " + error.message);
    }
  });

  const addContactMutation = useMutation({
    mutationFn: async (contactData: Partial<VendorContact>) => {
      const { data, error } = await supabase
        .from('vendor_contacts')
        .insert([contactData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-contacts'] });
      setIsAddContactOpen(false);
      toast.success("Contact added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add contact: " + error.message);
    }
  });

  const handleAddVendor = (formData: FormData) => {
    const vendorData = {
      company_name: formData.get('company_name') as string,
      contact_person: formData.get('contact_person') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      website: formData.get('website') as string,
      payment_terms: formData.get('payment_terms') as string,
      tax_id: formData.get('tax_id') as string,
      notes: formData.get('notes') as string,
      address: {
        street: formData.get('street') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zip: formData.get('zip') as string
      }
    };
    
    addVendorMutation.mutate(vendorData);
  };

  const handleAddContact = (formData: FormData) => {
    const contactData = {
      vendor_id: selectedVendor?.id,
      name: formData.get('name') as string,
      title: formData.get('title') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      is_primary: formData.get('is_primary') === 'true',
      notes: formData.get('notes') as string
    };
    
    addContactMutation.mutate(contactData);
  };

  const handlePhoneCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  const filteredVendors = vendors?.filter(vendor =>
    vendor.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.vendor_number.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading vendors...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Vendor Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage vendors, contacts, and supplier relationships
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        
        <Dialog open={isAddVendorOpen} onOpenChange={setIsAddVendorOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddVendor(new FormData(e.currentTarget));
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input id="company_name" name="company_name" required />
                </div>
                <div>
                  <Label htmlFor="contact_person">Primary Contact</Label>
                  <Input id="contact_person" name="contact_person" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" />
                </div>
                <div>
                  <Label htmlFor="payment_terms">Payment Terms</Label>
                  <Select name="payment_terms" defaultValue="Net 30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Net 30">Net 30</SelectItem>
                      <SelectItem value="Net 15">Net 15</SelectItem>
                      <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                      <SelectItem value="Net 60">Net 60</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" name="street" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" name="zip" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="tax_id">Tax ID</Label>
                <Input id="tax_id" name="tax_id" />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={addVendorMutation.isPending}>
                  {addVendorMutation.isPending ? "Adding..." : "Add Vendor"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddVendorOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendors List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Vendors ({filteredVendors.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedVendor?.id === vendor.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedVendor(vendor)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{vendor.company_name}</h4>
                        <p className="text-sm text-muted-foreground">{vendor.vendor_number}</p>
                        {vendor.contact_person && (
                          <p className="text-sm text-muted-foreground">{vendor.contact_person}</p>
                        )}
                      </div>
                      <Badge variant={vendor.status === 'active' ? 'default' : 'secondary'}>
                        {vendor.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vendor Details */}
        <div className="lg:col-span-2">
          {selectedVendor ? (
            <Tabs defaultValue="details" className="space-y-4">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="contacts">Contacts</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      {selectedVendor.company_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Vendor Number</Label>
                        <p>{selectedVendor.vendor_number}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <Badge variant={selectedVendor.status === 'active' ? 'default' : 'secondary'}>
                          {selectedVendor.status}
                        </Badge>
                      </div>
                      {selectedVendor.contact_person && (
                        <div>
                          <Label className="text-sm font-medium">Primary Contact</Label>
                          <p>{selectedVendor.contact_person}</p>
                        </div>
                      )}
                      <div>
                        <Label className="text-sm font-medium">Payment Terms</Label>
                        <p>{selectedVendor.payment_terms}</p>
                      </div>
                    </div>

                    {(selectedVendor.email || selectedVendor.phone) && (
                      <div className="flex gap-2">
                        {selectedVendor.phone && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePhoneCall(selectedVendor.phone!)}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                        )}
                        {selectedVendor.email && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEmail(selectedVendor.email!)}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        )}
                      </div>
                    )}

                    {selectedVendor.address && (
                      <div>
                        <Label className="text-sm font-medium">Address</Label>
                        <div className="text-sm">
                          {selectedVendor.address.street && <p>{selectedVendor.address.street}</p>}
                          {(selectedVendor.address.city || selectedVendor.address.state || selectedVendor.address.zip) && (
                            <p>
                              {selectedVendor.address.city}, {selectedVendor.address.state} {selectedVendor.address.zip}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedVendor.notes && (
                      <div>
                        <Label className="text-sm font-medium">Notes</Label>
                        <p className="text-sm">{selectedVendor.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contacts">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Contacts</CardTitle>
                      <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Contact
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Contact</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            handleAddContact(new FormData(e.currentTarget));
                          }} className="space-y-4">
                            <div>
                              <Label htmlFor="name">Name *</Label>
                              <Input id="name" name="name" required />
                            </div>
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <Input id="title" name="title" />
                            </div>
                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" name="email" type="email" />
                            </div>
                            <div>
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" name="phone" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="is_primary" name="is_primary" value="true" />
                              <Label htmlFor="is_primary">Primary Contact</Label>
                            </div>
                            <div>
                              <Label htmlFor="notes">Notes</Label>
                              <Textarea id="notes" name="notes" />
                            </div>
                            <div className="flex gap-2">
                              <Button type="submit" disabled={addContactMutation.isPending}>
                                Add Contact
                              </Button>
                              <Button type="button" variant="outline" onClick={() => setIsAddContactOpen(false)}>
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {vendorContacts?.map((contact) => (
                        <div key={contact.id} className="p-3 border rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{contact.name}</h4>
                                {contact.is_primary && (
                                  <Badge variant="default" className="text-xs">Primary</Badge>
                                )}
                              </div>
                              {contact.title && (
                                <p className="text-sm text-muted-foreground">{contact.title}</p>
                              )}
                              {contact.notes && (
                                <p className="text-xs text-muted-foreground mt-1">{contact.notes}</p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {contact.phone && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePhoneCall(contact.phone!)}
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                              )}
                              {contact.email && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEmail(contact.email!)}
                                >
                                  <Mail className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="maintenance">
                <Card>
                  <CardHeader>
                    <CardTitle>Maintenance History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Maintenance records using this vendor will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a vendor to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;
