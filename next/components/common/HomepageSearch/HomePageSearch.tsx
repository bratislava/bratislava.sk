import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { useDebounce, useOnClickOutside } from 'usehooks-ts'
import cn from 'utils/cn'

import HomePageSearchField from '@/components/common/HomepageSearch/HomePageSearchField'
import HomePageSearchResults from '@/components/common/HomepageSearch/HomePageSearchResults'
import AnimateHeight from '@/components/formatting/AnimateHeight'
import {
  getHomepageSearchQueryKey,
  homepageSearchFetcher,
} from '@/services/meili/fetchers/homepageSearchFetcher'
import { useLocale } from '@/utils/useLocale'
import { useTranslation } from '@/utils/useTranslation'

type HomePageSearchProps = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const HomePageSearch = ({ isOpen, setOpen }: HomePageSearchProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  const locale = useLocale()

  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  const [input, setInput] = useState<string>('')
  const debouncedInput = useDebounce(input, 300)
  const [searchValue, setSearchValue] = useState<string>('')

  /* Use of separate searchValue instead of debouncedInput is to make it clear, what the actual search value is,
   * and to keep it consistent with more complex search filters
   */
  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  const filters = { search: searchValue }

  const { data, isPending } = useQuery({
    queryKey: getHomepageSearchQueryKey(filters, locale),
    queryFn: () => homepageSearchFetcher(filters, locale),
  })

  const handleSearchPressed = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`${t('links.searchLink')}?keyword=${input}`)
  }, [router, input, t])

  return (
    <div ref={ref} className="relative">
      <div
        className={cn(
          `${isOpen ? 'md:w-[634px]' : 'md:w-[444px]'}`,
          'w-full transition-all duration-300',
        )}
      >
        <HomePageSearchField
          value={input}
          setValue={setInput}
          onSearchPressed={handleSearchPressed}
          onFocus={() => setOpen(true)}
        />
      </div>
      <AnimateHeight isVisible={isOpen} className="absolute top-full z-40 mt-2 w-full md:w-[634px]">
        {searchValue ? (
          <div className="rounded-lg border-2 bg-white py-2">
            <HomePageSearchResults data={data} isLoading={isPending} searchValue={searchValue} />
          </div>
        ) : null}
      </AnimateHeight>
    </div>
  )
}

export default HomePageSearch
