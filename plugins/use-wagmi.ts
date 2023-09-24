import { UseWagmiPlugin, configureChains, createConfig } from "use-wagmi";
import { goerli, mainnet } from "use-wagmi/chains";

// import { CoinbaseWalletConnector } from "use-wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "use-wagmi/connectors/metaMask";

import { publicProvider } from "use-wagmi/providers/public";

export default defineNuxtPlugin((nuxtApp) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, goerli],
    [publicProvider()],
  );

  const config = createConfig({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({
        chains,
        options: {
          UNSTABLE_shimOnConnectSelectAccount: true,
        },
      }),
      //   new CoinbaseWalletConnector({
      //     chains,
      //     options: {
      //       appName: "use-wagmi",
      //     },
      //   }),
    ],
    publicClient,
    webSocketPublicClient,
  });

  nuxtApp.vueApp.use(UseWagmiPlugin, config);
});
