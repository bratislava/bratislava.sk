import { VideosSectionFragment } from '@backend/graphql'
import { Videos } from '@bratislava/ui-bratislava/Videos/Videos'
import { isPresent } from '@utils/utils'
import React from 'react'

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
