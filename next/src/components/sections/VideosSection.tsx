import React from 'react'

import { Videos } from '@/src/components/common/Videos_Deprecated/Videos_Deprecated'
import { VideosSectionFragment } from '@/src/services/graphql'
import { isPresent } from '@/src/utils/utils'

type VideosSectionProps = { section: VideosSectionFragment }

const VideosSection = ({ section }: VideosSectionProps) => {
  return (
    <Videos
      id={section.id}
      title={section.title}
      subtitle={section.subtitle}
      videos={section?.videos?.filter(isPresent) ?? null}
    />
  )
}

export default VideosSection
