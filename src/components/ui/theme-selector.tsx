
import * as React from "react";
import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

    // Store selected theme
    localStorage.setItem("selected-theme", themeName);
  };

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("selected-theme") || "asphalt";
    applyTheme(storedTheme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background border shadow-lg backdrop-blur-md">
        {Object.entries(themes).map(([key, config]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => applyTheme(key)}
            className={cn(
              "flex items-center gap-2 cursor-pointer transition-all duration-200",
              "hover:bg-accent/50 focus:bg-accent/50",
              selectedTheme === key && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex gap-1">
                <div 
                  className="w-3 h-3 rounded-full border border-border/50" 
                  style={{ 
                    background: `hsl(${config.colors.light.primary})` 
                  }} 
                />
                <div 
                  className="w-3 h-3 rounded-full border border-border/50" 
                  style={{ 
                    background: `hsl(${config.colors.light.secondary})` 
                  }} 
                />
              </div>
              <span className="font-medium">{config.name}</span>
            </div>
            {selectedTheme === key && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
