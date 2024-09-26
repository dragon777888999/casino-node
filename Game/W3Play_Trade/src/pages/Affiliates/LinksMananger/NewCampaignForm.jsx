import React, { useState, useRef } from 'react'
import APP from './../../../app';
import LinkManagerAPI from '../../../API/linkManager';
import useAppState from '../../../hooks/useAppState';
import { useDispatch } from 'react-redux';
import { set_alert_msg, set_loader } from '../../../REDUX/actions/main.actions';
import ga4Event from '../../../utils/ga4.event';

export default function NewCampaignForm() {

	const [name, setName] = useState(''),
		wallet_address = useAppState('wallet_address'),
		partnerRef = APP.state.get('partnerRef'),
		dispatch = useDispatch(),
		[hasError, setError] = useState(false);

	var nameChange = useRef(event => {
		setName(event.target.value.replace(/[\W_]+/g, ""));
		setError(false);
	}),

		submit = async () => {

			if (!wallet_address) {
				dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_generate_link' }))
				return;
			}
			if (name.length < 6 || name.length > 15) {
				setError(true)
				return;
			}

			// setLoader(true)

			dispatch(set_loader(true))
			//generate affiliate link 
			// 
			let res = await LinkManagerAPI.generateLink(wallet_address, name, partnerRef)


			if (res?.status !== 200) return;
			// APP.API.add_campaign(name);
			ga4Event('successfuly created affiliate link', 'affiliate_link_creation')
			dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_generate_link' }))
			APP.state.set('updateLinksManager', true);
			APP.remove_popup('add_campaign');
			dispatch(set_loader(false))
		}

	return (
		<div className="new_campaign_form">
			<img src='/media/images/text/genAffLink.png' className="new_campaign_form_header" />
			<div className="input_label">
				<span>{APP.term('create_campaign_name_input_label')}</span>
			</div>
			<div className="input_box">
				<input className="name_input" value={name} onChange={nameChange.current} maxLength={15}
					placeholder={APP.term('create_campaign_name_input_placeholder')} />
			</div>
			<div className={'input_instruct' + (hasError ? ' error' : '')}>
				<span>{APP.term('create_campaign_input_instruct')}</span>
			</div>
			<div className="gold_btn" onClick={submit}><span>{APP.term('create_campaign_link')}</span></div>
		</div>
	)
}