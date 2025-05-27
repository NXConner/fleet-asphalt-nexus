
import * as React from "react";
import { Check, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ThemeProvider";
import { themes } from "@/themes/themeConfig";
import { cn } from "@/lib/utils";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState("asphalt");

  const applyTheme = (themeName: string) => {
    const themeConfig = themes[themeName];
    if (!themeConfig) return;

    setSelectedTheme(themeName);
    
    // Apply theme colors to CSS variables
    const root = document.documentElement;
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const colors = isDark ? themeConfig.colors.dark : themeConfig.colors.light;

    Object.entries(colors).forEach(([key, value]) => {
      const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(`--${cssVar}`, value);
    });

    // Apply enhanced CSS variables
    root.style.setProperty('--gradient-primary', themeConfig.gradients.primary);
    root.style.setProperty('--gradient-secondary', themeConfig.gradients.secondary);
    root.style.setProperty('--gradient-accent', themeConfig.gradients.accent);
    root.style.setProperty('--gradient-background', themeConfig.gradients.background);
    root.style.setProperty('--gradient-surface', themeConfig.gradients.surface);
    
    root.style.setProperty('--shadow-colored', themeConfig.shadows.colored);
    root.style.setProperty('--shadow-glow', themeConfig.shadows.glow);
    
    root.style.setProperty('--blur-xl', themeConfig.blur.xl);

    // Store selected theme
    localStorage.setItem("selected-theme", themeName);
  };

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("selected-theme") || "asphalt";
    applyTheme(storedTheme);
  }, [theme]);

  const groupedThemes = React.useMemo(() => {
    const groups: Record<string, typeof themes> = {};
    Object.entries(themes).forEach(([key, config]) => {
      if (!groups[config.category]) {
        groups[config.category] = {};
      }
      groups[config.category][key] = config;
    });
    return groups;
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Premium":
        return <Sparkles className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative group">
          <Palette className="h-[1.2rem] w-[1.2rem] transition-all duration-300 group-hover:rotate-12" />
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 bg-background/95 border shadow-xl backdrop-blur-xl">
        <DropdownMenuLabel className="flex items-center gap-2 text-sm font-semibold">
          <Palette className="h-4 w-4" />
          Choose Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {Object.entries(groupedThemes).map(([category, categoryThemes]) => (
          <div key={category}>
            <DropdownMenuLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-2 py-1">
              {getCategoryIcon(category)}
              {category}
            </DropdownMenuLabel>
            {Object.entries(categoryThemes).map(([key, config]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => applyTheme(key)}
                className={cn(
                  "flex items-center gap-3 cursor-pointer transition-all duration-300 mx-1 rounded-md",
                  "hover:bg-accent/50 focus:bg-accent/50 hover:scale-[1.02]",
                  selectedTheme === key && "bg-accent text-accent-foreground ring-1 ring-primary/20"
                )}
              >
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex gap-1">
                    <div 
                      className="w-3 h-3 rounded-full border border-border/50 shadow-sm transition-transform duration-200 hover:scale-110" 
                      style={{ 
                        background: `hsl(${config.colors.light.primary})` 
                      }} 
                    />
                    <div 
                      className="w-3 h-3 rounded-full border border-border/50 shadow-sm transition-transform duration-200 hover:scale-110" 
                      style={{ 
                        background: `hsl(${config.colors.light.accent})` 
                      }} 
                    />
                    <div 
                      className="w-3 h-3 rounded-full border border-border/50 shadow-sm transition-transform duration-200 hover:scale-110" 
                      style={{ 
                        background: `hsl(${config.colors.light.secondary})` 
                      }} 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{config.name}</span>
                    {config.category === "Premium" && (
                      <Badge variant="secondary" className="text-xs w-fit mt-0.5">
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
                {selectedTheme === key && (
                  <Check className="h-4 w-4 text-primary animate-in zoom-in-50 duration-200" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="my-1" />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
