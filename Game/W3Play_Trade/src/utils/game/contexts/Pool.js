import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { usePool } from '..'
import useAppState from '../../../hooks/useAppState'

/**
 * @module Contexts
 */

/**
 * Provides a context to interact with the same pool from
 * different components
 */
export const PoolContext = React.createContext()

/**
 *
 * @typedef {Object} PoolProviderParams
 * @property {string} defaultPoolId
 */

/**
 * Provides a global context for working with a pool. It uses
 * {@link usePool} to load a pool by id and returns the same
 * as {@link usePool} when called with {@link useContext}
 *
 * @param {PoolProviderParams} params
 * @returns {React.Component}
 */
export const PoolProvider = ({ defaultPoolId, children }) => {

  const currentPool = useSelector(state => state.mainRememberReducer.currentPool);
  const pool = usePool({ poolId: currentPool?.pool_id, uid: currentPool.uid })

  return (
    <PoolContext.Provider value={{ ...pool, poolId: currentPool?.pool_id }}>
      {children}
    </PoolContext.Provider>
  )
}
