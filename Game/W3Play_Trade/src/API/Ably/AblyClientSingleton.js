import { Realtime } from 'ably';

const AblyClientSingleton = (function () {
  let instance;

  function createInstance() {
    const client = new Realtime(
      {
        key: APP.state.get('ably_client_key'),
        transportParams: { heartbeatInterval: 5000 }
      });

    client.connection.on('connected', function () {
      console.log('Ably client connected');
    });

    client.connection.on('failed', function () {
      console.log('Ably client connection failed');
    });

    client.connection.on((stateChange) => {
      console.log('Ably New connection state is ' + stateChange.current);
    });

    return client;
  }

  return {
    getClient: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

export default AblyClientSingleton;
