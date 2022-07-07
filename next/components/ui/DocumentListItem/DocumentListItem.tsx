import truncate from 'lodash/truncate'

import { ArrowRight, ChevronRight, Download } from '../../../assets/images'
import Button from '../Button/Button'

interface DocumentListItemProps {
  categoryName: string
  title: string
  Icon: string
  count: number
  onClick: Function
  mainDocumentHref?: string
  id: string
}

export const DocumentListItem = ({
  categoryName,
  title,
  Icon,
  count,
  onClick,
  id,
  mainDocumentHref,
}: DocumentListItemProps) => {
  return (
    <div className="mb-1 flex w-full min-w-[280px] flex-col overflow-hidden rounded-lg bg-white shadow-md md:flex-row">
      <div className="flex w-full flex-col md:flex-row md:items-center">
        <div className="flex p-4 pb-0 md:justify-center lg:py-10 lg:px-12">
            <Icon />
        </div>
        <div className="flex flex-[4] flex-col justify-start px-4 py-3 lg:px-8 lg:py-10 lg:pl-0">
            <div className="text-xs lg:text-sm">{categoryName}</div>
            <div className="text-truncate-2 text-sm font-semibold lg:text-default">{truncate(title, { length: 150 })}</div>
            <div className="pt-4 text-xs lg:text-sm"> Počet dokumentov: {count}</div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between bg-zinc-50 py-4 pl-5 md:grow-0 md:basis-[300px] md:justify-evenly md:py-11 md:px-2">
        <div>
          <Button
            className="text-sm font-semibold text-font underline lg:text-default"
            shape="none"
            variant="muted"
            icon={<ChevronRight />}
            hoverIcon={<ArrowRight />}
            onClick={() => onClick(id)}
          >
            Zobraziť
          </Button>
        </div>

        {mainDocumentHref && (
          <div className="pr-6 text-primary md:pr-0 lg:text-font">
            <a href={mainDocumentHref} download>
              <Download />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
