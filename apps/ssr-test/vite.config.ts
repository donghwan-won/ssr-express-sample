// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({}) => {
  const plugins = [react()];

  // SSR 빌드가 아닐 때만 Module Federation 플러그인 추가
  if (!process.env.VITE_SSR_BUILD) {
    plugins.push(
      federation({
        name: "hostApp",
        remotes: {
          remoteApp: "http://localhost:4173/assets/remoteEntry.js",
          remoteApp2: "http://localhost:4174/assets/remoteEntry.js",
        },
        shared: ["react", "react-dom"],
      })
    );
  }

  return {
    plugins,
    server: {
      port: 3000,
      middlewareMode: true,
    },
    appType: "custom",
    build: {
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    ssr: {
      // SSR에서 remote 모듈들을 외부화
      external: ["remoteApp/Button", "remoteApp2/Button"],
      target: "node",
    },
  };
});
