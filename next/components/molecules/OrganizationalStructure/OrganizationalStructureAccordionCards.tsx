// @ts-strict-ignore
import { AccordionCard, HorizontalScrollWrapper } from '@bratislava/ui-bratislava'
import { MSGraphFilteredGroupUser } from 'backend/services/ms-graph'
import { useMemo } from 'react'

export interface OrganizationalStructureAccordionCardsProps {
  users: MSGraphFilteredGroupUser[]
}

export const OrganizationalStructureAccordionCards = ({
  users,
}: OrganizationalStructureAccordionCardsProps) => {
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
          otherMails={user.otherMails}
        />
      )),
    [users],
  )
  return (
    <>
      <HorizontalScrollWrapper className="my-8 -ml-8 flex w-screen gap-x-5 px-8 lg:hidden">
        {cards}
      </HorizontalScrollWrapper>
      <div className="my-8 hidden w-full grid-cols-3 gap-8 lg:grid">{cards}</div>
    </>
  )
}
