import web3Singleton from '../../../API/Web3Singleton';
import tokenInfo from '../../../API/contracts/USD.json';

export const waitForElementToExist = (selector, maxRetries = 5, delay = 1000) => {
  let retries = 0;

  return new Promise((resolve, reject) => {
    const checkElement = () => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      if (retries < maxRetries) {
        //console.log('retry for element',selector, 'retry #' + retries);
        retries++;
        setTimeout(checkElement, delay);
      } else {
        reject(new Error('Max retries reached'));
      }
    };

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });

    checkElement();
  });
};

export const convertHexToColonFormat = (hexString) => {
  // Remove the "0x" prefix if present
  if (hexString.startsWith("0x")) {
    hexString = hexString.slice(2);
  }

  // Initialize an empty string to store the result
  let result = "";

  // Loop through the hex string in steps of 2 to convert to ASCII characters
  for (let i = 0; i < hexString.length; i += 2) {
    const hexByte = hexString.substr(i, 2); // Get two characters at a time
    const decimalValue = parseInt(hexByte, 16); // Convert the hexadecimal byte to decimal
    const asciiCharacter = String.fromCharCode(decimalValue); // Convert to ASCII character
    result += asciiCharacter;
  }

  return result;
};

//Wait for item in APP.state until available
export const waitForInitialization = async (item) => {
  let attempts = 0;
  const maxAttempts = 10; // For example, we try 10 times.
  const delay = 300;     // Check every 300 ms

  while (attempts < maxAttempts) {
    let itemFromState = APP.state.get(item);

    if (itemFromState) {
      return itemFromState; // Return the initialized connector.
    }
    await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the specified delay.
    attempts++;
  }

  throw new Error(item + ' failed to initialize within the expected time.');
};

export const estimateGasFee = async () => {
  let gasPrice;

  try {
    const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri'));
    gasPrice = await web3.eth.getGasPrice(); //gas price value in WEI
    console.log('utils::gasPrice using getGasPrice', web3.utils.fromWei(gasPrice, 'gwei'));
    APP.state.set('gwei_gas_price', web3.utils.fromWei(gasPrice, 'gwei'))
  } catch (e) {
    gasPrice = 2500000000; //2.5 GWEI as default if error occurs
    console.log('utils::gasPrice using getGasPrice exception using default ', gasPrice);

  }

  return gasPrice;
}

export const getTokenBalance = async (walletAddress) => {

  const realToken = APP.state.get('plbToken');
  const demoToken = APP.state.get('plbToken_demo');
  const token = APP.state.get('currentToken') === 'demo' ? demoToken : realToken;

  const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri'));

  const contract = new web3.eth.Contract(tokenInfo.abi, token.address);
  let balance = await contract.methods.balanceOf(walletAddress).call(); /// 10 ** token.decimals;

  return balance;
}
