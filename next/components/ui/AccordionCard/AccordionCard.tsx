import Panel from '../Panel/Panel'
import Phone from '../../../assets/images/phone-small.svg'
import Mail from '../../../assets/images/mail.svg'
import TownHall from '../../../assets/images/town-hall.svg'
import TownHallSmall from '../../../assets/images/town-hall-small.svg'
import cx from 'classnames'

export interface AccordionCardProps {
  id: string
  title: string
  subtitle: string
  phone: string
  email: string
  heading?: boolean
  className?: string
}

export const AccordionCard = ({ id, title, subtitle, phone, email, heading, className }: AccordionCardProps) => {
  return (
    <Panel className={cx(className, 'flex flex-col py-8 px-6 min-w-70 max-w-87')}>
      <div className="text-sm lg:text-md font-semibold pb-2">{title}</div>
      <div className="text-gray-dark text-xs lg:text-sm pb-6">{subtitle}</div>
      <div className="flex justify-between">
        <div>
          <div className="flex gap-x-4 pb-3">
            {!heading && <Phone className="hidden xl:flex" />}
            <div className="font-semibold text-red-brick text-sm flex items-center">{phone}</div>
          </div>
          <div className="flex gap-x-4">
            {!heading && <Mail className="hidden xl:flex" />}
            <div className="font-semibold text-red-brick text-xs lg:text-sm underline underline-offset-2">{email}</div>
          </div>
        </div>

        {heading && (
          <>
            <TownHall className="hidden lg:flex" />
            <TownHallSmall className="flex lg:hidden -mr-2" />
          </>
        )}
      </div>
    </Panel>
  )
}
