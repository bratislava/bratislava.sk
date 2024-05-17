import React from 'react'

import { ContactsSectionFragment } from '@/backend/graphql'
import Contacts from '@/components/ui/Contacts/Contacts'

type ContactsSectionProps = {
  section: ContactsSectionFragment
}

const ContactsSection = ({ section }: ContactsSectionProps) => {
  return <Contacts section={section} />
}

export default ContactsSection
