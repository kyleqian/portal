import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-phantom";
import {
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-solflare";
import {
  SlopeWalletAdapter,
} from "@solana/wallet-adapter-slope";
import {
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-ledger';
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';

const SOLANA_NETWORK = (process.env.NEXT_PUBLIC_NETWORK ?? 'devnet') as WalletAdapterNetwork;
const SOLANA_RPC_HOST = process.env.NEXT_PUBLIC_RPC_HOST ?? 'https://explorer-api.devnet.solana.com';

function App({ Component, pageProps }: AppProps) {
  const endpoint = useMemo(() => SOLANA_RPC_HOST ?? clusterApiUrl(SOLANA_NETWORK), [SOLANA_NETWORK]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SlopeWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [SOLANA_NETWORK]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
