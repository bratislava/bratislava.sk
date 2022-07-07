import cx from 'classnames'

import { Tooltip } from '../Tooltip/Tooltip'

export type TTicketType = {
  type: string
  title: string
  price: number
  tooltip?: string
}

export interface TicketTypeCardsProps {
  className?: string
  title?: string
  ticketTypes?: TTicketType[]
}

export const TicketTypeCards = ({ className, title, ticketTypes }: TicketTypeCardsProps) => (
  <div className={cx(className, 'flex flex-col space-y-4')}>
    <span className="w-full text-md font-bold">{title}</span>
    {ticketTypes?.map((ticketType) => (
      <div key={ticketType.type} className="flex w-full flex-row">
        <div className="flex w-11/12 max-w-lg flex-row md:w-1/2">
          <div className="h-full w-full flex-row rounded-l-lg border-2 border-primary bg-white py-4 pl-6 text-base sm:text-default md:w-4/6 ">
            {ticketType.title}
          </div>
          <div className="flex h-full w-2/6 items-center justify-center rounded-r-md bg-primary py-4 text-white">
            {ticketType.price} €
          </div>
        </div>
        {ticketType.tooltip && (
          <div className="flex w-1/12 items-center pl-6 md:w-1/2">
            <Tooltip content={ticketType.tooltip} />
          </div>
        )}
      </div>
    ))}
  </div>
)

export default TicketTypeCards
