import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from 'react-hot-toast';
import React from "react";

function getDesiredChainId() {
    return ChainId.Mumbai;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={getDesiredChainId()}>
      <Component {...pageProps} />
      <Toaster/>
    </ThirdwebProvider>
  );
}

export default MyApp
