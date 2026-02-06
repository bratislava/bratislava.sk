import React from 'react'

import AlertMessage from '@/src/components/common/AlertMessage/AlertMessage'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { AlertSectionFragment } from '@/src/services/graphql'

type AlertSectionProps = { section: AlertSectionFragment }

const AlertSection = ({ section }: AlertSectionProps) => {
  return (
    <SectionContainer>
      <AlertMessage title={section.title ?? undefined} variant={section.alertVariant ?? undefined}>
        {section.text}
      </AlertMessage>
    </SectionContainer>
  )
}

export default AlertSection
