
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Fuel, 
  Package, 
  Wrench,
  RefreshCw,
  Calculator,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface CostItem {
  id: string;
  item_type: 'material' | 'supply' | 'fuel' | 'labor';
  item_name: string;
  category: string;
  unit: string;
  current_price: number;
  location_state: string;
  location_city?: string;
  vendor_name: string;
  price_source: 'vendor' | 'market_data' | 'manual';
  specifications: Record<string, any>;
  virginia_tax_rate: number;
  local_tax_rate: number;
  price_with_tax: number;
  last_updated: string;
}

export const CostManagementCenter = () => {
  const [costItems, setCostItems] = useState<CostItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('VA');
  const [isUpdatingPrices, setIsUpdatingPrices] = useState(false);

  // Mock Virginia cost data - this would come from the database
  const mockVACostData: CostItem[] = [
    {
      id: '1',
      item_type: 'fuel',
      item_name: 'Diesel Fuel',
      category: 'fuel',
      unit: 'gallon',
      current_price: 3.85,
      location_state: 'VA',
      location_city: 'Richmond',
      vendor_name: 'Market Average',
      price_source: 'market_data',
      specifications: { cetane_rating: 40, sulfur_content: 'ultra_low' },
      virginia_tax_rate: 0.053,
      local_tax_rate: 0.02,
      price_with_tax: 4.13,
      last_updated: new Date().toISOString()
    },
    {
      id: '2',
      item_type: 'material',
      item_name: 'Coal Tar Sealer',
      category: 'sealer',
      unit: 'gallon',
      current_price: 1.95,
      location_state: 'VA',
      vendor_name: 'SealMaster VA',
      price_source: 'vendor',
      specifications: { 
        type: 'RT-12', 
        coal_tar_content: '65%', 
        astm_spec: 'D490',
        coverage_per_gallon: '80-100 sq ft'
      },
      virginia_tax_rate: 0.053,
      local_tax_rate: 0,
      price_with_tax: 2.05,
      last_updated: new Date().toISOString()
    },
    {
      id: '3',
      item_type: 'material',
      item_name: 'Hot Pour Crack Filler',
      category: 'crack_filler',
      unit: 'box',
      current_price: 48.50,
      location_state: 'VA',
      vendor_name: 'Crafco Richmond',
      price_source: 'vendor',
      specifications: { 
        weight: '30 lbs', 
        type: 'thermoplastic_rubberized', 
        working_temp: '375-400°F',
        coverage: '150-200 linear feet'
      },
      virginia_tax_rate: 0.053,
      local_tax_rate: 0,
      price_with_tax: 51.07,
      last_updated: new Date().toISOString()
    },
    {
      id: '4',
      item_type: 'material',
      item_name: 'Asphalt Mix Type S9.5A',
      category: 'asphalt',
      unit: 'ton',
      current_price: 98.00,
      location_state: 'VA',
      vendor_name: 'Virginia Paving Co',
      price_source: 'vendor',
      specifications: { 
        vdot_spec: 'S9.5A', 
        superpave: true, 
        asphalt_content: '5.8%', 
        binder_grade: 'PG 64-22'
      },
      virginia_tax_rate: 0.053,
      local_tax_rate: 0,
      price_with_tax: 103.19,
      last_updated: new Date().toISOString()
    },
    {
      id: '5',
      item_type: 'labor',
      item_name: 'Crew Leader',
      category: 'labor',
      unit: 'hour',
      current_price: 29.50,
      location_state: 'VA',
      vendor_name: 'Market Rate',
      price_source: 'market_data',
      specifications: { 
        experience_level: 'senior', 
        certifications: ['OSHA_30'], 
        benefits_rate: 0.35 
      },
      virginia_tax_rate: 0,
      local_tax_rate: 0,
      price_with_tax: 29.50,
      last_updated: new Date().toISOString()
    },
    {
      id: '6',
      item_type: 'supply',
      item_name: 'Safety Cones',
      category: 'safety',
      unit: 'each',
      current_price: 18.50,
      location_state: 'VA',
      vendor_name: 'Traffic Safety Store',
      price_source: 'vendor',
      specifications: { 
        height: '28 inch', 
        color: 'orange', 
        reflective: true,
        base_weight: '7 lbs'
      },
      virginia_tax_rate: 0.053,
      local_tax_rate: 0,
      price_with_tax: 19.48,
      last_updated: new Date().toISOString()
    }
  ];

  useEffect(() => {
    setCostItems(mockVACostData);
  }, []);

  const updateMarketPrices = async () => {
    setIsUpdatingPrices(true);
    
    // Simulate API call to update market prices
    setTimeout(() => {
      const updatedItems = costItems.map(item => {
        if (item.price_source === 'market_data') {
          // Apply random fluctuation for simulation
          const fluctuation = (Math.random() - 0.5) * 0.1; // +/- 5%
          const newPrice = item.current_price * (1 + fluctuation);
          return {
            ...item,
            current_price: Number(newPrice.toFixed(2)),
            price_with_tax: Number((newPrice * (1 + item.virginia_tax_rate + item.local_tax_rate)).toFixed(2)),
            last_updated: new Date().toISOString()
          };
        }
        return item;
      });
      
      setCostItems(updatedItems);
      setIsUpdatingPrices(false);
      toast.success("Market prices updated successfully");
    }, 2000);
  };

  const filteredItems = costItems.filter(item => {
    if (selectedCategory !== 'all' && item.item_type !== selectedCategory) return false;
    if (selectedLocation !== 'all' && item.location_state !== selectedLocation) return false;
    return true;
  });

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'fuel': return <Fuel className="h-4 w-4" />;
      case 'material': return <Package className="h-4 w-4" />;
      case 'supply': return <Wrench className="h-4 w-4" />;
      case 'labor': return <DollarSign className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getPriceSourceBadge = (source: string) => {
    const variants = {
      vendor: 'default',
      market_data: 'secondary',
      manual: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[source as keyof typeof variants] || 'outline'}>
        {source.replace('_', ' ')}
      </Badge>
    );
  };

  const calculateTotalCost = (items: CostItem[]) => {
    return items.reduce((sum, item) => sum + item.price_with_tax, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Cost Management Center</h2>
          <p className="text-muted-foreground">Auto-updating material, supply, and fuel prices for Virginia</p>
        </div>
        <Button 
          onClick={updateMarketPrices} 
          disabled={isUpdatingPrices}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isUpdatingPrices ? 'animate-spin' : ''}`} />
          Update Market Prices
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fuel">Fuel</SelectItem>
                  <SelectItem value="material">Materials</SelectItem>
                  <SelectItem value="supply">Supplies</SelectItem>
                  <SelectItem value="labor">Labor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="VA">Virginia</SelectItem>
                  <SelectItem value="MD">Maryland</SelectItem>
                  <SelectItem value="DC">Washington DC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <div className="text-center">
                <div className="text-2xl font-bold">${calculateTotalCost(filteredItems).toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Total Value</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(item.item_type)}
                  <div>
                    <CardTitle className="text-lg">{item.item_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.vendor_name}</p>
                  </div>
                </div>
                {getPriceSourceBadge(item.price_source)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Base Price</span>
                  <span className="font-semibold">${item.current_price.toFixed(2)}/{item.unit}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">With Tax</span>
                  <span className="font-bold text-green-600">${item.price_with_tax.toFixed(2)}/{item.unit}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">VA Tax: {(item.virginia_tax_rate * 100).toFixed(1)}%</span>
                  <span className="text-muted-foreground">
                    Updated: {new Date(item.last_updated).toLocaleDateString()}
                  </span>
                </div>

                {/* Specifications */}
                {Object.keys(item.specifications).length > 0 && (
                  <div className="border-t pt-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Specifications:</p>
                    <div className="space-y-1">
                      {Object.entries(item.specifications).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="text-xs flex justify-between">
                          <span className="text-muted-foreground">{key.replace('_', ' ')}:</span>
                          <span>{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{item.location_city ? `${item.location_city}, ` : ''}{item.location_state}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price Alert */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">Virginia Tax Information</p>
              <p className="text-sm text-yellow-700">
                All prices include Virginia state sales tax (5.3%) and applicable local taxes. 
                Labor costs are exempt from sales tax. Prices are updated automatically from vendor feeds and market data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
