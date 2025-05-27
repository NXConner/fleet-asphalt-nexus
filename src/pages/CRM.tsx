
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Users, Phone, Mail, Building, Calendar } from "lucide-react";
import { Customer, CustomerInteraction } from "@/types/customer";

const CRM = () => {
  const [customers] = useState<Customer[]>([
    {
      id: "cust-001",
      type: "business",
      name: "City Municipality",
      email: "projects@city.gov",
      phone: "(555) 123-4567",
      address: {
        street: "100 City Hall Plaza",
        city: "Downtown",
        state: "FL",
        zipCode: "12345"
      },
      contactPerson: "John Smith",
      creditLimit: 100000,
      paymentTerms: "net-30",
      status: "active",
      notes: "Major client for municipal projects",
      tags: ["government", "high-value", "regular"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-27T10:30:00Z"
    }
  ]);

  const [interactions] = useState<CustomerInteraction[]>([
    {
      id: "int-001",
      customerId: "cust-001",
      type: "meeting",
      subject: "Q2 Projects Discussion",
      description: "Discussed upcoming road projects for Q2",
      outcome: "Received RFQ for 3 projects",
      nextAction: "Prepare estimates",
      nextActionDate: "2024-02-05",
      userId: "user-1",
      createdAt: "2024-01-25T14:00:00Z"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'prospect':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'active').length,
    prospects: customers.filter(c => c.status === 'prospect').length,
    totalValue: customers.reduce((sum, c) => sum + c.creditLimit, 0)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Customer Relationship Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage customers, track interactions, and grow your business
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                <div className="text-sm text-muted-foreground">Total Customers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.activeCustomers}</div>
                <div className="text-sm text-muted-foreground">Active Customers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{stats.prospects}</div>
                <div className="text-sm text-muted-foreground">Prospects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Credit Limit</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="customers" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="prospects">Prospects</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4">
            {filteredCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{customer.name}</h3>
                        <Badge className={getStatusColor(customer.status)} variant="secondary">
                          {customer.status}
                        </Badge>
                        <Badge variant="outline">{customer.type}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {customer.phone}
                        </div>
                        <div>Address: {customer.address.street}, {customer.address.city}</div>
                        {customer.contactPerson && <div>Contact: {customer.contactPerson}</div>}
                        <div className="flex gap-2 mt-2">
                          {customer.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Credit Limit: ${customer.creditLimit.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Terms: {customer.paymentTerms}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          View History
                        </Button>
                        <Button size="sm">
                          New Estimate
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <div className="grid gap-4">
            {interactions.map((interaction) => (
              <Card key={interaction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{interaction.subject}</h3>
                        <Badge variant="outline">{interaction.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{interaction.description}</p>
                      <div className="text-sm">
                        <div><strong>Outcome:</strong> {interaction.outcome}</div>
                        {interaction.nextAction && (
                          <div><strong>Next Action:</strong> {interaction.nextAction}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {new Date(interaction.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prospects" className="space-y-4">
          <div className="grid gap-4">
            {filteredCustomers.filter(c => c.status === 'prospect').map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Follow Up
                      </Button>
                      <Button size="sm">
                        Convert to Customer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CRM;
