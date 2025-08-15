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
  const {
    title,
    description,
    titleLevelContactsSection: titleLevel,
    addressContacts,
    openingHoursContacts,
    emailContacts,
    phoneContacts,
    webContacts,
    postalAddressContacts,
    billingInfoContacts,
    bankConnectionContacts,
    directionsContact,
    personContacts,
  } = section

  const contacts = [
    ...mapSection(addressContacts, ContactCtaCardType.Address),
    ...mapSection(openingHoursContacts, ContactCtaCardType.OpeningHours),
    ...mapSection(emailContacts, ContactCtaCardType.Email),
    ...mapSection(phoneContacts, ContactCtaCardType.Phone),
    ...mapSection(webContacts, ContactCtaCardType.Web),
    ...mapSection(postalAddressContacts, ContactCtaCardType.PostalAddress),
    ...mapSection(billingInfoContacts, ContactCtaCardType.BillingInfo),
    ...mapSection(bankConnectionContacts, ContactCtaCardType.BankConnection),
  ]

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-gray-100 p-4 lg:gap-8 lg:p-8">
      <SectionHeader title={title} titleLevel={titleLevel} text={description} asRichtext />

      <div className="flex flex-col gap-6 lg:gap-8">
        {contacts.map((contact, index) => (
          <ContactCtaCard
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            contact={contact}
          />
        ))}
        {personContacts?.filter(isDefined).map((person, index) => (
          <ContactCtaCard
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            contact={{
              type: 'Person',
              ...person,
            }}
          />
        ))}
        {directionsContact ? (
          <ContactCtaCard
            contact={{
              type: 'Directions',
              ...directionsContact,
            }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Contacts
