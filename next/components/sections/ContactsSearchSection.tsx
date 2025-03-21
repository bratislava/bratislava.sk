import React from 'react'

import GlobalSearchSectionContent from '@/components/sections/SearchSection/GlobalSearchSectionContent'

const ContactsSearchSection = () => {
  return <GlobalSearchSectionContent variant="specific" searchOption="users" pageSize={6} />
}

export default ContactsSearchSection
