import React from 'react'

import ContactCtaCard, { ContactCtaCardType } from '@/src/components/cards/ContactCtaCard'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { ContactCardBlockFragment, ContactsSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type ContactsProps = {
  section: ContactsSectionFragment
}

const mapSection = (
  array: (ContactCardBlockFragment | null | undefined)[] | null | undefined,
  type: ContactCtaCardType,
) => array?.filter(isDefined).map((contact) => ({ type, ...contact })) ?? []

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?type=design&node-id=8988-24516&t=ZrNmOvM307DSHwAu-0
 */

const Contacts = ({ section }: ContactsProps) => {
  const contacts = [
    ...mapSection(section.addressContacts, ContactCtaCardType.Address),
    ...mapSection(section.openingHoursContacts, ContactCtaCardType.OpeningHours),
    ...mapSection(section.emailContacts, ContactCtaCardType.Email),
    ...mapSection(section.phoneContacts, ContactCtaCardType.Phone),
    ...mapSection(section.webContacts, ContactCtaCardType.Web),
  ]

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-gray-100 p-4 lg:gap-8 lg:p-8">
      <SectionHeader title={section.title} text={section.description} asRichtext />

      <div className="flex flex-col gap-6 lg:gap-8">
        {contacts.map((contact, index) => (
          <ContactCtaCard
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            contact={contact}
          />
        ))}
        {section.personContacts?.filter(isDefined).map((person, index) => (
          <ContactCtaCard
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            contact={{
              type: 'Person',
              ...person,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Contacts
