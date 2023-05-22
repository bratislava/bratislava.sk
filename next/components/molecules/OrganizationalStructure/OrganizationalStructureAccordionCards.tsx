import { OrganizationalStructureAccordionCard } from '@components/molecules/OrganizationalStructure/OrganizationalStructureAccordionCard'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
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
        <OrganizationalStructureAccordionCard
          className="h-full"
          key={user.id}
          displayName={user.displayName ?? ''}
          jobTitle={user.jobTitle ?? ''}
          businessPhones={user.businessPhones}
          // mobilePhone omitted on request - add to api response as well if needed
          mail={user.mail ?? ''}
          otherMails={user.otherMails}
        />
      )),
    [users],
  )
  return (
    <>
      <ResponsiveCarousel className="md:hidden" items={cards} />
      <div className="my-8 hidden w-full gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">{cards}</div>
    </>
  )
}
