import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import {  scrollSepolia } from "wagmi/chains";
import { WagmiConfig } from "wagmi";
import Router from "./router";
import { Toaster } from 'react-hot-toast';
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const chains = [scrollSepolia];
  // 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })
const App: React.FC = () => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Router />
        <Toaster />
      </WagmiConfig>
    </>
  );
};

export default App;
