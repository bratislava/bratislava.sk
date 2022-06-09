import { DocumentCard, DocumentCardProps } from '../DocumentCard/DocumentCard'
import Divider from '../Divider/Divider'
import Pagination from '../Pagination/Pagination'
import { useState } from 'react'

interface DocumentProps {
  title: string
  createdAt: string
  fileExtension: string
  fileSize: string
  content: string
}
export interface DocumentCardsProps {
  documents: DocumentProps[]
  dividerStyle?: string
  title: string
  viewButtonText: string
  downloadButtonText: string
}
export const DocumentCards = ({
  documents,
  dividerStyle,
  title,
  viewButtonText,
  downloadButtonText,
}: DocumentCardsProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPageDesktop = 14
  const itemsPerPageMobile = 10
  const currentItemsCountDesktop = documents.length - (currentPage - 1) * itemsPerPageDesktop
  const currentItemsCountMobile = documents.length - (currentPage - 1) * itemsPerPageMobile
  const dividerBreakpointDesktop = itemsPerPageDesktop / 2
  const dividerBreakpointMobile = itemsPerPageMobile / 2
  const dividerBugSolved = false
  return (
    <div className="flex flex-col gap-y-5 lg:gap-y-6">
      <div className="text-default lg:text-md font-medium">{title}</div>
      <div className="hidden lg:flex flex-col">
        <div className="flex flex-col gap-y-5 pb-14">
          {documents
            .slice((currentPage - 1) * itemsPerPageDesktop, currentPage * itemsPerPageDesktop)
            .map((doc, index) => (
              <div key={index}>
                <DocumentCard {...doc} viewButtonText={viewButtonText} downloadButtonText={downloadButtonText} />
                {dividerBugSolved &&
                  index == dividerBreakpointDesktop - 1 &&
                  currentItemsCountDesktop > dividerBreakpointDesktop && (
                    <Divider className="py-24" dividerStyle={dividerStyle} />
                  )}
              </div>
            ))}
        </div>
        <Pagination
          itemsPerPage={itemsPerPageDesktop}
          totalCount={documents.length}
          currentPage={currentPage}
          pageHandler={setCurrentPage}
        />
      </div>
      <div className="flex flex-col lg:hidden">
        <div className="flex flex-col gap-y-6 pb-14">
          {documents
            .slice((currentPage - 1) * itemsPerPageMobile, currentPage * itemsPerPageMobile)
            .map((doc, index) => (
              <div key={index}>
                <DocumentCard {...doc} viewButtonText={viewButtonText} downloadButtonText={downloadButtonText} />
                {dividerBugSolved &&
                  index == dividerBreakpointMobile - 1 &&
                  currentItemsCountMobile > dividerBreakpointMobile && (
                    <Divider className="py-10" dividerStyle={dividerStyle} />
                  )}
              </div>
            ))}
        </div>
        <Pagination
          itemsPerPage={itemsPerPageMobile}
          totalCount={documents.length}
          currentPage={currentPage}
          pageHandler={setCurrentPage}
        />
      </div>
    </div>
  )
}
