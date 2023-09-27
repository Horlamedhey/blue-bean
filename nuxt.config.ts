// https://nuxt.com/docs/api/configuration/nuxt-config
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
export default defineNuxtConfig({
  devtools: { enabled: false },
  typescript: {
    shim: false,
  },
  vite: {
    resolve: {
      alias: {
        process: "process/browser",
        util: "util",
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
        define: {
          global: "globalThis",
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
        supported: {
          bigint: true,
        },
      },
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@nuxtjs/google-fonts",
    "nuxt-svgo",
    "@nuxt/image",
    "nuxt-anchorscroll",
    "@nathanchase/nuxt-dayjs-module",
  ],
  dayjs: {
    plugins: ["duration"],
  },
  googleFonts: {
    families: {
      Poppins: {
        wght: [300, 400, 600, 700],
        ital: [600],
      },
      "Red Rose": {
        wght: [700],
      },
    },
    display: "swap",
  },
});
