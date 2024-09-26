import { useState, useEffect } from 'react';
import { round_down_to } from './../utils/number'

const { max } = Math;

var counter_active = false,
counter_timeout,
counter_interval,
subs = [];

function second_now(){
	return round_down_to(Date.now(), 1000)
}
function count(){
	let time = second_now();
	for(let callback of subs) callback(time);
}
function start(){
	counter_active = true;
	counter_timeout =  setTimeout(
		() => {counter_interval = setInterval(count, 1000)}, 
		1000 - (Date.now() % 1000)
	)
}
function stop(){
	(counter_timeout !== undefined) && clearTimeout(counter_timeout);
	(counter_interval !== undefined) && clearInterval(counter_interval);
	counter_active = false;
}
function sub(callback){
	subs.push(callback);
	if(!counter_active);
	start()
}
function unsub(callback){
	let ix = subs.indexOf(callback);
	if(ix > -1) subs.splice(ix, 1);
	if(!subs.length) stop();
}

export default function useSecondsCountdown(towards){
	var [left, setLeft] = useState(max(0, towards - second_now()));
	useEffect(() => {
		function callback(time){
			setLeft(max(0, towards - time))
		}
		sub(callback);
		return unsub.bind(null, callback)
	}, [towards])
	return left;
}