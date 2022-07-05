import { ArrowRight, ChevronRight, Download } from '../../../assets/images'
import Button from '../Button/Button'
import truncate from 'lodash/truncate'

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
    <div className="flex md:w-full min-w-[280px] md:items-center flex-col md:flex-row shadow-md bg-white mb-1">
      <div className="flex-1 md:justify-center flex py-5 pl-6">
        <Icon />
      </div>
      <div className="flex justify-start flex-col px-5 pb-3 flex-[4]">
        <div className="text-xs">{categoryName}</div>
        <div className="text-sm font-semibold text-truncate-2">{truncate(title, { length: 150 })}</div>
        <div className="text-xs pt-3"> Počet dokumentov: {count}</div>
      </div>
      <div className="flex items-center md:justify-evenly justify-between md:py-11 pl-5 md:px-2 py-4 flex-[2] bg-zinc-50">
        <div>
          <Button
            className="underline text-font"
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
          <div className="pr-6 md:pr-0">
            <a href={mainDocumentHref} download>
              <Download />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
