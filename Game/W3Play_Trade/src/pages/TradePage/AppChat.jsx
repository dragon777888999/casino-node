import React, { useEffect, useLayoutEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Channel, Chat, MessageInput, VirtualizedMessageList } from "stream-chat-react";
import useChatClient from "../../hooks/useChatClient.jsx";
import useAppState from "../../hooks/useAppState.jsx";
import StatusMessage from '../../comp/chat/StatusMessage';
import CustomMessageInput from '../../comp/chat/CustomMessageInput';
import CustomMessage from '../../comp/chat/CustomMessage';

import "../../styles/pages/tradePage/chat.css";
import app from "../../app.js";

export default function AppChat() {

  const chatToken = useAppState('chat_token')
  const walletAdress = useAppState('wallet_address');
  const avatar = useAppState("customer.avatar");
  var apiKey = APP.state.get('chat_api_key');

  //Disable for now...
  //if (window.location.hostname == 'integration-trade.playnance.com')
  if (window.location.hostname == 'bcb.game')
    apiKey = APP.state.get('chat_api_key_bcbgame');

  const userData = { id: walletAdress, image: avatar };
  const tokenOrProvider = chatToken;

  // const [chatClient, channel, error] = useChatClient({
  //   apiKey: apiKey,
  //   userData: { id: walletAdress, image: avatar },
  //   tokenOrProvider: chatToken,
  // });


  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(false);

  chatClient?.on(event => {
    if (event?.watcher_count) {
      APP.state.set('onlineMembers', event?.watcher_count);
    }
  })

  useEffect(() => {
    async function channelWatcher() {
      const state = await channel?.watch({ presence: true });
    }
    channelWatcher();
  }, [chatClient, channel])

  useEffect(() => {
    let connectionPromise;
    const client = new StreamChat(apiKey);
    // console.log('chat client:')
    // console.log(client)

    // prevents application from setting stale client (user changed, for example)
    let didUserConnectInterrupt = false;

    if (userData?.id && tokenOrProvider && userData.image) {

      connectionPromise = client
        .connectUser(userData, tokenOrProvider)
        .then(() => {
          if (!didUserConnectInterrupt) setChatClient(client);
        })
        .then(async () => {
          const channel = client.channel("messaging", "main");
        setChannel(channel);
          await channel.watch({ presence: true });
        })
        .catch((error) => {
          setError(true);
          console.log(error, "Can't Connect Error chat 1 ")

        });

      return () => {
        didUserConnectInterrupt = true;
        setChatClient(null);
        setError(false);
        // wait for connection to finish before initiating closing sequence
        connectionPromise
          .then(() => client.disconnectUser())
          .then(() => {
            console.log("connection closed");
          });
      };
    }
  }, [/*apiKey, userData?.id, tokenOrProvider, /*userData.image*/, walletAdress]);

  if (!walletAdress) {
    return <StatusMessage message="please connect your wallet to use the chat" />
  }

  if (!chatClient && !channel) {
    return <StatusMessage message="Connecting to chat...." />;
  }

  // if (error) {
  //   return <StatusMessage message="something went wrong while connecting to chat. please try again" />
  // }

  return (
    <div className="chat_container">
      <div className="chat_inner_content">
        <div className="chat_top_content">
          <h3 className="chat-title">{app.term('chat_header')}</h3>
          <div onClick={() => APP.state.set('chat_open', false)}>
            <img src={`/media/images/wh_close.png`} className="chat-header-close-img" />
          </div>
        </div>
        <div style={{ height: '86%' }}>
          <Chat client={chatClient}>
            <Channel channel={channel} Input={CustomMessageInput}>
              <div className="messages-container" style={{ height: '100%' }}>
                <VirtualizedMessageList Message={CustomMessage} />
                <div>
                  <MessageInput maxRows={3} additionalTextareaProps={{ maxLength: 200 }} /*grow*/ />
                </div>
              </div>
            </Channel>
          </Chat>
        </div>
      </div>
    </div>
  );
}
