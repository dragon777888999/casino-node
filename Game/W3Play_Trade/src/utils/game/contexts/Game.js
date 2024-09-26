import React, { createContext, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Contract } from '../wallets/contract'
import Web3 from 'web3'
import { GameClient } from '../clients/GameClient'
import useAppState from '../../../hooks/useAppState'
import web3Singleton from '../../../API/Web3Singleton';

/**
 * @module Contexts
 */

/**
 * Read-only game context
 */
export const GameContext = createContext()

/**
 *
 * @typedef {Object} GameProviderProps
 * @property {string} wsNetworkAddress - The WebSockets address
 * @property {string} gameAddress - The game contract address
 */

/**
 * This context provides a read only {@link GameClient} that allows to retrieve information
 * and listen to events from the game smart contract. No need to have a wallet
 * installed or connected.
 *
 * @param {GameProviderProps} props
 * @returns {React.Component}
 * @example
 * <GameProvider wsNetworkAddress="wss://localhost:8545">
 *  <MyComponent />
 * </GameProvider>
 *
 * // MyComponent.js
 * export function MyComponent () {
 *    const { gameClient } = useContext(GameContext)
 * }
 */
export function GameProvider({ wsNetworkAddress, gameAddress, children, currentPool }) {
  const [gameClient, setGameClient] = useState()
  const resetGraph = useAppState('resetGraph');
  const isDemo = currentPool?.uid?.includes('demo');
  const switchedAddress = APP.state.get(isDemo ? 'demo_tables' : 'tables').find(itm => itm.uid === currentPool.uid)?.contract_adderess;

  const load = async () => {

    const web3 = web3Singleton.getInstance(wsNetworkAddress);

    // const web3 = new Web3(new Web3.providers.WebsocketProvider(wsNetworkAddress, {
    //   reconnect: {
    //     auto: true,
    //     delay: 1000, // ms
    //     maxAttempts: 10,
    //     onTimeout: false
    //   }
    // }))

    //console.log('new game client')
    const gc = new GameClient(new Contract(web3))

    // alert(3)
    await gc.connect(switchedAddress)
    // alert(4)

    // alert(switchedAddress)

    setGameClient(gc)
    //console.log('Game Provider loaded')
  }

  useEffect(() => {
    // const load = async () => {
    //   // alert('UPDATING TO NEW WEB# GAME CLIENT....')
    //   const web3 = new Web3(new Web3.providers.WebsocketProvider(wsNetworkAddress, {
    //     reconnect: {
    //       auto: true,
    //       delay: 1000, // ms
    //       maxAttempts: 10,
    //       onTimeout: false
    //     }
    //   }))

    //   const gc = new GameClient(new Contract(web3))
    //   await gc.connect(gameAddress)

    //   setGameClient(gc)
    //   //console.log('Game Provider loaded')
    // }
    // logout();
    load()

    // return () => {
    //   alert('RETURN...')
    // }
  }, [wsNetworkAddress, currentPool?.uid])

  const reloadGameClient = useCallback(() => {
    load()
  }, [resetGraph])

  useEffect(() => {
    if (!resetGraph) return;
    logout();
    reloadGameClient()
  }, [resetGraph])

  const logout = useCallback(() => {
    if (gameClient) {
      gameClient.disconnect(switchedAddress); // Disconnect the GameClient
      setGameClient(null); // Set the gameClient state to null
    }
  }, [gameClient]);

  return (
    <GameContext.Provider value={{
      gameClient
    }}
    >
      {children}
    </GameContext.Provider>
  )
}
