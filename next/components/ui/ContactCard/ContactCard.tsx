import cx from 'classnames';
import { Button } from '../Button/Button';
import ContactImage from '../../assets/images/contact.svg';

export interface ContactCardProps {
  className?: string;
  image?: string;
  name?: string;
  telephoneNumber?: string;
}

export const ContactCard = ({
  className,
  image = ContactImage,
  name = 'Igor Cehlárik',
  telephoneNumber = '0902 985 844',
}: ContactCardProps) => (
  <div
    className={cx(
      className,
      'flex flex-col items-center md:flex-row md:space-x-14'
    )}
  >
    <div className="flex items-center">
      {image && <img src={image} alt="Kontakt" width="120" height="120" />}
    </div>

    <div className="flex flex-col items-center  md:items-start justify-center">
      <h1 className="text-md mb-4 mt-2">{name}</h1>
      <span className="text-sm">{telephoneNumber}</span>
      <Button className="mt-5 py-2 px-6 text-default font-medium h-11">
        Napísať e-mail
      </Button>
    </div>
  </div>
);

export default ContactCard;
