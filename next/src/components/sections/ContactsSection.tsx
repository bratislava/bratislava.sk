import React from 'react'

import Contacts from '@/src/components/common/Contacts/Contacts'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { ContactsSectionFragment } from '@/src/services/graphql'

type ContactsSectionProps = {
  section: ContactsSectionFragment
}

const ContactsSection = ({ section }: ContactsSectionProps) => {
  return (
    <SectionContainer>
      <Contacts section={section} />
    </SectionContainer>
  )
}

export default ContactsSection
