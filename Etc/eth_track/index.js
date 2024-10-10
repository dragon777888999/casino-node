
const { request, gql } = require('graphql-request');

// Uniswap Subgraph API URL
const apiKey = '29af1363584d16eccd0e5226a7554d37';

const fetchTradesOnUniSwap2 = async (walletAddress) => {
  try {
    const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum`;
    const query = `{
  swaps(first: 10,where:{or: [
      { sender: "${walletAddress}" },
      { to: "${walletAddress}" }
  ]}, orderBy: timestamp, orderDirection: desc) {
    id
    pair {
      id
      token0 {
        id
        symbol
        name
        decimals
      }
      token1 {
        id
        symbol
        name
        decimals
      }
      token0Price
      token1Price
    }
    amount0In
    amount0Out
    amount1In
        amount1Out
    sender
    to
    logIndex
    amountUSD
    timestamp
    transaction {
      id
      blockNumber
    }
  }
}`;
    const data = await request(url, query);
    for (let index = 0; index < data.swaps.length; index++) {
      const swap = data.swaps[index];
      const transaction = swap.transaction;
      const pair = swap.pair;
      console.log("UniSwap2", transaction.blockNumber, `[${pair.token0.name}(${pair.token0.symbol})]`, -swap.amount0In, +swap.amount0Out, `[${pair.token1.name}(${pair.token1.symbol})]`, -swap.amount1In, +swap.amount1Out, `(${swap.amountUSD})`);
    }
  } catch (error) {
    console.error('Error fetching trades:', error);
  }
};
const fetchTradesOnUniSwap3 = async (walletAddress) => {
  try {
    const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
    const query = `{
  swaps(first: 10,where:{or: [
      { sender: "${walletAddress}" },
      { recipient: "${walletAddress}" }
    ]}, orderBy: timestamp, orderDirection: desc) {
    id
    transaction {
      id
      blockNumber
      gasUsed
      gasPrice
      
    }
     pool {
      id
      token0 {
        id
        symbol
        name
        decimals
      }
      token1 {
        id
        symbol
        name
        decimals
      }
      feeTier
      liquidity
      sqrtPrice
      tick
      token0Price
      token1Price
    }
    amount0
    amount1
    sender
    logIndex
    amountUSD
    timestamp
  }
}`;
    const data = await request(url, query);
    for (let index = 0; index < data.swaps.length; index++) {
      const swap = data.swaps[index];
      const transaction = swap.transaction;
      const pool = swap.pool;
      //console.log(pool);
      console.log("UniSwap3", transaction.blockNumber, `[${pool.token0.name}(${pool.token0.symbol})]`, -swap.amount0, `[${pool.token1.name}(${pool.token1.symbol})]`, -swap.amount1, `(${swap.amountUSD})`);
    }
  } catch (error) {
    console.error('Error fetching trades:', error);
  }
};

const trackWallet = async (walletAddress) => {

  await fetchTradesOnUniSwap2(walletAddress);  // Uniswap2
  await fetchTradesOnUniSwap3(walletAddress);  // Uniswap3
//  await fetchTradesOnUniSushi(walletAddress);  // Uniswap3

};

trackWallet('0x5f7f643a410dcd0468d3ade08d91de3860152223');
