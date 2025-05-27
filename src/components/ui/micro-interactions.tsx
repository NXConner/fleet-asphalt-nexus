
import * as React from "react";
import { cn } from "@/lib/utils";

interface HoverRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "slide" | "fade" | "scale" | "rotate" | "flip";
  direction?: "up" | "down" | "left" | "right";
  speed?: "fast" | "normal" | "slow";
  trigger?: React.ReactNode;
  content: React.ReactNode;
}

const HoverReveal = React.forwardRef<HTMLDivElement, HoverRevealProps>(
  ({ 
    className, 
    variant = "slide",
    direction = "up",
    speed = "normal",
    trigger,
    content,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const speedClasses = {
      fast: "duration-150",
      normal: "duration-300",
      slow: "duration-500",
    };

    const variantClasses = {
      slide: {
        up: isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        down: isHovered ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        left: isHovered ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
        right: isHovered ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
      },
      fade: {
        up: isHovered ? "opacity-100" : "opacity-0",
        down: isHovered ? "opacity-100" : "opacity-0",
        left: isHovered ? "opacity-100" : "opacity-0",
        right: isHovered ? "opacity-100" : "opacity-0",
      },
      scale: {
        up: isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0",
        down: isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0",
        left: isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0",
        right: isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0",
      },
      rotate: {
        up: isHovered ? "rotate-0 opacity-100" : "rotate-6 opacity-0",
        down: isHovered ? "rotate-0 opacity-100" : "-rotate-6 opacity-0",
        left: isHovered ? "rotate-0 opacity-100" : "rotate-3 opacity-0",
        right: isHovered ? "rotate-0 opacity-100" : "-rotate-3 opacity-0",
      },
      flip: {
        up: isHovered ? "rotateX-0 opacity-100" : "rotateX-90 opacity-0",
        down: isHovered ? "rotateX-0 opacity-100" : "rotateX-90 opacity-0",
        left: isHovered ? "rotateY-0 opacity-100" : "rotateY-90 opacity-0",
        right: isHovered ? "rotateY-0 opacity-100" : "rotateY-90 opacity-0",
      },
    };

    return (
      <div
        ref={ref}
        className={cn("relative group", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {trigger}
        <div
          className={cn(
            "absolute z-10 transition-all",
            speedClasses[speed],
            variantClasses[variant][direction]
          )}
        >
          {content}
        </div>
      </div>
    );
  }
);

HoverReveal.displayName = "HoverReveal";

interface MagneticEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: "weak" | "normal" | "strong";
  children: React.ReactNode;
}

const MagneticEffect = React.forwardRef<HTMLDivElement, MagneticEffectProps>(
  ({ className, strength = "normal", children, ...props }, ref) => {
    const elementRef = React.useRef<HTMLDivElement>(null);
    
    React.useImperativeHandle(ref, () => elementRef.current!);

    const strengthValues = {
      weak: 0.1,
      normal: 0.2,
      strong: 0.3,
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = x * strengthValues[strength];
      const moveY = y * strengthValues[strength];

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      const element = elementRef.current;
      if (!element) return;
      element.style.transform = "translate(0px, 0px)";
    };

    return (
      <div
        ref={elementRef}
        className={cn("transition-transform duration-300 ease-out cursor-pointer", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MagneticEffect.displayName = "MagneticEffect";

interface RippleEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  duration?: number;
  children: React.ReactNode;
}

const RippleEffect = React.forwardRef<HTMLDivElement, RippleEffectProps>(
  ({ className, color = "rgba(255, 255, 255, 0.6)", duration = 600, children, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

    const handleClick = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples(prev => [...prev, { x, y, id }]);

      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== id));
      }, duration);
    };

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full animate-ping"
            style={{
              left: ripple.x - 4,
              top: ripple.y - 4,
              width: 8,
              height: 8,
              backgroundColor: color,
              animationDuration: `${duration}ms`,
            }}
          />
        ))}
      </div>
    );
  }
);

RippleEffect.displayName = "RippleEffect";

interface TiltEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "subtle" | "normal" | "dramatic";
  children: React.ReactNode;
}

const TiltEffect = React.forwardRef<HTMLDivElement, TiltEffectProps>(
  ({ className, intensity = "normal", children, ...props }, ref) => {
    const elementRef = React.useRef<HTMLDivElement>(null);
    
    React.useImperativeHandle(ref, () => elementRef.current!);

    const intensityValues = {
      subtle: 5,
      normal: 15,
      dramatic: 25,
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * intensityValues[intensity];
      const rotateY = (centerX - x) / centerX * intensityValues[intensity];

      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      const element = elementRef.current;
      if (!element) return;
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };

    return (
      <div
        ref={elementRef}
        className={cn("transition-transform duration-300 ease-out", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TiltEffect.displayName = "TiltEffect";

export { HoverReveal, MagneticEffect, RippleEffect, TiltEffect };
