import { useMemo } from 'react'
import { SWRResponse } from 'swr'
import { useDebounce } from 'usehooks-ts'

import usePrevious from './usePrevious'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useGetSwrExtras<Data = any, Error = any>({
  error,
  data,
  loadingDelay = 1000,
}: Pick<SWRResponse<Data, Error>, 'error' | 'data'> & { loadingDelay?: number }) {
  const loading = !error && !data
  const oldData = usePrevious(data)
  /**
   * While loading, `swr` discards the old data, it is logical, but in the UI we want to still show the old data to prevent
   * layout shifts.
   */
  const dataToDisplay = useMemo(() => {
    if (error) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      return undefined
    }
    return loading ? oldData : data
    // TODO: oldData breaks the hook (returns undefined when listed in deps, examine)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data, loading])

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const debouncedLoading = useDebounce(loading, loadingDelay)
  /**
   * Loading start is delayed, the end is not. Used for showing delayed spinner.
   */
  const delayedLoading = loading ? debouncedLoading : false
  /**
   * Whether to show alternative loading when the old data are not available.
   */
  const loadingAndNoDataToDisplay = loading && !dataToDisplay

  return { loading, loadingAndNoDataToDisplay, dataToDisplay, delayedLoading }
}
