
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, Package, AlertTriangle, TrendingDown, Truck } from "lucide-react";
import { InventoryItem, StockMovement, Supplier } from "@/types/inventory";

const InventoryManagement = () => {
  const [items] = useState<InventoryItem[]>([
    {
      id: "inv-001",
      category: "asphalt",
      name: "Hot Mix Asphalt",
      description: "Standard hot mix asphalt for road construction",
      sku: "HMA-001",
      unit: "tons",
      currentStock: 150,
      minimumStock: 50,
      maximumStock: 500,
      reorderPoint: 75,
      unitCost: 85,
      supplierCost: 75,
      markup: 13.33,
      sellPrice: 95,
      supplierId: "sup-001",
      location: "Yard A",
      lastRestocked: "2024-01-20T00:00:00Z",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-20T00:00:00Z"
    },
    {
      id: "inv-002",
      category: "aggregate",
      name: "Crushed Stone Base",
      description: "Grade A crushed stone for base layer",
      sku: "CSB-001",
      unit: "tons",
      currentStock: 25,
      minimumStock: 30,
      maximumStock: 200,
      reorderPoint: 45,
      unitCost: 35,
      supplierCost: 30,
      markup: 16.67,
      sellPrice: 42,
      supplierId: "sup-002",
      location: "Yard B",
      lastRestocked: "2024-01-15T00:00:00Z",
      status: "active",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z"
    }
  ]);

  const [movements] = useState<StockMovement[]>([
    {
      id: "mov-001",
      itemId: "inv-001",
      type: "out",
      quantity: 25,
      reason: "Job JOB-001 - Main Street Project",
      reference: "JOB-001",
      userId: "user-1",
      date: "2024-01-25T00:00:00Z",
      notes: "Used for main street resurfacing"
    }
  ]);

  const [suppliers] = useState<Supplier[]>([
    {
      id: "sup-001",
      name: "Florida Asphalt Co.",
      contact: "Mike Johnson",
      email: "mike@flasphalt.com",
      phone: "(555) 234-5678",
      address: "123 Industrial Blvd, Orlando, FL",
      paymentTerms: "Net 30",
      status: "active",
      rating: 4.5,
      createdAt: "2024-01-01T00:00:00Z"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= 0) return { status: 'out-of-stock', color: 'bg-red-100 text-red-800' };
    if (item.currentStock <= item.reorderPoint) return { status: 'reorder-needed', color: 'bg-orange-100 text-orange-800' };
    if (item.currentStock <= item.minimumStock) return { status: 'low-stock', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'in-stock', color: 'bg-green-100 text-green-800' };
  };

  const getStockPercentage = (item: InventoryItem) => {
    return Math.min((item.currentStock / item.maximumStock) * 100, 100);
  };

  const stats = {
    totalItems: items.length,
    lowStockItems: items.filter(i => i.currentStock <= i.minimumStock).length,
    outOfStockItems: items.filter(i => i.currentStock <= 0).length,
    totalValue: items.reduce((sum, i) => sum + (i.currentStock * i.unitCost), 0)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground mt-2">
          Track materials, supplies, and equipment inventory
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.totalItems}</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{stats.lowStockItems}</div>
                <div className="text-sm text-muted-foreground">Low Stock Items</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{stats.outOfStockItems}</div>
                <div className="text-sm text-muted-foreground">Out of Stock</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="movements">Stock Movements</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid gap-4">
            {filteredItems.map((item) => {
              const stockStatus = getStockStatus(item);
              const stockPercentage = getStockPercentage(item);
              
              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <Badge className={stockStatus.color} variant="secondary">
                            {stockStatus.status.replace('-', ' ')}
                          </Badge>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          <div>SKU: {item.sku} | Location: {item.location}</div>
                          <div>{item.description}</div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Stock Level: {item.currentStock} {item.unit}</span>
                            <span>Max: {item.maximumStock} {item.unit}</span>
                          </div>
                          <Progress value={stockPercentage} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Reorder at: {item.reorderPoint}</span>
                            <span>Min: {item.minimumStock}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2 ml-6">
                        <div className="text-sm text-muted-foreground">
                          <div>Cost: ${item.unitCost}/{item.unit}</div>
                          <div>Sell: ${item.sellPrice}/{item.unit}</div>
                          <div>Margin: {item.markup.toFixed(1)}%</div>
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          ${(item.currentStock * item.unitCost).toLocaleString()}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Adjust Stock
                          </Button>
                          <Button size="sm" variant="outline">
                            Reorder
                          </Button>
                          <Button size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <div className="grid gap-4">
            {movements.map((movement) => {
              const item = items.find(i => i.id === movement.itemId);
              return (
                <Card key={movement.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{item?.name}</h3>
                          <Badge variant={movement.type === 'in' ? 'default' : 'secondary'}>
                            {movement.type === 'in' ? 'Stock In' : 'Stock Out'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div>Quantity: {movement.quantity} {item?.unit}</div>
                          <div>Reason: {movement.reason}</div>
                          {movement.reference && <div>Reference: {movement.reference}</div>}
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        {new Date(movement.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{supplier.name}</h3>
                        <Badge className="bg-green-100 text-green-800" variant="secondary">
                          {supplier.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>Contact: {supplier.contact}</div>
                        <div>Email: {supplier.email}</div>
                        <div>Phone: {supplier.phone}</div>
                        <div>Address: {supplier.address}</div>
                        <div>Payment Terms: {supplier.paymentTerms}</div>
                        <div>Rating: {supplier.rating}/5</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Truck className="h-4 w-4 mr-2" />
                        Create Order
                      </Button>
                      <Button size="sm" variant="outline">
                        Contact
                      </Button>
                      <Button size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {items.filter(item => item.currentStock <= item.reorderPoint).map((item) => (
              <Card key={item.id} className="border-orange-200 bg-orange-50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Current stock: {item.currentStock} {item.unit} (Reorder point: {item.reorderPoint})
                        </p>
                      </div>
                    </div>
                    <Button size="sm">
                      Reorder Now
                    </Button>
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

export default InventoryManagement;
