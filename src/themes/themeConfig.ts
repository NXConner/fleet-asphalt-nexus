
export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  // Enhanced color variants
  primaryVariant: string;
  secondaryVariant: string;
  accentVariant: string;
  surface: string;
  surfaceVariant: string;
  outline: string;
  outlineVariant: string;
}

export interface ThemeConfig {
  name: string;
  category: "Professional" | "Modern" | "Vibrant" | "Nature" | "Premium";
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    colored: string;
    glow: string;
  };
  blur: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  effects: {
    glassMorphism: string;
    neuMorphism: string;
    holographic: string;
  };
}

export const themes: Record<string, ThemeConfig> = {
  asphalt: {
    name: "Asphalt Professional",
    category: "Professional",
    colors: {
      light: {
        primary: "210 100% 6%",
        primaryForeground: "0 0% 98%",
        secondary: "210 40% 96.1%",
        secondaryForeground: "222.2 47.4% 11.2%",
        accent: "210 40% 94%",
        accentForeground: "222.2 47.4% 11.2%",
        background: "0 0% 100%",
        foreground: "222.2 84% 4.9%",
        card: "0 0% 100%",
        cardForeground: "222.2 84% 4.9%",
        muted: "210 40% 96.1%",
        mutedForeground: "215.4 16.3% 46.9%",
        border: "214.3 31.8% 91.4%",
        input: "214.3 31.8% 91.4%",
        ring: "210 100% 6%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "210 100% 12%",
        secondaryVariant: "210 40% 92%",
        accentVariant: "210 40% 88%",
        surface: "210 40% 98%",
        surfaceVariant: "210 40% 95%",
        outline: "214.3 31.8% 85%",
        outlineVariant: "214.3 31.8% 88%",
      },
      dark: {
        primary: "210 40% 98%",
        primaryForeground: "222.2 47.4% 11.2%",
        secondary: "217.2 32.6% 17.5%",
        secondaryForeground: "210 40% 98%",
        accent: "217.2 32.6% 17.5%",
        accentForeground: "210 40% 98%",
        background: "222.2 84% 4.9%",
        foreground: "210 40% 98%",
        card: "222.2 84% 4.9%",
        cardForeground: "210 40% 98%",
        muted: "217.2 32.6% 17.5%",
        mutedForeground: "215 20.2% 65.1%",
        border: "217.2 32.6% 17.5%",
        input: "217.2 32.6% 17.5%",
        ring: "212.7 26.8% 83.9%",
        destructive: "0 62.8% 30.6%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "210 40% 88%",
        secondaryVariant: "217.2 32.6% 22%",
        accentVariant: "217.2 32.6% 25%",
        surface: "222.2 84% 7%",
        surfaceVariant: "217.2 32.6% 12%",
        outline: "217.2 32.6% 25%",
        outlineVariant: "217.2 32.6% 20%",
      },
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(210 100% 6%) 0%, hsl(220 91% 15%) 50%, hsl(210 100% 8%) 100%)",
      secondary: "linear-gradient(135deg, hsl(210 40% 96%) 0%, hsl(220 13% 91%) 50%, hsl(210 40% 94%) 100%)",
      accent: "linear-gradient(135deg, hsl(210 40% 94%) 0%, hsl(214 31% 91%) 50%, hsl(210 40% 92%) 100%)",
      background: "linear-gradient(160deg, hsl(0 0% 100%) 0%, hsl(210 40% 99%) 100%)",
      surface: "linear-gradient(45deg, hsl(210 40% 98%) 0%, hsl(210 40% 96%) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      colored: "0 8px 25px -8px hsl(210 100% 6% / 0.3)",
      glow: "0 0 20px hsl(210 100% 6% / 0.15), 0 0 40px hsl(210 100% 6% / 0.1)",
    },
    blur: {
      sm: "blur(4px)",
      md: "blur(8px)",
      lg: "blur(16px)",
      xl: "blur(24px)",
    },
    effects: {
      glassMorphism: "backdrop-blur-md bg-white/10 border border-white/20",
      neuMorphism: "bg-gradient-to-br from-gray-100 to-gray-200 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]",
      holographic: "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-75",
    },
  },
  midnight: {
    name: "Midnight Aurora",
    category: "Modern",
    colors: {
      light: {
        primary: "221 83% 53%",
        primaryForeground: "210 40% 98%",
        secondary: "214 32% 91%",
        secondaryForeground: "222.2 47.4% 11.2%",
        accent: "255 84% 67%",
        accentForeground: "222.2 47.4% 11.2%",
        background: "0 0% 100%",
        foreground: "222.2 84% 4.9%",
        card: "0 0% 100%",
        cardForeground: "222.2 84% 4.9%",
        muted: "214 32% 91%",
        mutedForeground: "215.4 16.3% 46.9%",
        border: "214.3 31.8% 91.4%",
        input: "214.3 31.8% 91.4%",
        ring: "221 83% 53%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "221 83% 60%",
        secondaryVariant: "214 32% 87%",
        accentVariant: "255 84% 75%",
        surface: "214 32% 98%",
        surfaceVariant: "214 32% 95%",
        outline: "214.3 31.8% 85%",
        outlineVariant: "214.3 31.8% 88%",
      },
      dark: {
        primary: "221 83% 53%",
        primaryForeground: "210 40% 98%",
        secondary: "215 25% 27%",
        secondaryForeground: "210 40% 98%",
        accent: "255 84% 67%",
        accentForeground: "210 40% 98%",
        background: "224 71% 4%",
        foreground: "213 31% 91%",
        card: "224 71% 4%",
        cardForeground: "213 31% 91%",
        muted: "215 25% 27%",
        mutedForeground: "217.9 10.6% 64.9%",
        border: "215 25% 27%",
        input: "215 25% 27%",
        ring: "221 83% 53%",
        destructive: "0 62.8% 30.6%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "221 83% 60%",
        secondaryVariant: "215 25% 32%",
        accentVariant: "255 84% 75%",
        surface: "224 71% 6%",
        surfaceVariant: "215 25% 22%",
        outline: "215 25% 35%",
        outlineVariant: "215 25% 30%",
      },
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(255 84% 67%) 50%, hsl(226 71% 40%) 100%)",
      secondary: "linear-gradient(135deg, hsl(214 32% 91%) 0%, hsl(220 13% 91%) 50%, hsl(255 84% 95%) 100%)",
      accent: "linear-gradient(135deg, hsl(255 84% 67%) 0%, hsl(280 100% 70%) 50%, hsl(221 83% 53%) 100%)",
      background: "linear-gradient(160deg, hsl(224 71% 4%) 0%, hsl(235 71% 6%) 100%)",
      surface: "linear-gradient(45deg, hsl(224 71% 6%) 0%, hsl(215 25% 27%) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      colored: "0 8px 25px -8px hsl(221 83% 53% / 0.3)",
      glow: "0 0 20px hsl(221 83% 53% / 0.15), 0 0 40px hsl(255 84% 67% / 0.1)",
    },
    blur: {
      sm: "blur(4px)",
      md: "blur(8px)",
      lg: "blur(16px)",
      xl: "blur(24px)",
    },
    effects: {
      glassMorphism: "backdrop-blur-md bg-blue-500/10 border border-blue-400/20",
      neuMorphism: "bg-gradient-to-br from-blue-100 to-purple-200 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]",
      holographic: "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-75",
    },
  },
  emerald: {
    name: "Emerald Nature",
    category: "Nature",
    colors: {
      light: {
        primary: "158 64% 52%",
        primaryForeground: "0 0% 100%",
        secondary: "158 64% 96%",
        secondaryForeground: "158 64% 11%",
        accent: "79 84% 67%",
        accentForeground: "158 64% 11%",
        background: "0 0% 100%",
        foreground: "158 64% 4%",
        card: "0 0% 100%",
        cardForeground: "158 64% 4%",
        muted: "158 40% 96%",
        mutedForeground: "158 16% 47%",
        border: "158 32% 91%",
        input: "158 32% 91%",
        ring: "158 64% 52%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "158 64% 60%",
        secondaryVariant: "158 64% 92%",
        accentVariant: "79 84% 75%",
        surface: "158 40% 98%",
        surfaceVariant: "158 40% 95%",
        outline: "158 32% 85%",
        outlineVariant: "158 32% 88%",
      },
      dark: {
        primary: "158 64% 52%",
        primaryForeground: "0 0% 100%",
        secondary: "158 33% 18%",
        secondaryForeground: "158 64% 98%",
        accent: "79 84% 67%",
        accentForeground: "158 64% 98%",
        background: "158 50% 3%",
        foreground: "158 64% 98%",
        card: "158 50% 3%",
        cardForeground: "158 64% 98%",
        muted: "158 33% 18%",
        mutedForeground: "158 20% 65%",
        border: "158 33% 18%",
        input: "158 33% 18%",
        ring: "158 64% 52%",
        destructive: "0 62.8% 30.6%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "158 64% 60%",
        secondaryVariant: "158 33% 23%",
        accentVariant: "79 84% 75%",
        surface: "158 50% 5%",
        surfaceVariant: "158 33% 13%",
        outline: "158 33% 26%",
        outlineVariant: "158 33% 21%",
      },
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(158 64% 52%) 0%, hsl(79 84% 67%) 50%, hsl(160 81% 36%) 100%)",
      secondary: "linear-gradient(135deg, hsl(158 64% 96%) 0%, hsl(158 32% 91%) 50%, hsl(79 84% 95%) 100%)",
      accent: "linear-gradient(135deg, hsl(79 84% 67%) 0%, hsl(120 100% 70%) 50%, hsl(158 64% 52%) 100%)",
      background: "linear-gradient(160deg, hsl(158 50% 3%) 0%, hsl(140 50% 5%) 100%)",
      surface: "linear-gradient(45deg, hsl(158 50% 5%) 0%, hsl(158 33% 18%) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      colored: "0 8px 25px -8px hsl(158 64% 52% / 0.3)",
      glow: "0 0 20px hsl(158 64% 52% / 0.15), 0 0 40px hsl(79 84% 67% / 0.1)",
    },
    blur: {
      sm: "blur(4px)",
      md: "blur(8px)",
      lg: "blur(16px)",
      xl: "blur(24px)",
    },
    effects: {
      glassMorphism: "backdrop-blur-md bg-green-500/10 border border-green-400/20",
      neuMorphism: "bg-gradient-to-br from-green-100 to-emerald-200 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]",
      holographic: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 opacity-75",
    },
  },
  sunset: {
    name: "Sunset Premium",
    category: "Premium",
    colors: {
      light: {
        primary: "25 95% 53%",
        primaryForeground: "0 0% 100%",
        secondary: "43 96% 56%",
        secondaryForeground: "25 95% 4%",
        accent: "330 81% 60%",
        accentForeground: "0 0% 100%",
        background: "0 0% 100%",
        foreground: "25 95% 4%",
        card: "0 0% 100%",
        cardForeground: "25 95% 4%",
        muted: "43 96% 96%",
        mutedForeground: "25 16% 47%",
        border: "43 32% 91%",
        input: "43 32% 91%",
        ring: "25 95% 53%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "25 95% 60%",
        secondaryVariant: "43 96% 92%",
        accentVariant: "330 81% 75%",
        surface: "43 96% 98%",
        surfaceVariant: "43 96% 95%",
        outline: "43 32% 85%",
        outlineVariant: "43 32% 88%",
      },
      dark: {
        primary: "25 95% 53%",
        primaryForeground: "0 0% 100%",
        secondary: "43 96% 56%",
        secondaryForeground: "25 95% 4%",
        accent: "330 81% 60%",
        accentForeground: "0 0% 100%",
        background: "25 50% 3%",
        foreground: "25 95% 98%",
        card: "25 50% 3%",
        cardForeground: "25 95% 98%",
        muted: "25 33% 18%",
        mutedForeground: "25 20% 65%",
        border: "25 33% 18%",
        input: "25 33% 18%",
        ring: "25 95% 53%",
        destructive: "0 62.8% 30.6%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "25 95% 60%",
        secondaryVariant: "25 33% 23%",
        accentVariant: "330 81% 75%",
        surface: "25 50% 5%",
        surfaceVariant: "25 33% 13%",
        outline: "25 33% 26%",
        outlineVariant: "25 33% 21%",
      },
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(25 95% 53%) 0%, hsl(43 96% 56%) 50%, hsl(330 81% 60%) 100%)",
      secondary: "linear-gradient(135deg, hsl(43 96% 96%) 0%, hsl(25 32% 91%) 50%, hsl(330 81% 95%) 100%)",
      accent: "linear-gradient(135deg, hsl(330 81% 60%) 0%, hsl(350 100% 70%) 50%, hsl(25 95% 53%) 100%)",
      background: "linear-gradient(160deg, hsl(25 50% 3%) 0%, hsl(330 50% 5%) 100%)",
      surface: "linear-gradient(45deg, hsl(25 50% 5%) 0%, hsl(25 33% 18%) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      colored: "0 8px 25px -8px hsl(25 95% 53% / 0.3)",
      glow: "0 0 20px hsl(25 95% 53% / 0.15), 0 0 40px hsl(330 81% 60% / 0.1)",
    },
    blur: {
      sm: "blur(4px)",
      md: "blur(8px)",
      lg: "blur(16px)",
      xl: "blur(24px)",
    },
    effects: {
      glassMorphism: "backdrop-blur-md bg-orange-500/10 border border-orange-400/20",
      neuMorphism: "bg-gradient-to-br from-orange-100 to-pink-200 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]",
      holographic: "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 opacity-75",
    },
  },
  ocean: {
    name: "Ocean Depths",
    category: "Vibrant",
    colors: {
      light: {
        primary: "199 89% 48%",
        primaryForeground: "0 0% 100%",
        secondary: "187 85% 53%",
        secondaryForeground: "199 89% 4%",
        accent: "175 83% 39%",
        accentForeground: "0 0% 100%",
        background: "0 0% 100%",
        foreground: "199 89% 4%",
        card: "0 0% 100%",
        cardForeground: "199 89% 4%",
        muted: "187 85% 96%",
        mutedForeground: "199 16% 47%",
        border: "187 32% 91%",
        input: "187 32% 91%",
        ring: "199 89% 48%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "199 89% 60%",
        secondaryVariant: "187 85% 92%",
        accentVariant: "175 83% 75%",
        surface: "187 85% 98%",
        surfaceVariant: "187 85% 95%",
        outline: "187 32% 85%",
        outlineVariant: "187 32% 88%",
      },
      dark: {
        primary: "199 89% 48%",
        primaryForeground: "0 0% 100%",
        secondary: "187 85% 53%",
        secondaryForeground: "199 89% 4%",
        accent: "175 83% 39%",
        accentForeground: "0 0% 100%",
        background: "199 50% 3%",
        foreground: "199 89% 98%",
        card: "199 50% 3%",
        cardForeground: "199 89% 98%",
        muted: "199 33% 18%",
        mutedForeground: "199 20% 65%",
        border: "199 33% 18%",
        input: "199 33% 18%",
        ring: "199 89% 48%",
        destructive: "0 62.8% 30.6%",
        destructiveForeground: "210 40% 98%",
        success: "142 76% 36%",
        successForeground: "355.7 100% 97.3%",
        warning: "38 92% 50%",
        warningForeground: "48 96% 89%",
        primaryVariant: "199 89% 60%",
        secondaryVariant: "199 33% 23%",
        accentVariant: "175 83% 75%",
        surface: "199 50% 5%",
        surfaceVariant: "199 33% 13%",
        outline: "199 33% 26%",
        outlineVariant: "199 33% 21%",
      },
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(199 89% 48%) 0%, hsl(187 85% 53%) 50%, hsl(175 83% 39%) 100%)",
      secondary: "linear-gradient(135deg, hsl(187 85% 96%) 0%, hsl(199 32% 91%) 50%, hsl(175 83% 95%) 100%)",
      accent: "linear-gradient(135deg, hsl(175 83% 39%) 0%, hsl(160 100% 70%) 50%, hsl(199 89% 48%) 100%)",
      background: "linear-gradient(160deg, hsl(199 50% 3%) 0%, hsl(175 50% 5%) 100%)",
      surface: "linear-gradient(45deg, hsl(199 50% 5%) 0%, hsl(199 33% 18%) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      colored: "0 8px 25px -8px hsl(199 89% 48% / 0.3)",
      glow: "0 0 20px hsl(199 89% 48% / 0.15), 0 0 40px hsl(175 83% 39% / 0.1)",
    },
    blur: {
      sm: "blur(4px)",
      md: "blur(8px)",
      lg: "blur(16px)",
      xl: "blur(24px)",
    },
    effects: {
      glassMorphism: "backdrop-blur-md bg-cyan-500/10 border border-cyan-400/20",
      neuMorphism: "bg-gradient-to-br from-cyan-100 to-blue-200 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]",
      holographic: "bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 opacity-75",
    },
  },
};
