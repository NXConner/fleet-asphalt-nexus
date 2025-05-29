
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BarChart3, Truck, FileText, Briefcase, Receipt, Settings, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeSelector } from "./theme-selector";
import { AnimationPresets } from "./animation-presets";
import { GradientText } from "./gradient-text";
import { PremiumButton } from "./premium-button";
import NotificationSystem from "@/components/NotificationSystem";
import UserMenu from "@/components/UserMenu";
import { cn } from "@/lib/utils";

interface EnhancedNavigationProps {
  showThemeControls?: boolean;
  enableAnimations?: boolean;
  variant?: "default" | "premium" | "minimalist";
}

export function EnhancedNavigation({ 
  showThemeControls = true,
  enableAnimations = true,
  variant = "premium"
}: EnhancedNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/fleet", label: "Fleet", icon: Truck },
    { path: "/estimates", label: "Estimates", icon: FileText },
    { path: "/jobs", label: "Jobs", icon: Briefcase },
    { path: "/invoices", label: "Invoices", icon: Receipt },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getNavVariant = () => {
    switch (variant) {
      case "premium":
        return "bg-card/95 backdrop-blur-xl border-b border-primary/20 shadow-xl";
      case "minimalist":
        return "bg-background border-b border-border";
      default:
        return "bg-card border-b border-border shadow-sm";
    }
  };

  const getLinkVariant = (path: string) => {
    const baseClasses = "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300";
    
    if (isActive(path)) {
      return variant === "premium" 
        ? `${baseClasses} bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25`
        : `${baseClasses} bg-primary text-primary-foreground`;
    }
    
    return variant === "premium"
      ? `${baseClasses} text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-105`
      : `${baseClasses} text-muted-foreground hover:text-foreground hover:bg-accent`;
  };

  const LogoComponent = enableAnimations ? (
    <AnimationPresets preset="glow" className="flex items-center space-x-2">
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-2 rounded-lg shadow-lg">
        <Truck className="h-6 w-6" />
      </div>
      <GradientText variant="holographic" animation="shimmer" size="xl" weight="bold">
        AsphaltPro
      </GradientText>
    </AnimationPresets>
  ) : (
    <div className="flex items-center space-x-2">
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <Truck className="h-6 w-6" />
      </div>
      <span className="text-xl font-bold text-foreground">AsphaltPro</span>
    </div>
  );

  return (
    <nav className={cn("relative z-50", getNavVariant())}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard">
              {LogoComponent}
            </Link>
            
            {variant === "premium" && (
              <Badge variant="secondary" className="ml-3 bg-gradient-to-r from-primary/20 to-accent/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={getLinkVariant(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            <div className="ml-4 flex items-center space-x-2">
              <NotificationSystem />
              
              {showThemeControls && (
                <div className="flex items-center gap-2">
                  <ThemeSelector />
                  <ThemeToggle />
                </div>
              )}
              
              <UserMenu />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <NotificationSystem />
            {showThemeControls && <ThemeSelector />}
            <ThemeToggle />
            <UserMenu />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative group"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              {variant === "premium" && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <AnimationPresets 
            preset={enableAnimations ? "slide-fade" : undefined}
            className="md:hidden pb-4 border-t border-border mt-2 pt-4"
          >
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300",
                      isActive(item.path)
                        ? variant === "premium"
                          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg"
                          : "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </AnimationPresets>
        )}
      </div>
      
      {variant === "premium" && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      )}
    </nav>
  );
}
