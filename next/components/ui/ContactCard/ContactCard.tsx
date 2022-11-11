import cx from 'classnames'
import { useTranslation } from 'next-i18next'

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
}: ContactCardProps) => {
  const { t } = useTranslation()

  return (
    <div className={cx(className, 'flex flex-col items-center md:flex-row md:space-x-14')}>
      <div className="flex items-center">{image && <img src={image} alt="Kontakt" width="120" height="120" />}</div>

      <div className="flex flex-col items-center  justify-center md:items-start">
        <h1 className="text-h4 mb-4 mt-2">{name}</h1>
        <span className="text-p2">{telephoneNumber}</span>
        <Button className="mt-5 h-11 py-2 px-6 text-button-1 font-medium">{t('writeEmail')}</Button>
      </div>
    </div>
  )
}

export default ContactCard
