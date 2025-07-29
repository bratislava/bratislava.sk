import React from 'react'

import VideoCard from '@/src/components/cards/VideoCard'
import { AllowedVisibleCount } from '@/src/components/common/Carousel/Carousel'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { VideosSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

/**
 * TODO Figma link
 */

const Videos = ({ title, subtitle, videos }: VideosSectionFragment) => {
  if (!videos) {
    return null
  }

  const filteredVideos = videos.filter(isDefined) ?? []
  const videosCount = filteredVideos.length

  return (
    <div>
      <div className="py-8 md:pt-0">
        <SectionHeader title={title} text={subtitle} />
      </div>

      {/* Using carousel for simplicity, it'll "behave as carousel" on desktop only if there is more than 4 videos  */}
      <ResponsiveCarousel
        hasVerticalPadding={false}
        items={filteredVideos.map((video) => (
          <VideoCard key={video.url} {...video} />
        ))}
        desktop={videosCount > 0 && videosCount <= 4 ? (videosCount as AllowedVisibleCount) : 4}
      />
    </div>
  )
}

export default Videos
