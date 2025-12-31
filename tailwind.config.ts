import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          glow: "hsl(var(--secondary-glow))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          glow: "hsl(var(--accent-glow))",
        },
        rose: {
          DEFAULT: "hsl(var(--rose))",
          glow: "hsl(var(--rose-glow))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "letter-reveal": {
          from: { opacity: "0", transform: "translateY(20px) rotateX(-90deg)" },
          to: { opacity: "1", transform: "translateY(0) rotateX(0deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.3)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(2deg)" },
          "66%": { transform: "translateY(8px) rotate(-2deg)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
        },
        "cosmic-drift": {
          "0%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(15px) translateY(-15px)" },
          "50%": { transform: "translateX(0) translateY(-25px)" },
          "75%": { transform: "translateX(-15px) translateY(-15px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        "gentle-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.08)", opacity: "1" },
        },
        "border-glow": {
          "0%, 100%": { 
            borderColor: "hsl(45 100% 50% / 0.3)",
            boxShadow: "0 0 20px hsl(45 100% 50% / 0.1)"
          },
          "50%": { 
            borderColor: "hsl(45 100% 50% / 0.6)",
            boxShadow: "0 0 40px hsl(45 100% 50% / 0.3)"
          },
        },
        "rise": {
          from: { opacity: "0", transform: "translateY(100px) scale(0.9)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "firework-burst": {
          "0%": { transform: "scale(0)", opacity: "1" },
          "50%": { transform: "scale(1.5)", opacity: "0.8" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-scale": "fade-in-scale 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "letter-reveal": "letter-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "star-twinkle": "star-twinkle 2s ease-in-out infinite",
        "cosmic-drift": "cosmic-drift 20s ease-in-out infinite",
        "gentle-pulse": "gentle-pulse 4s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
        "rise": "rise 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "firework-burst": "firework-burst 1s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
