import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useDebounce, useOnClickOutside } from 'usehooks-ts'

import AnimateHeight from '@/components/atoms/AnimateHeight'
import HomePageSearchField from '@/components/molecules/HomePageSearchField'
import HomePageSearchResults from '@/components/molecules/HomePageSearchResults'
import {
  getHomepageSearchKey,
  homepageSearchFetcher,
} from '@/services/meili/fetchers/homepageSearchFetcher'

type HomePageSearchProps = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const HomePageSearch = ({ isOpen, setOpen }: HomePageSearchProps) => {
  const router = useRouter()
  const t = useTranslations()
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

  const { data, error, isPending } = useQuery({
    queryKey: getHomepageSearchKey(filters, locale),
    queryFn: () => homepageSearchFetcher(filters, locale),
  })

  const handleSearchPressed = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push(`${t('searchLink')}?keyword=${input}`)
  }, [router, input, t])

  return (
    <div ref={ref} className="relative">
      <div
        className={twMerge(
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
