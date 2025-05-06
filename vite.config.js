import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/awarder/", // Adjust this to your app's base path
  plugins: [react()],
  resolve: {
    alias: {
      crypto: "crypto-browserify",
    },
  },
  build: {
    outDir: "dist", // The directory where the build output will be placed
  },
  test: {
    setupFiles: "./src/setupTests.js", // Path to your setup file
    globals: true, // Use global variables for testing
    environment: "jsdom", // Use jsdom for testing environment
    // coverage: {
    //   reporter: ["text", "json", "html"], // Coverage reporters to use
    //   all: true, // Collect coverage for all files
    //   include: ["src/**/*.{js,jsx}"], // Include all JS and JSX files in src directory
    //   exclude: ["src/**/*.test.js", "src/**/*.test.jsx"], // Exclude test files from coverage
    // },
  },
});
