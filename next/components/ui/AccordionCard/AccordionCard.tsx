// @ts-strict-ignore
import cx from 'classnames'

import Mail from '../../../assets/images/mail.svg'
import Phone from '../../../assets/images/phone-small.svg'
import TownHall from '../../../assets/images/town-hall.svg'
import TownHallSmall from '../../../assets/images/town-hall-small.svg'
import { Panel } from '../Panel/Panel'

export interface AccordionCardProps {
  displayName: string
  jobTitle: string
  businessPhones?: string[]
  mobilePhone?: string
  mail: string
  heading?: boolean
  className?: string
}

export const AccordionCard = ({
  displayName,
  jobTitle,
  businessPhones,
  mobilePhone,
  mail,
  heading,
  className,
}: AccordionCardProps) => {
  const mailUserName = mail?.split('@').at(0)
  const mailOrganization = mail && `@${mail?.split('@').at(1)}`
  const mailBreakpoint = 16
  return (
    /* TODO min-w-70 does not work anymore (worked fine on monorepo) */
    displayName && jobTitle ? (
      <Panel className={cx(className, 'flex flex-col py-8 px-6 min-w-[280px] max-w-87')}>
        <div className="text-h4 pb-2">{displayName}</div>
        <div className="pb-6 text-xs text-gray-dark lg:text-sm">{jobTitle}</div>
        <div className="flex justify-between">
          <div>
            <div className="flex gap-x-4 pb-3">
              {!heading && <Phone className="hidden xl:flex" />}
              {businessPhones?.length > 0
                ? businessPhones.map((phone) => (
                    <div key={phone} className="flex items-center text-sm font-semibold text-red-brick">
                      {phone}
                    </div>
                  ))
                : mobilePhone && (
                    <div className="flex items-center text-sm font-semibold text-red-brick">{mobilePhone}</div>
                  )}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-x-4">
                {!heading && <Mail className="hidden xl:flex" />}
                <div className="text-xs font-semibold text-red-brick underline underline-offset-2 lg:text-sm">
                  <div className="flex lg:hidden">{mailUserName + mailOrganization}</div>
                  <div className="hidden lg:flex">
                    {mailUserName?.length > mailBreakpoint ? mailUserName : mailUserName + mailOrganization}
                  </div>
                </div>
              </div>
              {mailUserName?.length > mailBreakpoint && (
                <div className=" hidden text-xs font-semibold text-red-brick underline underline-offset-2 lg:flex lg:text-sm xl:pl-12">
                  {mailOrganization}
                </div>
              )}
            </div>
          </div>

          {heading && (
            <>
              <TownHall className="hidden lg:flex" />
              <TownHallSmall className="-mr-2 flex lg:hidden" />
            </>
          )}
        </div>
      </Panel>
    ) : null
  )
}
