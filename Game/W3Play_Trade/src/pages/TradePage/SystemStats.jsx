import React, { useEffect, useState } from 'react';
import stats from '../../API/stats';
import state from '../../state';
import StatsMobile from './systemStats/Stats.mobile';
import Stats from './systemStats/Stats.web';

const SystemStats = () => {

    const [tradeStats, setStats] = useState(false);

    async function getData() {
        try {

            let res = await stats.getGeneralStats();
            if (res?.data?.requestId) {
                const { ratio24H, activePlayers24H, distributedAmount24H, distributedAmountAllTime } = res?.data;
                setStats({
                    ratio24H: Number(ratio24H),
                    activePlayers24H: Number(activePlayers24H),
                    distributedAmount24H: Number(distributedAmount24H),
                    distributedAmountAllTime: Number(distributedAmountAllTime)
                })
            }
        }
        catch (e) {
            console.log(e, 'err system stats')
        }
    }

    useEffect(() => {
        getData();
        let interval = setInterval(() => {
            getData();
        }, state.general_stats_interval);

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="system_stats_box">
            {tradeStats && (
                <>
                    <Stats ratio24H={tradeStats?.ratio24H}
                        activePlayers24H={tradeStats?.activePlayers24H}
                        distributedAmount24H={tradeStats?.distributedAmount24H}
                        distributedAmountAllTime={tradeStats?.distributedAmountAllTime} />

                    <StatsMobile ratio24H={tradeStats?.ratio24H}
                        activePlayers24H={tradeStats?.activePlayers24H}
                        distributedAmount24H={tradeStats?.distributedAmount24H}
                        distributedAmountAllTime={tradeStats?.distributedAmountAllTime} />
                </>
            )}
        </div>
    )
}

export default React.memo(SystemStats, ({ prev, next }) => prev === next);

