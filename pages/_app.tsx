import type { AppProps } from "next/app";
import { ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  trustWallet,
  zerionWallet,
  rainbowWallet,
  phantomWallet, } from "@thirdweb-dev/react";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from "./theme";
import "../styles/globals.css";
import Head from "next/head";

// This is the chain your dApp will work on.
const activeChain = "base";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
          <title>
          OnChain Based Hunks - NFT Verifier
          </title>
          <meta
            name="description"
            content="2222 OnChain Hunks discover Base in the distant lands that unknowingly gives a source of power to get BASED ."
          />
          <meta
            property="og:title"
            content="OnChain Based Hunks - NFT Verifier"
          />
          <meta
            property="og:description"
            content="2222 OnChain Hunks discover Base in the distant lands that unknowingly gives a source of power to get BASED "
          />
          <meta property="og:image" content="/android-chrome-512x512.png" />
          <meta property="og:url" content="https://verify.onchainbasedhunks.xyz" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="OnChain Based Hunks - NFT Verifier"
          />
          <meta
            name="twitter:description"
            content="2222 OnChain Hunks discover Base in the distant lands that unknowingly gives a source of power to get BASED "
          />
          <meta name="twitter:image" content="/android-chrome-512x512.png" />
          <meta name="twitter:url" content="https://verify.onchainbasedhunks.xyz" />
        </Head>
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      authConfig={{
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN!,
        authUrl: "/api/thirdweb-auth",
      }}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        safeWallet({
          personalWallets: [
            metamaskWallet({ recommended: true }),
            coinbaseWallet({ recommended: true }),
            walletConnect(),
            trustWallet(),
            zerionWallet(),
            rainbowWallet(),
            phantomWallet(),
          ],
        }),
        trustWallet(),
        zerionWallet(),
        rainbowWallet(),
        phantomWallet(),
      ]}
    >
      <SessionProvider session={pageProps.session}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </SessionProvider>
    </ThirdwebProvider>
    </ChakraProvider>
  );
}

export default MyApp;
