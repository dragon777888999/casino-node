import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import APP from '../../app';
import { set_alert_msg } from '../../REDUX/actions/main.actions';
import '../../styles/pages/modals.css';

type AlertType = 'info' | 'success' | 'error' | 'tickets';

interface AlertMsgProps<T extends AlertType> {
    type: T;
    content: string;
    preventTimeout: boolean;
}

const AlertMsg: React.FC<AlertMsgProps<AlertType>> = ({ type, content, preventTimeout }) => {

    const dispatch = useDispatch();

    // // colors for msg box 
    // function msgBg(type: string) {
    //     switch (type) {
    //         case 'info':
    //             return '#027dd5';

    //         case 'success':
    //             return '#5f902d';

    //         case 'error':
    //             return 'ab1a15';

    //         default:
    //             return '#ab1a15';
    //     }
    // }

    useEffect(() => {
        if (preventTimeout) return;
        let timeout = setTimeout(() => {
            dispatch(set_alert_msg({ type: '', content: '' }))
        }, 5000);

        return () => {
            APP.state.unset('bet_error_msg')
            clearTimeout(timeout)
        }
    }, [preventTimeout, dispatch]);

    const closeAlert = () => {
        dispatch(set_alert_msg({ type: '', content: '' }));
    };

    return (
        <div className="alert_msgs_wrap" onClick={closeAlert}>
            {type === 'tickets' ?

                // Tickets gold msgs
                (<div className="alert_msgs_content ticket_bg">
                    <img src="/media/images/treasure.png" className="alert_msgs_tickets_img" />
                    <p className="alert_msgs_desc tickets_desc">{APP.term('alert_msg_tickets_desc1')} {content} {APP.term('alert_msg_tickets_desc2')}</p>
                    <img src={`/media/images/alerts/${type}.png`} className="alert_msgs_icon" alt={type} />
                </div>)
                :

                // Other default success/error/info msgs
                (<div className="alert_msgs_content"
                    //  style={{ backgroundColor: msgBg(type) }} 
                    data-alert-type={type}>
                    <p className="alert_msgs_desc">{APP.term(content)}</p>
                    <img src={`/media/images/alerts/${type}.png`} className="alert_msgs_icon" alt={type} />
                </div>
                )}
        </div>
    )
}

export default AlertMsg;
