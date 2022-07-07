import cx from 'classnames'

import ContactImage from '../../../assets/images/contact.svg'
import { Button } from '../Button/Button'

export interface ContactCardProps {
  className?: string
  image?: string
  name?: string
  telephoneNumber?: string
}

export const ContactCard = ({
  className,
  // TODO fix types
  image = ContactImage as any,
  name = 'Igor Cehlárik',
  telephoneNumber = '0902 985 844',
}: ContactCardProps) => (
  <div className={cx(className, 'flex flex-col items-center md:flex-row md:space-x-14')}>
    <div className="flex items-center">{image && <img src={image} alt="Kontakt" width="120" height="120" />}</div>

    <div className="flex flex-col items-center  justify-center md:items-start">
      <h1 className="mb-4 mt-2 text-md">{name}</h1>
      <span className="text-sm">{telephoneNumber}</span>
      <Button className="mt-5 h-11 py-2 px-6 text-default font-medium">Napísať e-mail</Button>
    </div>
  </div>
)

export default ContactCard
