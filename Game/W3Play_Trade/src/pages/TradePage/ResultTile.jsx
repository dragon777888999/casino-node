
import React, { useEffect, useState } from 'react'
import { add_commas } from '../../utils/number';
import APP from '../../app'
import useAppState from '../../hooks/useAppState';
import { relation_cases } from '../../utils/logic'

function ArrowImg() {
    return (
        <svg viewBox="0 0 12 9" width="12" height="9" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m7.04 1.338 4.306 5.535A1.318 1.318 0 0 1 10.306 9H1.694a1.318 1.318 0 0 1-1.04-2.127L4.96 1.338a1.318 1.318 0 0 1 2.08 0z"
                fillRule="evenodd" />
        </svg>
    )
}

function ResultTile({ startPrice, endPrice, timestamp, transactionHash, ...props }) {
    const [fresh, setFresh] = useState(false),
        tail_digits = useAppState('asset.tail_digits'),
        default_game_network = useAppState('default_game_network'),
        dir = relation_cases(endPrice, startPrice, 'up', 'tie', 'down'),
        { downtime } = useAppState('active_table', {});
    
    if(tail_digits === 8) {
        startPrice = startPrice * 0.001;
        endPrice = endPrice * 0.001;
    }
    else if(tail_digits === 9) {
        startPrice = startPrice * 0.0001;
        endPrice = endPrice * 0.0001;
    }

    //config for polygon scan url
    function hashUrl(platform, hash) {
        let testnetUrl = 'https://arb-blueberry.gelatoscout.com/tx/',
            mainnetUrl = 'https://explorer.playblock.io/tx/';

        if (platform === 'TESTNET') return testnetUrl + hash;
        else return mainnetUrl + hash;
    }


    useEffect(() => {
        if (APP.API.server_now() - timestamp / 1000 < (downtime * 1000)) {
            setFresh(true);
            let timeout = setTimeout(() => setFresh(false), 2500)
            return () => clearTimeout(timeout)
        }
    }, []);

    return (
        <div className={"result_tile " + dir + (fresh ? ' fresh' : '')}>
            {dir == 'tie' ? <div className="tie_square" /> : <ArrowImg />}
            <div className="rates_tooltip">
                <a target="_blank" rel="noopener" href={hashUrl(default_game_network, transactionHash)}>
                    <div className="hash_title">
                        <p>{APP.term('click_hash')}</p>
                    </div>
                </a>
                <div className="row_title">{APP.term('entry_rate')}</div>
                <div className="row_value entry">{add_commas(startPrice, tail_digits)}</div>
                <div className="row_title">{APP.term('end_rate')}</div>
                <div className="row_value expiry">{add_commas(endPrice, tail_digits)}</div>
            </div>
        </div>
    )
}


export default ResultTile