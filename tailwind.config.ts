import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Matsu theme specific colors
        matsu: {
          background: "#f5ecd7",
          foreground: "#594a3c",
          card: "#fffbf2",
          "card-foreground": "#594a3c",
          popover: "#fffbf2",
          "popover-foreground": "#594a3c",
          primary: "#8f785b",
          "primary-foreground": "#fffbf2",
          secondary: "#a98b67",
          "secondary-foreground": "#fffbf2",
          muted: "#e9dfc9",
          "muted-foreground": "#8b7a6a",
          accent: "#d3c7ad",
          "accent-foreground": "#594a3c",
          destructive: "#a14343",
          "destructive-foreground": "#fffbf2",
          border: "#e9dfc9",
          input: "#e9dfc9",
          ring: "#8f785b",
        },
        "matsu-dark": {
          background: "#1f1a15",
          foreground: "#e9dfc9",
          card: "#2a231c",
          "card-foreground": "#e9dfc9",
          popover: "#2a231c",
          "popover-foreground": "#e9dfc9",
          primary: "#8f785b",
          "primary-foreground": "#1f1a15",
          secondary: "#a98b67",
          "secondary-foreground": "#1f1a15",
          muted: "#3b3127",
          "muted-foreground": "#c1b7a7",
          accent: "#4d4236",
          "accent-foreground": "#e9dfc9",
          destructive: "#a14343",
          "destructive-foreground": "#e9dfc9",
          border: "#3b3127",
          input: "#3b3127",
          ring: "#8f785b",
        },
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        slideRight: {
          from: { transform: "translateX(-20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-right": "slideRight 0.5s ease-out",
      },
      backgroundImage: {
        "paper-texture": "url('/images/paper-texture.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
