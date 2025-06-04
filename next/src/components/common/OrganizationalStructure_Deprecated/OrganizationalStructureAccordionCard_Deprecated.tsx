import { Typography } from '@bratislava/component-library'
import { twMerge } from 'tailwind-merge'

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
  return (
    // TODO: MSGraphFilteredGroupUser ignores '| null' in properties
    displayName && jobTitle ? (
      <div
        className={twMerge(
          'flex flex-col rounded-lg border-2 bg-white p-4 wrap-break-word lg:p-5',
          className,
        )}
      >
        <Typography variant="h5" className="pb-2" data-cy="structure-accordion-card-name">
          {displayName}
        </Typography>
        <Typography variant="p-default" className="pb-6" data-cy="structure-accordion-card-job">
          {jobTitle}
        </Typography>
        {mail ? (
          <Typography
            variant="p-default"
            className="font-semibold"
            data-cy="structure-accordion-card-email"
          >
            {mail}
          </Typography>
        ) : null}
      </div>
    ) : null
  )
}

export default OrganizationalStructureAccordionCard
