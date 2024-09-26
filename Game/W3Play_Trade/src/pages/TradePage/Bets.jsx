import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
// import { unstable_batchedUpdates } from 'react-dom';
import APP from '../../app';
import useAppState from '../../hooks/useAppState';
import GroupResultsDisplay from './GroupResultsDisplay';


// return bet circle color by direction
const colorByDir = (dir, wallet, wallet_address) => {
    let colors = ['#e21111', '#a1ff01', '#f4d56f'];
    if (wallet_address?.toLowerCase() === wallet?.toLowerCase()) return colors[2];
    else if (dir?.toLowerCase() === 'down') return colors[0];
    else if (dir?.toLowerCase() === 'up') return colors[1];
};

// return bet border color by direction
const _border = (wallet, wallet_address) => {
    if (wallet_address?.toLowerCase() === wallet?.toLowerCase()) return '.35em';
    else return '.1em';
};

const renderAvatarImg = (avatarUrl) => {
    return <img className="" style={{ height: '100%', width: '100%' }} src={avatarUrl} />;
};

const Player = ({ itm, dir, wallet_address }) => {

    const comp = useMemo(() => {

        let isOwn = (itm?.address.toLowerCase() === wallet_address?.toLowerCase());

        return (
            <div className={"trade_taken_bet_mobile_" + dir + (isOwn ? ' own' : '')}
                style={{
                    borderColor: colorByDir(itm['dir'], itm['address'], APP.state.get('wallet_address')),
                    borderWidth: _border(itm['address'], APP.state.get('wallet_address'))
                }}>
                {renderAvatarImg(itm['avatarUrl'])}
            </div>
        );
    }, [itm?.address]);

    return comp;
};

function newRoundVal(currentRoundPhaseFromGameController) {
    if (currentRoundPhaseFromGameController === "ExpirationPhase") return 'pending';
    else return 'open';
}

const Bets = ({ dir }) => {

    // const bets = useAppState('pool.' + dir);
    const bets = useAppState('pool.' + dir);
    // const bets_per_position = useAppState('pool.' + dir + '.positions');
    const bets_per_position = APP.state.get('pool.' + dir + '.positions');
    const wallet_address = useAppState('wallet_address');
    const asset = useAppState('asset');
    // const phase = useAppState('phase');

    const currentRoundPhaseFromGameController = useAppState('round_current_state');
    const end_round_pool_id = useAppState('end_round_pool_id');
    let phase = newRoundVal(currentRoundPhaseFromGameController);

    const otherDirection = (dir == 'down') ? 'up' : 'down';
    let totalOtherSide = useAppState('pool.' + otherDirection + '.total');

    let totalSide = bets?.total;

    // const phase_confirmed = useAppState('phase_confirmed');
    const players_count = Object.entries(bets_per_position)?.length || 0;


    // make new structure of bets values
    const updateBets = (bets) => {

        // Dummy data
        // let list = [
        // {
        //     "address": "0x3df592e22fc4ac05e4db676bcd0eee047c316ebf",
        //     "dir": "up",
        //     "avatarUrl": "https://ipfs.moralis.io:2053/ipfs/QmYccCpGTWFkNtL1qq3keE2AxfyywQswBwD6tSJ8FhxFKQ/avatars/0x3Df592e22Fc4AC05E4dB676Bcd0eEE047C316Ebf"
        // }
        // ];

        const list = Object.entries(bets).map((value) => ({
            address: value[0],
            dir: value[1]['dir'],
            address: value[1]['address'],
            avatarUrl: value[1]['avatarUrl']
        }));

        return list;
    };

    const renderGroupResultsDisplay = (dir, phase) => {
        // console.log(APP.state.get('did_round_end_once'), (end_round_pool_id === APP.state.get('switched_pool')))
        if (/*phase == 'open' && */APP.state.get('did_round_end_once') && (end_round_pool_id === APP.state.get('switched_pool'))) {
            return <GroupResultsDisplay dir={dir} isMobile={true} />;
        }
    };

    // make sure own trade is will seen at 1st position
    function ensureFirst(array, key, value) {

        // new arr without my own avatar
        const filteredArray = array.filter(innerArray => innerArray[key]?.toLowerCase() !== value),

            // find my own avatar inside the specific array its exist in
            targetArray = array.find(innerArray => innerArray[key]?.toLowerCase() === value);

        // add my avatar to the beginning of the filtered array, if it exists
        if (targetArray) {
            filteredArray.unshift(targetArray);
        }
        return filteredArray;
    }

    function sortingList(arr, wallet_add) {
        // let wallet_add = APP.state.get('wallet_address');
        if (!arr?.length) return [];

        const flatArray = arr.flat(Infinity),
            // exists = flatArray.includes(wallet_address?.toLowerCase());
            exists = flatArray.find(itm => itm.address === wallet_add?.toLowerCase())?.address
        if (exists) {
            APP.state.set('myTradePlaced' + dir, true);
        }

        let newArray = arr.sort((a, b) => {
            const aValue = a.address === wallet_add?.toLowerCase();
            const bValue = b.address === wallet_add?.toLowerCase();

            if (aValue && !bValue) {
                return -1;
            } else if (!aValue && bValue) {
                return 1;
            } else {
                return 0;
            }
        });

        let reversedArr = newArray.slice(1),
            array = arr.slice(0, 1).concat(reversedArr.slice(0).reverse()),

            keyToCheck = 'address',
            valueToEnsure = wallet_address?.toLowerCase();

        // in case of diff array format is recieved
        const myTradePlaced = array?.filter(innerArray => innerArray[keyToCheck]?.toLowerCase() === valueToEnsure);
        if (myTradePlaced.length) {
            APP.state.set('myTradePlaced' + dir, true);
        }
        if (exists || myTradePlaced.length) return ensureFirst(arr, keyToCheck, valueToEnsure);
        else return arr.reverse();
    }

    const updateResults = useCallback(() => {
        let currentPoolId = APP.state.get('currentPoolId');
        if (phase === 'pending' && !(APP.state.get('pools_result_mounted_' + dir))) {
            // console.log('SETTING NEW RESULTS MOBILE', totalSide, players_count, totalOtherSide)
            APP.state.set('round_result_' + dir + currentPoolId, { totalSide, players_count, totalOtherSide })
            APP.state.set('pools_result_mounted_' + dir + currentPoolId, true)
        }
    }, [phase, players_count])

    useEffect(() => {
        // if (end_round_pool_id !== APP.state.get('switched_pool')) return;
        updateResults();
    }, [phase, players_count])

    const [betsPositions, setBets] = useState(null);

    // useLayoutEffect(() => {
    //     let _data = sortingList(updateBets(bets?.positions), wallet_address).slice(0, 12);
    //     setBets(_data);

    // }, [Object.keys(bets_per_position)?.length, wallet_address, asset.remote_id])

    // function MyComponent({ items }) {

    // const renderedItems = () => (
    //     // useMemo(() => {
    //     sortingList(updateBets(bets?.positions), wallet_address).slice(0, 12)?.map((itm, index) => (
    //         <Player key={String(itm?.address)}
    //             dir={dir}
    //             itm={itm}
    //             wallet_address={wallet_address} />
    //         // ));
    //     ));
    // , [betsPositions]);

    const renderedItems =
        sortingList(updateBets(bets_per_position), wallet_address)
            .slice(0, 12)
            .map((itm, index) => (
                <Player
                    key={String(itm?.address)}
                    dir={dir}
                    itm={itm}
                    wallet_address={wallet_address}
                />
            ));

    return (
        <>
            {renderGroupResultsDisplay(dir, phase)}
            <div className="trade_bets_mobile">
                {/* {updateBets(bets?.positions) */}
                {Object.keys(bets_per_position)?.length ?
                    renderedItems
                    : null
                }
            </div>
        </>
    );
};

export default React.memo(Bets, ({ prev }, { next }) => prev == next);