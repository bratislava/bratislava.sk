import Button from '../Button/Button'
import Panel from '../Panel/Panel'
import ChevronRight from '../../../assets/images/chevron-right-small.svg'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import Download from '../../../assets/images/download-document.svg'

export interface DocumentCardProps {
  title: string
  createdAt: string
  fileExtension: string
  fileSize: string
  content: string
  className?: string
  viewButtonText: string
  downloadButtonText: string
}

export const DocumentCard = ({
  title,
  createdAt,
  fileExtension,
  fileSize,
  content,
  className,
  viewButtonText,
  downloadButtonText,
}: DocumentCardProps) => {
  return (
    <Panel className={className}>
      <div className="w-full flex flex-col pt-6 lg:pt-8 lg:pb-6 px-4 lg:px-10 gap-y-5">
        <div className="-mb-3 text-default font-semibold">{title}</div>
        <div className="flex flex-col lg:flex-row text-xs gap-x-6 text-gray-dark">
          <div>{createdAt}</div>
          <div>{`${fileExtension}; ${fileSize}`}</div>
        </div>
        <div>{content}</div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-x-6">
          <Button
            variant="secondaryDarkText"
            className="px-6 py-4 text-sm font-medium shadow-none w-fit hover:bg-primary hover:text-white hover:color-white"
            icon={<ChevronRight />}
            hoverIcon={<ArrowRight />}
          >
            {viewButtonText}
          </Button>
          <Button variant="full-transparent" className="px-6 py-4 text-sm font-medium shadow-none" icon={<Download />}>
            {downloadButtonText}
          </Button>
        </div>
      </div>
      <div className="flex lg:hidden bg-red-superlight h-[86px] -mt-[86px]" />
    </Panel>
  )
}
