import Contacts from '@components/ui/Contacts/Contacts'
import React from 'react'

import { ContactsSectionFragment } from '@/backend/graphql'

type ContactsSectionProps = {
  section: ContactsSectionFragment
}

const ContactsSection = ({ section }: ContactsSectionProps) => {
  return <Contacts section={section} />
}

export default ContactsSection
