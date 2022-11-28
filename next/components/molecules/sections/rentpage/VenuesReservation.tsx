import { ContactCard, ContactCardProps, WeddingCard, WeddingCardProps } from '@bratislava/ui-bratislava'
import cx from 'classnames'

export interface IProps {
  className?: string
  title?: string
  telephoneNumber?: string
  contactCards?: ContactCardProps[]
  weddingCards?: WeddingCardProps[]
}

export const VenuesReservation = ({ className, title, telephoneNumber, contactCards, weddingCards }: IProps) => (
  <div className={cx(className, 'flex items-center flex-col')}>
    <span className="text-h2 w-96 px-5 text-center">{title}</span>

    <span className="text-h1-normal mt-7"> {telephoneNumber}</span>

    <div className="mt-10 grid grid-cols-2 gap-x-52 gap-y-10">
      {contactCards && contactCards.map((contactCard) => <ContactCard key={contactCard.name} {...contactCard} />)}
    </div>
    <div className="mt-24 grid grid-cols-1 gap-y-16">
      {weddingCards && weddingCards.map((svadbaCard) => <WeddingCard key={svadbaCard.title} {...svadbaCard} />)}
    </div>
  </div>
)

export default VenuesReservation
