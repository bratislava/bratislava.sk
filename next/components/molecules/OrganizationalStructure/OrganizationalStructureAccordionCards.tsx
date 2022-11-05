import { AccordionCard, HorizontalScrollWrapper } from '@bratislava/ui-bratislava'
import { MSGraphFilteredGroupUser } from 'backend/services/ms-graph'
import { useMemo } from 'react'

export interface OrganizationalStructureAccordionCardsProps {
  users: MSGraphFilteredGroupUser[]
}

export const OrganizationalStructureAccordionCards = ({ users }: OrganizationalStructureAccordionCardsProps) => {
  const cards = useMemo(
    () =>
      users.map((user) => (
        <AccordionCard
          key={user.id}
          displayName={user.displayName}
          jobTitle={user.jobTitle}
          businessPhones={user.businessPhones}
          // mobilePhone omitted on request - add to api response as well if needed
          mail={user.mail}
        />
      )),
    [users]
  )
  return (
    <>
      <HorizontalScrollWrapper className="-ml-7.5 px-7.5 flex w-screen gap-x-5 pt-4 pb-6 lg:hidden">
        {cards}
      </HorizontalScrollWrapper>
      <div className="gap-x-7.5 my-8 hidden w-full grid-cols-3 gap-y-8 lg:grid">{cards}</div>
    </>
  )
}
