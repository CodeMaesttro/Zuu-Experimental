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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          border: "hsl(var(--sidebar-border))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          ring: "hsl(var(--sidebar-ring))",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    ({ addBase }) => {
      addBase({
        "@layer base": {
          ":root": {
            "--primary": "142 70% 29%", // School green color
            "--secondary": "220 31% 91%",
            "--destructive": "0 84% 60%",
            "--destructive-foreground": "0 0% 98%",
            "--border": "214.3 31.8% 91.4%",
            "--input": "214.3 31.8% 91.4%",
            "--ring": "hsl(var(--primary))",
            "--background": "0 0% 100%",
            "--foreground": "222.2 47.4% 11.2%",
            "--muted": "210 40% 96.1%",
            "--muted-foreground": "215.4 16.3% 46.9%",
            "--accent": "210 40% 96.1%",
            "--accent-foreground": "222.2 47.4% 11.2%",
            "--popover": "0 0% 100%",
            "--popover-foreground": "222.2 47.4% 11.2%",
            "--card": "0 0% 100%",
            "--card-foreground": "222.2 47.4% 11.2%",
            "--radius": "0.5rem",
            "--sidebar-background": "222.2 84.4% 95.1%",
            "--sidebar-foreground": "222.2 47.4% 11.2%",
            "--sidebar-border": "214.3 31.8% 91.4%",
            "--sidebar-accent": "210 40% 96.1%",
            "--sidebar-accent-foreground": "222.2 47.4% 11.2%",
            "--sidebar-ring": "hsl(var(--primary))",
          },
          ".dark": {
            "--primary": "142 70% 29%", // School green color
            "--secondary": "217.2 32.6% 17.5%",
            "--destructive": "0 63% 31%",
            "--destructive-foreground": "0 0% 98%",
            "--border": "217.2 32.6% 17.5%",
            "--input": "217.2 32.6% 17.5%",
            "--ring": "hsl(var(--primary))",
            "--background": "224 71% 4%",
            "--foreground": "213 31% 91%",
            "--muted": "223 47% 11%",
            "--muted-foreground": "215.4 16.3% 56.9%",
            "--accent": "216 34% 17%",
            "--accent-foreground": "210 40% 98%",
            "--popover": "224 71% 4%",
            "--popover-foreground": "215 20.2% 65.1%",
            "--card": "224 71% 4%",
            "--card-foreground": "213 31% 91%",
            "--sidebar-background": "220 31% 11%",
            "--sidebar-foreground": "213 31% 91%",
            "--sidebar-border": "217.2 32.6% 17.5%",
            "--sidebar-accent": "216 34% 17%",
            "--sidebar-accent-foreground": "210 40% 98%",
            "--sidebar-ring": "hsl(var(--primary))",
          },
        },
      })
    },
  ],
} satisfies Config

export default config
