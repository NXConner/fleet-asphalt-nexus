import { UnifiedMapInterface } from "@/components/UnifiedMapInterface";
import AdvancedMapping from "./AdvancedMapping";
import ThemeColorPicker from "@/components/ui/ThemeColorPicker";

<TabsList className="grid w-full grid-cols-10">
  <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
  <TabsTrigger value="overview">Overview</TabsTrigger>
  <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
  <TabsTrigger value="fleet-focus">Fleet Focus</TabsTrigger>
  <TabsTrigger value="tracking">Employee Tracking</TabsTrigger>
  <TabsTrigger value="optimization">Optimization</TabsTrigger>
  <TabsTrigger value="reports">Reports</TabsTrigger>
  <TabsTrigger value="map">Map</TabsTrigger>
  <TabsTrigger value="advanced-mapping">Advanced Mapping</TabsTrigger>
  <TabsTrigger value="theme">Theme Customizer</TabsTrigger>
</TabsList>
<TabsContent value="map" className="mt-6"><UnifiedMapInterface /></TabsContent>
<TabsContent value="advanced-mapping" className="mt-6"><AdvancedMapping /></TabsContent>
<TabsContent value="theme" className="mt-6"><ThemeColorPicker /></TabsContent> 