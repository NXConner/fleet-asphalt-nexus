import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Plus,
  Edit,
  Eye
} from "lucide-react";
import { BrowserMultiFormatReader } from '@zxing/browser';
import { toast } from 'sonner';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  totalValue: number;
  supplier: string;
  lastOrdered: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstock';
}

interface InventoryListProps {
  items: InventoryItem[];
  onViewItem: (item: InventoryItem) => void;
  onEditItem: (item: InventoryItem) => void;
  onAddItem: () => void;
  auditMode?: boolean;
  scannedSkus?: string[];
  onAuditScan?: (sku: string) => void;
}

const BarcodeScannerModal = ({ open, onClose, onScan }: { open: boolean; onClose: () => void; onScan: (code: string) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanning, setScanning] = useState(false);
  let codeReader: BrowserMultiFormatReader | null = null;

  useEffect(() => {
    if (open && videoRef.current) {
      setScanning(true);
      codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
        if (result) {
          onScan(result.getText());
          setScanning(false);
          if (codeReader && typeof (codeReader as any).reset === 'function') {
            (codeReader as any).reset();
          }
        }
      });
      return () => {
        if (codeReader && typeof (codeReader as any).reset === 'function') {
          (codeReader as any).reset();
        }
      };
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
        <video ref={videoRef} width={320} height={240} autoPlay muted />
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export const InventoryList = ({ items, onViewItem, onEditItem, onAddItem, auditMode = false, scannedSkus = [], onAuditScan }: InventoryListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [highlightedSku, setHighlightedSku] = useState<string | null>(null);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'overstock': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockPercentage = (item: InventoryItem) => {
    return (item.currentStock / item.maxStock) * 100;
  };

  const categories = [...new Set(items.map(item => item.category))];

  useEffect(() => {
    if (auditMode) {
      setScannerOpen(true);
    }
  }, [auditMode]);

  const handleScan = (code: string) => {
    if (onAuditScan) {
      onAuditScan(code);
    }
    handleScanInner(code);
  };

  const handleScanInner = (code: string) => {
    const matched = items.find(item => item.sku === code);
    if (matched) {
      setHighlightedSku(matched.sku);
      toast.success(`Matched SKU: ${matched.sku} - ${matched.name}`);
    } else {
      toast.error('No matching SKU found');
    }
    setScannerOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
          
          <select
            title="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            title="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="overstock">Overstock</option>
          </select>
        </div>
        
        <Button onClick={onAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="grid gap-4">
        <BarcodeScannerModal open={scannerOpen} onClose={() => setScannerOpen(false)} onScan={handleScan} />
        {filteredItems.map((item) => (
          <Card key={item.id} className={`hover:shadow-md transition-shadow ${highlightedSku === item.sku || scannedSkus.includes(item.sku) ? 'ring-4 ring-green-400' : ''}`}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Package className="h-6 w-6 text-gray-600" />
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <Badge className="text-xs border border-gray-300">
                        SKU: {item.sku}
                      </Badge>
                      <Badge className={getStatusColor(item.status) + " text-xs"}>
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Category:</span>
                        <p className="font-medium">{item.category}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Current Stock:</span>
                        <p className="font-medium">{item.currentStock} {item.unit}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Supplier:</span>
                        <p className="font-medium">{item.supplier}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Ordered:</span>
                        <p className="font-medium">{item.lastOrdered}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stock Level</span>
                        <span>{item.currentStock} / {item.maxStock} {item.unit}</span>
                      </div>
                      <Progress value={getStockPercentage(item)} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Min: {item.minStock}</span>
                        <span>Max: {item.maxStock}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      ${item.totalValue.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-500">
                      ${item.costPerUnit} per {item.unit}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mt-2 items-center">
                    <Button className="btn-sm border border-gray-300" onClick={() => onViewItem(item)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button className="btn-sm border border-gray-300" onClick={() => onEditItem(item)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button className="btn-sm bg-blue-500 text-white" onClick={() => setScannerOpen(true)}>
                      Scan Barcode
                    </Button>
                    {auditMode && scannedSkus.includes(item.sku) && (
                      <Badge className="ml-2 bg-green-500 text-white">Audited</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
