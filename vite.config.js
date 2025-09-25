import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        aboutUs: resolve(__dirname, "src/pages/aboutUs/aboutUs.html"),
        card: resolve(__dirname, "src/pages/card/card.html"),
      },
    },
  },
});
