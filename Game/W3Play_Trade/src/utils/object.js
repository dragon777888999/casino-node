// this is a rudimentary deep object copy method
// its about 5 times faster then using JSON.parse(JSON.stringify()).
// inner items other then objects and arrays are copied using default javascript logic.
// it is used among other things for publishing mutable state-fragments to views 
// in order so separate their object address from the original state tree.
// don't try to copy anything very deep or with recursive references or you'l get an exception.
// you can increase depth limit using the second argument.

export function deep_copy(obj, max_depth=50, depth=0) {
	// depth limit exceeded
	if (depth > max_depth) throw 'failed to copy object: max copy depth exceeded';
	// handle array
	let copy;
	if (Array.isArray(obj)){
		copy = obj.slice(0);
		for(let i=0; i<copy.length; i++){
			let item = copy[i];
			if(typeof item == 'object') copy[i] = deep_copy(item, max_depth, depth+1);
		}
		return copy;
	}
	// handle dictionary-like
	copy = {};
	for (let key in obj){
		if (!obj.hasOwnProperty(key)) continue;
		let item = obj[key];
		if(typeof item == 'object' && item !== null) copy[key] = deep_copy(item, max_depth, depth+1);
		else copy[key] = item;
	}
	return copy;
}

// shallow copy
export function copy(obj){
	return Object.assign({}, obj);
}