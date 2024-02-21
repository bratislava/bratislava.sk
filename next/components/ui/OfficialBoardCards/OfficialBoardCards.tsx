import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import { Typography } from '@bratislava/component-library'
import Divider from '@components/ui/Divider/Divider'
import { OfficialBoardCard } from '@components/ui/OfficialBoardCard/OfficialBoardCard'
import Pagination from '@components/ui/Pagination/Pagination'
import { useEffect, useState } from 'react'

export interface OfficialBoardCardsProps {
  documents: ParsedOfficialBoardDocument[]
  dividerStyle?: string
  title: string
  viewButtonText: string
  query: string | string[]
}

export const OfficialBoardCards = ({
  documents,
  dividerStyle,
  title,
  viewButtonText,
  query,
}: OfficialBoardCardsProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPageDesktop = 14
  const itemsPerPageMobile = 10
  const currentItemsCountDesktop = documents.length - (currentPage - 1) * itemsPerPageDesktop
  const currentItemsCountMobile = documents.length - (currentPage - 1) * itemsPerPageMobile
  const dividerBreakpointDesktop = itemsPerPageDesktop / 2
  const dividerBreakpointMobile = itemsPerPageMobile / 2
  const dividerBugSolved = false

  useEffect(() => {
    if (query) {
      setCurrentPage(1)
    }
  }, [query])

  return (
    <div className="flex flex-col gap-y-5 lg:gap-y-6">
      <Typography type="h2">{title}</Typography>

      <div className="hidden flex-col lg:flex">
        <div className="flex flex-col gap-y-5 pb-14">
          {documents
            .slice((currentPage - 1) * itemsPerPageDesktop, currentPage * itemsPerPageDesktop)
            .map((doc, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <OfficialBoardCard {...doc} viewButtonText={viewButtonText} />
                {dividerBugSolved &&
                  index === dividerBreakpointDesktop - 1 &&
                  currentItemsCountDesktop > dividerBreakpointDesktop && (
                    <Divider className="py-24" dividerStyle={dividerStyle} />
                  )}
              </div>
            ))}
        </div>
        <Pagination
          totalCount={Math.ceil(documents.length / itemsPerPageDesktop)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
      <div className="flex flex-col lg:hidden">
        <div className="flex flex-col gap-y-6 pb-14">
          {documents
            .slice((currentPage - 1) * itemsPerPageMobile, currentPage * itemsPerPageMobile)
            .map((doc, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <OfficialBoardCard {...doc} viewButtonText={viewButtonText} />
                {dividerBugSolved &&
                  index === dividerBreakpointMobile - 1 &&
                  currentItemsCountMobile > dividerBreakpointMobile && (
                    <Divider className="py-10" dividerStyle={dividerStyle} />
                  )}
              </div>
            ))}
        </div>
        <Pagination
          totalCount={Math.ceil(documents.length / itemsPerPageDesktop)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
