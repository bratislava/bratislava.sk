import OrganizationalStructureAccordionCard from '@/src/components/common/OrganizationalStructure_Deprecated/OrganizationalStructureAccordionCard_Deprecated'
import { MSGraphFilteredGroupUser } from '@/src/services/ms-graph/types'

export type OrganizationalStructureAccordionCardsProps = {
  users: MSGraphFilteredGroupUser[]
}

const OrganizationalStructureAccordionCards = ({
  users,
}: OrganizationalStructureAccordionCardsProps) => {
  return (
    <ul className="my-8 flex w-full flex-col gap-3 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {users.map((user) => {
        const mail = user.otherMails?.length ? user.otherMails[0] : user.mail

        return (
          <li key={user.id} className="h-full">
            <OrganizationalStructureAccordionCard
              className="h-full"
              displayName={user.displayName ?? ''}
              jobTitle={user.jobTitle}
              mail={mail}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default OrganizationalStructureAccordionCards
