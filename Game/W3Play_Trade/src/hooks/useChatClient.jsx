import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";

export default function useChatClient({ apiKey, userData, tokenOrProvider }) {

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(false);

  chatClient?.on(event => {
    if (event?.watcher_count) {
      APP.state.set('onlineMembers', event?.watcher_count);
    }
  })

  useEffect(() => {
    const client = new StreamChat(apiKey);
   
    // prevents application from setting stale client (user changed, for example)
    let didUserConnectInterrupt = false;
 
    if (userData?.id && tokenOrProvider && userData.image) {
   
      const connectionPromise = client;
      client.connectUser(userData, tokenOrProvider)
        .then(() => {
          if (!didUserConnectInterrupt) setChatClient(client);
        })
        .then(async () => {
          const channel = client.channel("messaging", "main");

          console.log(channel, 'channel')
          setChannel(channel);
          await channel.watch({ presence: true });
        })
        .catch((error) => {
          setError(true);
          console.log(error, "can't connect error chat 2")

        });

      return () => {
        // didUserConnectInterrupt = true;
        // setChatClient(null);
        // setError(false);
        // // wait for connection to finish before initiating closing sequence
        // client
        //   .then(() => client.disconnectUser())
        //   .then(() => {
        //     console.log("connection closed");
        //   });
      };
    }
  }, [/*apiKey, userData?.id, tokenOrProvider, /*userData.image*/,userData?.id]);

  return [chatClient, channel, error];
}
