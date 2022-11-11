/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { vznDefaultFilters, VznFilters } from '@backend/meili/fetchers/vznFetcher'
import { minKeywordLength } from '@utils/constants'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import { BasicSearch } from '../../../ui/BasicSearch/BasicSearch'
import DocumentListResults from './DocumentListResults'

const DocumentList = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const { t } = useTranslation()
  const [filters, setFilters] = useState<VznFilters>(vznDefaultFilters)
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 300)
  const [searchValue, setSearchValue] = useState<string>(searchInputValue)

  useEffect(() => {
    if (debouncedSearchInputValue.length > minKeywordLength) {
      setSearchValue(debouncedSearchInputValue)
    }
  }, [debouncedSearchInputValue])

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
          input={searchInputValue}
          setInput={setSearchInputValue}
          setSearchQuery={setSearchValue}
        />
      </div>

      <DocumentListResults filters={filters} onPageChange={handlePageChange} />
    </div>
  )
}

export default DocumentList
