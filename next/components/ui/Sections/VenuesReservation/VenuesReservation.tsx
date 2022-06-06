import cx from 'classnames';
import { ContactCard, ContactCardProps } from '../../ContactCard/ContactCard';
import { WeddingCard, WeddingCardProps } from '../../WeddingCard/WeddingCard';
export interface VenuesReservationProps {
  className?: string;
  title?: string;
  telephoneNumber?: string;
  contactCards?: ContactCardProps[];
  weddingCards?: WeddingCardProps[];
}

export const VenuesReservation = ({
  className,
  title,
  telephoneNumber,
  contactCards,
  weddingCards,
}: VenuesReservationProps) => (
  <div className={cx(className, 'flex items-center flex-col')}>
    <span className="font-semibold text-4xl w-96 px-5 text-center">
      {title}
    </span>

    <span className="mt-7 font-normal text-2xl"> {telephoneNumber}</span>

    <div className="grid grid-cols-2 gap-x-52 gap-y-10 mt-10">
      {contactCards &&
        contactCards.map((contactCard) => (
          <ContactCard key={contactCard.name} {...contactCard} />
        ))}
    </div>
    <div className="grid grid-cols-1 gap-y-16 mt-24">
      {weddingCards &&
        weddingCards.map((svadbaCard) => (
          <WeddingCard key={svadbaCard.title} {...svadbaCard} />
        ))}
    </div>
  </div>
);

export default VenuesReservation;
