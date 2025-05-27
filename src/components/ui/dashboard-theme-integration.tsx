
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Sparkles, 
  Eye, 
  Settings, 
  TrendingUp,
  Zap,
  Crown
} from "lucide-react";
import { ThemeSelector } from "./theme-selector";
import { GradientText } from "./gradient-text";
import { PremiumButton } from "./premium-button";
import { AdvancedCard } from "./advanced-card";
import { AnimationPresets, ScrollAnimation } from "./animation-presets";
import { ParticleSystem } from "./particle-system";
import { InteractiveBackground } from "./interactive-background";
import { cn } from "@/lib/utils";

interface DashboardThemeIntegrationProps {
  className?: string;
  showBackground?: boolean;
  enableAnimations?: boolean;
}

export function DashboardThemeIntegration({ 
  className,
  showBackground = true,
  enableAnimations = true 
}: DashboardThemeIntegrationProps) {
  const [activeDemo, setActiveDemo] = React.useState("themes");

  const themeFeatures = [
    {
      title: "Premium Themes",
      description: "12+ professionally designed themes",
      icon: Crown,
      count: "12+",
      color: "text-yellow-500"
    },
    {
      title: "Visual Effects",
      description: "Advanced animations and interactions",
      icon: Sparkles,
      count: "20+",
      color: "text-purple-500"
    },
    {
      title: "Performance",
      description: "Optimized for smooth experience",
      icon: Zap,
      count: "60fps",
      color: "text-green-500"
    }
  ];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {showBackground && (
        <>
          <InteractiveBackground variant="neural" density="low" speed="slow" />
          <ParticleSystem variant="cosmic" density="low" speed="slow" connections />
        </>
      )}
      
      <div className="relative z-10 space-y-6">
        <ScrollAnimation animation="fade-in" className="text-center">
          <GradientText 
            variant="holographic" 
            animation="shimmer" 
            size="2xl" 
            weight="bold"
            className="block mb-2"
          >
            Advanced Theme System
          </GradientText>
          <p className="text-muted-foreground">
            Experience premium theming with cutting-edge UI effects
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="slide-up" delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeFeatures.map((feature, index) => (
              <AdvancedCard
                key={feature.title}
                variant="glass"
                hover
                glow
                className="text-center"
              >
                <CardContent className="pt-6">
                  <div className={cn("inline-flex p-3 rounded-full mb-4", feature.color)}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{feature.count}</div>
                  <div className="font-semibold mb-2">{feature.title}</div>
                  <div className="text-sm text-muted-foreground">{feature.description}</div>
                </CardContent>
              </AdvancedCard>
            ))}
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="zoom-in" delay={400}>
          <AdvancedCard variant="holographic" hover glow pattern="circuit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Theme Controls
                <Badge variant="secondary" className="ml-auto">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </CardTitle>
              <CardDescription>
                Switch themes instantly and see the effects in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-4">
                  <ThemeSelector />
                  <PremiumButton variant="holographic" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </PremiumButton>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
                  {['glass', 'neon', 'crystalline', 'plasma'].map((variant) => (
                    <Button
                      key={variant}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-12 capitalize transition-all duration-300",
                        activeDemo === variant && "ring-2 ring-primary"
                      )}
                      onClick={() => setActiveDemo(variant)}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </AdvancedCard>
        </ScrollAnimation>

        <ScrollAnimation animation="slide-up" delay={600}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdvancedCard variant="gradient" hover animation="shimmer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Enhanced Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Render Speed</span>
                    <Badge variant="secondary">60fps</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bundle Size</span>
                    <Badge variant="secondary">Optimized</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">GPU Acceleration</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </AdvancedCard>

            <AdvancedCard variant="crystalline" hover glow>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Customization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Color Schemes</span>
                    <Badge variant="secondary">Unlimited</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Animation Controls</span>
                    <Badge variant="secondary">Advanced</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Export/Import</span>
                    <Badge variant="secondary">JSON</Badge>
                  </div>
                </div>
              </CardContent>
            </AdvancedCard>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
