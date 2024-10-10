
const { request, gql } = require('graphql-request');

// Uniswap Subgraph API URL
const uniswapSubgraphUrl = 'https://gateway.thegraph.com/api/ce6f21fa2ce8a38ff96839a305fd5b2e/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV';
const sushiswapSubgraphUrl = 'https://gateway.thegraph.com/api/ce6f21fa2ce8a38ff96839a305fd5b2e/subgraphs/id/65dpkvf32QMG8TZ3XL3jnN2ftBmUNNzB2n2q8TMneevS';

const query = `{
  factories(first: 5) {
    id
    poolCount
    txCount
    totalVolumeUSD
  }
  bundles(first: 5) {
    id
    ethPriceUSD
  }
  tokens {
    id
    name
  }
}`;

const fetchTrades = async (walletAddress) => {
  try {
    const data = await request(uniswapSubgraphUrl, query);
    console.log(data);
  } catch (error) {
    console.error('Error fetching trades:', error);
  }
};

const querys = `{
  swapPools(first: 5) {
    id
    lpToken {
      id
      symbol
    }
    totalTVL
    userPoolMetrics {
      id
    }
  }
  users(first: 5) {
    id
    poolMetrics {
      id
    }
    transfers {
      id
    }
  }
}`;

const fetchFromSushiSwap = async (walletAddress) => {
  try {
    const data = await request(sushiswapSubgraphUrl, querys, { wallet: walletAddress });  
    console.log(data.swapPools)
  } catch (error) {
    console.error('Error fetching SushiSwap trades:', error);
  }
};

const trackWallet = async (walletAddress) => {
  await fetchTrades(walletAddress);  // Uniswap
  await fetchFromSushiSwap(walletAddress);  // SushiSwap
};

trackWallet('0x5f7f643a410dcd0468d3ade08d91de3860152223');
