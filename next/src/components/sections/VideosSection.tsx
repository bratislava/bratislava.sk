import React from 'react'

import VideoCard from '@/src/components/cards/VideoCard'
import { AllowedVisibleCount } from '@/src/components/common/Carousel/Carousel'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { VideosSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: VideosSectionFragment
}

const VideosSection = ({ section }: Props) => {
  const { title, subtitle, videos } = section

  const filteredVideos = videos?.filter(isDefined) ?? []
  const videosCount = filteredVideos.length

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-8">
        <SectionHeader title={title} text={subtitle} />

        {/* Using carousel for simplicity, it'll "behave as carousel" on desktop only if there is more than 4 videos  */}
        <ResponsiveCarousel
          hasVerticalPadding={false}
          items={filteredVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
          desktop={videosCount > 0 && videosCount <= 4 ? (videosCount as AllowedVisibleCount) : 4}
        />
      </div>
    </SectionContainer>
  )
}

export default VideosSection
