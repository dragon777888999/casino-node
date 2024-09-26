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
