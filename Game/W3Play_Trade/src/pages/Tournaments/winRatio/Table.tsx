import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import tournamentsAPI from '../../../API/tournaments';
import APP from '../../../app';
import useAppState from '../../../hooks/useAppState';
import { set_loader, set_win_ratio_principal } from '../../../REDUX/actions/main.actions';
import '../../../styles/pages/winratio.scss';
import numberFormat from '../../../utils/numberFormat';
import BottomNavigator from './BottomNavigator';
import useIsDemoModeActive from '../../../utils/demo/useIsDemoModeActive';

interface ListObject {
    wallet: string;
    trades: number;
    rank: number;
    wins: number;
    ratio: number;
    avatar: string;
    country: string;
    prize: number;
}

interface ColumnSortProps {
    list: ListObject[];
    setList: React.Dispatch<React.SetStateAction<ListObject[]>>;
    className: string;
    txt: string;
}

const ColumnSort: React.FC<ColumnSortProps> = ({ list, setList, className, txt }) => {

    let [sortOrder, setSortOrder] = useState<string>('desc');

    // sort list by specific param
    function sortList(list: ListObject[], key: string) {

        let newList = [...list];

        newList.sort((a, b) => {
            if (sortOrder === 'asc') return a[key] - b[key];
            else return b[key] - a[key];
        });

        sortOrder = (sortOrder === 'desc') ? 'asc' : 'desc';
        setSortOrder(sortOrder);
        setList(newList);
    }

    return (
        <p className={className} onClick={() => sortList(list, className)}>{txt}</p>
    )
}

const Table: React.FC = () => {

    const [list, setList] = useState<ListObject[]>([]),
        dispatch = useDispatch(),
        walletAddress = useAppState('wallet_address');

    const isDemoModeActive = useIsDemoModeActive();
    const mode = isDemoModeActive ? 'demo' : 'real';

    // get list of players data
    async function getList(walletAddress: string, dispatch: React.Dispatch<any>, mode: string) {

        dispatch(set_loader(true))
        let res = await tournamentsAPI.getWinRatio(walletAddress, mode);

        if (!res.error) {
            // obj of objects => convert to arr of obj
            const arrayOfObj = Object.keys(res.data?.participants).map(key => ({
                id: key,
                ...res.data?.participants[key]
            }));

            setList(arrayOfObj)
            dispatch(set_win_ratio_principal({ ...res.data?.principal, end: res.data.endingIn, threshold: res.data?.threshold }))
        }
        dispatch(set_loader(false))
    }

    //abbreviation for wallet address
    function cutWallet(wallet: string) {
        if (!wallet) return;
        else return wallet.substring(0, 5) + '...' + wallet.substring(wallet.length, wallet.length - 4);
    }

    useEffect(() => {
        getList(walletAddress, dispatch, mode);
    }, [walletAddress, isDemoModeActive])

    return (
        <div className="wr_table">

            {/* header */}
            <div className="wr_table_header">

                <div className="top">
                    <div className="left">
                        <img src="/media/images/treasure.png" />
                        <p><span>{APP.term('wr_table_title')}</span></p>
                    </div>
                    <div className="right">
                        <img src='/media/images/tournaments/info_mobile.png' />
                        <p><span>{APP.term('wr_table_desc')}</span></p>
                    </div>
                </div>

                <div className="bottom">
                    <p className="id">#</p>
                    <p className="players">{APP.term('wr_table_player')}</p>
                    <ColumnSort setList={setList} className="trades" txt={APP.term('wr_table_trades')} list={list} />
                    <ColumnSort setList={setList} className="wins" txt={APP.term('wr_table_win')} list={list} />
                    <ColumnSort setList={setList} className="ratio" txt={APP.term('wr_table_winratio')} list={list} />
                    <ColumnSort setList={setList} className="prize" txt={APP.term('wr_table_prize_tickets')} list={list} />
                </div>

            </div>

            {/* list */}
            <div className="wr_table_content">
                {list?.map((itm, idx) => (
                    <div key={idx} className="user_row">
                        <div className="user_row_bg" style={{ width: 90 - (90 * itm?.rank) / 20 + '%' }} />
                        <div className="user_row_content">
                            <p className="id">
                                <span data-attr={itm?.rank <= 10 ? "true" : "false"}>{itm?.rank}</span>
                                <div>
                                    <img src={itm?.avatar} />
                                    <img src={'/media/images/flags/' + itm.country.toLowerCase() + '.svg'} />
                                </div>
                            </p>
                            <p className="players">
                                <div>
                                    <img src={itm?.avatar} />
                                    <img src={'/media/images/flags/' + itm?.country.toLowerCase() + '.svg'} />
                                </div>
                                <span>{cutWallet(itm.wallet)}</span>
                            </p>
                            <p className="trades">{numberFormat.addCommas(itm?.trades)}</p>
                            <p className="wins">{numberFormat.addCommas(itm?.wins)}</p>
                            <p className="ratio">{`${Number.isInteger(itm?.ratio) ? itm?.ratio.toFixed(2) : parseFloat(itm?.ratio.toFixed(2))}%`}</p>
                            <p className="prize">{itm?.prize}</p>
                        </div>
                    </div>
                ))}
            </div>

            <BottomNavigator />

        </div>
    )
};

export default Table;