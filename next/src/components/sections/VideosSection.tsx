import React from 'react'

import { Videos } from '@/src/components/common/Videos_Deprecated/Videos_Deprecated'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { VideosSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type VideosSectionProps = { section: VideosSectionFragment }

const VideosSection = ({ section }: VideosSectionProps) => {
  return (
    <SectionContainer>
      <Videos
        id={section.id}
        title={section.title}
        subtitle={section.subtitle}
        videos={section?.videos?.filter(isDefined) ?? null}
      />
    </SectionContainer>
  )
}

export default VideosSection
