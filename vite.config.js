import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        aboutUs: resolve(__dirname, "src/pages/aboutUs/aboutUs.html"),
        card: resolve(__dirname, "src/pages/card/card.html"),
        register: resolve(__dirname, "src/pages/register/Registro.html"),
        chat: resolve(__dirname, "src/pages/chat/chat.html"),
      },
    },
  },
});
