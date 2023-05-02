import { ArrowRightIcon } from '@assets/images'
import { ParsedOfficialBoardDocument } from '@backend/services/ginis'
import Button from '@components/forms/simple-components/Button'
import { DocumentCard } from '@components/ui/DocumentCard/DocumentCard'
import { useTranslations } from 'next-intl'
import React from 'react'
import { TabPanel } from 'react-aria-components'
import useSWR from 'swr'

const TabPanelOfficialBoard = () => {
  const t = useTranslations('HomepageTabs')

  // TODO handle loading and errors
  const { data: officialBoardData } = useSWR<ParsedOfficialBoardDocument[]>(
    '/api/ginis/newest',
    () => fetch('/api/ginis/newest').then((res) => res.json()),
  )
  const documents = officialBoardData || []

  return (
    <TabPanel id="OfficialBoard">
      <div className="mt-8 flex flex-col gap-y-10 lg:mt-14">
        <div className="flex flex-col items-center gap-y-5">
          {documents.map((document, index) => (
            <DocumentCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...document}
              className="min-w-full max-w-4xl"
              viewButtonText={t('files')}
              downloadButtonText="TODO-fix"
            />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            href="/mesto-bratislava/transparentne-mesto/uradna-tabula"
            variant="category-outline"
            endIcon={<ArrowRightIcon />}
          >
            {t('toOfficialBoard')}
          </Button>
        </div>
      </div>
    </TabPanel>
  )
}

export default TabPanelOfficialBoard
