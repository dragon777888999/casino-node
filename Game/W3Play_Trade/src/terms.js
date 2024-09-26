import React from 'react'
import app from './app';
import defaultEnTerms from './default-terms';
import { createSelectorHook } from 'react-redux';
import state from "./state";

let lang_lexs = {
	// 'en': defaultEnTerms,
	// 'es': defaultEnTerms,
}

let active_lexicon = '';

try {
	const res = await fetch(state.terms_url /*(+ `?lang=${'en'}`*/)
	const terms = await res.json();

	const termsObj = {};
	let testlang;
	if (localStorage) {
		if (localStorage?.hasOwnProperty("@@remember-mainRememberReducer")) {
			testlang = JSON.parse(localStorage['@@remember-mainRememberReducer'])
		}
	}

	// terms.forEach(term => {
	// 	console.log('here33')
	// 	if (!termsObj[term?.lang]) {
	// 		console.log('here1')
	// 		console.log(term?.lang)
	// 		termsObj[term.lang] = {};
	// 		termsObj[term.lang][term.termKey] = term.termValue
	// 	} else {
	// 		console.log('here9')
	// 		termsObj[term.lang][term.termKey] = term.termValue
	// 	}
	// });
	lang_lexs = terms;

	let lastLangCode = testlang?.app_lang?.code;
	if (lastLangCode) {
		active_lexicon = lang_lexs[lastLangCode];

	} else {
		// lang_lexs['en'] = termsObj.en;
		active_lexicon = lang_lexs.en;
	}

} catch (error) {
	// if faild to fetch terms use default terms
	active_lexicon = defaultEnTerms;
}

function InsertBRs({ text }) {
	var parts = text.indexOf('\n') !== -1 ? text.split('\n') : text.split('<br/>'),
		content = [];
	for (let i = 0; i < parts.length; i++) {
		if (i > 0) content.push(<br key={i} />);
		content.push(parts[i]);
	}
	return content;
}

window.change_lang = function (lang) {
	if (!(lang in lang_lexs)) return;
	active_lexicon = lang_lexs[lang];
}

export default function term(name, default_val) {

	// var currentLang = app?.state?.get('customer.lang')?.code;
	let testlang,
		currentLang;

	if (localStorage) {
		if (localStorage?.hasOwnProperty("@@remember-mainRememberReducer")) {
			testlang = JSON.parse(localStorage['@@remember-mainRememberReducer'])
			currentLang = testlang?.app_lang?.code;
		}
	}

	if (currentLang == undefined)
		currentLang = 'en'

	if (lang_lexs[currentLang]?.hasOwnProperty(name)) {
		var text = lang_lexs[currentLang][name]
	}
	else if (lang_lexs['en']?.name) {
		var text = lang_lexs['en']?.name
	}
	else {
		var text = name;
	}
	// var text = (name in lang_lexs[currentLang] ? lang_lexs[currentLang][name] : active_lexicon[name]
	// 	: (default_val === undefined ? name : default_val)
	// var text = (name in active_lexicon ? active_lexicon[name]
	// : (default_val === undefined ? name : default_val)
	// );
	if (text.indexOf('\n') !== -1 || text.indexOf('<br/>') !== -1) return <InsertBRs text={text} />;
	return text;
}