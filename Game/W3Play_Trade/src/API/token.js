import req from '../utils/request';
import state from '../../src/state';

const getTokens = async (wallet, partnerRef) => {

    let claimUrl = `${state.claimTokens}/${wallet}/${partnerRef}`;

    return req({
        url: claimUrl,
    })
}

export default { getTokens };