
const { min, max } = Math;

// fill a new array using a function
export function samples(amount, make) {
	return Array(amount).fill(0).map(make);
}

// get last item in array
export function last(arr) {
	return arr[arr.length - 1];
}

// get last up-to-N items in array
export function lastn(arr, n) {
	return arr.slice(max(0, arr.length - n), arr.length);
}

// all but n last items of array (slice backwards)
export function butlast(arr, n = 1) {
	return arr.slice(0, arr.length - n);
}

// remove the first occurance of an item from an array if found
export function remove_once(arr, item) {
	let ix = arr.indexOf(item);
	if (ix != -1) arr.splice(ix, 1);
}

// tries to remove each item in a list once
// duplicate entries may result in multiple removals
export function remove_each_once(arr, ...items) {
	for (let item of items) remove_once(arr, item)
}

// numeric sorters
export function num_asc(a, b) { return a - b }
export function num_desc(a, b) { return b - a }

// sort method decorators
// example: array_of_objects.sort(column_desc('time'))
export function column_asc(col) {
	if (col === 'date') return (a, b) => (new Date(a[col]) - new Date(b[col]))
	else if (col === 'pool') return (a, b) => (Number(a[col].split(":")[0]) - Number(b[col].split(":")[0]));
	else return (a, b) => (a[col] - b[col]);
}
export function column_desc(col) {
	if (col === 'date') return (a, b) => (new Date(b[col]) - new Date(a[col]))
	else if (col === 'pool') return (a, b) => (Number(b[col].split(":")[0]) - Number(a[col].split(":")[0]));
	else return (a, b) => (b[col] - a[col]);
}
// multi column variant
// ex: array_of_objects.sort(multi_column(['amount', 'desc', Number], ['time', 'asc', Number]))
export function multi_column(...cols) {
	return (a, b) => {
		for (let [col, dir, format] of cols) {
			let vala = a[col], valb = b[col];
			if (format) {
				vala = format(vala);
				valb = format(valb);
			}
			if (vala !== valb) {
				return dir == 'asc' ? vala - valb : valb - vala;
			}
		}
		return 0;
	}
}

// reducer decorator to make a map from an array of objects by specific column
// usefull when you want to start accessing stuff by ID from existing dataset
// example:
// [ {a:3, b:5}, {a:7, b:9} ].reduce(to_column_map('a'))
// result: { 3: {a:3, b:5}, 7: {a:7, b:9} }
export function to_column_map(col) {
	return (acc, item, i, arr) => {
		if (!acc || acc === arr[0]) acc = {};
		acc[item[col]] = item;
		return acc;
	}
}

// reducer decorator to make sum of specific column
export function to_column_sum(col) {
	return (acc, item, i, arr) => {
		if (acc === arr[0]) acc = item[col];
		else acc += item[col];
		return acc;
	}
}

// get domain of specific column
export function column_domain(arr, col) {
	return arr.reduce(
		(domain, item) => {
			let val = item[col];
			domain = [min(val, domain[0]), max(val, domain[1])]
			return domain;
		},
		[Infinity, -Infinity]
	)
}

// get domain of specific column
export function column_min(arr, col) {
	return arr.reduce(
		(min_val, item) => min(min_val, item[col]),
		Infinity
	)
}

// get domain of specific column
export function column_max(arr, col) {
	return arr.reduce(
		(max_val, item) => max(max_val, item[col]),
		-Infinity
	)
}