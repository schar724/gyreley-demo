import forms from "@tailwindcss/forms";
import safeArea from "tailwindcss-safe-area";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],

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
        background: {
          DEFAULT: "var(--background)",
          hover: "var(--background-hover)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          muted: {
            DEFAULT: "var(--foreground-muted)",
            hover: "var(--foreground-muted-hover)",
          },
          hover: "var(--foreground-hover)",
        },

        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          80: "var(--primary80)",
          hover: "var(--primary-hover)",
          active: "var(--primary-active)",
        },

        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          hover: "var(--secondary-hover)",
        },

        tertiary: {
          DEFAULT: "var(--tertiary)",
          foreground: "var(--tertiary-foreground)",
        },

        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
          hover: "var(--destructive-hover)",
        },
      },
    },
  },

  plugins: [forms, safeArea],
};
