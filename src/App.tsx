import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import FleetManagement from "./pages/FleetManagement";
import MaintenanceTracking from "./pages/MaintenanceTracking";
import VendorManagement from "./pages/VendorManagement";
import EnhancedMaintenanceTracking from "./pages/EnhancedMaintenanceTracking";
import Jobs from "./pages/Jobs";
import Estimates from "./pages/Estimates";
import RealTimeGPS from "./pages/RealTimeGPS";
import AdvancedMapping from "./pages/AdvancedMapping";
import EmployeeManagement from "./pages/EmployeeManagement";
import TimeTracking from "./pages/TimeTracking";
import Scheduling from "./pages/Scheduling";
import Invoices from "./pages/Invoices";
import CRM from "./pages/CRM";
import InventoryManagement from "./pages/InventoryManagement";
import SafetyCompliance from "./pages/SafetyCompliance";
import DocumentManagement from "./pages/DocumentManagement";
import FinancialManagement from "./pages/FinancialManagement";
import Settings from "./pages/Settings";
import EstimatesManagement from "./pages/EstimatesManagement";
import AccountingPlatform from "./pages/AccountingPlatform";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/fleet" element={
                    <ProtectedRoute>
                      <FleetManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/maintenance" element={
                    <ProtectedRoute>
                      <MaintenanceTracking />
                    </ProtectedRoute>
                  } />
                  <Route path="/vendors" element={
                    <ProtectedRoute>
                      <VendorManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/enhanced-maintenance" element={
                    <ProtectedRoute>
                      <EnhancedMaintenanceTracking />
                    </ProtectedRoute>
                  } />
                  <Route path="/jobs" element={
                    <ProtectedRoute>
                      <Jobs />
                    </ProtectedRoute>
                  } />
                  <Route path="/estimates" element={
                    <ProtectedRoute>
                      <Estimates />
                    </ProtectedRoute>
                  } />
                  <Route path="/gps" element={
                    <ProtectedRoute>
                      <RealTimeGPS />
                    </ProtectedRoute>
                  } />
                  <Route path="/mapping" element={
                    <ProtectedRoute>
                      <AdvancedMapping />
                    </ProtectedRoute>
                  } />
                  <Route path="/employee-management" element={
                    <ProtectedRoute>
                      <EmployeeManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/time-tracking" element={
                    <ProtectedRoute>
                      <TimeTracking />
                    </ProtectedRoute>
                  } />
                  <Route path="/scheduling" element={
                    <ProtectedRoute>
                      <Scheduling />
                    </ProtectedRoute>
                  } />
                  <Route path="/invoices" element={
                    <ProtectedRoute>
                      <Invoices />
                    </ProtectedRoute>
                  } />
                  <Route path="/crm" element={
                    <ProtectedRoute>
                      <CRM />
                    </ProtectedRoute>
                  } />
                  <Route path="/inventory" element={
                    <ProtectedRoute>
                      <InventoryManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/safety" element={
                    <ProtectedRoute>
                      <SafetyCompliance />
                    </ProtectedRoute>
                  } />
                  <Route path="/documents" element={
                    <ProtectedRoute>
                      <DocumentManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/financial" element={
                    <ProtectedRoute>
                      <FinancialManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="/estimates-management" element={
                    <ProtectedRoute>
                      <EstimatesManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/accounting" element={
                    <ProtectedRoute>
                      <AccountingPlatform />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
            <Toaster />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
