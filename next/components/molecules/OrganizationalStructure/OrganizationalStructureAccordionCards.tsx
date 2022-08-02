import { AccordionCard, HorizontalScrollWrapper } from '@bratislava/ui-bratislava'
import { useMemo } from 'react'
import { MSGraphFilteredGroupUser } from 'services/ms-graph'

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
      <HorizontalScrollWrapper className="my-8 -ml-7.5 flex w-screen gap-x-5 px-7.5 lg:hidden">
        {cards}
      </HorizontalScrollWrapper>
      <div className="my-8 hidden w-full grid-cols-3 gap-y-8 gap-x-7.5 lg:grid">{cards}</div>
    </>
  )
}
