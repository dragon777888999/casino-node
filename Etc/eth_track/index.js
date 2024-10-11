
const { request, gql } = require('graphql-request');

// Uniswap Subgraph API URL
const apiKey = '29af1363584d16eccd0e5226a7554d37';
const first=10;

const fetchTradesOnUniSwap2 = async (walletAddress) => {
  try {
    const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum`;
    const query = `{
  swaps(first: ${first},where:{or: [
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
    let arr = [];
    for (let index = 0; index < data.swaps.length; index++) {
      const swap = data.swaps[index];
      const transaction = swap.transaction;
      const pair = swap.pair;
      //console.log("UniSwap2", transaction.blockNumber, `[${pair.token0.name}(${pair.token0.symbol})]`, -swap.amount0In, +swap.amount0Out, `[${pair.token1.name}(${pair.token1.symbol})]`, -swap.amount1In, +swap.amount1Out, `(${swap.amountUSD})`);
      arr.push(
        {
          //swap: "UniSwap2",
          //tradeMode: "buy",
          blockNumber: transaction.blockNumber,
          timestamp: swap.timestamp,
          token0Name: pair.token0.name,
          token0Symbol: pair.token0.symbol,
          token0Amount: swap.amount0In - swap.amount0Out,
          token1Name: pair.token1.name,
          token1Symbol: pair.token1.symbol,
          token1Amount: swap.amount1In - swap.amount1Out,
          amountUSD: swap.amountUSD
        });

    }
    return arr;
  } catch (error) {
    console.error('Error fetching trades:', error);
  }
};
const fetchTradesOnUniSwap3 = async (walletAddress) => {
  try {
    const url = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;
    const query = `{
  swaps(first: ${first},where:{or: [
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
    let arr = [];
    for (let index = 0; index < data.swaps.length; index++) {
      const swap = data.swaps[index];
      const transaction = swap.transaction;
      const pool = swap.pool;
      //console.log(pool);
      //console.log("UniSwap3", transaction.blockNumber, `[${pool.token0.name}(${pool.token0.symbol})]`, -swap.amount0, `[${pool.token1.name}(${pool.token1.symbol})]`, -swap.amount1, `(${swap.amountUSD})`);
      arr.push(
        {
          //swap: "UniSwap3",
          //tradeMode: "buy",
          blockNumber: transaction.blockNumber,
          timestamp: swap.timestamp,
          token0Name: pool.token0.name,
          token0Symbol: pool.token0.symbol,
          token0Amount: swap.amount0 + 0,
          token1Name: pool.token1.name,
          token1Symbol: pool.token1.symbol,
          token1Amount: swap.amount1 + 0,
          amountUSD: swap.amountUSD
        });
    }
    return arr;
  } catch (error) {
    console.error('Error fetching trades:', error);
  }
};

const trackWallet = async (walletAddress) => {

  let arr2 = await fetchTradesOnUniSwap2(walletAddress);  // Uniswap2
  let arr3 = await fetchTradesOnUniSwap3(walletAddress);  // Uniswap3
  //  await fetchTradesOnUniSushi(walletAddress);  // Uniswap3
  let total = arr2.concat(arr3);
  total.sort((a, b) => b.timestamp - a.timestamp);
  for (let i = 0; i < total.length; i++) {
    {
      let tradeMode = "buy";
      if (total[i].token0Symbol == "WETH" && total[i].token0Amount < 0)
        tradeMode = "sell";
      if (total[i].token1Symbol == "WETH" && total[i].token1Amount < 0)
        tradeMode = "sell";
      console.log(getTime(total[i].timestamp), tradeMode);
      console.log(total[i]);

    }
  }
};
const getTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}
trackWallet('0x5f7f643a410dcd0468d3ade08d91de3860152223');
