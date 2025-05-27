
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calculator, Plus, Trash2 } from "lucide-react";

interface MaterialCost {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitCost: number;
  total: number;
}

interface LaborCost {
  id: string;
  role: string;
  hours: number;
  hourlyRate: number;
  total: number;
}

interface EquipmentCost {
  id: string;
  equipment: string;
  hours: number;
  hourlyRate: number;
  total: number;
}

export const AdvancedPricingCalculator = () => {
  const [projectType, setProjectType] = useState<string>("");
  const [area, setArea] = useState<number>(0);
  const [thickness, setThickness] = useState<number>(2);
  const [materials, setMaterials] = useState<MaterialCost[]>([]);
  const [labor, setLabor] = useState<LaborCost[]>([]);
  const [equipment, setEquipment] = useState<EquipmentCost[]>([]);
  const [overheadPercent, setOverheadPercent] = useState<number>(15);
  const [profitPercent, setProfitPercent] = useState<number>(20);

  // Predefined material costs (per unit)
  const materialPrices = {
    'Hot Mix Asphalt': { unit: 'ton', cost: 85.00 },
    'Aggregate Base': { unit: 'ton', cost: 25.00 },
    'Prime Coat': { unit: 'gallon', cost: 3.50 },
    'Crack Sealant': { unit: 'gallon', cost: 12.00 },
    'Line Paint': { unit: 'gallon', cost: 45.00 }
  };

  // Calculate material quantities based on project type and area
  useEffect(() => {
    if (projectType && area > 0) {
      const newMaterials: MaterialCost[] = [];
      
      switch (projectType) {
        case 'new_paving':
          // Hot mix asphalt calculation: area * thickness * density
          const asphaltTons = (area * (thickness / 12) * 2.4); // 2.4 tons per cubic yard
          newMaterials.push({
            id: 'hma',
            name: 'Hot Mix Asphalt',
            quantity: Math.ceil(asphaltTons),
            unit: 'ton',
            unitCost: materialPrices['Hot Mix Asphalt'].cost,
            total: Math.ceil(asphaltTons) * materialPrices['Hot Mix Asphalt'].cost
          });
          
          // Base material (typically 4 inches)
          const baseTons = (area * (4 / 12) * 1.8); // 1.8 tons per cubic yard for aggregate
          newMaterials.push({
            id: 'base',
            name: 'Aggregate Base',
            quantity: Math.ceil(baseTons),
            unit: 'ton',
            unitCost: materialPrices['Aggregate Base'].cost,
            total: Math.ceil(baseTons) * materialPrices['Aggregate Base'].cost
          });
          break;
          
        case 'overlay':
          const overlayTons = (area * (thickness / 12) * 2.4);
          newMaterials.push({
            id: 'overlay',
            name: 'Hot Mix Asphalt',
            quantity: Math.ceil(overlayTons),
            unit: 'ton',
            unitCost: materialPrices['Hot Mix Asphalt'].cost,
            total: Math.ceil(overlayTons) * materialPrices['Hot Mix Asphalt'].cost
          });
          break;
          
        case 'crack_sealing':
          const sealantGallons = area * 0.002; // Estimate based on area
          newMaterials.push({
            id: 'sealant',
            name: 'Crack Sealant',
            quantity: Math.ceil(sealantGallons),
            unit: 'gallon',
            unitCost: materialPrices['Crack Sealant'].cost,
            total: Math.ceil(sealantGallons) * materialPrices['Crack Sealant'].cost
          });
          break;
      }
      
      setMaterials(newMaterials);
    }
  }, [projectType, area, thickness]);

  // Calculate labor based on project type
  useEffect(() => {
    if (projectType && area > 0) {
      const newLabor: LaborCost[] = [];
      const baseHours = Math.max(8, area / 1000 * 8); // Minimum 8 hours, scale with area
      
      switch (projectType) {
        case 'new_paving':
          newLabor.push(
            { id: 'foreman', role: 'Foreman', hours: baseHours, hourlyRate: 35, total: baseHours * 35 },
            { id: 'operator', role: 'Equipment Operator', hours: baseHours, hourlyRate: 28, total: baseHours * 28 },
            { id: 'laborer1', role: 'Laborer', hours: baseHours * 2, hourlyRate: 20, total: baseHours * 2 * 20 },
            { id: 'laborer2', role: 'Laborer', hours: baseHours * 2, hourlyRate: 20, total: baseHours * 2 * 20 }
          );
          break;
          
        case 'overlay':
          newLabor.push(
            { id: 'foreman', role: 'Foreman', hours: baseHours * 0.8, hourlyRate: 35, total: baseHours * 0.8 * 35 },
            { id: 'operator', role: 'Equipment Operator', hours: baseHours * 0.8, hourlyRate: 28, total: baseHours * 0.8 * 28 },
            { id: 'laborer1', role: 'Laborer', hours: baseHours * 1.5, hourlyRate: 20, total: baseHours * 1.5 * 20 }
          );
          break;
          
        case 'crack_sealing':
          newLabor.push(
            { id: 'specialist', role: 'Crack Sealing Specialist', hours: baseHours * 0.5, hourlyRate: 25, total: baseHours * 0.5 * 25 },
            { id: 'helper', role: 'Helper', hours: baseHours * 0.5, hourlyRate: 18, total: baseHours * 0.5 * 18 }
          );
          break;
      }
      
      setLabor(newLabor);
    }
  }, [projectType, area]);

  // Calculate equipment costs
  useEffect(() => {
    if (projectType && area > 0) {
      const newEquipment: EquipmentCost[] = [];
      const baseHours = Math.max(8, area / 1000 * 8);
      
      switch (projectType) {
        case 'new_paving':
          newEquipment.push(
            { id: 'paver', equipment: 'Asphalt Paver', hours: baseHours, hourlyRate: 150, total: baseHours * 150 },
            { id: 'roller', equipment: 'Roller', hours: baseHours, hourlyRate: 85, total: baseHours * 85 },
            { id: 'truck', equipment: 'Dump Truck', hours: baseHours * 1.5, hourlyRate: 75, total: baseHours * 1.5 * 75 }
          );
          break;
          
        case 'overlay':
          newEquipment.push(
            { id: 'paver', equipment: 'Asphalt Paver', hours: baseHours * 0.8, hourlyRate: 150, total: baseHours * 0.8 * 150 },
            { id: 'roller', equipment: 'Roller', hours: baseHours * 0.8, hourlyRate: 85, total: baseHours * 0.8 * 85 }
          );
          break;
          
        case 'crack_sealing':
          newEquipment.push(
            { id: 'melter', equipment: 'Crack Sealing Machine', hours: baseHours * 0.5, hourlyRate: 45, total: baseHours * 0.5 * 45 }
          );
          break;
      }
      
      setEquipment(newEquipment);
    }
  }, [projectType, area]);

  const addMaterial = () => {
    const newMaterial: MaterialCost = {
      id: `mat-${Date.now()}`,
      name: '',
      quantity: 0,
      unit: 'ton',
      unitCost: 0,
      total: 0
    };
    setMaterials([...materials, newMaterial]);
  };

  const updateMaterial = (id: string, field: keyof MaterialCost, value: any) => {
    setMaterials(materials.map(mat => {
      if (mat.id === id) {
        const updated = { ...mat, [field]: value };
        if (field === 'quantity' || field === 'unitCost') {
          updated.total = updated.quantity * updated.unitCost;
        }
        return updated;
      }
      return mat;
    }));
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(mat => mat.id !== id));
  };

  // Calculate totals
  const materialTotal = materials.reduce((sum, mat) => sum + mat.total, 0);
  const laborTotal = labor.reduce((sum, lab) => sum + lab.total, 0);
  const equipmentTotal = equipment.reduce((sum, eq) => sum + eq.total, 0);
  const subtotal = materialTotal + laborTotal + equipmentTotal;
  const overhead = subtotal * (overheadPercent / 100);
  const profit = (subtotal + overhead) * (profitPercent / 100);
  const total = subtotal + overhead + profit;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Advanced Pricing Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Project Type</Label>
              <Select value={projectType} onValueChange={setProjectType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new_paving">New Paving</SelectItem>
                  <SelectItem value="overlay">Overlay</SelectItem>
                  <SelectItem value="crack_sealing">Crack Sealing</SelectItem>
                  <SelectItem value="patching">Patching</SelectItem>
                  <SelectItem value="sealcoating">Sealcoating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Area (sq ft)</Label>
              <Input
                type="number"
                value={area}
                onChange={(e) => setArea(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label>Thickness (inches)</Label>
              <Input
                type="number"
                step="0.5"
                value={thickness}
                onChange={(e) => setThickness(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="flex items-end">
              <Badge variant="outline" className="text-lg p-2">
                {(area / 43560).toFixed(2)} acres
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="materials" className="space-y-4">
            <TabsList>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="labor">Labor</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="materials" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Material Costs</h3>
                <Button onClick={addMaterial} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Material
                </Button>
              </div>
              
              <div className="space-y-3">
                {materials.map((material) => (
                  <div key={material.id} className="grid grid-cols-6 gap-3 items-end p-3 border rounded-lg">
                    <div>
                      <Label>Material</Label>
                      <Select
                        value={material.name}
                        onValueChange={(value) => {
                          updateMaterial(material.id, 'name', value);
                          if (materialPrices[value as keyof typeof materialPrices]) {
                            const price = materialPrices[value as keyof typeof materialPrices];
                            updateMaterial(material.id, 'unit', price.unit);
                            updateMaterial(material.id, 'unitCost', price.cost);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(materialPrices).map((mat) => (
                            <SelectItem key={mat} value={mat}>{mat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={material.quantity}
                        onChange={(e) => updateMaterial(material.id, 'quantity', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Input
                        value={material.unit}
                        onChange={(e) => updateMaterial(material.id, 'unit', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Unit Cost</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={material.unitCost}
                        onChange={(e) => updateMaterial(material.id, 'unitCost', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>Total</Label>
                      <div className="text-lg font-semibold py-2">
                        ${material.total.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeMaterial(material.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-right">
                <span className="text-lg font-semibold">
                  Material Total: ${materialTotal.toFixed(2)}
                </span>
              </div>
            </TabsContent>

            <TabsContent value="labor" className="space-y-4">
              <h3 className="text-lg font-semibold">Labor Costs</h3>
              <div className="space-y-3">
                {labor.map((laborItem) => (
                  <div key={laborItem.id} className="grid grid-cols-4 gap-3 p-3 border rounded-lg">
                    <div>
                      <Label>Role</Label>
                      <div className="py-2 font-medium">{laborItem.role}</div>
                    </div>
                    <div>
                      <Label>Hours</Label>
                      <div className="py-2">{laborItem.hours.toFixed(1)}</div>
                    </div>
                    <div>
                      <Label>Hourly Rate</Label>
                      <div className="py-2">${laborItem.hourlyRate.toFixed(2)}</div>
                    </div>
                    <div>
                      <Label>Total</Label>
                      <div className="py-2 text-lg font-semibold">
                        ${laborItem.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-right">
                <span className="text-lg font-semibold">
                  Labor Total: ${laborTotal.toFixed(2)}
                </span>
              </div>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-4">
              <h3 className="text-lg font-semibold">Equipment Costs</h3>
              <div className="space-y-3">
                {equipment.map((equipmentItem) => (
                  <div key={equipmentItem.id} className="grid grid-cols-4 gap-3 p-3 border rounded-lg">
                    <div>
                      <Label>Equipment</Label>
                      <div className="py-2 font-medium">{equipmentItem.equipment}</div>
                    </div>
                    <div>
                      <Label>Hours</Label>
                      <div className="py-2">{equipmentItem.hours.toFixed(1)}</div>
                    </div>
                    <div>
                      <Label>Hourly Rate</Label>
                      <div className="py-2">${equipmentItem.hourlyRate.toFixed(2)}</div>
                    </div>
                    <div>
                      <Label>Total</Label>
                      <div className="py-2 text-lg font-semibold">
                        ${equipmentItem.total.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-right">
                <span className="text-lg font-semibold">
                  Equipment Total: ${equipmentTotal.toFixed(2)}
                </span>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Materials:</span>
                      <span>${materialTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor:</span>
                      <span>${laborTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Equipment:</span>
                      <span>${equipmentTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Margins & Final Price</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Overhead %</Label>
                        <Input
                          type="number"
                          value={overheadPercent}
                          onChange={(e) => setOverheadPercent(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label>Profit %</Label>
                        <Input
                          type="number"
                          value={profitPercent}
                          onChange={(e) => setProfitPercent(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Overhead ({overheadPercent}%):</span>
                        <span>${overhead.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit ({profitPercent}%):</span>
                        <span>${profit.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold border-t pt-2">
                        <span>Total Price:</span>
                        <span className="text-green-600">${total.toFixed(2)}</span>
                      </div>
                      <div className="text-center text-sm text-gray-600">
                        ${(total / area).toFixed(2)} per sq ft
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
