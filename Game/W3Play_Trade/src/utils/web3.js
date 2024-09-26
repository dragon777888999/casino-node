import { utils } from 'web3'
import state from '../state';
import scientificToInteger from './bigIntToInteger';

// export function EtherValue({ wei = 100000000000000000000, decimalSize = 5, network }) {
export function EtherValue({ wei, decimalSize = 2, network }) {
  if (!isFinite(wei)) return;

  return wei / 100;

  if (wei && wei.toString().includes('e')) {
    let k = scientificToInteger(wei)
    return k;
  }

  // const [ints, decimals = '0'] = utils.fromWei(String(BigInt(wei).toString()), 'ether').split('.')
  // const [ints, decimals = '0'] = utils.fromWei(String(wei), 'ether').split('.') <--
  const [ints, decimals = '0'] = utils.fromWei(String(state.active_network === 'testnet' ? parseInt(wei) : wei), 'ether').split('.')

  let testnet = `${ints}.${decimals.substring(0, network || decimalSize)}`,
    mainnet = Math.ceil(ints) + '.' + decimals.substring(0, 1);

  return state.active_network === 'testnet' ? testnet : mainnet;

}

export function EtherValueString({ wei, decimalSize = 2 }) {
  //if (!isFinite(wei)) return;

  return parseInt(wei) / 100;

  //const [ints, decimals = '0'] = utils.fromWei(String(wei), 'noether').split('.')
  //return `${ints}.${decimals.substring(0, decimalSize)}`
}