import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import APP from '../../../app';
import useAppState from '../../../hooks/useAppState';
import { set_last_sap_tutorial_slide } from '../../../REDUX/actions/main.actions';

import slides from './slides';

import './Tutorial.css';

const Tutorial = () => {

    const [position, setPosition] = useState(1);
    const wallet_address = useAppState('wallet_address');
    const connected_wallet = useAppState('connected_wallet_successfully');
    const dispatch = useDispatch();
    const mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    const last_visited_slide = useSelector(state => state.mainRememberReducer?.last_sap_tutorial_slide);
    const navigate = useNavigate();
    const { SlideComponent, settings } = slides
        .find(item => item.settings.position === position);

    useEffect(() => {
        if (connected_wallet && (last_visited_slide?.last_slide == 4)) {
            setPosition(5)
            APP.state.unset('connected_wallet');

        }
    }, [connected_wallet])

    return (
        <SlideComponent
            settings={settings}
            next={() => {
                // already passed all tutorial go to 'generate links page'
                // if (wallet_address && (last_visited_slide?.last_slide === 8)) navigate('/sap_links');

                // already connected user prevent seeing connect wallet page
                // once form was submitted => skip to links page
                if (wallet_address && (position === 3)) {
                    if (last_visited_slide?.submitted_form) {
                        dispatch(set_last_sap_tutorial_slide({ last_slide: 8 }))
                        navigate('/sap_links')
                    }
                    else setPosition(6);
                }
                else setPosition(position + 1);
            }}
            back={() => {
                // once in 'successful connected' page => prevent going back to connect wallet page
                if (position === 5) setPosition(3)
                else setPosition(position - 1)
            }
            }
            // skipNext={() => setPosition(position + 2)}
            skipNext={() => navigate('/sap_links')}
        />
    );

};

export default Tutorial;