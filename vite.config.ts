import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { fileURLToPath, URL } from "url";
import { visualizer } from 'rollup-plugin-visualizer'
import fs from 'fs'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log(`Running in ${mode} mode`);

  return {
    base: mode === 'production' ? "/gyreley-demo" : "",
    build: {
      rollupOptions: {
        plugins: [],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            map: ['@vis.gl/react-google-maps'],
            'react-native': ['react-native'],
            'headlessui': ['@headlessui/react'],
            'tanstack-router': ['@tanstack/react-router'],
            'zod': ['zod'],
            'date-fns': ['date-fns']
          }
        }
      },
      emptyOutDir: true,
      outDir: "dist"
    },
    plugins: [
      {
        name: 'add-nojekyll',
        writeBundle() {
          fs.writeFileSync(path.resolve(__dirname, 'dist/.nojekyll'), '')
        }
      },
      visualizer({ open: true }),
      TanStackRouterVite(),
      react(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",

        pwaAssets: {
          disabled: false,
          config: true,
        },

        manifest: {
          name: "Gyreley",
          short_name: "Gyreley",
          description: "Gyreley customer support chat and help service",
          theme_color: "#ffffff",
          display: "standalone",
        },

        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          navigateFallback: "index.html",
          navigateFallbackDenylist: [/^\/completesignup/],
        },

        devOptions: {
          enabled: mode === "development",
          navigateFallback: "index.html",
          suppressWarnings: false,
          type: "module",
        },
      }),
    ],
    resolve: {
      extensions: [
        ".web.tsx",
        ".tsx",
        ".web.ts",
        ".ts",
        ".web.jsx",
        ".jsx",
        ".web.js",
        ".js",
        ".css",
        ".json",
        ".mjs",
      ],
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
        {
          find: "@assets",
          replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
        },
        {
          find: "@components",
          replacement: fileURLToPath(
            new URL("./src/components", import.meta.url),
          ),
        },
        {
          find: "@hook",
          replacement: fileURLToPath(new URL("./src/hooks", import.meta.url)),
        },
        {
          find: "@types",
          replacement: fileURLToPath(new URL("./src/types", import.meta.url)),
        },
        {
          find: "react-native",
          replacement: "react-native-web",
        },
      ],
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: { ".js": "jsx" },
      },
    },
  };
});
