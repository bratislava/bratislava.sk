import { vznDefaultFilters, VznFilters } from '@backend/meili/fetchers/vznFetcher'
import { BasicSearch } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useQueryParam } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

import DocumentListResults from './DocumentListResults'

const DocumentListSection = () => {
  const { t } = useTranslation()
  const [filters, setFilters] = useState<VznFilters>(vznDefaultFilters)

  const [routerQueryValue] = useQueryParam<string>('keyword')
  const [input, setInput] = useState<string>('')
  const debouncedInput = useDebounce<string>(input, 300)
  const [searchValue, setSearchValue] = useState<string>(input)

  useEffect(() => {
    setInput(routerQueryValue)
  }, [routerQueryValue])

  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  useEffect(() => {
    if (filters.search !== searchValue) {
      setFilters({ ...filters, search: searchValue, page: 1 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return (
    <div>
      <div>
        <BasicSearch
          placeholder={t('searching')}
          title={t('searching')}
          buttonText={t('search')}
          input={input}
          setInput={setInput}
          setSearchQuery={setSearchValue}
        />
      </div>

      <DocumentListResults filters={filters} onPageChange={handlePageChange} />
    </div>
  )
}

export default DocumentListSection
