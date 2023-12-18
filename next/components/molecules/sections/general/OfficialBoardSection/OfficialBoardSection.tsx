import {
  getGinisOfficialBoardQueryKey,
  ginisOfficialBoardFetcher,
} from '@backend/ginis/fetchers/ginisOfficialBoard.fetcher'
import { NoResultsFound } from '@bratislava/ui-bratislava/NoResultsFound/NoResultsFound'
import { BasicSearch } from '@components/ui/BasicSearch/BasicSearch'
import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner'
import { OfficialBoardCards } from '@components/ui/OfficialBoardCards/OfficialBoardCards'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

const DataWrapper = ({ search }: { search: string }) => {
  const t = useTranslations()

  // TODO prefetch
  const { data, isLoading, isError, error } = useQuery({
    queryKey: getGinisOfficialBoardQueryKey(search),
    queryFn: () => ginisOfficialBoardFetcher(search),
    keepPreviousData: true,
    select: (res) => res.data,
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  // TODO replace by proper error
  if (isError) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return data.length > 0 ? (
    <OfficialBoardCards
      query={search}
      title={t('recentlyAddedDocuments')}
      viewButtonText={t('viewTheDocument')}
      downloadButtonText={t('download')}
      documents={data}
    />
  ) : (
    <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
  )
}

const OfficialBoardSection = () => {
  const t = useTranslations()

  const [input, setInput] = useState<string>('')
  const debouncedInput = useDebounce<string>(input, 300)
  const [searchValue, setSearchValue] = useState<string>(input)

  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  return (
    <>
      <BasicSearch
        placeholder={t('enterKeyword')}
        title={t('searching')}
        buttonText={t('search')}
        input={input}
        setInput={setInput}
        setSearchQuery={setSearchValue}
      />

      <DataWrapper search={searchValue} />
    </>
  )
}

export default OfficialBoardSection
