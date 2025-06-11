import { defineConfig } from "vitest/config";
// @ts-ignore
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        coverage: {
            provider: 'istanbul',
            reporter: 'json'
        },
    }
});
