import { createPublicClient, getContract, http } from "viem";
import abi from '../abi/abi.json'
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

export function getBitgrowContract() {
  const walletClient = createWalletClient({
    chain: mainnet,
    transport: custom((window as any).ethereum)
  })
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
  })
  const contract = getContract({
    address: '0x2273eC6fC3Cd6a9e23949a214aCD1c36eBcbb2d1',
    abi,
    publicClient,
    walletClient
  });
  return contract;
}
