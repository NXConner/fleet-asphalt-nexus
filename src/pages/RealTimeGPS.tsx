
import { UnifiedMapInterface } from "@/components/UnifiedMapInterface";
import { CostManagement } from "@/components/CostManagement";
import { RegulatoryCompliance } from "@/components/RegulatoryCompliance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RealTimeGPS = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="map" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Live GPS & Replay</TabsTrigger>
          <TabsTrigger value="costs">Cost Management</TabsTrigger>
          <TabsTrigger value="compliance">Compliance & Standards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          <UnifiedMapInterface />
        </TabsContent>
        
        <TabsContent value="costs">
          <CostManagement />
        </TabsContent>
        
        <TabsContent value="compliance">
          <RegulatoryCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealTimeGPS;
