import { Typography } from '@bratislava/component-library'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { TabPanel } from 'react-aria-components'

import Button from '@/components/common/Button/Button'
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner'
import { useHomepageContext } from '@/components/providers/HomepageContextProvider'
import SearchResultCard from '@/components/sections/SearchSection/SearchResultCard'
import { SearchResult } from '@/components/sections/SearchSection/useQueryBySearchOption'
import { CATEGORIES_TO_EXCLUDE_ON_HOMEPAGE } from '@/services/ginis/consts'
import {
  getOfficialBoardListQueryKey,
  officialBoardListDefaultFilters,
  officialBoardListFetcher,
} from '@/services/ginis/fetchers/officialBoardListFetcher'
import { base64Encode } from '@/utils/base64'
import { formatDate } from '@/utils/formatDate'
import { getCommonLinkProps } from '@/utils/getCommonLinkProps'

const TabPanelOfficialBoard = () => {
  const { homepage } = useHomepageContext()
  const { tabs } = homepage?.attributes ?? {}

  const filters = { ...officialBoardListDefaultFilters, pageSize: -1 }

  // TODO handle loading and errors properly
  const {
    data: officialBoardData,
    isLoading,
    isError,
    // error,
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

  const RESULTS_UPPER_BOUNDARY = 4
  const documents = officialBoardData?.slice(0, RESULTS_UPPER_BOUNDARY) || []

  return (
    <TabPanel id="OfficialBoard">
      <div className="mt-8 flex flex-col gap-y-10 lg:mt-14">
        <ul className="flex flex-col rounded-lg border-2 py-2" data-cy="official-board-results">
          {/* TODO we used basic spinner and text here, but it should be done with nicer design */}
          {isLoading ? (
            <li>
              <LoadingSpinner />
            </li>
          ) : isError ? (
            // TODO translation
            <li>
              <Typography type="p">Nepodarilo sa načítať dáta z úradnej tabule.</Typography>
            </li>
          ) : (
            documents.map((document, index) => (
              <li key={document.uniqueId}>
                <SearchResultCard
                  data={{ ...document }}
                  hideBottomDivider={index === RESULTS_UPPER_BOUNDARY - 1}
                />
              </li>
            ))
          )}
        </ul>
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
