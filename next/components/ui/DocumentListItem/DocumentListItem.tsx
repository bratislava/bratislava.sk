import { ArrowRight, ChevronRight, Download } from '../../../assets/images'
import Button from '../Button/Button'
import truncate from 'lodash/truncate'

interface DocumentListItemProps {
  categoryName: string
  discription: string
  Icon: string
  count: number
  onClick: Function
  id: string
}

export const DocumentListItem = ({ categoryName, discription, Icon, count, onClick, id }: DocumentListItemProps) => {
  return (
    <div className="flex w-full min-w-[280px] flex-col md:flex-row shadow-md bg-white mb-1 rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center w-full">
        <div className="md:justify-center flex py-4 pb-0 lg:py-10 lg:pb-10 px-4 lg:px-12">
          <Icon />
        </div>
        <div className="flex justify-start flex-col px-4 py-3 lg:px-8 lg:py-10 lg:pl-0 flex-[4]">
          <div className="text-xs lg:text-sm">{categoryName}</div>
          <div className="text-sm lg:text-default font-semibold text-truncate-2">{truncate(discription, { length: 150 })}</div>
          <div className="text-xs lg:text-sm pt-4"> Počet dokumentov: {count}</div>
        </div>
      </div>
      <div className="flex items-center md:justify-evenly justify-between md:py-11 pl-5 md:px-2 py-4 md:basis-[300px] md:grow-0 shrink-0 bg-zinc-50">
        <div>
          <Button
            className="underline text-font text-sm lg:text-default font-semibold"
            shape="none"
            variant="muted"
            icon={<ChevronRight />}
            hoverIcon={<ArrowRight />}
            onClick={() => onClick(id)}
          >
            Zobraziť
          </Button>
        </div>
        <div className="pr-6 md:pr-0 text-primary lg:text-font">
          <Download />
        </div>
      </div>
    </div>
  )
}
