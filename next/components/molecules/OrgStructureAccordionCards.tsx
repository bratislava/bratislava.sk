import { AccordionCard, HorizontalScrollWrapper } from '@bratislava/ui-bratislava'
import { OrgStructurePersonCard } from 'components/atoms/OrgStructurePersonCard'

export interface OrgStructureAccordionCardsProps {
  // TODO fix typing
  items: any[]
  emails?: { email: string }[]
  namesToOmit?: { name: string }[]
}

// accepts an optional list of email addresses, from which it constructs additional users to be placed on the top of the list
export const OrgStructureAccordionCards = ({ items, emails, namesToOmit }: OrgStructureAccordionCardsProps) => {
  const extraPeopleCards = emails?.map(({ email }) => <OrgStructurePersonCard email={email} />) ?? []
  const mappedEmails = emails?.map(({ email }) => email) ?? []
  const mappedNamesToOmit = namesToOmit?.map(({ name }) => name) ?? []
  // filter out those which we're already included in 'extraPeople' and those that shouldn't be included at all
  console.log(items)
  const filteredItems = items.filter(
    ({ mail, displayName }) => mappedEmails.indexOf(mail) === -1 && mappedNamesToOmit.indexOf(displayName) === -1
  )
  return (
    <>
      <HorizontalScrollWrapper className="-ml-7.5 flex w-screen gap-x-5 px-7.5 py-8 lg:hidden">
        {extraPeopleCards}
        {filteredItems.map((item) => (
          <AccordionCard key={item.id} {...item} />
        ))}
      </HorizontalScrollWrapper>
      <div className="hidden w-full grid-cols-3 gap-y-8 gap-x-7.5 lg:grid">
        {extraPeopleCards}
        {filteredItems.map((item) => (
          <AccordionCard key={item.id} {...item} />
        ))}
      </div>
    </>
  )
}
