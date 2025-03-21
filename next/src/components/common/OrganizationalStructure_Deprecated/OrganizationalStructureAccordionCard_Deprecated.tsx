import { Typography } from '@bratislava/component-library'
import { twMerge } from 'tailwind-merge'

import Mail from '@/src/assets/images/mail.svg'

// TODO do not refactor, but rewrite from scratch

export type OrganizationalStructureAccordionCardProps = {
  displayName: string
  jobTitle: string | null
  mail?: string | null
  className?: string
}

const OrganizationalStructureAccordionCard = ({
  displayName,
  jobTitle,
  mail,
  className,
}: OrganizationalStructureAccordionCardProps) => {
  const [mailUserName, mailOrganization] = mail?.split('@') ?? ''
  const mailBreakpoint = 16

  return (
    // TODO: MSGraphFilteredGroupUser ignores '| null' in properties
    displayName && jobTitle ? (
      <div
        className={twMerge(
          'min-w-66 max-w-88 flex flex-col rounded-lg bg-white px-6 py-8 shadow',
          className,
        )}
      >
        <Typography type="h5" className="pb-2" data-cy="structure-accordion-card-name">
          {displayName}
        </Typography>
        <Typography type="p" className="pb-6" data-cy="structure-accordion-card-job">
          {jobTitle}
        </Typography>
        <div className="flex justify-between">
          <div className="flex flex-col">
            {mail && mailUserName && mailOrganization ? (
              <>
                <div className="flex gap-x-4">
                  <Mail className="max-md:hidden" />
                  <div className="text-small lg:text-default font-semibold">
                    <div className="flex lg:hidden" data-cy="structure-accordion-card-email-mobile">
                      {mail}
                    </div>
                    <div className="hidden lg:flex" data-cy="structure-accordion-card-email">
                      {mailUserName && mailUserName.length > mailBreakpoint ? mailUserName : mail}
                    </div>
                  </div>
                </div>
                {mailUserName?.length > mailBreakpoint && (
                  <div className="text-small lg:text-default hidden font-semibold lg:flex lg:pl-12">
                    @{mailOrganization}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    ) : null
  )
}

export default OrganizationalStructureAccordionCard
