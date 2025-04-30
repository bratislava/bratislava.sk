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
          'flex flex-col break-words rounded-lg border-2 bg-white p-4 lg:p-5',
          className,
        )}
      >
        <Typography type="h5" className="pb-2" data-cy="structure-accordion-card-name">
          {displayName}
        </Typography>
        <Typography type="p" className="pb-6" data-cy="structure-accordion-card-job">
          {jobTitle}
        </Typography>
        {mail ? (
          <Typography type="p" className="font-semibold" data-cy="structure-accordion-card-email">
            {mail}
          </Typography>
        ) : null}
      </div>
    ) : null
  )
}

export default OrganizationalStructureAccordionCard
