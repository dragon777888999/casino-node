import APP from "../app";

export default async (err) => {

    function termMsg(err) {
        if (err.includes('transaction cancelled by the user')) return 'err_transaction';
        else if (err.includes("user rejected action")) return 'err_transaction';
        else if (err.includes("funds for gas")) return 'err_insff_gas_token';
        // else if (err.includes("estimategas")) return 'err_insff_gas_token';
        else if (err.includes('insufficient funds')) return 'err_insff_funds';
        else if (err.includes("round in progress")) return 'err_round_in_progress';
        else return 'err_global_bet_err';
    }

    APP.state.set('bet_error_msg', termMsg(err.toLowerCase()))
}