
import * as React from "react";
import { Check, Palette, Sparkles, Zap, Leaf, Crown, Wand2, Rocket } from "lucide-react";
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

    // Apply enhanced gradients
    Object.entries(themeConfig.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });

    // Apply enhanced shadows
    Object.entries(themeConfig.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Apply blur effects
    Object.entries(themeConfig.blur).forEach(([key, value]) => {
      root.style.setProperty(`--blur-${key}`, value);
    });

    // Apply special effects
    Object.entries(themeConfig.effects).forEach(([key, value]) => {
      root.style.setProperty(`--effect-${key}`, value);
    });

    // Apply patterns
    Object.entries(themeConfig.patterns).forEach(([key, value]) => {
      root.style.setProperty(`--pattern-${key}`, value);
    });

    // Apply animation settings
    Object.entries(themeConfig.animations.duration).forEach(([key, value]) => {
      root.style.setProperty(`--duration-${key}`, value);
    });

    Object.entries(themeConfig.animations.easing).forEach(([key, value]) => {
      root.style.setProperty(`--easing-${key}`, value);
    });

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
        return <Crown className="h-3 w-3" />;
      case "Professional":
        return <Palette className="h-3 w-3" />;
      case "Modern":
        return <Zap className="h-3 w-3" />;
      case "Nature":
        return <Leaf className="h-3 w-3" />;
      case "Vibrant":
        return <Sparkles className="h-3 w-3" />;
      case "Creative":
        return <Wand2 className="h-3 w-3" />;
      case "Futuristic":
        return <Rocket className="h-3 w-3" />;
      case "Elegant":
        return <Crown className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getThemePreview = (themeKey: string, config: any) => {
    const colors = theme === "dark" ? config.colors.dark : config.colors.light;
    return (
      <div className="flex gap-1">
        <div 
          className="w-3 h-3 rounded-full border border-border/50 shadow-sm transition-all duration-300 hover:scale-125 hover:shadow-md" 
          style={{ 
            background: `hsl(${colors.primary})`,
            boxShadow: `0 0 8px hsl(${colors.primary} / 0.3)`
          }} 
        />
        <div 
          className="w-3 h-3 rounded-full border border-border/50 shadow-sm transition-all duration-300 hover:scale-125 hover:shadow-md" 
          style={{ 
            background: `hsl(${colors.accent})`,
            boxShadow: `0 0 8px hsl(${colors.accent} / 0.3)`
          }} 
        />
        <div 
          className="w-3 h-3 rounded-full border border-border/50 shadow-sm transition-all duration-300 hover:scale-125 hover:shadow-md" 
          style={{ 
            background: `hsl(${colors.secondary})`,
            boxShadow: `0 0 8px hsl(${colors.secondary} / 0.3)`
          }} 
        />
      </div>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Palette className="h-[1.2rem] w-[1.2rem] transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 relative z-10" />
          <span className="sr-only">Select theme</span>
          <div className="absolute inset-0 bg-gradient-conic from-primary via-accent to-secondary opacity-0 group-hover:opacity-20 animate-spin-slow transition-opacity duration-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-background/95 border shadow-2xl backdrop-blur-2xl">
        <DropdownMenuLabel className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          <Palette className="h-4 w-4 text-primary" />
          Advanced Theme Selector
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20">
          {Object.entries(groupedThemes).map(([category, categoryThemes]) => (
            <div key={category} className="mb-2">
              <DropdownMenuLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-2 py-1.5 bg-muted/30 rounded-md mx-1 my-1">
                {getCategoryIcon(category)}
                {category}
                <Badge variant="secondary" className="text-xs ml-auto">
                  {Object.keys(categoryThemes).length}
                </Badge>
              </DropdownMenuLabel>
              {Object.entries(categoryThemes).map(([key, config]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => applyTheme(key)}
                  className={cn(
                    "flex items-center gap-3 cursor-pointer transition-all duration-300 mx-1 rounded-lg p-3 my-1",
                    "hover:bg-accent/50 focus:bg-accent/50 hover:scale-[1.02] hover:shadow-lg",
                    "group relative overflow-hidden",
                    selectedTheme === key && "bg-accent text-accent-foreground ring-2 ring-primary/30 shadow-lg shadow-primary/10"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center gap-3 flex-1 relative z-10">
                    {getThemePreview(key, config)}
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{config.name}</span>
                      {(config.category === "Premium" || config.category === "Futuristic" || config.category === "Creative") && (
                        <Badge variant="secondary" className="text-xs w-fit mt-1 bg-gradient-to-r from-primary/20 to-accent/20">
                          <Sparkles className="h-2 w-2 mr-1" />
                          Enhanced
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {selectedTheme === key && (
                    <div className="relative z-10">
                      <Check className="h-4 w-4 text-primary animate-in zoom-in-50 duration-300" />
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </DropdownMenuItem>
              ))}
              {category !== "Elegant" && <DropdownMenuSeparator className="my-2 mx-1" />}
            </div>
          ))}
        </div>
        
        <DropdownMenuSeparator />
        <div className="p-2 text-xs text-muted-foreground text-center bg-muted/20 rounded-md mx-1 mb-1">
          <Sparkles className="h-3 w-3 inline mr-1" />
          Advanced theming with enhanced UI effects
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
