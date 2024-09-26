import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import APP from '../../app'
import AssetHistoryGraph from '../../comp/asset_graph_visx';
import { copyTextToClipboard } from '../../utils/clipboard';
import LastResults from './LastResults';
import PhaseTitle from './PhaseTitle';
import JackpotBalance from '../../comp/jackpot_balance';
import { set_pools_popup, set_asset_popup, set_alert_msg } from '../../REDUX/actions/main.actions';
import state from '../../state';
import AssetHistoryGraphCandles from '../../comp/asset_graph_visx_candle';
import useAppState from '../../hooks/useAppState';
import TestCandle from '../../comp/testCandle';
import ga4Event from '../../utils/ga4.event';
import Asset_turbo_graph_visx from '../../comp/asset_turbo_graph_visx';
import GraphPoolIndicator from './GraphPoolIndicator';
import PoolAssetSwitch from './PoolAssetSwitch';
import { isMobile } from 'react-device-detect';
import useIsDemoModeActive from '../../utils/demo/useIsDemoModeActive';
import filterUnique from '../../utils/assets/filterUnique';


const GraphCmp = ({ isCandles, linearType, marketHeight }) => {

    // candles graph
    if (isCandles)
        return (<AssetHistoryGraphCandles marketHeight={marketHeight} padding={{ right: .5, top: .46, bottom: .53 }} />)

    //regular graph
    else if (linearType && linearType === 'regular')
        return (<AssetHistoryGraph marketHeight={marketHeight} padding={{ right: .5, top: .46, bottom: .53 }} />)

    //turbo graph => less points
    else
        return (<Asset_turbo_graph_visx marketHeight={marketHeight} padding={{ right: .5, top: .46, bottom: .53 }} />)
};

function GraphArea({ marketHeight }) {

    const dispatch = useDispatch(),
        isDemo = useIsDemoModeActive(),
        graph_mode = useAppState('graph_mode'),
        asset = APP.state.get('asset'),
        pools_options = APP.state.get('tables'),
        currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool),
        { chosen_asset } = useSelector(state => state.mainReducer),
        valid_pools = pools_options.filter(itm => itm?.asset == asset?.remote_id).length > 1;

    console.log(pools_options, 'pool,_options..')

    const [isMobileActive, setIsMobileActive] = useState(isMobile);

    // switch to user graph
    async function change_graph(type, linearType) {

        APP.state.set('graph_mode', { type, linearType: linearType ? linearType : null })
        APP.controller.update_graph_type(type)

        if (type === 'candles') {
            ga4Event('user switched to candle bar', 'Candle_bar_click')
        }
    }

    // open pools selection popup
    function open_pools(valid_pools) {
        if (valid_pools) {
            dispatch(set_pools_popup(true));
        }
    }

    const handleClick = () => {
        if (!isDemo) {
            dispatch(set_asset_popup(true));
        }
        else {
            dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_demo_assets' }))
        }
    };

    useEffect(() => {
        setIsMobileActive(isMobile || /Mobi|Android/i.test(navigator.userAgent));
    }, [isMobile, /Mobi|Android/i.test(navigator.userAgent)]);


    return (

        <div className="graph_area">

            <div className="vs_motif">VS</div>

            <div className="graph_asset_mobile">
                <div className="graph_asset_mobile_content">
                    <div className="asset_wrap">
                        <img src='/media/images/graphBtc.png' />
                    </div>
                </div>
            </div>

            {/* graph 'switchers' */}
            <div className='graph_mode_box'>
                <div onClick={() => change_graph('linear', 'turbo')} className={graph_mode?.type !== 'candles' && (graph_mode?.linearType !== 'regular') ? 'active' : ''}>
                    {/* <img src='/media/images/line_graph.svg' className="linear" /> */}
                    <p className="turbo">Turbo</p>
                </div>
                <div onClick={() => change_graph('candles')} className={graph_mode?.type === 'candles' ? 'active' : ''}>
                    <div className="candle" />
                </div>
                <div onClick={() => change_graph('linear', 'regular')} className={(graph_mode?.linearType === 'regular') ? 'active' : ''}>
                    <div className="linear" />
                </div>
            </div>
            {/* {console.log('11- chosen_asset', chosen_asset.id)} */}
            {/* {console.log('11- currentPoolDetails', currentPoolDetails)} */}
            {/* <PoolAssetSwitch
                assetName={chosen_asset?.title || APP.state.get("asset")?.title}
                poolName={currentPoolDetails?.name}
                poolNumber={currentPoolDetails?.name.split('-')[0]}
                assetIconUrl={`/media/images/temp/asset_id-${chosen_asset?.id || APP.state.get("asset")?.id}.png`}
                validPools={valid_pools}
                openPools={() => open_pools(valid_pools)}
            /> */}
            {/* {console.log(filterUnique(APP.state.get('tables')), "filterUnique(APP.state.get('tables'))")} */}
            {(filterUnique(APP.state.get('tables')).length < 1) ?
                null
                : isMobileActive ?
                    <>
                        <div className={`pool_btn_wrap ${valid_pools ? 'clickable' : ''}`}>
                            <div className={"pools_btn " + '_' + currentPoolDetails?.name} onClick={handleClick}>
                                <div className={`pool_img ${APP.state.get('asset')?.id} _${currentPoolDetails?.name}`} />
                                <p className={`_${currentPoolDetails?.name}`}>
                                    {APP.state.get('asset')?.name} {currentPoolDetails?.name.split('-')[0]}
                                </p>

                                <div className={`triangle _${currentPoolDetails?.name}`} />

                            </div>
                        </div>
                    </>
                    :
                    <PoolAssetSwitch
                        assetName={chosen_asset?.title || APP.state.get("asset")?.title}
                        poolName={currentPoolDetails?.name}
                        poolNumber={currentPoolDetails?.name.split('-')[0]}
                        assetIconUrl={`/media/images/temp/asset_id-${chosen_asset?.id || APP.state.get("asset")?.id}.png`}
                        validPools={valid_pools}
                        openPools={() => open_pools(valid_pools)}
                    />
            }


            {chosen_asset && <div className="btn-choose-asset" onClick={() => dispatch(set_asset_popup(true))}>
                <img src={`/media/images/temp/asset_id-${chosen_asset.id}.png`} alt={chosen_asset.id} /><span>{chosen_asset.title}</span>
            </div>}

            <GraphCmp
                linearType={graph_mode?.linearType}
                marketHeight={marketHeight}
                isCandles={graph_mode?.type === 'candles'} />

            <JackpotBalance />
            <LastResults />
            <GraphPoolIndicator />

        </div>

    );

};

export default React.memo(GraphArea);