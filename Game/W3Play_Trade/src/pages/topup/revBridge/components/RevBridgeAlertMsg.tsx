import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import APP from '../../../../app';
import { set_rev_bridge_alert_msg } from '../../../../REDUX/actions/main.actions';

type AlertType = 'info' | 'success' | 'error' | 'tickets';

interface RevBridgeAlertMsgProps<T extends AlertType> {
    type: T;
    content: string;
    preventTimeout: boolean;
}

const RevBridgeAlertMsg: React.FC<RevBridgeAlertMsgProps<AlertType>> = ({ type, content, preventTimeout }) => {

    const dispatch = useDispatch();

    useEffect(() => {

        if (preventTimeout) return;
        let timeout = setTimeout(() => {
            dispatch(set_rev_bridge_alert_msg({ type: '', content: '' }))
        }, 5000);

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div className="rev_bridge_alert_msgs_wrap">
            {type === 'tickets' ?
                (<div className="rev_bridge_alert_msgs_content rev_bridge_ticket_bg">
                    <p className="rev_bridge_alert_msgs_desc rev_bridge_tickets_desc">{APP.term('alert_msg_tickets_desc1')} {content} {APP.term('alert_msg_tickets_desc2')}</p>
                    <img src={`/media/images/alerts/${type}.png`} className="rev_bridge_alert_msgs_icon" alt={type} />
                </div>)
                :
                (<div className="rev_bridge_alert_msgs_content"
                    data-alert-type={type}>
                    <p className="rev_bridge_alert_msgs_desc">{APP.term(content)}</p>
                    <img src={`/media/images/alerts/${type}.png`} className="rev_bridge_alert_msgs_icon" alt={type} />
                </div>
                )}
        </div>
        )
}

export default RevBridgeAlertMsg;