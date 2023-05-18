import Mail from '@assets/images/mail.svg'
import Phone from '@assets/images/phone-small.svg'
import TownHall from '@assets/images/town-hall.svg'
import TownHallSmall from '@assets/images/town-hall-small.svg'
import { Panel } from '@bratislava/ui-bratislava/Panel/Panel'
import cx from 'classnames'

export interface OrganizationalStructureAccordionCardProps {
  displayName: string
  jobTitle: string
  businessPhones?: string[]
  mobilePhone?: string
  mail: string
  otherMails?: string[]
  heading?: boolean
  className?: string
}

export const OrganizationalStructureAccordionCard = ({
  displayName,
  jobTitle,
  businessPhones,
  mobilePhone,
  mail,
  otherMails,
  heading,
  className,
}: OrganizationalStructureAccordionCardProps) => {
  const mailToParse = otherMails?.length ? otherMails[0] : mail
  const mailUserName = mailToParse?.split('@').at(0)
  const mailOrganization = mail && `@${mail?.split('@').at(1)}`
  const mailBreakpoint = 16

  return (
    // TODO min-w-70 does not work anymore (worked fine on monorepo)
    // TODO: MSGraphFilteredGroupUser ignores '| null' in properties
    displayName && jobTitle ? (
      <Panel className={cx(className, 'min-w-66 max-w-88 flex flex-col px-6 py-8')} overflowVisible>
        <h4 className="text-h4 pb-2">{displayName}</h4>
        <div className="text-small lg:text-default pb-6 text-font/75">{jobTitle}</div>
        <div className="flex justify-between">
          <div>
            <div className="flex gap-x-4 pb-3">
              {!heading && <Phone className="max-md:hidden" />}
              {businessPhones?.length
                ? businessPhones.map((phone) => (
                    <div key={phone} className="text-default flex items-center font-semibold">
                      {phone}
                    </div>
                  ))
                : mobilePhone && (
                    <div className="text-default flex items-center font-semibold">
                      {mobilePhone}
                    </div>
                  )}
            </div>
            <div className="flex flex-col">
              <div className="flex gap-x-4">
                {!heading && <Mail className="max-md:hidden" />}
                <div className="text-small lg:text-default font-semibold underline underline-offset-2">
                  <div className="flex lg:hidden">{mailUserName + mailOrganization}</div>
                  <div className="hidden lg:flex">
                    {mailUserName && mailUserName.length > mailBreakpoint
                      ? mailUserName
                      : mailUserName + mailOrganization}
                  </div>
                </div>
              </div>
              {mailUserName && mailUserName?.length > mailBreakpoint && (
                <div className="text-small lg:text-default hidden font-semibold underline underline-offset-2 lg:flex xl:pl-12">
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
