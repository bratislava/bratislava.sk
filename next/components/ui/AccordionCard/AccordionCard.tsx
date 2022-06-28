import Panel from '../Panel/Panel'
import Phone from '../../../assets/images/phone-small.svg'
import Mail from '../../../assets/images/mail.svg'
import TownHall from '../../../assets/images/town-hall.svg'
import TownHallSmall from '../../../assets/images/town-hall-small.svg'
import cx from 'classnames'

export interface AccordionCardProps {
  id: string
  displayName: string
  jobTitle: string
  businessPhones?: string[]
  mobilePhone?: string
  mail: string
  heading?: boolean
  className?: string
}

export const AccordionCard = ({
  id,
  displayName,
  jobTitle,
  businessPhones,
  mobilePhone,
  mail,
  heading,
  className,
}: AccordionCardProps) => {
  return (
    /* min-w-70 does not work anymore (worked fine on monorepo) */
    <>
      {displayName && (
        <Panel className={cx(className, 'flex flex-col py-8 px-6 min-w-[280px] max-w-87')}>
          <div className="text-sm lg:text-md font-semibold pb-2">{displayName}</div>
          <div className="text-gray-dark text-xs lg:text-sm pb-6">{jobTitle}</div>
          <div className="flex justify-between">
            <div>
              <div className="flex gap-x-4 pb-3">
                {!heading && <Phone className="hidden xl:flex" />}
                {businessPhones?.length > 0
                  ? businessPhones.map((phone) => (
                      <div key={phone} className="font-semibold text-red-brick text-sm flex items-center">
                        {phone}
                      </div>
                    ))
                  : mobilePhone && (
                      <div className="font-semibold text-red-brick text-sm flex items-center">{mobilePhone}</div>
                    )}
              </div>
              <div className="flex gap-x-4">
                {!heading && <Mail className="hidden xl:flex" />}
                <div className="font-semibold text-red-brick text-xs lg:text-sm underline underline-offset-2">
                  {mail}
                </div>
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
      )}
    </>
  )
}
