import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calculator, FileText, Info } from "lucide-react";
import { Estimate, EstimateMaterial, EstimateLabor, EstimateEquipment } from "@/types/estimate";
import { SealcoatingSpreadsheetApp } from './SealcoatingSpreadsheetApp';
import { PopoutCalculator } from '@/components/ui/PopoutCalculator';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface EstimateFormProps {
  onSave: (estimate: Estimate) => void;
  initialData?: Partial<Estimate>;
}

export function EstimateForm({ onSave, initialData }: EstimateFormProps) {
  const [formData, setFormData] = useState<Partial<Estimate>>({
    title: "",
    client: {
      name: "",
      email: "",
      phone: "",
      address: ""
    },
    project: {
      type: 'paving',
      description: "",
      location: "",
      area: 0,
      linearFeet: 0
    },
    materials: [],
    labor: [],
    equipment: [],
    status: 'draft',
    notes: "",
    ...initialData
  });

  const [materials, setMaterials] = useState<EstimateMaterial[]>(formData.materials || []);
  const [labor, setLabor] = useState<EstimateLabor[]>(formData.labor || []);
  const [equipment, setEquipment] = useState<EstimateEquipment[]>(formData.equipment || []);
  const [showSpreadsheet, setShowSpreadsheet] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSpreadsheetModal, setShowSpreadsheetModal] = useState(false);
  const [importedValue, setImportedValue] = useState<string | number | null>(null);
  const [importTarget, setImportTarget] = useState<string | null>(null);
  const [batchImportedValues, setBatchImportedValues] = useState<any[][] | null>(null);
  const [batchMapStep, setBatchMapStep] = useState(0);

  useEffect(() => {
    if (importedValue !== null) {
      setImportTarget(''); // Show prompt
    }
  }, [importedValue]);

  const addMaterial = () => {
    const newMaterial: EstimateMaterial = {
      id: `mat-${Date.now()}`,
      name: "",
      unit: 'sq_ft',
      quantity: 0,
      unitCost: 0,
      totalCost: 0
    };
    setMaterials([...materials, newMaterial]);
  };

  const addLabor = () => {
    const newLabor: EstimateLabor = {
      id: `lab-${Date.now()}`,
      description: "",
      hours: 0,
      rate: 25,
      totalCost: 0
    };
    setLabor([...labor, newLabor]);
  };

  const addEquipment = () => {
    const newEquipment: EstimateEquipment = {
      id: `eq-${Date.now()}`,
      name: "",
      dailyRate: 0,
      days: 1,
      totalCost: 0
    };
    setEquipment([...equipment, newEquipment]);
  };

  const updateMaterial = (index: number, field: keyof EstimateMaterial, value: any) => {
    const updated = [...materials];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'quantity' || field === 'unitCost') {
      updated[index].totalCost = updated[index].quantity * updated[index].unitCost;
    }
    setMaterials(updated);
  };

  const updateLabor = (index: number, field: keyof EstimateLabor, value: any) => {
    const updated = [...labor];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'hours' || field === 'rate') {
      updated[index].totalCost = updated[index].hours * updated[index].rate;
    }
    setLabor(updated);
  };

  const updateEquipment = (index: number, field: keyof EstimateEquipment, value: any) => {
    const updated = [...equipment];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'dailyRate' || field === 'days') {
      updated[index].totalCost = updated[index].dailyRate * updated[index].days;
    }
    setEquipment(updated);
  };

  const calculateTotals = () => {
    const materialsCost = materials.reduce((sum, item) => sum + item.totalCost, 0);
    const laborCost = labor.reduce((sum, item) => sum + item.totalCost, 0);
    const equipmentCost = equipment.reduce((sum, item) => sum + item.totalCost, 0);
    const subtotal = materialsCost + laborCost + equipmentCost;
    const overhead = subtotal * 0.15; // 15% overhead
    const profit = subtotal * 0.20; // 20% profit
    const totalCost = subtotal + overhead + profit;

    return {
      materialsCost,
      laborCost,
      equipmentCost,
      overhead,
      profit,
      totalCost
    };
  };

  const handleSave = () => {
    const calculations = calculateTotals();
    const estimate: Estimate = {
      id: formData.id || `est-${Date.now()}`,
      title: formData.title || "New Estimate",
      client: formData.client!,
      project: formData.project!,
      materials,
      labor,
      equipment,
      calculations,
      status: formData.status || 'draft',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: formData.notes
    };
    onSave(estimate);
  };

  const totals = calculateTotals();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Create New Estimate
        </CardTitle>
        <CardDescription>
          Generate detailed estimates for asphalt projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="labor">Labor</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Main Street Resurfacing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type</Label>
                <Select 
                  value={formData.project?.type} 
                  onValueChange={(value) => setFormData({
                    ...formData, 
                    project: {...formData.project!, type: value as any}
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paving">Paving</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="striping">Line Striping</SelectItem>
                    <SelectItem value="sealcoating">Sealcoating</SelectItem>
                    <SelectItem value="patching">Patching</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Client Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={formData.client?.name}
                    onChange={(e) => setFormData({
                      ...formData, 
                      client: {...formData.client!, name: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.client?.email}
                    onChange={(e) => setFormData({
                      ...formData, 
                      client: {...formData.client!, email: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Phone</Label>
                  <Input
                    id="clientPhone"
                    value={formData.client?.phone}
                    onChange={(e) => setFormData({
                      ...formData, 
                      client: {...formData.client!, phone: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectLocation">Project Location</Label>
                  <Input
                    id="projectLocation"
                    value={formData.project?.location}
                    onChange={(e) => setFormData({
                      ...formData, 
                      project: {...formData.project!, location: e.target.value}
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={formData.project?.area}
                    onChange={(e) => setFormData({
                      ...formData, 
                      project: {...formData.project!, area: Number(e.target.value)}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linearFeet">Linear Feet (optional)</Label>
                  <Input
                    id="linearFeet"
                    type="number"
                    value={formData.project?.linearFeet}
                    onChange={(e) => setFormData({
                      ...formData, 
                      project: {...formData.project!, linearFeet: Number(e.target.value)}
                    })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={formData.project?.description}
                  onChange={(e) => setFormData({
                    ...formData, 
                    project: {...formData.project!, description: e.target.value}
                  })}
                  placeholder="Detailed description of the work to be performed..."
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Materials</h4>
              <Button onClick={addMaterial} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </div>
            
            <div className="space-y-3">
              {materials.map((material, index) => (
                <div key={material.id} className="grid grid-cols-6 gap-2 p-3 border rounded">
                  <Input
                    placeholder="Material name"
                    value={material.name}
                    onChange={(e) => updateMaterial(index, 'name', e.target.value)}
                  />
                  <Select
                    value={material.unit}
                    onValueChange={(value) => updateMaterial(index, 'unit', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sq_ft">sq ft</SelectItem>
                      <SelectItem value="linear_ft">linear ft</SelectItem>
                      <SelectItem value="tons">tons</SelectItem>
                      <SelectItem value="gallons">gallons</SelectItem>
                      <SelectItem value="bags">bags</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={material.quantity}
                    onChange={(e) => updateMaterial(index, 'quantity', Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="Unit cost"
                    value={material.unitCost}
                    onChange={(e) => updateMaterial(index, 'unitCost', Number(e.target.value))}
                  />
                  <Input
                    value={`$${material.totalCost.toFixed(2)}`}
                    readOnly
                    className="bg-gray-50"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMaterials(materials.filter((_, i) => i !== index))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="labor" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Labor</h4>
              <Button onClick={addLabor} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Labor
              </Button>
            </div>
            
            <div className="space-y-3">
              {labor.map((laborItem, index) => (
                <div key={laborItem.id} className="grid grid-cols-5 gap-2 p-3 border rounded">
                  <Input
                    placeholder="Labor description"
                    value={laborItem.description}
                    onChange={(e) => updateLabor(index, 'description', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Hours"
                    value={laborItem.hours}
                    onChange={(e) => updateLabor(index, 'hours', Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="Rate/hour"
                    value={laborItem.rate}
                    onChange={(e) => updateLabor(index, 'rate', Number(e.target.value))}
                  />
                  <Input
                    value={`$${laborItem.totalCost.toFixed(2)}`}
                    readOnly
                    className="bg-gray-50"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLabor(labor.filter((_, i) => i !== index))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Equipment</h4>
              <Button onClick={addEquipment} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Equipment
              </Button>
            </div>
            
            <div className="space-y-3">
              {equipment.map((equipmentItem, index) => (
                <div key={equipmentItem.id} className="grid grid-cols-5 gap-2 p-3 border rounded">
                  <Input
                    placeholder="Equipment name"
                    value={equipmentItem.name}
                    onChange={(e) => updateEquipment(index, 'name', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Daily rate"
                    value={equipmentItem.dailyRate}
                    onChange={(e) => updateEquipment(index, 'dailyRate', Number(e.target.value))}
                  />
                  <Input
                    type="number"
                    placeholder="Days"
                    value={equipmentItem.days}
                    onChange={(e) => updateEquipment(index, 'days', Number(e.target.value))}
                  />
                  <Input
                    value={`$${equipmentItem.totalCost.toFixed(2)}`}
                    readOnly
                    className="bg-gray-50"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEquipment(equipment.filter((_, i) => i !== index))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Cost Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Materials:</span>
                    <span>${totals.materialsCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Labor:</span>
                    <span>${totals.laborCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equipment:</span>
                    <span>${totals.equipmentCost.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${(totals.materialsCost + totals.laborCost + totals.equipmentCost).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overhead (15%):</span>
                    <span>${totals.overhead.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit (20%):</span>
                    <span>${totals.profit.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${totals.totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notes</h4>
                <Textarea
                  placeholder="Additional notes or terms..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={8}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Save Estimate
              </Button>
              <Button variant="outline" className="flex-1">
                Generate Proposal
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex gap-2 mb-4">
          <Button variant="outline" onClick={() => setShowSpreadsheet(v => !v)}>
            Open Sealcoating Spreadsheet
          </Button>
          <Button variant="outline" onClick={() => setShowCalculator(v => !v)}>
            Open Calculator
          </Button>
        </div>
        {showSpreadsheet && <SealcoatingSpreadsheetApp />}
        {showCalculator && <PopoutCalculator />}
        <Button variant="outline" onClick={() => setShowSpreadsheetModal(true)} aria-label="Import from Spreadsheet">
          Import from Spreadsheet <Info size={16} aria-label="Map each imported value to a field" />
          <span style={{position:'absolute',left:'-9999px'}}>Import a value from the spreadsheet and map it to a field</span>
        </Button>
        <Dialog open={showSpreadsheetModal} onOpenChange={setShowSpreadsheetModal}>
          <DialogContent>
            <SealcoatingSpreadsheetApp onCellSelect={val => {
              if (Array.isArray(val) && Array.isArray(val[0])) {
                setBatchImportedValues(val);
                setBatchMapStep(0);
              } else {
                setImportedValue(val);
                setShowSpreadsheetModal(false);
              }
            }} />
            <div style={{marginTop: 16}}>
              <Button onClick={() => setShowSpreadsheetModal(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
        {batchImportedValues && (
          <div style={{margin:'16px 0', background:'#e6f7ff', padding:12, borderRadius:8, border:'1px solid #91d5ff'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span>Batch imported values:</span>
              <Info size={16} aria-label="Map each imported value to a field" />
            </div>
            <div style={{marginTop:8}}>
              {batchImportedValues.flat().map((val, idx) => (
                <div key={idx} style={{marginBottom:8}}>
                  <span>Value <strong>{val}</strong> - Map to: </span>
                  <Button size="sm" aria-label="Apply to Project Area" onClick={() => {
                    setFormData(fd => ({...fd, project: {...fd.project!, area: Number(val)}}));
                    setBatchMapStep(batchMapStep + 1);
                  }}>Project Area</Button>
                  <Button size="sm" aria-label="Apply to First Material Quantity" onClick={() => {
                    if (materials.length > 0) updateMaterial(0, 'quantity', Number(val));
                    setBatchMapStep(batchMapStep + 1);
                  }}>First Material Quantity</Button>
                  <Button size="sm" aria-label="Apply to First Labor Hours" onClick={() => {
                    if (labor.length > 0) updateLabor(0, 'hours', Number(val));
                    setBatchMapStep(batchMapStep + 1);
                  }}>First Labor Hours</Button>
                  <Button size="sm" aria-label="Apply to First Equipment Days" onClick={() => {
                    if (equipment.length > 0) updateEquipment(0, 'days', Number(val));
                    setBatchMapStep(batchMapStep + 1);
                  }}>First Equipment Days</Button>
                </div>
              ))}
              <Button size="sm" variant="outline" aria-label="Cancel Batch Import" onClick={() => { setBatchImportedValues(null); setBatchMapStep(0); }}>Cancel</Button>
            </div>
          </div>
        )}
        {importedValue !== null && importTarget === '' && (
          <div style={{margin:'16px 0', background:'#f6ffed', padding:12, borderRadius:8, border:'1px solid #b7eb8f'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span>Imported value: <strong>{importedValue}</strong></span>
              <Info size={16} aria-label="Select which field to apply the imported value to." />
              <span style={{position:'absolute',left:'-9999px'}}>Select which field to apply the imported value to.</span>
            </div>
            <div style={{marginTop:8}}>
              <span>Apply to: </span>
              <Button size="sm" aria-label="Apply to Project Area" onClick={() => {
                setFormData(fd => ({...fd, project: {...fd.project!, area: Number(importedValue)}}));
                setImportTarget(null); setImportedValue(null);
              }}>Project Area</Button>
              <Button size="sm" aria-label="Apply to First Material Quantity" onClick={() => {
                if (materials.length > 0) updateMaterial(0, 'quantity', Number(importedValue));
                setImportTarget(null); setImportedValue(null);
              }}>First Material Quantity</Button>
              <Button size="sm" aria-label="Apply to First Labor Hours" onClick={() => {
                if (labor.length > 0) updateLabor(0, 'hours', Number(importedValue));
                setImportTarget(null); setImportedValue(null);
              }}>First Labor Hours</Button>
              <Button size="sm" aria-label="Apply to First Equipment Days" onClick={() => {
                if (equipment.length > 0) updateEquipment(0, 'days', Number(importedValue));
                setImportTarget(null); setImportedValue(null);
              }}>First Equipment Days</Button>
              <Button size="sm" variant="outline" aria-label="Cancel Import" onClick={() => { setImportTarget(null); setImportedValue(null); }}>Cancel</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
