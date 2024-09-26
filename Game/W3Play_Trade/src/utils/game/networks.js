/**
 * Available networks
 * @readonly
 */
export const networks = {
  LOCAL: {
    chainId: '0x539',
    chainName: 'localhost 8545',
    blockExplorerUrls: ['http://localhost:8545/'],
    rpcUrls: [
      'http://localhost:8545/'
    ],
    nativeCurrency: {
      name: 'ETH',
      decimals: 18,
      symbol: 'ETH'
    }
  },
  TESTNET: {
    chainId: '0x14865d0f05',
    chainName: 'PlayBlock',
    blockExplorerUrls: [
      'https://arb-blueberry.gelatoscout.com'
    ],
    rpcUrls: [
      'https://rpc.arb-blueberry.gelato.digital'
    ],
    nativeCurrency: {
      name: 'Playnance USD',
      decimals: 2,
      symbol: 'PBG'
    }
  },
  MAINNET: {
    chainId: '0x725',
    chainName: 'Playnance',
    blockExplorerUrls: [
      'https://explorer.playblock.io'
    ],
    rpcUrls: [
      'https://lb.drpc.org/ogrpc?network=playnance&dkey=AmsA2632Wk99pZ1Ym7OZe_tSgCl8CsER75lQQktuFoNr'
    ],
    nativeCurrency: {
      name: 'Playnance USD',
      decimals: 18,
      symbol: 'PBG'
    }
  }
}
