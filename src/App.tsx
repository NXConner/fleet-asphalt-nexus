
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
import Jobs from "./pages/Jobs";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";

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
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings - Coming Soon</h1></div>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </ProtectedRoute>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
