import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import APP from '../../app';
import useIsDemoModeActive from '../../utils/demo/useIsDemoModeActive';
import { set_alert_msg, set_demo_mode } from '../../REDUX/actions/main.actions';
import switch_pool_handler from '../../utils/pools/switchPool';

const DemoHeader = ({ pathName }) => {

  const isDemoModeActive = useIsDemoModeActive();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultNav = '/trade'
  // const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
  const initial_query_params = useSelector(state => state.mainRememberReducer.initial_query_params);
  // console.log('3-pathName:', pathName); // Debug

  const handleSwitchRealMode = async (e) => {

    e.stopPropagation();
    let navRoute = (pathName || defaultNav) + (initial_query_params?.initialParams ? `?${initial_query_params.initialParams}` : '');
    let activeTable = APP.state.get('tables').find(itm => itm.selected);

    APP.state.set('currentToken', 'real');
    switch_pool_handler(dispatch, navigate, activeTable, activeTable.color, navRoute);

    dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_real_mode_switch' }))
    dispatch(set_demo_mode({ active: false }))

    setTimeout(() => {
      APP.customer.update_balance();
    }, 50);
  };

  // console.log('DemoLogs-DemoHeader:', isDemoModeActive, APP.state.get('tables').find(pool => pool.selected)); // Debug

  if (!isDemoModeActive) {
    return null;
  }

  return (
    <div className="trade_page_header">
      <p>
        {APP.term('trade_demo_desc1')}{' '}
        <span onClick={handleSwitchRealMode}>{APP.term('trade_demo_desc2')}</span>
      </p>
    </div>
  );
};

export default React.memo(DemoHeader);