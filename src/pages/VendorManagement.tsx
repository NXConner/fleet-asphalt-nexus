
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Building2, 
  Phone, 
  Mail, 
  Plus, 
  Edit, 
  User,
  MapPin,
  DollarSign,
  FileText
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Vendor {
  id: string;
  vendor_number: string;
  company_name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: any;
  payment_terms?: string;
  tax_id?: string;
  website?: string;
  notes?: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

interface VendorContact {
  id: string;
  vendor_id?: string;
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  is_primary?: boolean;
  notes?: string;
  created_at: string;
}

export default function VendorManagement() {
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const queryClient = useQueryClient();

  // Fetch vendors
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

  // Fetch vendor contacts
  const { data: vendorContacts } = useQuery({
    queryKey: ['vendor-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendor_contacts')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as VendorContact[];
    }
  });

  // Add vendor mutation
  const addVendorMutation = useMutation({
    mutationFn: async (vendorData: Partial<Vendor>) => {
      const { data, error } = await supabase
        .from('vendors')
        .insert([{
          company_name: vendorData.company_name || '',
          contact_person: vendorData.contact_person,
          email: vendorData.email,
          phone: vendorData.phone,
          address: vendorData.address,
          payment_terms: vendorData.payment_terms,
          tax_id: vendorData.tax_id,
          website: vendorData.website,
          notes: vendorData.notes,
          status: vendorData.status || 'active'
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      setShowAddVendor(false);
      toast.success("Vendor added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add vendor: " + error.message);
    }
  });

  // Add contact mutation
  const addContactMutation = useMutation({
    mutationFn: async (contactData: Partial<VendorContact>) => {
      const { data, error } = await supabase
        .from('vendor_contacts')
        .insert([{
          vendor_id: contactData.vendor_id,
          name: contactData.name || '',
          title: contactData.title,
          email: contactData.email,
          phone: contactData.phone,
          is_primary: contactData.is_primary,
          notes: contactData.notes
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendor-contacts'] });
      setShowAddContact(false);
      toast.success("Contact added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add contact: " + error.message);
    }
  });

  const handleContactClick = (type: 'phone' | 'email', value: string) => {
    if (type === 'phone') {
      window.open(`tel:${value}`);
    } else if (type === 'email') {
      window.open(`mailto:${value}`);
    }
  };

  const getVendorContacts = (vendorId: string) => {
    return vendorContacts?.filter(contact => contact.vendor_id === vendorId) || [];
  };

  if (isLoading) {
    return <div>Loading vendors...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Vendor Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage vendors, contacts, and supplier relationships
          </p>
        </div>
        <Button onClick={() => setShowAddVendor(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <Tabs defaultValue="vendors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors">
          <div className="grid gap-6">
            {vendors?.map((vendor) => (
              <Card key={vendor.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {vendor.company_name}
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline">{vendor.vendor_number}</Badge>
                        <Badge variant={vendor.status === 'active' ? 'default' : 'secondary'}>
                          {vendor.status}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Primary Contact Info */}
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Primary Contact
                      </h4>
                      {vendor.contact_person && (
                        <div className="text-sm">{vendor.contact_person}</div>
                      )}
                      {vendor.phone && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-600 justify-start"
                          onClick={() => handleContactClick('phone', vendor.phone!)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          {vendor.phone}
                        </Button>
                      )}
                      {vendor.email && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-600 justify-start"
                          onClick={() => handleContactClick('email', vendor.email!)}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          {vendor.email}
                        </Button>
                      )}
                    </div>

                    {/* Additional Contacts */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Additional Contacts</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowAddContact(true);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {getVendorContacts(vendor.id).map((contact) => (
                        <div key={contact.id} className="space-y-1">
                          <div className="font-medium text-sm">{contact.name}</div>
                          {contact.title && (
                            <div className="text-xs text-muted-foreground">{contact.title}</div>
                          )}
                          <div className="flex gap-2">
                            {contact.phone && (
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 h-auto text-blue-600"
                                onClick={() => handleContactClick('phone', contact.phone!)}
                              >
                                <Phone className="h-3 w-3 mr-1" />
                                {contact.phone}
                              </Button>
                            )}
                            {contact.email && (
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 h-auto text-blue-600"
                                onClick={() => handleContactClick('email', contact.email!)}
                              >
                                <Mail className="h-3 w-3 mr-1" />
                                {contact.email}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Business Info */}
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Business Info
                      </h4>
                      {vendor.payment_terms && (
                        <div className="text-sm">
                          <span className="font-medium">Payment Terms:</span> {vendor.payment_terms}
                        </div>
                      )}
                      {vendor.tax_id && (
                        <div className="text-sm">
                          <span className="font-medium">Tax ID:</span> {vendor.tax_id}
                        </div>
                      )}
                      {vendor.website && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-600 justify-start"
                          onClick={() => window.open(vendor.website, '_blank')}
                        >
                          {vendor.website}
                        </Button>
                      )}
                      {vendor.notes && (
                        <div className="text-sm">
                          <span className="font-medium">Notes:</span> {vendor.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>All Vendor Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendorContacts?.map((contact) => {
                  const vendor = vendors?.find(v => v.id === contact.vendor_id);
                  return (
                    <div key={contact.id} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {vendor?.company_name} {contact.title && `• ${contact.title}`}
                        </div>
                        <div className="flex gap-4 mt-2">
                          {contact.phone && (
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 h-auto"
                              onClick={() => handleContactClick('phone', contact.phone!)}
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              {contact.phone}
                            </Button>
                          )}
                          {contact.email && (
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 h-auto"
                              onClick={() => handleContactClick('email', contact.email!)}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              {contact.email}
                            </Button>
                          )}
                        </div>
                      </div>
                      {contact.is_primary && (
                        <Badge>Primary</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Vendor performance analytics and reporting will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Vendor Dialog */}
      <Dialog open={showAddVendor} onOpenChange={setShowAddVendor}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            addVendorMutation.mutate({
              company_name: formData.get('company_name') as string,
              contact_person: formData.get('contact_person') as string,
              email: formData.get('email') as string,
              phone: formData.get('phone') as string,
              payment_terms: formData.get('payment_terms') as string,
              tax_id: formData.get('tax_id') as string,
              website: formData.get('website') as string,
              notes: formData.get('notes') as string
            });
          }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_name">Company Name *</Label>
                <Input id="company_name" name="company_name" required />
              </div>
              <div>
                <Label htmlFor="contact_person">Contact Person</Label>
                <Input id="contact_person" name="contact_person" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="payment_terms">Payment Terms</Label>
                <Input id="payment_terms" name="payment_terms" placeholder="Net 30" />
              </div>
              <div>
                <Label htmlFor="tax_id">Tax ID</Label>
                <Input id="tax_id" name="tax_id" />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="website" type="url" />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={addVendorMutation.isPending}>
                {addVendorMutation.isPending ? "Adding..." : "Add Vendor"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddVendor(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Contact Dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Contact for {selectedVendor?.company_name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            addContactMutation.mutate({
              vendor_id: selectedVendor?.id,
              name: formData.get('name') as string,
              title: formData.get('title') as string,
              email: formData.get('email') as string,
              phone: formData.get('phone') as string,
              is_primary: formData.get('is_primary') === 'on',
              notes: formData.get('notes') as string
            });
          }} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" required />
            </div>
            
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="is_primary" name="is_primary" />
              <Label htmlFor="is_primary">Primary Contact</Label>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={addContactMutation.isPending}>
                {addContactMutation.isPending ? "Adding..." : "Add Contact"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddContact(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
