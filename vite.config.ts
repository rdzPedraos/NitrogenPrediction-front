import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
    plugins: [
        remix({
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        tsconfigPaths(),
    ],

    resolve: {
        alias: {
            "@": path.resolve(__dirname, "app"),
        },
    },

    ssr: {
        noExternal: ["react-d3-speedometer"], // Excluir librería de SSR
    },
});
