import { decodePrice, decodeString } from '.'

export const RoundEnded = ({ transactionHash, returnValues: { poolId, timestamp, startPrice, endPrice, indexedPoolId } }) => ({
  timestamp: Number(timestamp),
  poolId: decodeString(poolId),
  endPrice: decodePrice(endPrice),
  startPrice: decodePrice(startPrice),
  indexedPoolId,
  transactionHash
})

export const RoundDistributed = ({ transactionHash, returnValues: { poolId, totalWinners, from, to, timestamp } }) => ({
  poolId: decodeString(poolId),
  totalWinners,
  from,
  to,
  timestamp: Number(timestamp),
  transactionHash
})

export const TradePlaced = ({ transactionHash, returnValues: { poolId, sender, amount, prediction, newTotal, indexedPoolId, avatarUrl, countryCode, roundStartTime } }) => ({
  poolId: decodeString(poolId),
  sender,
  transactionHash,
  amount: Number(amount),
  prediction,
  newTotal: Number(newTotal),
  indexedPoolId,
  avatarUrl,
  countryCode,
  roundStartTime
})

export const RoundStarted = ({ returnValues: { poolId, timestamp, price, indexedPoolId } }) => ({
  poolId: decodeString(poolId),
  timestamp: Number(timestamp),
  price: decodePrice(price),
  indexedPoolId
})

export const GameStopped = ({ returnValues: { reason } }) => ({
  reason: decodeString(reason)
})

export const GameStarted = ({ returnValues }) => returnValues

export const TradeWinningsSent = ({ returnValues: { poolId, sender, betAmount, winningsAmount } }) => ({
  poolId: decodeString(poolId),
  sender,
  betAmount: Number(betAmount),
  winningsAmount: Number(winningsAmount)
})
