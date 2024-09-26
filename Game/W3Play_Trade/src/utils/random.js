import { samples } from "./array";

const { floor, random, pow } = Math;


export function coin(heads, tails){
	return random() < .5 ? heads : tails
}

export function die(from, to) {
	return from + floor(random() * ((to-from)+1))
}

export function pow_die(from, to) {
	return pow(10, die(from, to))
}

export function dice(num, from, to) {
	return samples( num, die.bind(null, from, to) )
}

export function choice(arr){
	return arr[die(0, arr.length-1)]
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function rand_char(){
	return characters.charAt(die(0, characters.length-1))
}
export function rand_text(len){
	let i=0, text = '';
	while(i<len){ text += rand_char(); i++; }
	return text;
}

// get a random number from a distribution of size [mag] around 1
// ex: change_factor(.5) means 0.75 to 1.25
export function change_factor(mag){
	return (1 - mag/2 + mag*random());
}

export function change(num, mag){
	return num * change_factor(mag);
}

export function sample_count(from, to, samples){
	let set = dice(samples, from, to),
		count = {};
	for(let it of set){
		if(it in count) count[it]++;
		else count[it] = 1;
	}
	return count;
}