
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Package, Wrench, FileText, Plus, Edit } from "lucide-react";

interface Material {
  id: string;
  name: string;
  type: 'asphalt' | 'sealer' | 'crack_filler' | 'aggregate' | 'other';
  unit: 'gallon' | 'ton' | 'bag' | 'box' | 'sq_ft' | 'linear_ft';
  cost_per_unit: number;
  bulk_cost?: number;
  bulk_quantity?: number;
  specifications: string;
  supplier: string;
  last_updated: string;
}

interface LaborRate {
  id: string;
  position: string;
  hourly_rate: number;
  overtime_rate: number;
  benefits_percentage: number;
  description: string;
}

export const CostManagement = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: 'Coal Tar Sealer',
      type: 'sealer',
      unit: 'gallon',
      cost_per_unit: 1.85,
      bulk_cost: 1650.00,
      bulk_quantity: 1000,
      specifications: 'ASTM D490 Type RT-12, 65% coal tar, refined tar base with mineral fillers',
      supplier: 'SealMaster',
      last_updated: '2024-01-15'
    },
    {
      id: '2',
      name: 'Hot Pour Crack Filler',
      type: 'crack_filler',
      unit: 'box',
      cost_per_unit: 45.50,
      specifications: '30 lb box, thermoplastic rubberized compound, working temp 375-400°F',
      supplier: 'Crafco',
      last_updated: '2024-01-15'
    },
    {
      id: '3',
      name: 'Asphalt Mix Type S9.5A',
      type: 'asphalt',
      unit: 'ton',
      cost_per_unit: 95.00,
      bulk_cost: 8500.00,
      bulk_quantity: 100,
      specifications: 'VDOT Spec 9.5mm Superpave mix, 5.8% asphalt content, PG 64-22 binder',
      supplier: 'Virginia Paving',
      last_updated: '2024-01-15'
    }
  ]);

  const [laborRates, setLaborRates] = useState<LaborRate[]>([
    {
      id: '1',
      position: 'Crew Leader',
      hourly_rate: 28.50,
      overtime_rate: 42.75,
      benefits_percentage: 35,
      description: 'Supervises crew, ensures quality and safety compliance'
    },
    {
      id: '2',
      position: 'Equipment Operator',
      hourly_rate: 25.00,
      overtime_rate: 37.50,
      benefits_percentage: 35,
      description: 'Operates paving equipment, compactors, and other machinery'
    },
    {
      id: '3',
      position: 'General Laborer',
      hourly_rate: 18.00,
      overtime_rate: 27.00,
      benefits_percentage: 28,
      description: 'Manual labor, material handling, site preparation'
    }
  ]);

  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showAddLabor, setShowAddLabor] = useState(false);

  const addMaterial = (materialData: Partial<Material>) => {
    const newMaterial: Material = {
      id: Date.now().toString(),
      name: materialData.name || '',
      type: materialData.type || 'other',
      unit: materialData.unit || 'gallon',
      cost_per_unit: materialData.cost_per_unit || 0,
      bulk_cost: materialData.bulk_cost,
      bulk_quantity: materialData.bulk_quantity,
      specifications: materialData.specifications || '',
      supplier: materialData.supplier || '',
      last_updated: new Date().toISOString().split('T')[0]
    };
    setMaterials([...materials, newMaterial]);
    setShowAddMaterial(false);
  };

  const addLaborRate = (laborData: Partial<LaborRate>) => {
    const newLabor: LaborRate = {
      id: Date.now().toString(),
      position: laborData.position || '',
      hourly_rate: laborData.hourly_rate || 0,
      overtime_rate: laborData.overtime_rate || 0,
      benefits_percentage: laborData.benefits_percentage || 0,
      description: laborData.description || ''
    };
    setLaborRates([...laborRates, newLabor]);
    setShowAddLabor(false);
  };

  const getBulkSavings = (material: Material) => {
    if (!material.bulk_cost || !material.bulk_quantity) return 0;
    const regularTotal = material.cost_per_unit * material.bulk_quantity;
    const savings = regularTotal - material.bulk_cost;
    return (savings / regularTotal) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Cost Management</h2>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddMaterial(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Button>
          <Button onClick={() => setShowAddLabor(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Labor Rate
          </Button>
        </div>
      </div>

      <Tabs defaultValue="materials" className="space-y-4">
        <TabsList>
          <TabsTrigger value="materials">Materials & Supplies</TabsTrigger>
          <TabsTrigger value="labor">Labor Rates</TabsTrigger>
          <TabsTrigger value="calculator">Cost Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="materials">
          <div className="grid gap-4">
            {materials.map((material) => (
              <Card key={material.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        {material.name}
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{material.type.replace('_', ' ')}</Badge>
                        <Badge variant="outline">{material.supplier}</Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Unit Cost:</span>
                        <span className="font-mono">${material.cost_per_unit.toFixed(2)} / {material.unit}</span>
                      </div>
                      
                      {material.bulk_cost && material.bulk_quantity && (
                        <>
                          <div className="flex justify-between">
                            <span className="font-medium">Bulk Cost:</span>
                            <span className="font-mono">${material.bulk_cost.toFixed(2)} / {material.bulk_quantity} {material.unit}s</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Bulk Savings:</span>
                            <span className="font-mono text-green-600">{getBulkSavings(material).toFixed(1)}%</span>
                          </div>
                        </>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="font-medium">Last Updated:</span>
                        <span>{material.last_updated}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="font-medium">Specifications:</Label>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {material.specifications}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="labor">
          <div className="grid gap-4">
            {laborRates.map((labor) => (
              <Card key={labor.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5" />
                      {labor.position}
                    </CardTitle>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Regular Rate:</span>
                        <span className="font-mono">${labor.hourly_rate.toFixed(2)} / hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Overtime Rate:</span>
                        <span className="font-mono">${labor.overtime_rate.toFixed(2)} / hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Benefits:</span>
                        <span className="font-mono">{labor.benefits_percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Total Cost:</span>
                        <span className="font-mono font-bold">
                          ${(labor.hourly_rate * (1 + labor.benefits_percentage / 100)).toFixed(2)} / hour
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="font-medium">Description:</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {labor.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Project Cost Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Project Details</h3>
                  <div className="space-y-2">
                    <Label>Area (sq ft)</Label>
                    <Input type="number" placeholder="Enter area in square feet" />
                  </div>
                  <div className="space-y-2">
                    <Label>Project Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sealcoating">Sealcoating</SelectItem>
                        <SelectItem value="paving">Paving</SelectItem>
                        <SelectItem value="crack-sealing">Crack Sealing</SelectItem>
                        <SelectItem value="patching">Patching</SelectItem>
                        <SelectItem value="striping">Line Striping</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Hours</Label>
                    <Input type="number" placeholder="Total labor hours" />
                  </div>
                  <div className="space-y-2">
                    <Label>Crew Size</Label>
                    <Input type="number" placeholder="Number of workers" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Cost Breakdown</h3>
                  <div className="space-y-3 p-4 bg-gray-50 rounded">
                    <div className="flex justify-between">
                      <span>Materials:</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor:</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment:</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold">
                      <span>Subtotal:</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overhead (15%):</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit (20%):</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="font-mono">$0.00</span>
                    </div>
                  </div>
                  <Button className="w-full">Calculate Costs</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Material Modal would go here */}
      {/* Add Labor Rate Modal would go here */}
    </div>
  );
};
