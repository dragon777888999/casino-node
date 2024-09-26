import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Pagination } from '@mui/material';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import APP from '../app';
import Web3 from 'web3';
import PageHeader from './../comp/page_header';
import TradeHistoryTableHeader from './TradeHistory/TradeHistoryTableHeader';
import PositionRow from './TradeHistory/PositionRow';
import { column_desc, column_asc } from './../utils/array'
import historyAPI from '../API/history';
import useAppState from '../hooks/useAppState';
import state from '../state';
import { useDispatch, useSelector } from 'react-redux';
import { set_alert_msg } from '../REDUX/actions/main.actions';
import ga4Event from '../utils/ga4.event';
import ConnectWalletModal from './TradePage/ConnectWalletModal';
import { WalletContext } from '../utils/game';
import DemoHeader from '../comp/demo/DemoHeader';
import useIsDemoModeActive from '../utils/demo/useIsDemoModeActive';
import HelmetManager from '../comp/HelmetManager';

const styles = `
  body .golden-title span {
    position: relative;
    transform: translateX(50%);
    margin-top: .1em;
    font-size: 2.4em;
  }
`;

const column_sorters = { asc: column_asc, desc: column_desc };

const PositionsList = ({ sorting: [column, order], positions, wallet_address, loader, totalRows }) => {

	positions?.sort(column_sorters[order](column));

	const blckch_evt = state.active_network === 'testnet' ? state.testnet_smctr_evts : state.mainnet_smctr_evts;

	return (
		<div className="trade_history_list">
			{
				loader && wallet_address && totalRows ?
					<div className="history_loader_wrap">
						<img src="/media/images/loaders/loader.gif" />
					</div>
					:
					positions.length ?
						positions?.map(pos =>
							<PositionRow key={pos.table_id}
								dir={pos.dir}
								id={pos.table_id}
								ivst={pos.investment}
								result={pos.result}
								date={pos.date}
								pool={pos.pool}
								hash={pos.transactionHash}
							/>)
						: wallet_address ?
							<div className='trade_history_page_alert_box'>
								<p className="trade_history_page_alert_msg">You haven't made any trades yet.</p>
								<p className="trade_history_page_alert_msg">Let's start trading!</p>
							</div>
							: null
			}
		</div >

	);

};

export default function TradeHistoryPage() {

	const [sorting, setSorting] = useState(['date', 'desc']);
	const [positions, setPositions] = useState([]);
	const [page, setPage] = useState(1);
	const [totalRows, setTotalRows] = useState(1);
	const [size, setSize] = useState(100);
	const [loader, setLoader] = useState(true);
	const dispatch = useDispatch();
	const wallet_address = useAppState('wallet_address')?.toLowerCase();
	const { wallet, authenticate } = useContext(WalletContext);
	const demoState = useSelector(state => state.mainRememberReducer.demo_mode);
	const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);
	const isDemoModeActive = useIsDemoModeActive();
	const mode = demoState?.active ? 'demo' : 'real';

	const getHistory = async (size, page, totalRows) => {

		let obj = {
			wallet: Web3.utils.toChecksumAddress(wallet_address),
			page: page,
			size: size,
			mode: mode
		},
			res = await historyAPI.getList(obj);

		if (!res?.data?.error) {
			let mappedArr = res?.data?.trades?.map(itm => {
				return ({
					table_id: itm.id,
					date: itm.time,
					pool: itm.pool,
					investment: itm.amount,
					dir: itm.prediction,
					transactionHash: itm.transactionHash,
					result: itm.result
				})
			});

			setPositions(mappedArr)
			if (res?.data?.totalPages !== totalRows) {
				// 	// console.log('totalROW IS: ',totalRows, 'res.data.totalPages is')
				setTotalRows(parseInt(res.data.totalPages))
			}
			// console.log(res.data, 'res.data')
		}
		setLoader(false);
	};

	const getNewHistory = useCallback(() => {
		getHistory(size, page, totalRows);
	}, [wallet_address, page, demoState?.active]);

	useLayoutEffect(() => {
		if (!wallet_address) return;
		getNewHistory(demoState?.active);

	}, [wallet_address, page, demoState?.active])

	useEffect(() => {
		ga4Event('trading history page', 'trading_history')
	}, [])

	//symbols for pagination btns
	const renderSymbol = (type) => {
		if (type?.type === 'page') return type?.page;
		else if (type?.type === 'next') return '>';
		else if (type?.type === 'end-ellipsis') return '...';
		else if (type?.type === 'previous') return '<';
	};

	// pagination boxes color sorting
	const pageTxtColor = (itm, selected) => {
		// mark arrow as gold
		if (itm === 'next' || itm === 'previous') return '#f4d56f';

		//selected page should be in black
		else {
			if (selected) return '#0c0d13';
			else return '#fff';
		}
	};

	// nav to choosen page num
	const navPage = (page) => {
		if (!page) return;
		setPage(page);
	};

	// refresh list and start from initial page - num 1
	const refreshPageList = (size, page) => {
		dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_refresh' }))
		setPage(1);
		getHistory(size, page, totalRows);
	};

	return (

		<div className={`page trade_history_page table_page${isDemoModeActive ? ' demo' : ''}`}>

			<HelmetManager
				title="Trade History"
				description="View Your Trade History: Track Trades, Analyze Performance, and Review Transactions."
				keywords="trade history,Bitcoin betting ,prop trading, Crypto slots ,Crypto gambling, Best crypto casino"
				canonical="/trade_history"
			/>

			<DemoHeader pathName="/trade_history" />

			<style dangerouslySetInnerHTML={{ __html: styles }} />

			<div className="history_refresh_blockchain_btn" onClick={() => refreshPageList(size, page)}>
				<p><span>{APP.term('refresh_btn_desc')}</span></p>
			</div>

			{connect_wallet_popup && (<ConnectWalletModal
				openModal={() => connect(dispatch)}
				wallet={wallet}
				authenticate={authenticate}
			/>)}

			<PageHeader title={APP.term('trade_history_title')} text_scale={.7} skipHistory={true} />
			<TradeHistoryTableHeader sorting={sorting} setSorting={setSorting} />
			<PositionsList positions={positions} sorting={sorting} wallet_address={wallet_address} loader={loader} totalRows={totalRows} />
			{positions?.length ?
				<div className="trade_history_pagination">
					<Pagination count={totalRows} page={page}
						hidePrevButton={page == 1 ? true : false}
						hideNextButton={page == totalRows ? true : false}
						renderItem={(item) => (
							<div className="trade_history_page_btn"
								style={{ backgroundColor: item?.selected ? '#f4d56f' : 'transparent', color: pageTxtColor(item?.type, item?.selected) }}
								onClick={() => navPage(item?.page)}>
								<span>{renderSymbol(item)}</span>
							</div>
						)} />
				</div> : null}

		</div>

	);

}
