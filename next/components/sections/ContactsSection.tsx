import React from 'react'

import Contacts from '@/components/common/Contacts/Contacts'
import { ContactsSectionFragment } from '@/services/graphql'

type ContactsSectionProps = {
  section: ContactsSectionFragment
}

const ContactsSection = ({ section }: ContactsSectionProps) => {
  return <Contacts section={section} />
}

export default ContactsSection
