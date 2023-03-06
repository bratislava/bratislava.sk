import { ContactSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { Contact } from '@bratislava/ui-bratislava'
import React from 'react'

type ContactSectionProps = { section: ContactSectionFragment }

const ContactSection = ({ section }: ContactSectionProps) => {
  return (
    <Contact
      title={section.title ?? undefined}
      description={section?.description ?? undefined}
      phone={section.phone ?? undefined}
      phoneLabel={section.phoneLabel ?? undefined}
      email={section.email ?? undefined}
      emailLabel={section.emailLabel ?? undefined}
      address={section.address ?? undefined}
    />
  )
}

export default ContactSection
