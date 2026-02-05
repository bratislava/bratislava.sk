import React from 'react'

import AlertMessage from '@/src/components/common/AlertMessage/AlertMessage'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { AlertSectionFragment } from '@/src/services/graphql'

type AlertSectionProps = { section: AlertSectionFragment }

const AlertSection = ({ section }: AlertSectionProps) => {
  return (
    <SectionContainer>
      <AlertMessage title={section.title} variant={section.alertVariant} text={section.text} />
    </SectionContainer>
  )
}

export default AlertSection
