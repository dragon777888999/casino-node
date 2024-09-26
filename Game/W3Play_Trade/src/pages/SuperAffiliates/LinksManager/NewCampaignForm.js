import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import APP from './../../../app';
import useAppState from '../../../hooks/useAppState';
import { set_alert_msg, set_loader } from '../../../REDUX/actions/main.actions';
import superAffiliatesLinkManager from '../../../API/superAffiliatesLinkManager';

export default function NewCampaignForm() {

	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [pixel, setPixel] = useState('');
	const [isDropboxOpen, setDropboxOpen] = useState(false);
	const [aff_route, set_aff_route] = useState(Object.keys(APP.state.get('routesList'))[0]);
	const wallet_address = useAppState('wallet_address');
	const partnerRef = APP.state.get('partnerRef');
	const [hasError, setError] = useState(false);

	const nameChange = useRef(event => {
		setName(event.target.value.replace(/[\W_]+/g, ""));
		setError(false);
	});

	const pixelChange = useRef(event => {
		setPixel(event.target.value);
	});

	const onClickCreateLink = async () => {

		// If no wallet address
		if (!wallet_address) {
			dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_generate_link' }));
			return;
		}

		// If input is too short/long
		if (name.length < 6 || name.length > 15) {
			setError(true);
			return;
		}

		try {
			//generate affiliate link 
			dispatch(set_loader(true));
			const response = await superAffiliatesLinkManager.generateSapLink(wallet_address, name, partnerRef, aff_route, pixel);
			if (response.error) return;

			dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_generate_link' }));
			APP.state.set('updateSapLinksManager', true);
			APP.remove_popup('add_campaign');
		}

		catch (error) {
			console.log(error, 'error...')
			dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_generate_link' }));
		}

		finally {
			APP.remove_popup('add_campaign');
			dispatch(set_loader(false));
		}

	};

	useEffect(() => {
		return () => {
			APP.state.unset('popupSpecialClass')
		}
	}, [])

	return (

		<div className="new_campaign_form">

			<img src='/media/images/text/genAffLink.png' className="new_campaign_form_header" />

			<div className="input_label">
				<span>{APP.term('create_campaign_name_input_label')}</span>
			</div>


			{/* affiliate link + desc */}
			<div className="input_box">
				<input className="name_input" value={name} onChange={nameChange.current} maxLength={15}
					placeholder={APP.term('create_campaign_name_input_placeholder')} />
			</div>
			<div className={'input_instruct' + (hasError ? ' error' : '')}>
				<span>{APP.term('create_campaign_input_instruct')}</span>
			</div>

			{/* dropbox + desc */}
			<div className="input_box_dropbox" onClick={() => setDropboxOpen(!isDropboxOpen)}>
				<img src='/media/images/aff_drop_arr.svg' className={`drop_arr + ${isDropboxOpen ? 'rotateArr' : ''}`} />
				<p><span>{APP.term(aff_route)}</span></p>
				{isDropboxOpen &&
					(<div className="dropbox_routes">
						{Object.keys(APP.state.get('routesList'))?.map((itm, i) => (
							<p key={i} className={'_' + i} onClick={() => set_aff_route(itm)}><span>{APP.term(itm)}</span></p>
						))}
					</div>)}
			</div>
			<div className='input_instruct'>
				<span>{APP.term('new_campaign_input_inst')}</span>
			</div>

			{/* pixel input + desc */}
			<div className="input_box_pixel">
				<input className="name_input" value={pixel} onChange={pixelChange.current} maxLength={35}
					placeholder={APP.term('new_campaign_pixel_placeholder')} />
			</div>
			<div className='input_instruct'>
				<span>{APP.term('new_campaign_input_pixel_inst')}</span>
			</div>


			<div className="gold_btn" onClick={onClickCreateLink}>
				<span>{APP.term('create_campaign_link')}</span>
			</div>

		</div>

	);

};