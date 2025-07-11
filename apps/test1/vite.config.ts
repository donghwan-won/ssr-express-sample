import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remoteApp", // window.remoteApp 으로 접근됨
      filename: "remoteEntry.js", // 외부에서 import할 진입 파일
      exposes: {
        "./Button": "./src/Button.tsx", // 외부에 노출할 컴포넌트
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3001,
    cors: true,
    fs: { strict: false },
    middlewareMode: false, // 기본값
    watch: {
      usePolling: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
