import APP from "../app";

export default function clear_table(pool_id) {

    // APP.state.set('pool.poolId', pool_id);

    console.log('clear_table');
    let bets = { up: {}, down: {} };
    let total = 0;
    let totals = { up: 0, down: 0 };

    for (let dir in bets) {
        APP.state.set('pool.' + dir + '.total', totals[dir]);
        APP.state.set('pool.' + dir + '.positions', bets[dir]);
    }
    APP.state.set('pool.total', total);
    APP.state.set('total_pool_down', 0);
    APP.state.set('total_pool_up', 0);
}