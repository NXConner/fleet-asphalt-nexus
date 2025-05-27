
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
}

export interface ThemeConfig {
  name: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  blur: {
    sm: string;
    md: string;
    lg: string;
  };
}

export const themes: Record<string, ThemeConfig> = {
  asphalt: {
    name: "Asphalt Professional",
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
      },
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(210 100% 6%) 0%, hsl(220 91% 15%) 100%)",
      secondary: "linear-gradient(135deg, hsl(210 40% 96%) 0%, hsl(220 13% 91%) 100%)",
      accent: "linear-gradient(135deg, hsl(210 40% 94%) 0%, hsl(214 31% 91%) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
    blur: {
      sm: "blur(4px)",
      md: "blur(8px)",
      lg: "blur(16px)",
    },
  },
  midnight: {
    name: "Midnight Blue",
    colors: {
      light: {
        primary: "221 83% 53%",
        primaryForeground: "210 40% 98%",
        secondary: "214 32% 91%",
        secondaryForeground: "222.2 47.4% 11.2%",
        accent: "214 32% 91%",
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
      },
      dark: {
        primary: "221 83% 53%",
        primaryForeground: "210 40% 98%",
        secondary: "215 25% 27%",
        secondaryForeground: "210 40% 98%",
        accent: "215 25% 27%",
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
      },
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(226 71% 40%) 100%)",
      secondary: "linear-gradient(135deg, hsl(214 32% 91%) 0%, hsl(220 13% 91%) 100%)",
      accent: "linear-gradient(135deg, hsl(214 32% 91%) 0%, hsl(210 40% 96%) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
    blur: {
      sm: "blur(4px)",
      md: "blur(8px)",
      lg: "blur(16px)",
    },
  },
  emerald: {
    name: "Emerald Professional",
    colors: {
      light: {
        primary: "158 64% 52%",
        primaryForeground: "0 0% 100%",
        secondary: "158 64% 96%",
        secondaryForeground: "158 64% 11%",
        accent: "158 64% 94%",
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
      },
      dark: {
        primary: "158 64% 52%",
        primaryForeground: "0 0% 100%",
        secondary: "158 33% 18%",
        secondaryForeground: "158 64% 98%",
        accent: "158 33% 18%",
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
      },
    },
    gradients: {
      primary: "linear-gradient(135deg, hsl(158 64% 52%) 0%, hsl(160 81% 36%) 100%)",
      secondary: "linear-gradient(135deg, hsl(158 64% 96%) 0%, hsl(158 32% 91%) 100%)",
      accent: "linear-gradient(135deg, hsl(158 64% 94%) 0%, hsl(158 40% 96%) 100%)",
    },
    shadows: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
    blur: {
      sm: "blur(4px)",
      md: "blur(8px)",
      lg: "blur(16px)",
    },
  },
};
