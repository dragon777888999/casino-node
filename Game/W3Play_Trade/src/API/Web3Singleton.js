import Web3 from 'web3';

const web3Singleton = (function () {
  // Private variables and functions
  let instances = {};

  let debugMode = false;
  let methodsToDebug = ['eth_subscribe', 'eth_unsubscribe'];

  function init(uri) {
    // Code for initializing the singleton
    // ...
    const web3Instance = new Web3(new Web3.providers.WebsocketProvider(
      uri, {
      reconnect: {
        auto: true,
        delay: 1000, // ms
        maxAttempts: 10,
        onTimeout: false
      }
    }
    ));

    const originalSend = web3Instance.currentProvider.send;
    web3Instance.currentProvider.send = (payload, callback) => {
      if (debugMode && methodsToDebug.includes(payload.method)) {
        console.log('***');
        customTrace(7);                  //Uncomment for debug messages in console
        console.log('Request:', payload); //Uncomment for debug messages in console
        console.log('***');
      }
      originalSend.call(web3Instance.currentProvider, payload, callback);
    };

    return web3Instance;
  }

  //output to console the trace in specific depth
  function customTrace(depth) {
    const stack = new Error().stack;
    const stackLines = stack.split("\n");
    const relevantLines = stackLines.slice(1, depth + 2); // Adjust indices to get the correct lines
    console.log(relevantLines.join("\n"));
  }

  // Public interface
  return {
    getInstance(uri) {
      if (!instances[uri]) {
        // console.log('init...', uri)
        instances[uri] = init(uri);
      }
      return instances[uri];
    },

    logout(uri) {
      if (instances[uri]) {
        delete instances[uri];
        alert('LOGOUT!!!')
        console.log('Logged out from', uri);
      }
    }
  };
})();

export default web3Singleton;