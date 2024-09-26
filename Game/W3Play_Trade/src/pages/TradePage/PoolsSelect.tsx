import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import '../../styles/poolsSelect.scss';
import { set_alert_msg, set_pools_popup } from '../../REDUX/actions/main.actions';
import _num from '../../utils/numberFormat';
import state from '../../state';
import { useNavigate } from 'react-router';
import APP from '../../app';
import Symbol from '../../comp/shape/playblock_symbol';
import useAppState from '../../hooks/useAppState';
import switch_pool_handler from '../../utils/pools/switchPool';

const PoolsSelect = () => {

    const dispatch = useDispatch(),
        [currentPoolName, setCurrentPoolName] = useState<string>(''),
        [currentIndex, setCurrentIndex] = useState<number>(0), // new state for managing the index
        skinId = useAppState('skin_idx'),
        isDemo = location.pathname.includes('demo'),
        cur_asset = APP.state.get('asset'),
        allTables = APP.state.get(isDemo ? 'demo_tables' : 'tables'); // Get all tables before filtering
    let tables = allTables.filter((itm: any) => itm.asset == cur_asset.remote_id);

    // If the filter fails (i.e., returns an empty array), use the default value allTables
    if (tables.length === 0 && allTables.length > 0) {
        console.warn('Filter failed, using default value allTables');
        tables = allTables;/* [allTables[0]]; */  // Wrap in an array to maintain consistency with filtered results
    }
    const symbol_colors = state.table_skin_colors.find(itm => itm.id == skinId).pools_btn_colors,
        currentPool = useSelector((state: RootStateOrAny) => state.mainRememberReducer.currentPool),
        navigate = useNavigate();

    const displayedPools = tables.slice(currentIndex, currentIndex + 5); // manage the displayed pools

    // switch to selected pool
    async function switchPool(switchedName: string, name: string, color: string, e: React.MouseEvent, itm: any) {

        // prevent launching same pool
        if (switchedName.toLowerCase() === name.toLowerCase()) {
            dispatch(set_pools_popup(false));
            dispatch(set_alert_msg({ type: 'info', content: 'alert_msg_pool_active' }));
            return;
        }

        e.stopPropagation();

        switch_pool_handler(dispatch, navigate, itm, color);
        APP.state.set('last_pathname', itm.route)
        dispatch(set_alert_msg({ type: 'success', content: APP.term('alert_msg_success_pool1') + ' ' + name.toUpperCase() + ' ' + APP.term('alert_msg_success_pool_sec') + ' ' + APP.term('alert_msg_success_pool2') }));
    }

    // clicking on bg => closing popup
    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if ((e.target as HTMLDivElement).className === 'pools_select_popup_wrap_background') {
            dispatch(set_pools_popup(false))
        }
    }

    // saving pool's name on another state, to prevent situations where users didn't select
    // any pool yet & doesn't have any saved pool object.
    // if wasn't selected any => default active table params are taken as initialization of pool's state
    useEffect(() => {
        let poolName = currentPool?.name;
        if (poolName) setCurrentPoolName(poolName)
        else setCurrentPoolName(state.active_table?.name)
    }, [currentPool?.name])

    useEffect(() => {

        return () => {
            if (APP.state.get('activate_sounds_popup') == 1) {
                APP.state.set('activate_sounds_popup', 2)
            }
        }
    }, [])

    // Arrow click handlers
    const handleRightClick = () => {
        if (currentIndex < tables.length - 5) { // Adjusted to account for 5 displayed pools
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleLeftClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="pools_select_popup_wrap_background" onClick={e => handleBackgroundClick(e)}>
            <p className="pools_select_title">{APP.term('pools_select_title')}</p>
            <div className="pools_select_popup">
                {/* WEB -START- */}
                {currentIndex > 0 && (
                    <div className="arrow left_arrow" onClick={handleLeftClick}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" fill="none" fillRule="evenodd" />
                        </svg>
                    </div>
                )}
                {displayedPools.map((itm: any, i: number) => (
                    <div key={itm.id} className={`pool_box _${itm.duration}`}>
                        <div className={`flare _${itm.duration}`} />

                        <div className="content">

                            {/* header */}
                            <div className="header">
                                <div className={`symbol ${symbol_colors[currentIndex + i]}`} />
                                <p className={`title ${symbol_colors[currentIndex + i]}`}>Bitcoin {itm.title}</p>
                            </div>

                            <div className="details">
                                <div className={`timer _${itm.duration}`} />

                                {/* ranges (min/max ivst) */}
                                <div className="ranges">
                                    <div className="min">
                                        <p className="head">{APP.term('pools_select_min_trade')}</p>
                                        <p className="val">
                                            <Symbol width='.9em' height='.9em' color='#fff' />
                                            {Math.min(...JSON.parse(itm.investments))}
                                        </p>
                                    </div>
                                    <div className="max">
                                        <p className="head">{APP.term('pools_select_max_trade')}</p>
                                        <p className="val">
                                            <Symbol width='.9em' height='.9em' color='#fff' />
                                            {Math.max(...JSON.parse(itm.investments))}
                                        </p>
                                    </div>
                                </div>

                                {/* play btn (switch to other pool*/}
                                <div className={`play_btn ${symbol_colors[currentIndex + i]}`}
                                    onClick={(e) => switchPool(currentPoolName, itm.name, symbol_colors[currentIndex + i], e, itm)}>
                                    <p>{APP.term('pools_select_play')}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
                {currentIndex < tables.length - 5 && ( // Adjusted to account for 5 displayed pools
                    <div className="arrow right_arrow" onClick={handleRightClick}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6" stroke="#fff" strokeWidth="2" fill="none" fillRule="evenodd" />
                        </svg>
                    </div>
                )}
                {/* WEB -END- */}

                {/* // MOBILE -START- */}
                {tables.map((itm: any, i: number) => (
                    <div key={itm.id + '_mobile'} className={`pool_box_mobile _${itm.duration}`}>
                        <div className={`flare _${itm.duration}`} />

                        <div className="content">

                            <div className="left">
                                {/* header */}
                                <div className="header">
                                    <div className={`symbol ${symbol_colors[i]}`} />
                                    <p className={`title ${symbol_colors[i]}`}><span>Bitcoin {itm.title}</span></p>
                                </div>

                                {/* ranges */}
                                <div className="ranges">
                                    <div className="min">
                                        <p className="head">{APP.term('pools_select_min_trade')}</p>
                                        <p className="val">
                                            <Symbol width='.9em' height='.9em' color='#fff' />
                                            {Math.min(...JSON.parse(itm.investments))}
                                        </p>
                                    </div>
                                    <div className="max">
                                        <p className="head">{APP.term('pools_select_max_trade')}</p>
                                        <p className="val">
                                            <Symbol width='.9em' height='.9em' color='#fff' />
                                            {Math.max(...JSON.parse(itm.investments))}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* timer duration*/}
                            <div className={`timer _${itm.duration}`} />

                            {/* play btn (switch to other pool*/}
                            <div className={`play_btn ${symbol_colors[i]}`}
                                onClick={(e) => switchPool(currentPoolName, itm.name, symbol_colors[i], e, itm)}>
                                <p>{APP.term('pools_select_play')}</p>
                            </div>

                        </div>
                    </div>
                ))}
                {/* // MOBILE -END- */}
            </div>
        </div>
    )
}

export default PoolsSelect;
