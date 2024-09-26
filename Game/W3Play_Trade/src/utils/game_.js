export const decodePrice = number => number / 10000

export const decodeString = buf => Buffer.from(buf.substring(2), 'hex').toString('utf8')

export const encodeString = string => '0x' + Buffer.from(string).toString('hex')

export const getPoolTimes = poolId => {
	const [openTime, closedTime] = poolId.split(':')
	return {
		open: Number(openTime),
		closed: Number(closedTime)
	}
}

export const getRoundDuration = poolId => {
	const { open, closed } = getPoolTimes(poolId)
	return open + closed
}

export const BLOCK_DURATION = 3

export const eventParsers = {
	RoundEnded: ({ transactionHash, returnValues: { poolId, timestamp, startPrice, endPrice, indexedPoolId } }) => ({
		timestamp: Number(timestamp),
		poolId: decodeString(poolId),
		endPrice: decodePrice(endPrice),
		startPrice: decodePrice(startPrice),
		indexedPoolId,
		transactionHash
	}),
	//event RoundDistributed(bytes poolId, uint totalWinners, uint from, uint to, int64 timestamp);

	RoundDistributed: ({ transactionHash, returnValues: { poolId, totalWinners, from, to, timestamp } }) => ({
		poolId: decodeString(poolId),
		totalWinners,
		from,
		to,
		timestamp,
		transactionHash
	}),

	TradePlaced: ({ transactionHash, returnValues: { poolId, sender, amount, prediction, newTotal, indexedPoolId, avatarUrl, countryCode, roundStartTime } }) => ({
		poolId: decodeString(poolId),
		sender,
		amount: Number(amount),
		prediction,
		newTotal: Number(newTotal),
		indexedPoolId,
		avatarUrl,
		countryCode,
		roundStartTime,
		transactionHash
	}),

	RoundStarted: ({ returnValues: { poolId, timestamp, price, indexedPoolId } }) => ({
		poolId: decodeString(poolId),
		timestamp: Number(timestamp),
		price: decodePrice(price),
		indexedPoolId
	}),

	GameStopped: ({ returnValues: { reason } }) => ({
		reason: decodeString(reason)
	}),

	GameStarted: ({ returnValues }) => returnValues,

	TradeWinningsSent: ({ returnValues: { poolId, sender, betAmount, winningsAmount } }) => ({
		poolId: decodeString(poolId),
		sender,
		betAmount: Number(betAmount),
		winningsAmount: Number(winningsAmount)
	})
}