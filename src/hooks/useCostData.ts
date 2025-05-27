
import { useState, useEffect } from 'react';

interface CostData {
  id: string;
  item_type: 'material' | 'supply' | 'fuel' | 'labor';
  item_name: string;
  current_price: number;
  price_with_tax: number;
  unit: string;
  location_state: string;
  last_updated: string;
}

interface LinkedCostData {
  jobId?: string;
  employeeId?: string;
  vehicleId?: string;
  costs: CostData[];
  totalCost: number;
}

export const useCostData = () => {
  const [costData, setCostData] = useState<CostData[]>([]);
  const [linkedData, setLinkedData] = useState<Map<string, LinkedCostData>>(new Map());

  // Mock cost data - this would come from the database
  const mockCostData: CostData[] = [
    {
      id: '1',
      item_type: 'fuel',
      item_name: 'Diesel Fuel',
      current_price: 3.85,
      price_with_tax: 4.13,
      unit: 'gallon',
      location_state: 'VA',
      last_updated: new Date().toISOString()
    },
    {
      id: '2',
      item_type: 'material',
      item_name: 'Coal Tar Sealer',
      current_price: 1.95,
      price_with_tax: 2.05,
      unit: 'gallon',
      location_state: 'VA',
      last_updated: new Date().toISOString()
    },
    {
      id: '3',
      item_type: 'labor',
      item_name: 'Crew Leader',
      current_price: 29.50,
      price_with_tax: 29.50,
      unit: 'hour',
      location_state: 'VA',
      last_updated: new Date().toISOString()
    }
  ];

  useEffect(() => {
    setCostData(mockCostData);
  }, []);

  const getCostByType = (type: string) => {
    return costData.filter(item => item.item_type === type);
  };

  const getCostByName = (name: string) => {
    return costData.find(item => item.item_name.toLowerCase().includes(name.toLowerCase()));
  };

  const linkCostsToJob = (jobId: string, costs: CostData[]) => {
    const totalCost = costs.reduce((sum, cost) => sum + cost.price_with_tax, 0);
    setLinkedData(prev => new Map(prev.set(jobId, { jobId, costs, totalCost })));
  };

  const linkCostsToEmployee = (employeeId: string, costs: CostData[]) => {
    const totalCost = costs.reduce((sum, cost) => sum + cost.price_with_tax, 0);
    setLinkedData(prev => new Map(prev.set(`employee-${employeeId}`, { employeeId, costs, totalCost })));
  };

  const linkCostsToVehicle = (vehicleId: string, costs: CostData[]) => {
    const totalCost = costs.reduce((sum, cost) => sum + cost.price_with_tax, 0);
    setLinkedData(prev => new Map(prev.set(`vehicle-${vehicleId}`, { vehicleId, costs, totalCost })));
  };

  const getLinkedCosts = (id: string): LinkedCostData | undefined => {
    return linkedData.get(id) || linkedData.get(`employee-${id}`) || linkedData.get(`vehicle-${id}`);
  };

  const calculateJobCost = (materialCosts: number, laborHours: number, fuelConsumption: number) => {
    const laborCost = getCostByName('Crew Leader')?.price_with_tax || 29.50;
    const fuelCost = getCostByName('Diesel Fuel')?.price_with_tax || 4.13;
    
    const totalLaborCost = laborHours * laborCost;
    const totalFuelCost = fuelConsumption * fuelCost;
    const totalCost = materialCosts + totalLaborCost + totalFuelCost;

    return {
      materialCosts,
      laborCost: totalLaborCost,
      fuelCost: totalFuelCost,
      totalCost,
      breakdown: {
        laborHours,
        laborRate: laborCost,
        fuelGallons: fuelConsumption,
        fuelRate: fuelCost
      }
    };
  };

  return {
    costData,
    linkedData,
    getCostByType,
    getCostByName,
    linkCostsToJob,
    linkCostsToEmployee,
    linkCostsToVehicle,
    getLinkedCosts,
    calculateJobCost
  };
};
