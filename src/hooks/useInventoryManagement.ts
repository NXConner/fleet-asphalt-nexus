
import { useState, useCallback } from 'react';
import { InventoryItem, StockMovement, Supplier, PurchaseOrder } from '@/types/inventory';

// Mock data
const mockInventoryItems: InventoryItem[] = [
  {
    id: 'inv-001',
    name: 'Hot Mix Asphalt',
    description: 'Standard hot mix asphalt for road construction',
    category: 'asphalt',
    sku: 'HMA-001',
    currentStock: 2500,
    minimumStock: 500,
    maximumStock: 5000,
    unit: 'tons',
    unitCost: 85.00,
    totalValue: 212500,
    supplierId: 'sup-001',
    supplierName: 'ABC Asphalt Supply',
    location: 'Warehouse A',
    lastRestocked: '2024-01-20T00:00:00Z',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  {
    id: 'inv-002',
    name: 'Aggregate Base',
    description: '21A aggregate base material',
    category: 'aggregate',
    sku: 'AGG-21A',
    currentStock: 1800,
    minimumStock: 300,
    maximumStock: 3000,
    unit: 'tons',
    unitCost: 25.00,
    totalValue: 45000,
    supplierId: 'sup-002',
    supplierName: 'Rock & Stone Co.',
    location: 'Yard B',
    lastRestocked: '2024-01-15T00:00:00Z',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'ABC Asphalt Supply',
    contactPerson: 'John Smith',
    email: 'john@abcasphalt.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Industrial Way',
      city: 'Richmond',
      state: 'VA',
      zipCode: '23230'
    },
    paymentTerms: 'Net 30',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const useInventoryManagement = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  const addInventoryItem = useCallback((item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: `inv-${Date.now()}`,
      totalValue: item.currentStock * item.unitCost,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setInventoryItems(prev => [...prev, newItem]);
    return newItem;
  }, []);

  const updateInventoryItem = useCallback((id: string, updates: Partial<InventoryItem>) => {
    setInventoryItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, ...updates, updatedAt: new Date().toISOString() };
          updatedItem.totalValue = updatedItem.currentStock * updatedItem.unitCost;
          return updatedItem;
        }
        return item;
      })
    );
  }, []);

  const recordStockMovement = useCallback((movement: Omit<StockMovement, 'id' | 'date'>) => {
    const newMovement: StockMovement = {
      ...movement,
      id: `mov-${Date.now()}`,
      date: new Date().toISOString()
    };

    setStockMovements(prev => [...prev, newMovement]);

    // Update inventory levels
    setInventoryItems(prev => 
      prev.map(item => {
        if (item.id === movement.itemId) {
          let newStock = item.currentStock;
          if (movement.type === 'in') {
            newStock += movement.quantity;
          } else if (movement.type === 'out') {
            newStock -= movement.quantity;
          } else {
            newStock = movement.quantity; // adjustment sets absolute value
          }
          
          return {
            ...item,
            currentStock: Math.max(0, newStock),
            totalValue: Math.max(0, newStock) * item.unitCost,
            updatedAt: new Date().toISOString()
          };
        }
        return item;
      })
    );

    return newMovement;
  }, []);

  const getLowStockItems = useCallback(() => {
    return inventoryItems.filter(item => item.currentStock <= item.minimumStock && item.isActive);
  }, [inventoryItems]);

  const getInventoryValue = useCallback(() => {
    return inventoryItems.reduce((total, item) => total + item.totalValue, 0);
  }, [inventoryItems]);

  const addSupplier = useCallback((supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: `sup-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setSuppliers(prev => [...prev, newSupplier]);
    return newSupplier;
  }, []);

  const updateSupplier = useCallback((id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev => 
      prev.map(supplier => 
        supplier.id === id 
          ? { ...supplier, ...updates, updatedAt: new Date().toISOString() }
          : supplier
      )
    );
  }, []);

  return {
    inventoryItems,
    stockMovements,
    suppliers,
    purchaseOrders,
    addInventoryItem,
    updateInventoryItem,
    recordStockMovement,
    getLowStockItems,
    getInventoryValue,
    addSupplier,
    updateSupplier
  };
};
