import { Typography } from '@bratislava/component-library'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Fragment } from 'react'
import { TabPanel } from 'react-aria-components'

import Button from '@/src/components/common/Button/Button'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import SearchResultCard from '@/src/components/sections/SearchSection/SearchResultCard'
import { SearchResult } from '@/src/components/sections/SearchSection/useQueryBySearchOption'
import { CATEGORIES_TO_EXCLUDE_ON_HOMEPAGE } from '@/src/services/ginis/consts'
import {
  getOfficialBoardListQueryKey,
  officialBoardListDefaultFilters,
  officialBoardListFetcher,
} from '@/src/services/ginis/fetchers/officialBoardListFetcher'
import { base64Encode } from '@/src/utils/base64'
import { formatDate } from '@/src/utils/formatDate'
import { getLinkProps } from '@/src/utils/getLinkProps'

const TabPanelOfficialBoard = () => {
  const { t } = useTranslation()

  const { homepage } = useHomepageContext()
  const { tabs } = homepage ?? {}

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

  const documents = officialBoardData?.slice(0, 4) || []

  return (
    <TabPanel id="OfficialBoard">
      <div className="mt-8 flex flex-col gap-y-10 lg:mt-14">
        <ul
          className="flex flex-col rounded-lg border bg-background-primary py-2"
          data-cy="official-board-results"
        >
          {/* TODO we used basic spinner and text here, but it should be done with nicer design */}
          {isLoading ? (
            <li>
              <LoadingSpinner />
            </li>
          ) : isError ? (
            <li>
              <Typography variant="p-default">{t('TabPanelOfficialBoard.errorNoData')}</Typography>
            </li>
          ) : (
            documents.map((document, index) => (
              <Fragment key={document.uniqueId}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li>
                  <SearchResultCard data={document} />
                </li>
              </Fragment>
            ))
          )}
        </ul>
        {tabs?.officialBoardPageLink ? (
          <div className="flex justify-center">
            <Button
              variant="outline"
              data-cy="official-board-button"
              {...getLinkProps(tabs.officialBoardPageLink)}
            />
          </div>
        ) : null}
      </div>
    </TabPanel>
  )
}

export default TabPanelOfficialBoard
