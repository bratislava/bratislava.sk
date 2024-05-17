import { Typography } from '@bratislava/component-library'
import Button from '@components/forms/simple-components/Button'
import SearchResultCard from '@components/organisms/SearchSection/SearchResultCard'
import { SearchResult } from '@components/organisms/SearchSection/useQueryBySearchOption'
import LoadingSpinner from '@components/ui/LoadingSpinner/LoadingSpinner'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { TabPanel } from 'react-aria-components'

import { CATEGORIES_TO_EXCLUDE_ON_HOMEPAGE } from '@/backend/ginis/consts'
import {
  getOfficialBoardListQueryKey,
  officialBoardListDefaultFilters,
  officialBoardListFetcher,
} from '@/backend/ginis/fetchers/officialBoardListFetcher'
import { base64Encode } from '@/utils/base64'
import { getCommonLinkProps } from '@/utils/getCommonLinkProps'
import { useHomepageContext } from '@/utils/homepageContext'
import { formatDate } from '@/utils/local-date'

const TabPanelOfficialBoard = () => {
  const { homepage } = useHomepageContext()
  const { tabs } = homepage?.attributes ?? {}

  const filters = { ...officialBoardListDefaultFilters, pageSize: -1 }

  // TODO handle loading and errors properly
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
          .filter(
            (boardItem) => !CATEGORIES_TO_EXCLUDE_ON_HOMEPAGE.includes(boardItem.categoryName),
          )
          .map((boardItem) => {
            return {
              title: boardItem.title,
              uniqueId: boardItem.id,
              linkHref: `/uradna-tabula/${base64Encode(boardItem.id)}`,
              metadata: [boardItem.categoryName, formatDate(boardItem.publishedFrom)],
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
        <div className="flex flex-col gap-y-2" data-cy="official-board-results">
          {/* TODO we used basic spinner and text here, but it should be done with nicer design */}
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            // TODO translation
            <Typography type="p">Nepodarilo sa načítať dáta z úradnej tabule.</Typography>
          ) : (
            documents.map((document) => (
              <SearchResultCard key={document.uniqueId} data={{ ...document }} />
            ))
          )}
        </div>

        {tabs?.officialBoardPageLink ? (
          <div className="flex justify-center">
            <Button
              variant="category-outline"
              data-cy="official-board-button"
              {...getCommonLinkProps(tabs.officialBoardPageLink)}
            />
          </div>
        ) : null}
      </div>
    </TabPanel>
  )
}

export default TabPanelOfficialBoard
