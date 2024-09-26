import React, { useState, useRef, useEffects } from 'react';
import { useEffect } from 'react';
import useAppState from '../hooks/useAppState';
import { column_asc } from '../utils/array';
import APP from './../app';
import GoldenText from './golden_text';
import { vw } from './../utils/document'
import app from './../app';

function make_render_id(active_popups) {
	return (Object.keys(active_popups).join(' ') || '_none_')
}

function Popup({ name, title, title_scale = 1, content, onClose, el_ref, closable = true }) {
	const close = useRef(() => {
		onClose && onClose();
		APP.remove_popup(name);
	}).current,
		title_rel_length = title ? title.length / 15 : 0;
	return (
		<div className={"popup " + APP.state.get('popupSpecialClass')} ref={el_ref}>
			{closable && <div className="close" onClick={close}></div>}
			{title && <GoldenText className="title" width={vw(60) * title_scale * title_rel_length}
				scale={title_scale}
				do_border={false} do_shadow={false} weight={900}>
				{title}
			</GoldenText>}
			<div className="content">{content}</div>
		</div>
	)
}

/**
 * sets "add_popup" & "remove_popup" methods
 * for the rest of the application to use
 * 
 * config for popups :
 * {
 *     title: text
 *     content: jsx elements
 *     onClose: function
 *     order: nuber (order of rendering)
 * }
 */
export default function PopupsMgr() {
	const [render_id, set_render_id] = useState('_none_'),
		active_popups = useRef({}).current,

		add_popup = useRef((name, popup_cfg) => {
			active_popups[name] = { name, ...popup_cfg };
			set_render_id(make_render_id(active_popups))
		}).current,
		remove_popup = useRef(name => {
			delete active_popups[name];
			set_render_id(make_render_id(active_popups))
		}).current;

	useEffect(() => {
		APP.add_popup = add_popup;
		APP.remove_popup = remove_popup;
		return () => {
			delete APP.add_popup;
			delete APP.remove_popup;
		}
	}, [])

	let popups = Object.values(active_popups);
	popups.sort(column_asc('order'))

	return (
		<div className={'popups_container' + (render_id == '_none_' ? ' hidden' : '')}>
			{popups.map(popup_cfg => <Popup key={popup_cfg.name} {...popup_cfg} />)}
		</div>
	)
}