import { usePlausible } from 'next-plausible'
import { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { useLocale } from '@/src/utils/useLocale'

export type PlausibleEvents = {
  Vyhladavanie: { Query: string; Language: string; 'Search source'?: string }
}

/**
 * Log debounced searchValue to Plausible
 * Based on mestskakniznica.sk: https://github.com/bratislava/mestskakniznica.sk/blob/master/next/components/pages/SearchPage.tsx#L93
 *
 * @param query
 * @param language
 * @param source
 */
export const useLogSearchQueryToPlausible = ({
  query,
  source,
}: {
  query: string
  source?: string
}) => {
  const plausible = usePlausible<PlausibleEvents>()
  const locale = useLocale()

  const [debouncedInputForPlausible] = useDebounceValue<string>(query, 2000)
  const [lastInputForPlausible, setLastInputForPlausible] = useState<string>('')

  useEffect(() => {
    const sanitizedInput = debouncedInputForPlausible.toLowerCase().replaceAll(/\s+/g, ' ').trim()
    if (sanitizedInput.length > 2 && sanitizedInput !== lastInputForPlausible) {
      plausible('Vyhladavanie', {
        props: {
          Query: sanitizedInput,
          Language: locale,
          'Search source': source,
        },
      })

      setLastInputForPlausible(sanitizedInput)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputForPlausible])
}
