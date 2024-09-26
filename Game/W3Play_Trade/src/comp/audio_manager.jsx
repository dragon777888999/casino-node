import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useAppState from '../hooks/useAppState'
// import { set_audio } from '../REDUX/actions/main.actions';
import { set_sounds_selected, set_bg_music, set_sound_effects, set_voiceover } from '../REDUX/actions/main.actions';
import APP from './../app'


const track_names = {
	"ambience": { volume: .75 },
	"gained_profits": { volume: 1, effect: true },
	"last_trade_chance": { volume: .1, effect: true },
	"nearing_expiry": { volume: .1, effect: true },
	"new_invest": { volume: 1, effect: true },
	"new_round": { volume: 1, effect: true },
	"trade_started": { volume: 1, effect: true },
	"voice_place_your_trade": { volume: 1, voice: true },
	"voice_you_won": { volume: 1, voice: true },
	"voice_no_more_trades": { volume: 1, voice: true },
	"distributing_payouts": { volume: 1, voice: true },
	"distributing_up_payouts": { volume: 1, voice: true },
	"distributing_down_payouts": { volume: 1, voice: true },
};


class AudioTrack {
	constructor(name, element, volume, is_effect, is_voice) {
		this.name = name;
		this.element = element;
		this.is_effect = !!is_effect;
		this.is_voice = !!is_voice;
		this.playing = false;
		this.loop = false;
		this.muted = false;
		// this.site_muted = true;
		// this.effects_muted = false;
		// this.voice_muted = false;
		this.element.volume = volume;
		// APP.state.sub('audio_mode', this.mode_change.bind(this));
		// APP.state.sub('audio_effect_preference', this.effects_mode_change.bind(this));
		// APP.state.sub('voice_effect_preference', this.voice_mode_change.bind(this));
	}

	// mode_change(mode) {
	// 	this.site_muted = mode !== 'on';
	// }

	// effects_mode_change(mode) {
	// 	this.effects_muted = mode !== 'on';
	// }

	// voice_mode_change(mode) {
	// 	this.voice_muted = mode !== 'on';
	// }

	mute() {
		this.muted = true;
	}
	unmute() {
		this.muted = false;
	}

	play(on_success, on_error) {
		// if (this.site_muted
		// 	|| (this.is_effect && this.effects_muted)
		// 	|| (this.is_voice && this.voice_muted)) return;
		if (this.muted) return;
		var promise = this.element.play();
		if (promise !== undefined && (on_success || on_error)) {
			promise.then(() => on_success && on_success())
				.catch(error => on_error && on_error(error))
		}
	}

	pause() {
		this.element.pause();
	}

	stop() {
		this.element.pause();
		this.element.currentTime = 0;
	}

	play_forever(on_success, on_error) {
		this.element.loop = true;
		this.play(on_success, on_error);
	}

	volume(amount) {
		this.element.volume = amount;
	}
}

// function setup_sound__old() {
// 	APP.audioCtx = new AudioContext();
// 	APP.sounds = {};

// 	// "running" or "suspended"  
// 	// console.log('ctx state', APP.audioCtx.state);

// 	for (let [name, cfg] of Object.entries(track_names)) {
// 		APP.sounds[name] = new AudioTrack(
// 			name,
// 			document.getElementById(`audio_track_${name}`),
// 			cfg.volume,
// 			cfg.effect,
// 			cfg.voice
// 		);
// 	}

// 	if (APP.audioCtx.state == 'suspended') {
// 		APP.state.set('audio_mode', 'suspended');
// 	}
// 	else {
// 		APP.state.set(
// 			'audio_mode',
// 			APP.state.get('audio_preference') == 'on' ? 'on' : 'off'
// 		);
// 	}
// }
function setup_sound() {
	APP.audioCtx = new AudioContext();
	APP.sounds = {};

	// "running" or "suspended"  
	// console.log('ctx state', APP.audioCtx.state);

	for (let [name, cfg] of Object.entries(track_names)) {
		APP.sounds[name] = new AudioTrack(
			name,
			document.getElementById(`audio_track_${name}`),
			cfg.volume,
			cfg.effect,
			cfg.voice
		);
	}

	if (APP.audioCtx.state == 'suspended') {
		// console.log('!!! audioCtx suspended !!!')
		APP.state.set('audio_suspended', true);
	}
}

// APP.stop_all_sfx = function () {
// 	if (APP.sounds) {
// 		for (let track of Object.values(APP.sounds)) {
// 			if (track.is_effect) track.stop();
// 		}
// 	}
// }

function TrackElements() {
	return (
		<div className="audio_tracks">
			{Object.keys(track_names).map(name => (
				<audio key={name} id={`audio_track_${name}`} src={`/media/audio/${name}.mp3`}></audio>
			))}
		</div>
	)
}

// function choose_unmute(e) {
// 	APP.state.set('audio_preference', 'on');

// 	setTimeout(() => {
// 		let audio_mode = APP.state.get('audio_mode')
// 		if (audio_mode == 'suspended' || audio_mode == 'unknown') {
// 			setup_sound()
// 		}

// 		if (APP.audioCtx && APP.audioCtx.state !== 'suspended') {
// 			// both browser & user allows app to play sounds
// 			APP.state.set('audio_mode', 'on');
// 		}
// 	}, 150)
// }

// APP.unmute = choose_unmute;

// function choose_mute(e) {
// 	APP.state.set('audio_preference', 'off');
// 	APP.state.set('bg_audio_preference', 'off');
// 	APP.state.set('audio_effect_preference', 'off');
// 	APP.state.set('voice_effect_preference', 'off');
// 	APP.state.set('audio_mode', 'off');
// }

function AudioPopup() {
	const dispatch = useDispatch();
	function chose_on() {
		dispatch(set_sounds_selected(true))
		dispatch(set_bg_music(true))
		dispatch(set_sound_effects(true))
		dispatch(set_voiceover(true))
		APP.state.set('show_audio_popup', false);
	}
	function chose_off() {
		dispatch(set_sounds_selected(true))
		dispatch(set_bg_music(false))
		dispatch(set_sound_effects(false))
		dispatch(set_voiceover(false))
		APP.state.set('show_audio_popup', false);
	}

	return (
		<div className="audio_select">
			<div className="dialog_box">
				<div className="close" onClick={chose_off}></div>
				<div className="title">{APP.term('audio_select_title')}</div>
				<div className="choices">
					<div className="choice off" onClick={chose_off}>{APP.term('audio_off_btn')}</div>
					<div className="choice on" onClick={chose_on}>{APP.term('audio_on_btn')}</div>
				</div>
			</div>
		</div>
	)
}

// export default function AudioManager({ display }) {
// 	const user_pref = useAppState('audio_preference', 'prompt'),
// 		bg_pref = useAppState('bg_audio_preference', 'on'),
// 		mode = useAppState('audio_mode', 'unknown');
// 	let [close_btn, set_close_btn] = useState(false);

// 	useEffect(setup_sound, []);


// 	// handle background music
// 	useEffect(() => {
// 		if (!APP.sounds) return; // before setup
// 		if (mode == 'on' && user_pref == 'on' && bg_pref == 'on') APP.sounds.ambience.play_forever();
// 		else APP.sounds.ambience.pause();
// 	}, [mode, user_pref, bg_pref])

// 	let show_popup = (mode !== 'unkown' && user_pref == 'prompt') || (user_pref == 'on' && mode == 'suspended')

// 	return (
// 		<div className="audio_mgr" style={{ display: display ? 'flex' : 'none' }}>
// 			<TrackElements />
// 			{show_popup && !close_btn ? <AudioPopup set_close_btn={set_close_btn} /> : null}
// 		</div>
// 	)
// }


function EventsListener() {
	useEffect(() => {
		function before_entry_listener() {
			APP.sounds && APP.sounds.last_trade_chance.play();
		}
		function before_expiry_listener() {
			APP.sounds && APP.sounds.nearing_expiry.play();
		}
		function pool_change_listener() {
			APP.sounds && APP.sounds.last_trade_chance.stop();
			APP.sounds && APP.sounds.nearing_expiry.stop();
		}
		function bet_won_listener() {
			//setTimeout(() => {
			//console.log('play gain profits')
			APP.sounds && APP.sounds.voice_you_won.play();
			//}, 1000);
			
			setTimeout(() => {
				APP.sounds && APP.sounds.gained_profits.play();
			}, 1200);
		}
		APP.controller.sub('5_seconds_to_entry', before_entry_listener);
		APP.controller.sub('5_seconds_to_expiry', before_expiry_listener);
		APP.controller.sub('bet_won', bet_won_listener);
		APP.state.sub('active_table', pool_change_listener);

		return () => {
			APP.controller.unsub('5_seconds_to_entry', before_entry_listener);
			APP.controller.unsub('5_seconds_to_expiry', before_expiry_listener);
			APP.state.unsub('active_table', pool_change_listener);
		}
	});
	return (<></>);
}


export default function AudioManager({ display }) {

	const { bg_music_on, sound_effects_on, voiceover_on } = useSelector(state => state.mainRememberReducer);
	const show_audio_popup = useAppState('show_audio_popup')

	useEffect(setup_sound, []);

	// handle background music
	useEffect(() => {
		if (!APP.sounds) return; // before setup
		if (bg_music_on) {
			APP.sounds.ambience.unmute();
			APP.sounds.ambience.play_forever();
		}
		else {
			APP.sounds.ambience.stop();
			APP.sounds.ambience.mute();
		}
	}, [bg_music_on])

	// handle sound effects
	useEffect(() => {
		if (!APP.sounds) return; // before setup
		for (let name in APP.sounds) {
			let sound = APP.sounds[name];
			if (sound.is_effect) {
				if (sound_effects_on) {
					sound.unmute();
				}
				else {
					sound.stop();
					sound.mute();
				}
			}
		}
	}, [sound_effects_on])

	// handle voiceover
	useEffect(() => {
		if (!APP.sounds) return; // before setup
		for (let name in APP.sounds) {
			let sound = APP.sounds[name];
			if (sound.is_voice) {
				if (voiceover_on) {
					sound.unmute();
				}
				else {
					sound.stop();
					sound.mute();
				}
			}
		}
	}, [voiceover_on])

	return (
		<div className="audio_mgr" style={{ display: display ? 'flex' : 'none' }}>
			<TrackElements />
			<EventsListener />
			{show_audio_popup ? <AudioPopup /> : null}
		</div>
	)
}