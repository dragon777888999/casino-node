import React, { useEffect } from 'react';
import APP from '../../../app';
import state from '../../../state';
import useJackpotState from '../../../state/useJackpotState';
import Symbol from '../../../comp/shape/playblock_symbol';
import './History.css';
import HelmetManager from '../../../comp/HelmetManager';

const MonthlyJackpotHistory = ({ isVisibe, toggleJackpotHistory }) => {

    const { getMonthlyHistoryList, monthlyHistory } = useJackpotState(),
        network = state.active_network === 'testnet' ? state.mumbai_url : state.polygonscan_url;

    useEffect(() => {
        getMonthlyHistoryList();
    }, [])
    //abbreviation for wallet address
    function cutWallet(wallet) {
        if (!wallet) return;
        return wallet.substring(0, 7) + '...' + wallet.substring(wallet.length, wallet.length - 6)
    }
    
    return (
        
        <div className={`jackpot-history${isVisibe ? '' : ' hidden'}`}>
            {
                isVisibe ? 
                <HelmetManager
                    title="Jackpot Monthly History"
                    description="Jackpot Monthly History: Explore All Past Monthly Jackpot Performances, Winners, Smart Contract Transfers, and Transactions."
                    keywords="jackpot monthly history, Jackpot winners, crypto winners,crypto payouts, UpvsDown"
                    canonical="/jackpot_monthly_history"
                />

               : null
            }
            <div className="close" onClick={toggleJackpotHistory}></div>

            <div className="title">
                <span>{APP.term('monthly_jackpot_history_title')}</span>
            </div>

            <div className="table">

                <div className="table-header">
                    <div className="date"><span>{APP.term('weekly_jackpot_history_date')}</span></div>
                    <div className="player"><span>{APP.term('weekly_jackpot_history_winner')}</span></div>
                    <div className="wallet"><span>{APP.term('weekly_jackpot_history_wallet')}</span></div>
                    {/* <div className="jackpot"><span>{APP.term('weekly_jackpot_history_jackpot')}</span></div> */}
                    <div className="rank">{APP.term('monthly_jackpot_history_place')}</div>
                    <div className="prize"><span>{APP.term('weekly_jackpot_history_prize')}</span></div>
                </div>


                <div className="table-body">
                    {monthlyHistory?.sort((a, b) => new Date(b.date) - new Date(a.date))?.map((itm, i) => (
                        <div key={i} className="history-row">
                            <div className="date"><span>{`${new Date(itm?.date)?.getDate()}.${new Date(itm?.date)?.getMonth() + 1}.${new Date(itm?.date)?.getFullYear()?.toString()?.slice(-2)}`}</span></div>
                            <div className="player"><div><img src={itm?.avatarUrl} /></div></div>
                            <div className="wallet">
                                <span>
                                    <a href={network + itm?.wallet} target='_blank'>
                                        {cutWallet(itm?.wallet)}
                                    </a>
                                </span>
                            </div>
                            <div className="jackpot"><span>{itm?.poolType}</span></div>
                            <div className="rank"><div><img className={`meter-image-completed-${itm?.poolNumber}`} src={`/media/images/jackpot/meter-image-completed-${itm?.poolNumber}.svg`} /></div></div>
                            <div className="prize"><Symbol /><span className="amount">{parseFloat(itm?.prize).toFixed(state.jackpot_weekly_history_digits)}</span></div>
                        </div>
                    ))}

                </div>
            </div>

        </div>

    );
};

export default MonthlyJackpotHistory;