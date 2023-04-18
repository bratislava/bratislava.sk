import type { ParsedOfficialBoardDocument } from '@backend/services/ginis'
import { BasicSearchOld, DocumentCards, NoResultsFound } from '@bratislava/ui-bratislava'
import { useTranslations } from 'next-intl';

import React, { useState } from 'react'
import { useQuery } from 'react-query'

const OfficialBoardSection = () => {
  const [search, setSearch] = useState('')

  const t = useTranslations();

  // TODO: Refactor, prefetch and extract fetcher.
  const { data } = useQuery({
    queryKey: ['OfficialBoard', search],
    queryFn: () =>
      fetch(
        `/api/ginis/documents-list?${new URLSearchParams({
          search,
        })}`,
      ).then((r) => r.json() as Promise<ParsedOfficialBoardDocument[]>),
    keepPreviousData: true,
  })

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
      {data && data.length === 0 && (
        <NoResultsFound title={t('weDidntFindAnything')} message={t('tryEnteringSomethingElse')} />
      )}
      {data && data.length > 0 && (
        <DocumentCards
          query={search}
          title={t('recentlyAddedDocuments')}
          viewButtonText={t('viewTheDocument')}
          downloadButtonText={t('download')}
          documents={data}
        />
      )}
    </>
  )
}

export default OfficialBoardSection
