import {
  getOfficialBoardListQueryKey,
  officialBoardListDefaultFilters,
  officialBoardListFetcher,
} from '@backend/ginis/fetchers/officialBoardListFetcher'
import Button from '@components/forms/simple-components/Button'
import SearchResultCard from '@components/organisms/SearchPage/SearchResultCard'
import { SearchResult } from '@components/organisms/SearchPage/useQueryBySearchOption'
import { useQuery } from '@tanstack/react-query'
import { base64Encode } from '@utils/base64'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { useHomepageContext } from '@utils/homepageContext'
import { formatDate } from '@utils/local-date'
import { useTranslations } from 'next-intl'
import React from 'react'
import { TabPanel } from 'react-aria-components'

const TabPanelOfficialBoard = () => {
  const t = useTranslations('HomepageTabs')

  const { homepage } = useHomepageContext()
  const { tabs } = homepage?.attributes ?? {}

  const filters = { ...officialBoardListDefaultFilters, pageSize: -1 }

  // TODO handle loading and errors
  const {
    data: officialBoardData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: getOfficialBoardListQueryKey(filters),
    queryFn: () => officialBoardListFetcher(filters),
    select: (axiosResponse) => {
      const formattedData: SearchResult[] =
        axiosResponse.data.items
          .filter((boardItem) => !CATEGORIES_TO_EXCLUDE_ON_HOMEPAGE.has(boardItem.categoryName))
          .map((boardItem) => {
            return {
              title: boardItem.title,
              uniqueId: boardItem.id,
              linkHref: `/uradna-tabula/${base64Encode(boardItem.id)}`,
              metadata: [formatDate(boardItem.createdAt), boardItem.categoryName],
              customIconName: 'search_result_official_board',
            }
          }) ?? []

      return formattedData
    },
  })

  const documents = officialBoardData?.slice(0, 4) || []

  return (
    <TabPanel id="OfficialBoard">
      <div className="mt-8 flex flex-col gap-y-10 lg:mt-14">
        <div className="flex flex-col gap-y-5">
          {documents.map((document) => (
            <SearchResultCard
              key={document.uniqueId}
              data={{ ...document }}
              showBottomDivider={false}
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
