import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const historyStateKeyStateMap = new Map<string, any>()

/**
 * This hook is copied from MKB project: https://github.com/bratislava/mestskakniznica.sk/blob/master/next/utils/useRoutePreservedState.ts
 *
 * Synchronizes state with current history state key. If user goes back, the state is retrieved from
 * cache. If user visits the same page in a new instance, historical state is not retrieved.
 *
 * Limitation: Can be used only once on one page (otherwise id must be implemented).
 */
export const useRoutePreservedState = <T>(defaultValue: T) => {
  const historyStateKey =
    // eslint-disable-next-line no-restricted-globals
    typeof history === 'undefined' ? null : (history.state as { key: string }).key

  const getDefaultState = () => {
    if (!historyStateKey) {
      return defaultValue
    }

    const historyData = historyStateKeyStateMap.get(historyStateKey) as T

    return historyData ?? defaultValue
  }
  const useStateReturnValue = useState<T>(getDefaultState())
  const [state] = useStateReturnValue

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    historyStateKeyStateMap.set((history.state as { key: string }).key, state)
  }, [state])

  return useStateReturnValue
}
