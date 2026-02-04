import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts'

import HomePageSearchField from '@/src/components/common/HomepageSearch/HomePageSearchField'
import HomePageSearchResults from '@/src/components/common/HomepageSearch/HomePageSearchResults'
import AnimateHeight from '@/src/components/formatting/AnimateHeight'
import {
  getHomepageSearchQueryKey,
  homepageSearchFetcher,
} from '@/src/services/meili/fetchers/homepageSearchFetcher'
import cn from '@/src/utils/cn'
import { useLocale } from '@/src/utils/useLocale'
import { useLogSearchQueryToPlausible } from '@/src/utils/useLogSearchQueryToPlausible'
import { useTranslation } from '@/src/utils/useTranslation'

type HomePageSearchProps = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const HomePageSearch = ({ isOpen, setOpen }: HomePageSearchProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const locale = useLocale()

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => {
    setOpen(false)
  })

  const [input, setInput] = useState<string>('')
  const [debouncedInput] = useDebounceValue(input, 1300)
  const [searchValue, setSearchValue] = useState<string>('')

  /* Use of separate searchValue instead of debouncedInput is to make it clear, what the actual search value is,
   * and to keep it consistent with more complex search filters
   */
  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  useLogSearchQueryToPlausible({ query: searchValue, source: 'homepage' })

  const filters = { search: searchValue }

  const { data, isPending } = useQuery({
    queryKey: getHomepageSearchQueryKey(filters, locale),
    queryFn: () => homepageSearchFetcher(filters, locale),
  })

  const handleSearchPressed = useCallback(() => {
    router.push(`${t('links.searchLink')}?keyword=${input}`)
  }, [router, input, t])

  return (
    <div ref={ref} className="relative">
      <div
        className={cn(
          isOpen ? 'md:w-[634px]' : 'md:w-[444px]',
          'w-full transition-all duration-300',
        )}
      >
        <HomePageSearchField
          value={input}
          setValue={setInput}
          onSearchPressed={handleSearchPressed}
          onFocus={() => {
            setOpen(true)
          }}
        />
      </div>
      <AnimateHeight isVisible={isOpen} className="absolute top-full z-40 mt-2 w-full md:w-[634px]">
        {searchValue ? (
          <div className="rounded-lg border bg-white py-2">
            <HomePageSearchResults data={data} isLoading={isPending} searchValue={searchValue} />
          </div>
        ) : null}
      </AnimateHeight>
    </div>
  )
}

export default HomePageSearch
