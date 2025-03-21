import React from 'react'

import Contacts from '@/src/components/common/Contacts/Contacts'
import { ContactsSectionFragment } from '@/src/services/graphql'

type ContactsSectionProps = {
  section: ContactsSectionFragment
}

const ContactsSection = ({ section }: ContactsSectionProps) => {
  return <Contacts section={section} />
}

export default ContactsSection
