import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import APP from '../../../app';
import '../../../styles/pages/winratio.scss';
import poolSwitch from '../../../utils/poolSwitcher';

const openMenu = () => {
    APP.state.set('menu_open', true);
};

const Header = () => {

    const currentPoolDetails = useSelector((state: RootStateOrAny) => state.mainRememberReducer.currentPool);

    return (
        <div className="wr_header">

            <div className="header_links">
                <Link to={poolSwitch(currentPoolDetails)} className="back_btn"></Link>
                <Link to="/faq" className="faq" onClick={() => APP.state.set('special_tab', 'ratio')}>
                    <div className="img" />
                    <span className="txt">{APP.term('wr_header_faq')}</span>
                </Link>
                {/* <Link to="/winratio_history" className="history">
                <div className="img" />
                <span className="txt">{APP.term('wr_header_history')}</span>
            </Link> */}
            </div>

            <div className="title">
                <span>{APP.term('wr_header_top_winratio')}</span>
            </div>

            <div className="menu_box">
                {/* <Link to='/high_rollers'>
                    <div className="win_ratio_btn">
                        <span>{APP.term('wr_header_highrollers')}</span>
                    </div>
                </Link> */}
                <button className="menu_btn" onClick={openMenu}>
                    <img src="/media/images/menu.svg" />
                </button>
            </div>

        </div>
    );
}

export default Header;