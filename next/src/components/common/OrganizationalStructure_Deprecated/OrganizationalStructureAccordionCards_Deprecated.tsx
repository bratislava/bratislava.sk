import { useMemo } from 'react'

import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import OrganizationalStructureAccordionCard from '@/src/components/common/OrganizationalStructure_Deprecated/OrganizationalStructureAccordionCard_Deprecated'
import { MSGraphFilteredGroupUser } from '@/src/services/ms-graph/types'

export type OrganizationalStructureAccordionCardsProps = {
  users: MSGraphFilteredGroupUser[]
}

const OrganizationalStructureAccordionCards = ({
  users,
}: OrganizationalStructureAccordionCardsProps) => {
  const cards = useMemo(
    () =>
      users.map((user) => {
        const mail = user.otherMails?.length ? user.otherMails[0] : user.mail

        return (
          <OrganizationalStructureAccordionCard
            className="h-full"
            key={user.id}
            displayName={user.displayName ?? ''}
            jobTitle={user.jobTitle}
            mail={mail}
          />
        )
      }),
    [users],
  )
  return (
    <>
      <ResponsiveCarousel className="md:hidden" items={cards} />
      <div className="my-8 hidden w-full gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">{cards}</div>
    </>
  )
}

export default OrganizationalStructureAccordionCards
