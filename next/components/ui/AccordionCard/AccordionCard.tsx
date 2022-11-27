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
    // TODO min-w-70 does not work anymore (worked fine on monorepo)
    // TODO: MSGraphFilteredGroupUser ignores '| null' in properties
    displayName && jobTitle ? (
      <Panel className={cx(className, 'flex flex-col py-8 px-6 min-w-66 max-w-88')}>
        <div className="text-h4 pb-2">{displayName}</div>
        <div className="text-font/75 pb-6 text-p3 lg:text-p2">{jobTitle}</div>
        <div className="flex justify-between">
          <div>
            <div className="flex gap-x-4 pb-3">
              {!heading && <Phone className="hidden xl:flex" />}
              {businessPhones?.length > 0
                ? businessPhones.map((phone) => (
                    <div key={phone} className="text-red-brick flex items-center text-p2-semibold">
                      {phone}
                    </div>
                  ))
                : mobilePhone && (
                    <div className="text-red-brick flex items-center text-p2-semibold">{mobilePhone}</div>
                  )}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-x-4">
                {!heading && <Mail className="hidden xl:flex" />}
                <div className="text-red-brick text-p3-semibold underline underline-offset-2 lg:text-p2-semibold">
                  <div className="flex lg:hidden">{mailUserName + mailOrganization}</div>
                  <div className="hidden lg:flex">
                    {mailUserName?.length > mailBreakpoint ? mailUserName : mailUserName + mailOrganization}
                  </div>
                </div>
              </div>
              {mailUserName?.length > mailBreakpoint && (
                <div className="text-red-brick hidden text-p3-semibold underline underline-offset-2 lg:flex lg:text-p2-semibold xl:pl-12">
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
