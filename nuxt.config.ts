// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  typescript: {
    shim: false,
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
    "nuxt-web3.js",
    "nuxt-anchorscroll",
  ],
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
  runtimeConfig: {
    public: {
      provider: {
        host: `https://goerli.basescan.org`,
      },
    },
  },
});
