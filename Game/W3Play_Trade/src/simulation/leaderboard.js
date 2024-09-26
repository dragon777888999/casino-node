import { coin, die, choice, pow_die, change, change_factor } from "../utils/random";
import { to_precision, round_down_to } from '../utils/number';
import { samples, last, lastn, butlast, to_column_map, remove_each_once } from "../utils/array";
import { sleep } from "../utils/async";
import { relation_cases } from '../utils/logic'

const first_names = ["Liam","Olivia","Noah","Emma","Oliver","Ava","Elijah","Charlotte"];
const last_names = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis'];

var _idcounter = 0;
function UID(){ return _idcounter++ }

function randuser(){
	var trades = die(1, 2000),
	wins = die(0, trades),
	winrate = wins / trades,
	profits = wins * die(1, 200) * 5;
	return {
		trades, wins, winrate, profits,
		cid: UID(),
		name: `${choice(first_names)} ${choice(last_names)}`,
		avatar: `/media/images/test_users/${die(1, 40)}.jpg`,
	}
}

export default function sim_leaderboard(APP, state){

	function refresh_follows(){
		state.mutate('customer.following', x => [...x])
	}

	function end_session(session){
		state.mutate('customer.following', following => {
			let ix = following.indexOf(session);
			if(ix == -1) return [...following];
			following.splice(ix, 1);
			return [...following];
		})
	}

	function sim_position(session, table){
		setTimeout(() => {
			var follows = state.get('customer.following');
			if(!follows.includes(session)) return; // already stopped following
			var is_win = coin(1,0),
			pool_ratio = die(110,360)/100,
			profit = is_win ? session.invest*(pool_ratio-1) : -session.invest;
			session.profits += profit;
			var old_comp = session.times_completed,
			new_comp = old_comp+1;
			session.win_ratio *= old_comp/new_comp;
			if(is_win) {
				session.wins++;
				session.win_ratio += 1/new_comp
			}
			session.times_completed++;
			if(session.times_completed == session.times) end_session(session);
			else refresh_follows()
		}, table.duration*1000)
	}

	function take_follow_position(){
		var follows = state.get('customer.following');
		var tables = state.get('tables');
		var did_changes = false;
		for(let session of follows){
			if(die(0,5) < 4) continue;
			if(session.times_used == session.times) continue;
			var table = choice(tables);
			session.times_used++;
			did_changes = true;
			sim_position(session, table)
		}

		// refresh following list if changes were done
		if(did_changes) refresh_follows()
	}

	setTimeout(() => {

		var top_users = samples(100, randuser)

		top_users.sort((user1, user2) => user2.profits - user1.profits)
		var top_profit = top_users[0].profits;
		for(let i=0; i<top_users.length; i++){
			let user = top_users[i];
			user.rank = i+1;
			user.rel_profit = user.profits/top_profit;
		}
		state.set('leadersboard', top_users);
		setInterval(take_follow_position, 1500);
	}, 100)

	APP.API.start_copy = function start_copy(cid, times, invest){
		state.mutate('customer.following', following => {
			return [
				...following,
				{
					followed_cid: cid, times, invest,
					times_used: 0, times_completed: 0, wins: 0,
					win_ratio: .5,
					profits: 0,
				}
			]
		})
	}

	APP.API.stop_copy = function stop_copy(cid){
		let ix = state.get('customer.following').findIndex(cfg => cfg.followed_cid == cid);
		if(ix > -1){
			state.mutate('customer.following', following => {
				following.splice(ix, 1);
				return [...following];
			})
		}
	}
}