import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Purchase_Tracker2/", // IMPORTANT!
  plugins: [react()],
});
