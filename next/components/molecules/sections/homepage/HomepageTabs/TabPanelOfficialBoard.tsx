import {
  getGinisOfficialBoardHomepageQueryKey,
  ginisOfficialBoardHomepageFetcher,
} from '@backend/ginis/fetchers/ginisOfficialBoardHomepage.fetcher'
import Button from '@components/forms/simple-components/Button'
import OfficialBoardCard from '@components/ui/OfficialBoardCard/OfficialBoardCard'
import { useQuery } from '@tanstack/react-query'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { useHomepageContext } from '@utils/homepageContext'
import { useTranslations } from 'next-intl'
import React from 'react'
import { TabPanel } from 'react-aria-components'

const TabPanelOfficialBoard = () => {
  const t = useTranslations('HomepageTabs')

  const { homepage } = useHomepageContext()
  const { tabs } = homepage?.attributes ?? {}

  // TODO handle loading and errors
  const { data: officialBoardData } = useQuery({
    queryKey: getGinisOfficialBoardHomepageQueryKey(),
    queryFn: () => ginisOfficialBoardHomepageFetcher(),
    select: (res) => res.data,
  })

  const documents = officialBoardData || []

  return (
    <TabPanel id="OfficialBoard">
      <div className="mt-8 flex flex-col gap-y-10 lg:mt-14">
        <div className="flex flex-col items-center gap-y-5">
          {documents.map((document, index) => (
            <OfficialBoardCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...document}
              className="min-w-full max-w-4xl"
              viewButtonText={t('files')}
            />
          ))}
        </div>

        {tabs?.officialBoardPageLink ? (
          <div className="flex justify-center">
            <Button
              variant="category-outline"
              {...getCommonLinkProps(tabs.officialBoardPageLink)}
            />
          </div>
        ) : null}
      </div>
    </TabPanel>
  )
}

export default TabPanelOfficialBoard
