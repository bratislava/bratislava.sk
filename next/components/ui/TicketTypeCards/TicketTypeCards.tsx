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
    <span className="w-full font-bold text-md">{title}</span>
    {ticketTypes?.map((ticketType) => (
      <div key={ticketType.type} className="w-full flex flex-row">
        <div className="w-11/12 md:w-1/2 max-w-lg flex flex-row">
          <div className="w-full md:w-4/6 h-full bg-white py-4 pl-6 flex-row border-2 border-primary text-base sm:text-default rounded-l-lg ">
            {ticketType.title}
          </div>
          <div className="w-2/6 h-full flex bg-primary py-4 text-white justify-center items-center rounded-r-md">
            {ticketType.price} €
          </div>
        </div>
        {ticketType.tooltip && (
          <div className="w-1/12 md:w-1/2 flex items-center pl-6">
            <Tooltip content={ticketType.tooltip} />
          </div>
        )}
      </div>
    ))}
  </div>
)

export default TicketTypeCards
