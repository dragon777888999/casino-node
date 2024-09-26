import React from 'react';
import { useNavigate } from 'react-router-dom';
import APP from '../../../app';
import '../../../styles/pages/winratio.scss';

const BottomNavigator = () => {

    const navigate = useNavigate();

    // set win ratio tab & nav to faq
    function goToFaq() {
        APP.state.set('special_tab', 'ratio')
        navigate('/faq')
    }

    return (
        <div className="wr_bottom_nav">
            <div className="left" onClick={() => goToFaq()}>
                <img src='/media/images/tournaments/faq.png' />
                <p>{APP.term('wr_nav_faq')}</p>
            </div>
            {/* <p className="center" onClick={() => navigate('/high_rollers')}>{APP.term('wr_nav_highrollers')}</p> */}
            <div className="right">
                <p style={{ position: 'absolute', top: '50%', zIndex: 2, color: '#fff', fontSize: '1.1em', fontWeight: '600' }}>Coming Soon</p>
                <img src='/media/images/tournaments/history.png' style={{ opacity: .4 }} />
                <p style={{ opacity: .4 }}>{APP.term('wr_nav_history')}</p>
            </div>
        </div>
    )
};

export default BottomNavigator;