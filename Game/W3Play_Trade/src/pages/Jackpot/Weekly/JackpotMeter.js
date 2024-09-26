import React from 'react';
import './JackpotMeter.css';

// upper numbers part
const Images = ({ ownTrades, pools }) => (

    <div className="images">
        {pools?.sort((a, b) => b.pool - a.pool).map(pool => {
            let condition = (ownTrades >= pool?.threshold ? "completed" : "progressing");
            return (
                <div key={pool?.pool} className={`image ${condition} image-${pool?.pool}`}></div>
            )
        })}
    </div>

);

// bottom numbers part
const Bars = ({ ownTrades, pools }) => {

    if (!pools?.length) return;

    // find largest threshold that is closed to taken trades amt
    const passedStages = pools?.filter(obj => obj.threshold <= ownTrades),
        largestVal = Math.max(...passedStages?.map(obj => obj.threshold)),

        currentPool = passedStages?.find(obj => obj.threshold === largestVal),
        nextPool = pools?.find(pool => pool.pool == (currentPool?.pool - 1));

    // dynamic width if user is in the middle of the pool
    function currentWidth(currentPool, nextPool, ownTrades, num) {

        let currentThreshold = currentPool?.threshold,
            nextThreshold = nextPool?.threshold,

            totalThresholdNeeded = nextThreshold - currentThreshold,
            currentProgress = ownTrades - currentThreshold;

        if (currentPool?.pool == 1) return;
        else if (!nextPool?.pool) return '0%';
        else if (nextPool?.pool > num) return '0.1%';
        else if (nextPool?.pool == num) return `${(currentProgress * 100) / totalThresholdNeeded}%`;
        else return;
    }

    return (

        <div className="bars">
            {pools?.sort((a, b) => b.pool - a.pool).map(pool => {
                let condition = (ownTrades >= pool?.threshold ? "completed" : "progressing");
                return (
                    <div key={pool?.pool}
                        className={`bar ${condition} bar-${pool?.pool}`}>
                        <div className="fill" style={{ width: currentWidth(currentPool, nextPool, ownTrades, pool?.pool) }} />
                    </div>
                )
            })}
        </div>

    )
};

const JackpotMeter = ({ ownTrades, pools }) => {
    return (
        <div className="trades-meter">

            {/* <div className={`image${ (a ? 'completed' : (b ? 'progressing' : 'empty')) }`}></div> */}

            <Images pools={pools} ownTrades={ownTrades} />
            <Bars pools={pools} ownTrades={ownTrades} />
        </div>
    );

};

export default JackpotMeter;