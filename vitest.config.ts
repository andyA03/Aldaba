import { defineConfig } from "vitest/config";
import path from "path";


export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./client/src/test/setup.ts"],
    include: ["client/src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "client/src/app"),
      "@admin": path.resolve(__dirname, "client/src/admin"),
      "@landing": path.resolve(__dirname, "client/src/landing"),
      "@shared": path.resolve(__dirname, "client/src/shared"),
      "@entities": path.resolve(__dirname, "client/src/entities"),
    },
  },
});
