import React from 'react'

import SectionContainer from '@/src/components/layouts/SectionContainer'
import { AlertSectionFragment } from '@/src/services/graphql'
import Alert from '@/src/components/common/Alert_Deprecated/Alert_Deprecated'
import AlertMessage from '@/src/components/common/AlertMessage/AlertMessage'

type AlertSectionProps = { section: AlertSectionFragment }

const AlertSection = ({ section }: AlertSectionProps) => {
  return (
    <SectionContainer>
      {/* <Banner
        title={section.title || ''}
        content={section.text}
        contentPosition={section.contentPosition}
        variant={section.alertVariant}
        imagePath={section.media.url}
        primaryLink={section.primaryLink}
        secondaryLink={section.secondaryLink}
        tertiaryLink={section.tertiaryLink}
      /> */}
      <Alert
        // type={section.alertVariant}
        type={'error'}
        message={section.title || ''}
        variant="message"
        content={section.text || ''}
        // className="lg:max-w-[584px]"
      />
      <AlertMessage
        title={section.title || ''}
        // titleLevel={}
        text={section.text}
      />
    </SectionContainer>
  )
}

export default AlertSection
