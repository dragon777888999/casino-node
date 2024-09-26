import React from 'react';
import APP from './../app';
import PageHeader from './../comp/page_header';
import useAppState from '../hooks/useAppState';
import '../styles/newTopup.scss';;
import CryptoWeb from './topup/cryptoTopup/CryptoWeb';
import CryptoMobile from './topup/cryptoTopup/CryptoMobile';

const styles = `
  body .golden-title span {
    position: relative;
    tranform: translateX(50%),
    margin-top: .1em;
    font-size: 2.4em;
  }
  .default-web-view{
    margin-top: .3em;
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

const CryptoTopup = () => {

  const wallet_address = useAppState('wallet_address');

  return (
    <div className="page topup_page table_page">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <PageHeader title={APP.term('crypto_topup_title')} text_scale={.6} goldTxtstyles={{ position: '' }}  />

      {/* web version */}
      {wallet_address && (<CryptoWeb />)}

      {/* mobile version */}
      {wallet_address && (<CryptoMobile />)}

    </div>
  );
};

export default React.memo(CryptoTopup, ({ prev, next }) => prev === next);