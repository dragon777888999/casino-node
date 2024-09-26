import React, { useContext, useEffect } from 'react';
import APP from './../app';
import PageHeader from './../comp/page_header';
import useAppState from '../hooks/useAppState';
import '../styles/newTopup.scss';
import Mobile from './topup/Mobile';
import Web from './topup/Web.wallet';
import DemoHeader from '../comp/demo/DemoHeader';
import useIsDemoModeActive from '../utils/demo/useIsDemoModeActive';
import ConnectWalletModal from './TradePage/ConnectWalletModal';
import { WalletContext } from '../utils/game';
import { useDispatch, useSelector } from 'react-redux';
import state from '../state';
import useWebSocket from '../hooks/useWebSocket';
import HelmetManager from '../comp/HelmetManager';

const Topup = () => {

  const wallet_address = useAppState('wallet_address');
  const isDemoModeActive = useIsDemoModeActive();
  const dispatch = useDispatch();
  const { wallet, authenticate } = useContext(WalletContext);
  const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);
  const { disconnect, message } = useWebSocket(state.bridge_ws);

  useEffect(() => {

    return () => { disconnect() };

  }, [])

  useEffect(() => {
    if (!message) return;
    const parsedMsg = JSON.parse(message);

    if ((parsedMsg?.streamerMessage?.walletAddress === wallet_address) && parsedMsg?.streamerMessage?.status === 'funds_received_by_user') {
      setTimeout(() => {
        APP.customer.update_balance();
      }, 5000);
    }

  }, [message])

  const styles = `
  body .golden-title span {
    position: relative;
    tranform: translateX(50%),
    margin-top: .1em;
    font-size: 2.4em;
  }
  .default-web-view{
    margin-top: ${isDemoModeActive ? '.5em' : '.3em'};
  }
  @media screen and (max-width: 480px) {
    body .golden-title span {
      position: relative;
      tranform: translateX(50%);
      top: .5em;
      margin-top: .1em;
      font-size: 3.4em;
    }
  }
`;

  // bypass for routing
  // if trade - page nav
  // else if  - menu nav
  // default not enough matic and other option - do nothing
  const onNavBack = () => {
    if (APP.state.get('topup_x_trade')) {
      APP.state.unset('topup_x_trade');
    }
    else if (APP.state.get('topup_x_menu')) {
      setTimeout(() => {
        APP.state.unset('topup_x_menu');
        APP.state.set('menu_open', true);
      }, 50);
    }
  };

  return (
    <div className={`page topup_page ${isDemoModeActive ? ' demo' : ''}`}>
      <HelmetManager
        title="Top Up"
        description="Top Up Your Game Wallet: Buy USDP, DeFi exchange, Crypto & DeFi bridge, top up with crypto, P2P, sell USDP."
        keywords="Pay with crypto , swap crypto, Fund crypto wallet , DeFi exchange, crypto bridge, DeFi bridge, top up with crypto, P2P, sell crypto "
        canonical="/topup"
      />
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {connect_wallet_popup && (<ConnectWalletModal
        openModal={() => connect(dispatch)}
        wallet={wallet}
        authenticate={authenticate}
      />)}

      <DemoHeader pathName="/topup" />

      <PageHeader title={APP.term('topup_title')} text_scale={.6} goldTxtstyles={{ position: '' }} onNavBack={onNavBack} topup={true} />

      {/* web version */}
      {wallet_address && (<Web />)}

      {/* mobile version */}
      {wallet_address && (<Mobile />)}

    </div>

  );
};

export default React.memo(Topup, ({ prev, next }) => prev === next);