
export interface InventoryItem {
  id: string;
  category: 'asphalt' | 'aggregate' | 'equipment' | 'tools' | 'supplies' | 'chemicals';
  name: string;
  description: string;
  sku: string;
  unit: 'tons' | 'gallons' | 'bags' | 'yards' | 'pieces' | 'hours';
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  unitCost: number;
  supplierCost: number;
  markup: number;
  sellPrice: number;
  supplierId?: string;
  location: string;
  lastRestocked: string;
  expiryDate?: string;
  status: 'active' | 'discontinued' | 'out-of-stock';
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  reason: string;
  reference?: string;
  userId: string;
  date: string;
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  paymentTerms: string;
  status: 'active' | 'inactive';
  rating: number;
  createdAt: string;
}
