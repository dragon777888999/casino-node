import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import '../../styles/assetSelect.scss';
import { set_alert_msg, set_asset_popup, set_loader, set_chosen_asset } from '../../REDUX/actions/main.actions';
import APP from '../../app';
import switch_pool_handler from '../../utils/pools/switchPool';
import { useNavigate } from 'react-router';
import state from '../../state';
import useAppState from '../../hooks/useAppState';
import StreamerSingleton from '../../API/StreamerSingleton';
import filterUnique from '../../utils/assets/filterUnique';


const AssetSelect = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { chosen_asset = {} } = useSelector((state: RootStateOrAny) => state.mainReducer);
    const skinId = useAppState('skin_idx');
    let currentPool = useSelector((state: RootStateOrAny) => state.mainRememberReducer?.currentPool);

    // add new asset cfg , then find its active pool
    const onClickAssetBox = async (e: any, item: any, skinId: number) => {
        // Close all existing WebSocket connections
        StreamerSingleton.closeAllInstances();

        APP.state.set('asset_switch', true);

        try {
            const t = e.target;
            const parent = (t.classList.contains('asset')) ? t : t.closest('.asset');
            const assetId = parent.getAttribute('data-asset-id');

            const isDemo = location.pathname?.includes('demo') || currentPool?.uid?.includes('demo');
            const current_tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');
            const symbol_colors = state.table_skin_colors.find(itm => itm.id == skinId).pools_btn_colors;
            if (assetId === chosen_asset.id) { return; }
            dispatch(set_loader(true));

            let pool: any;

            if (isDemo && item.id !== 'btc') {
                // When isDemo is true and item id is not 'btc', force the pool to be the one with name '60'
                pool = current_tables.find((itm: any) => itm.name === '60');
            } else {
                // Normal behavior: Find the pool based on item id, or default to the one with name '60' if not found
                pool = current_tables.find((itm: any) => itm.pool_id.includes(item.id));
                if (!pool) {
                    pool = current_tables.find((itm: any) => itm.name === '60');
                }
            }
            const updated_table = { ...item, ...pool };

            APP.controller.unsubscribeToRatesNchan();
            APP.controller.set_asset(item);
            setTimeout(() => {
                APP.state.set('asset', item);
                APP.controller.subscribeToRates();
            }, 200);

            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    switch_pool_handler(dispatch, navigate, updated_table, symbol_colors[item.color_idx]);
                    APP.state.set('last_pathname', updated_table.route);

                    resolve(true);
                }, 500);
            });
            const assetInfo = state.assets.find(item => item.id === assetId);
            if (assetInfo) {
                dispatch(set_chosen_asset({ id: assetInfo.id, title: assetInfo.title }));
            }
        }
        catch (err) {
            console.log(err.message, 'error selecting new asset');
        }
        finally {
            dispatch(set_asset_popup(false));
            dispatch(set_loader(false));
        }
    };



    const AssetBox = ({ id, title, isMarketClosed, cb }: any) => {
        const isChosen = chosen_asset && chosen_asset.id === id;
        return (
            <div data-asset-id={id} className={`asset asset_id-${id}${isChosen ? ' chosen' : ''}${isMarketClosed ? ' market-closed' : ''}`} onClick={cb}>
                <div className='image'><img alt={id} src={`/media/images/temp/asset_id-${id}.png`} loading="lazy" /></div>
                <div className='name'><span>{title}</span></div>
                <div className='market-closed-message'><span>Market close</span></div>
            </div>
        );
    };

    return (
        <>
            <div className="assets-popup-wrap" onClick={e => { dispatch(set_asset_popup(false)) }}></div>
            <div className='assets-popup'>
                <div className='assets-popup-title'>
                    <span>Choose </span><span>your asset pool</span>
                </div>
                <div className='assets-popup-content'>
                    {filterUnique(APP.state.get('tables')).length > 0 ? (
                        filterUnique(APP.state.get('tables')).map(item => (
                            <AssetBox {...item} key={item.id} cb={(e: any) => onClickAssetBox(e, item, skinId)} />
                        ))
                    ) : (
                        <div>No assets available</div>
                    )}
                </div>
                <div className='assets-popup-close' onClick={() => { dispatch(set_asset_popup(false)) }}></div>
            </div>
        </>
    );

};

export default AssetSelect;