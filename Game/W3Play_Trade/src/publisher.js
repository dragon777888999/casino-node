import { last, remove_once } from "./utils/array";
/*
this class holds a simple data stracture as state
and allow for other functions to "subscribe" to specific data "paths" inside the stracture.

don't modify the state property without "set"/"mutate" methods or the publishment won't work.

example state:

{ customer: {
	balance: 100,
	shop_cart: { milk: 1, eggs: 12, tomatoes: 5 }
} }

usage:

a function can subscribe to "customer.shop_cart.tomatoes"
and recive a call with any changes done to the number of tomatoes,
a function who subscribed to "customer" or "customer.shop_cart" would also receive an update 
when tomatoes changes but with the container they asked for as argument,
subs of "customer.balance" whould not be called when things in shop_cart change.
*/
export default class Publisher{

	constructor(base_state){
		this.state = base_state;
		this.subs = {}
	}

	// add new subscriber 
	// create a new channel if needed
	// call it with current value unless told otherwise
	sub(path, func, getCurrent=true){
		if (!(path in this.subs)) this.subs[path] = [func];
		else this.subs[path].push(func);
		if(getCurrent) func(this.get(path));
	}

	// removes a subscription if present
	// removes the channel if it was it's last sub
	unsub(path, func){
		if (!(path in this.subs)) return;
		let channel = this.subs[path];
		remove_once(channel, func);
		if(channel.length == 0) delete this.subs[path];
	}

	// get value from specific path
	// can also get the last node the value was accessed from
	// so it wouldn't need to be looked for multiple times in an operation
	get(path, withNode=false){
		let value = undefined,
			parts = path.split('.'),
			last = parts.length-1,
			curr_node = this.state;

		// crowl through the state using the path segments
		for(let i=0; i<parts.length; i++){
			let part = parts[i];
			// retrive value from the last node
			if(i == last) value = curr_node[part];
			else {
				// focus on new node wile crawling through intermediate parts
				curr_node = curr_node[part];
				// make sure you're moving indo a valid node
				if(typeof curr_node != 'object'){
					// tried to get a key in a non-object node
					throw (
						`GET STATE ERROR: can't get part "${part}" `
						+ `of node "${parts.slice(0, i).join('.')}" `
						+ `with type "${(typeof curr_node)}"`
					)
				}
			}
		}
		// can return the last container node if asked for since it persists outside the loop
		if (withNode) return [value, curr_node];
		// return just the value
		return value;
	}

	// set a new value for a path
	// publish update to all relevant subs
	set(path, value, node){
		// if final node isn't referenced already find it using get
		if(!node) [, node] = this.get(path, true);
		// set new value into the state
		node[last(path.split('.'))] = value;
		// publish new value
		this.publish(path, value)
	}

	// remove a value from the state
	// publish update to all relevant subs
	unset(path, node){
		// if final node isn't referenced already find it using get
		if(!node) [, node] = this.get(path, true);
		// remove value from node
		delete node[last(path.split('.'))];
		// publish value removal
		this.publish(path, undefined)
	}

	// mutate an existing value of a path using a provided function
	// will also trigger publish since it uses "set" method
	mutate(path, mutator){
		let [value, node] = this.get(path, true);
		this.set(path, mutator(value), node)
	}

	// publish a call with value to direct subscribers
	// and a call with the relevant container to subs of all parent paths
	publish(path, value){
		// find all subscription paths that overlap with the updated path
		let super_paths = Object.keys(this.subs).filter(sub => path.indexOf(sub) != -1);
		let sub_paths = Object.keys(this.subs).filter(sub => (sub.indexOf(path) != -1 && sub !== path));
		for(let super_path of super_paths){
			// return direct value to exact subs or get the relevant container as value for others
			let sub_value = super_path == path ? value : this.get(super_path);
			// publish to all subscribers of the path
			for(let func of this.subs[super_path]) func(sub_value);
		}
		for(let sub_path of sub_paths){
			// return direct value to exact subs or get the relevant container as value for others
			let sub_value = this.get(sub_path);
			// publish to all subscribers of the path
			for(let func of this.subs[sub_path]) func(sub_value);
		}
	}
}