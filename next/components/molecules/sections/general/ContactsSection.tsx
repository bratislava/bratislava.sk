import { ContactsSectionFragment } from '@backend/graphql'
import Contacts from '@components/molecules/presentation/Contacts'
import React from 'react'

type ContactsSectionProps = {
  section: ContactsSectionFragment
}

const ContactsSection = ({ section }: ContactsSectionProps) => {
  return <Contacts section={section} />
}

export default ContactsSection
