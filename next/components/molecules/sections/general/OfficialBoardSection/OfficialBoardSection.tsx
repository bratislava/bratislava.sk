import {
  getGinisOfficialBoardQueryKey,
  ginisOfficialBoardFetcher,
} from '@backend/ginis/fetchers/ginisOfficialBoard.fetcher'
import { BasicSearchOld } from '@bratislava/ui-bratislava/BasicSearchOld/BasicSearchOld'
import { NoResultsFound } from '@bratislava/ui-bratislava/NoResultsFound/NoResultsFound'
import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner'
import { OfficialBoardCards } from '@components/ui/OfficialBoardCards/OfficialBoardCards'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

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

  const [search, setSearch] = useState('')

  return (
    <>
      <BasicSearchOld
        className="pb-14 lg:pb-24"
        placeholder={t('enterKeyword')}
        title={t('searching')}
        buttonText={t('search')}
        onSubmit={(newSearch) => setSearch(newSearch)}
        initialValue={search}
      />

      <DataWrapper search={search} />
    </>
  )
}

export default OfficialBoardSection
