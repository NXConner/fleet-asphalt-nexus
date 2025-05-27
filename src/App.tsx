
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { EnhancedNavigation } from "./components/ui/enhanced-navigation";
import Dashboard from "./pages/Dashboard";
import FleetManagement from "./pages/FleetManagement";
import Estimates from "./pages/Estimates";
import EstimatesManagement from "./pages/EstimatesManagement";
import Jobs from "./pages/Jobs";
import Invoices from "./pages/Invoices";
import FinancialManagement from "./pages/FinancialManagement";
import CRM from "./pages/CRM";
import InventoryManagement from "./pages/InventoryManagement";
import SafetyCompliance from "./pages/SafetyCompliance";
import MaintenanceTracking from "./pages/MaintenanceTracking";
import AdvancedMapping from "./pages/AdvancedMapping";
import Scheduling from "./pages/Scheduling";
import DocumentManagement from "./pages/DocumentManagement";
import TimeTracking from "./pages/TimeTracking";
import RealTimeGPS from "./pages/RealTimeGPS";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { MobileOptimizedLayout } from "./components/mobile/MobileOptimizedLayout";
import EmployeeManagement from "./pages/EmployeeManagement";
import AccountingPlatform from "./pages/AccountingPlatform";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ProtectedRoute>
              <MobileOptimizedLayout>
                <div className="min-h-screen bg-background text-foreground">
                  <EnhancedNavigation 
                    variant="premium"
                    showThemeControls={true}
                    enableAnimations={true}
                  />
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/fleet" element={<FleetManagement />} />
                    <Route path="/estimates" element={<Estimates />} />
                    <Route path="/estimates-management" element={<EstimatesManagement />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/financial" element={<FinancialManagement />} />
                    <Route path="/crm" element={<CRM />} />
                    <Route path="/inventory" element={<InventoryManagement />} />
                    <Route path="/safety" element={<SafetyCompliance />} />
                    <Route path="/maintenance" element={<MaintenanceTracking />} />
                    <Route path="/mapping" element={<AdvancedMapping />} />
                    <Route path="/scheduling" element={<Scheduling />} />
                    <Route path="/documents" element={<DocumentManagement />} />
                    <Route path="/time-tracking" element={<TimeTracking />} />
                    <Route path="/gps" element={<RealTimeGPS />} />
                    <Route path="/employee-management" element={<EmployeeManagement />} />
                    <Route path="/accounting" element={<AccountingPlatform />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </MobileOptimizedLayout>
            </ProtectedRoute>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
