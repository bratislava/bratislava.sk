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
  otherMails?: string[]
  heading?: boolean
  className?: string
}

export const AccordionCard = ({
  displayName,
  jobTitle,
  businessPhones,
  mobilePhone,
  mail,
  otherMails,
  heading,
  className,
}: AccordionCardProps) => {
  const mailToParse = otherMails?.length > 0 ? otherMails[0] : mail
  const mailUserName = mailToParse?.split('@').at(0)
  const mailOrganization = mail && `@${mail?.split('@').at(1)}`
  const mailBreakpoint = 16

  return (
    // TODO min-w-70 does not work anymore (worked fine on monorepo)
    // TODO: MSGraphFilteredGroupUser ignores '| null' in properties
    displayName && jobTitle ? (
      <Panel className={cx(className, 'min-w-66 max-w-88 flex flex-col py-8 px-6')} overflowVisible>
        <div className="text-h4 pb-2">{displayName}</div>
        <div className="text-font/75 text-p3 lg:text-p2 pb-6">{jobTitle}</div>
        <div className="flex justify-between">
          <div>
            <div className="flex gap-x-4 pb-3">
              {!heading && <Phone className="hidden xl:flex" />}
              {businessPhones?.length > 0
                ? businessPhones.map((phone) => (
                    <div key={phone} className="text-red-brick text-p2-semibold flex items-center">
                      {phone}
                    </div>
                  ))
                : mobilePhone && (
                    <div className="text-red-brick text-p2-semibold flex items-center">
                      {mobilePhone}
                    </div>
                  )}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-x-4">
                {!heading && <Mail className="hidden xl:flex" />}
                <div className="text-red-brick text-p3-semibold lg:text-p2-semibold underline underline-offset-2">
                  <div className="flex lg:hidden">{mailUserName + mailOrganization}</div>
                  <div className="hidden lg:flex">
                    {mailUserName?.length > mailBreakpoint
                      ? mailUserName
                      : mailUserName + mailOrganization}
                  </div>
                </div>
              </div>
              {mailUserName?.length > mailBreakpoint && (
                <div className="text-red-brick text-p3-semibold lg:text-p2-semibold hidden underline underline-offset-2 lg:flex xl:pl-12">
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
