
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EstimateForm } from "@/components/estimates/EstimateForm";
import { Plus, Search, FileText, Calculator, DollarSign, Calendar } from "lucide-react";
import { Estimate } from "@/types/estimate";

export default function EstimatesManagement() {
  const [estimates, setEstimates] = useState<Estimate[]>([
    {
      id: "est-001",
      title: "Main Street Resurfacing",
      client: {
        name: "City Municipality",
        email: "projects@city.gov",
        phone: "(555) 123-4567",
        address: "100 City Hall Plaza"
      },
      project: {
        type: "paving",
        description: "Complete resurfacing of Main Street",
        location: "Main Street, Downtown",
        area: 2500
      },
      materials: [],
      labor: [],
      equipment: [],
      calculations: {
        materialsCost: 15000,
        laborCost: 8000,
        equipmentCost: 5000,
        overhead: 4200,
        profit: 5600,
        totalCost: 37800
      },
      status: "pending",
      validUntil: "2024-02-28T00:00:00Z",
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-01-27T10:30:00Z"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSaveEstimate = (estimate: Estimate) => {
    const existingIndex = estimates.findIndex(e => e.id === estimate.id);
    if (existingIndex >= 0) {
      const updated = [...estimates];
      updated[existingIndex] = estimate;
      setEstimates(updated);
    } else {
      setEstimates([...estimates, estimate]);
    }
    setShowForm(false);
  };

  const getStatusColor = (status: Estimate['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEstimates = estimates.filter(estimate =>
    estimate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estimate.client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: estimates.length,
    pending: estimates.filter(e => e.status === 'pending').length,
    approved: estimates.filter(e => e.status === 'approved').length,
    totalValue: estimates.reduce((sum, e) => sum + e.calculations.totalCost, 0)
  };

  if (showForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowForm(false)}
            className="mb-4"
          >
            ← Back to Estimates
          </Button>
        </div>
        <EstimateForm onSave={handleSaveEstimate} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Estimates Management</h1>
        <p className="text-muted-foreground mt-2">
          Create, manage, and track project estimates and proposals
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Estimates</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending Review</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.approved}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Estimates</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search estimates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Estimate
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredEstimates.map((estimate) => (
              <Card key={estimate.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{estimate.title}</h3>
                        <Badge className={getStatusColor(estimate.status)} variant="secondary">
                          {estimate.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>Client: {estimate.client.name}</div>
                        <div>Location: {estimate.project.location}</div>
                        <div>Type: {estimate.project.type}</div>
                        <div>Area: {estimate.project.area?.toLocaleString()} sq ft</div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-green-600">
                        ${estimate.calculations.totalCost.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Valid until: {new Date(estimate.validUntil).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          Generate Proposal
                        </Button>
                        <Button size="sm">
                          Convert to Job
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="space-y-4">
            {filteredEstimates.filter(e => e.status === 'pending').map((estimate) => (
              <Card key={estimate.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{estimate.title}</h3>
                      <p className="text-sm text-muted-foreground">{estimate.client.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${estimate.calculations.totalCost.toLocaleString()}</div>
                      <Badge className="bg-orange-100 text-orange-800" variant="secondary">
                        Awaiting Response
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="space-y-4">
            {filteredEstimates.filter(e => e.status === 'approved').map((estimate) => (
              <Card key={estimate.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{estimate.title}</h3>
                      <p className="text-sm text-muted-foreground">{estimate.client.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">${estimate.calculations.totalCost.toLocaleString()}</div>
                      <Button size="sm" className="mt-2">
                        Create Work Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="space-y-4">
            {filteredEstimates.filter(e => e.status === 'draft').map((estimate) => (
              <Card key={estimate.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{estimate.title}</h3>
                      <p className="text-sm text-muted-foreground">Draft - Not yet sent</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${estimate.calculations.totalCost.toLocaleString()}</div>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          Continue Editing
                        </Button>
                        <Button size="sm">
                          Send to Client
                        </Button>
                      </div>
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
}
