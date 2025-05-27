
import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ParticleSystem } from "./particle-system";
import { GradientText } from "./gradient-text";
import { MorphingShape } from "./morphing-shape";
import { AnimationPresets, ScrollAnimation } from "./animation-presets";
import { PremiumButton } from "./premium-button";
import { AdvancedCard } from "./advanced-card";
import { InteractiveBackground } from "./interactive-background";
import { Sparkles, Zap, Palette, Rocket } from "lucide-react";

export function ThemeShowcase() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <InteractiveBackground variant="neural" density="medium" speed="normal" />
      <ParticleSystem variant="cosmic" density="normal" speed="normal" connections />
      
      <div className="relative z-10 container mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <ScrollAnimation animation="fade-in" className="text-center space-y-6">
          <GradientText 
            variant="holographic" 
            animation="shimmer" 
            size="3xl" 
            weight="extrabold"
            className="block"
          >
            Ultimate Theme Experience
          </GradientText>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the most advanced theming system with cutting-edge UI effects, 
            animations, and interactive elements.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <PremiumButton variant="holographic" size="lg" animation="glow">
              <Sparkles className="h-5 w-5" />
              Explore Themes
            </PremiumButton>
            <PremiumButton variant="crystalline" size="lg" animation="shimmer">
              <Palette className="h-5 w-5" />
              Customize
            </PremiumButton>
          </div>
        </ScrollAnimation>

        {/* Interactive Shapes */}
        <ScrollAnimation animation="slide-up" className="flex justify-center items-center gap-8 py-12">
          <MorphingShape variant="blob" color="gradient" animation="morph" interactive />
          <MorphingShape variant="star" color="rainbow" animation="rotate" interactive />
          <MorphingShape variant="spiral" color="primary" animation="pulse" interactive />
          <MorphingShape variant="heart" color="accent" animation="float" interactive />
        </ScrollAnimation>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollAnimation animation="slide-left">
            <AdvancedCard 
              variant="holographic" 
              hover 
              glow 
              pattern="circuit" 
              animation="shimmer"
              className="h-full"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Advanced Effects
                </CardTitle>
                <CardDescription>
                  Glass morphism, holographic displays, and 3D transforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="secondary" className="animate-pulse">Holographic</Badge>
                  <Badge variant="outline" className="animate-glow">Crystalline</Badge>
                  <Badge className="animate-shimmer">Glass Morph</Badge>
                </div>
              </CardContent>
            </AdvancedCard>
          </ScrollAnimation>

          <ScrollAnimation animation="zoom-in" delay={200}>
            <AdvancedCard 
              variant="crystalline" 
              hover 
              glow 
              pattern="hexagon" 
              animation="float"
              className="h-full"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-accent" />
                  Dynamic Colors
                </CardTitle>
                <CardDescription>
                  Adaptive color systems with smart contrast
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {['primary', 'secondary', 'accent', 'muted'].map((color, i) => (
                    <AnimationPresets 
                      key={color}
                      preset="bounce-gentle" 
                      delay={i * 100}
                      className={`h-8 rounded-lg bg-${color} animate-pulse`}
                    />
                  ))}
                </div>
              </CardContent>
            </AdvancedCard>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-right" delay={400}>
            <AdvancedCard 
              variant="plasma" 
              hover 
              glow 
              pattern="wave" 
              animation="pulse"
              className="h-full"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-secondary" />
                  Performance
                </CardTitle>
                <CardDescription>
                  Optimized animations with 60fps smoothness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Render Speed</span>
                    <span className="text-green-500">60fps</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-full animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </AdvancedCard>
          </ScrollAnimation>
        </div>

        {/* Gradient Text Showcase */}
        <ScrollAnimation animation="fade-in" className="text-center space-y-8">
          <h2 className="text-2xl font-bold mb-6">Typography Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <GradientText variant="rainbow" animation="flow" size="xl" weight="bold">
                Rainbow Flow
              </GradientText>
              <GradientText variant="cosmic" animation="shimmer" size="lg" weight="semibold">
                Cosmic Shimmer
              </GradientText>
              <GradientText variant="neon" animation="glow" size="lg" weight="bold">
                Neon Glow
              </GradientText>
            </div>
            <div className="space-y-4">
              <GradientText variant="plasma" animation="pulse" size="xl" weight="bold">
                Plasma Pulse
              </GradientText>
              <GradientText variant="aurora" animation="wave" size="lg" weight="semibold">
                Aurora Wave
              </GradientText>
              <GradientText variant="holographic" animation="glitch" size="lg" weight="bold">
                Holographic Glitch
              </GradientText>
            </div>
          </div>
        </ScrollAnimation>

        {/* Interactive Demo */}
        <ScrollAnimation animation="zoom-in" className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-xl border-primary/20">
            <CardHeader>
              <CardTitle>
                <GradientText variant="holographic" animation="shimmer" size="xl" weight="bold">
                  Interactive Experience
                </GradientText>
              </CardTitle>
              <CardDescription>
                Hover over elements to see dynamic interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['gradient', 'glow', 'neon', 'holographic'].map((variant, i) => (
                  <PremiumButton 
                    key={variant}
                    variant={variant as any}
                    animation="float"
                    className="w-full"
                  >
                    {variant}
                  </PremiumButton>
                ))}
              </div>
              
              <div className="relative h-32 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-lg overflow-hidden">
                <ParticleSystem variant="fireflies" density="normal" speed="fast" interactive />
                <div className="absolute inset-0 flex items-center justify-center">
                  <GradientText variant="cosmic" animation="glow" size="lg" weight="bold">
                    Move your mouse here
                  </GradientText>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </div>
  );
}
