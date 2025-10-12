import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        landing: resolve(__dirname, "src/pages/main/main.html"),
        aboutUs: resolve(__dirname, "src/pages/aboutUs/aboutus.html"),
        card: resolve(__dirname, "src/pages/card/card.html"),
        register: resolve(__dirname, "src/pages/register/Registro.html"),
        chat: resolve(__dirname, "src/pages/chat/chat.html"),
        profileEditable: resolve(__dirname, "src/pages/profile/profileEditable.html"),
      },
    },
  },
});
