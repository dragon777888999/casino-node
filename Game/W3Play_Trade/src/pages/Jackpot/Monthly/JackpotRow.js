import React, { useState, useRef, useEffect, useMemo } from 'react';
import AnimatedNumber from 'react-animated-number';
import APP from '../../../app';
import state from '../../../state';
import Symbol from '../../../comp/shape/playblock_symbol';
import numberFormat from '../../../utils/numberFormat';

// import './WeeklyJackpot.css';

const MAX_EXPANSION_ROWS_VISIBLE = 5;

const AnimatdPrize = React.memo(({ prize = 0 }) => {

    const [amt, setAmt] = useState(0)

    useEffect(() => {
        if (amt == Number(prize)) return;

        let timeout = setTimeout(() => {
            setAmt(Number(prize))
        }, 1000);

        return () => clearTimeout(timeout)
    }, [prize])

    // memoize the AnimatedNumber component
    const animatedNumberComponent = useMemo(() => (
        prize && <AnimatedNumber
            component="text"
            value={amt || 0}
            duration={2000}
            formatValue={(value) => numberFormat.addCommas(value.toFixed(2))}
        />
    ), [amt]);

    return animatedNumberComponent;
});


const sliceWalletAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(-5, address.length - 1)}`
};

const isFullyVisible = (el) => {

    const rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const JackpotRow = ({ setActiveRowId, activeRowId, ownTrades, progressing, participantsCount, threshold, prize, poolNumber, participantsList }) => {

    const rowEl = useRef();
    const expEl = useRef();
    const expHeadEl = useRef();
    const expBodyEl = useRef();
    const completed = ownTrades >= threshold;
    const [expList, setExpList] = useState([]);
    // const [_prize, setPrize] = useState(0);
    // const [_participantsCount, setParticipantsCount] = useState(0);
    const network = state.active_network === 'testnet' ? state.mumbai_url : state.polygonscan_url;

    const getExpansionHeight = () => {

        const headHeight = expHeadEl.current.scrollHeight;
        const bodyFirst = expBodyEl.current.children[0];

        if (!bodyFirst || !bodyFirst.classList.contains('expansion-row'))
            return `${headHeight}px`;

        const childrenNumber = expBodyEl.current.children.length;
        const bodyFirstHeight = bodyFirst.scrollHeight;

        if (childrenNumber <= MAX_EXPANSION_ROWS_VISIBLE)
            return `${headHeight + (bodyFirstHeight * childrenNumber)}px`;

        return `${headHeight + (bodyFirstHeight * MAX_EXPANSION_ROWS_VISIBLE)}px`;

    };

    let rowTopClasses = 'row-top';
    if (completed) rowTopClasses += ' completed';
    if (progressing) rowTopClasses += ' progressing';

    const onToggleExpansion = () => {

        const hasActiveClass = rowEl.current.classList.contains('active-item');
        expEl.current.style.height = getExpansionHeight();
        setActiveRowId(hasActiveClass ? null : poolNumber);

    };

    const onExpandTransitionEnd = () => {

        if (!rowEl.current.classList.contains('active-item'))
            return expEl.current.style = null;

        else if (!isFullyVisible(rowEl.current))
            rowEl.current.scrollIntoView();
    };


    // get all participants list by stage
    async function getParticipants(urlList) {
        try {
            let res = await fetch(urlList)
            if (res.ok) {
                const list = await res.json();
                setExpList(list?.data || [])
            }
        }
        catch (e) {
            console.log(e, 'err getting participants list')
        }
    }

    //abbreviation for wallet address
    function cutWallet(wallet) {
        return wallet.substring(0, 10) + '...' + wallet.substring(wallet.length, wallet.length - 10)
    }

    // useEffect(() => {
    //     // no participants => no req is needed
    //     if (!participantsCount || !participantsList) return;
    //     getParticipants(participantsList)
    // }, [])

    return (

        <div ref={rowEl} className={`row-wrap${activeRowId === poolNumber ? ' active-item' : ''}`}>

            {/* ##### ROW TOP ##### */}
            <div className={rowTopClasses}>

                {completed && <div className="participating-message"><span>{APP.term('monthly_row_participating_msg')}</span></div>}

                <div className="condition">

                    <div className="content">
                        <div className="title"><span>{APP.term('weekly_row_condition')}</span></div>
                        <div className="amount"><span>+{threshold}</span></div>
                    </div>

                    <div className="weekly-trades">
                        <div className="blank"></div>
                        <div className="text"><span>{APP.term('monthly_row_condition')}<br />{APP.term('weekly_row_header_trades')}</span></div>
                    </div>

                </div>

                <div className="participate">
                    <span>{APP.term('weekly_row_particiate')}</span> <span className="amount">+{threshold}</span> <span>{APP.term('weekly_row_header_trades')}</span>
                </div>

                <div className="players">
                    <div className="title"><span>{APP.term('monthly_row_players')}</span></div>
                    <div className="amount">
                        <span>
                            {participantsCount}
                            {/* {participantsCount && (<AnimatedNumber component="text" value={Number(_participantsCount)}
                                style={{ transition: '.8s ease-out' }}
                                duration={3000}
                                formatValue={(value) => value.toFixed(0)}
                            />) || 0} */}
                        </span>
                    </div>
                </div>

                <div className="prize">
                    <div className="title"><span>{APP.term('monthly_row_prize')}</span></div>
                    <div className="amount">
                        <Symbol />
                        <span>
                            <AnimatdPrize prize={prize} />
                        </span>
                    </div>
                </div>

                {/* <div className="arrow" onClick={onToggleExpansion}></div> */}

            </div>

            {/* ##### EXPANSION ##### */}
            <div className="expansion" ref={expEl} onTransitionEnd={onExpandTransitionEnd}>

                {/* ##### EXPANSION HEADER ##### */}
                <div className="expansion-header" ref={expHeadEl}>
                    <div className="number"><span>#</span></div>
                    <div className="player"><span>{APP.term('monthly_row_player')}</span></div>
                    <div className="wallet"><span>{APP.term('monthly_row_wallet')}</span></div>
                    <div className="cards"><span>{APP.term('monthly_row_participation_cards')}</span></div>
                </div>

                {/* ##### EXPANSION ROWS ##### */}
                <div className="expansion-body" ref={expBodyEl}>

                    {expList.map((player, i) => (
                        <div key={i} className="expansion-row">
                            <div className="number"><span>{i + 1}</span></div>
                            <div className="player"><img src={player?.avatarUrl} /></div>
                            <div className="wallet">
                                <a href={network + player?.wallet} target="_blank">
                                    <span>{cutWallet(player?.wallet)}</span>
                                </a>
                            </div>
                            <div className="cards"><span>{player?.tickets}</span></div>
                        </div>
                    ))}

                </div>

            </div>

        </div>

    );

};

export default React.memo(JackpotRow, ({ prevPrize, prize }) => prevPrize == prize);