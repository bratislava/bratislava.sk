import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import VideoCard from '@/src/components/cards/VideoCard'
import { AllowedVisibleCount } from '@/src/components/common/Carousel/Carousel'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import CookieConsentGate from '@/src/components/common/CookieConsentGate/CookieConsentGate'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { VideosSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: VideosSectionFragment
}

const VideosSection = ({ section }: Props) => {
  const { title, subtitle, videos, titleLevelVideosSection: titleLevel } = section

  const filteredVideos = videos?.filter(isDefined) ?? []
  const videosCount = filteredVideos.length

  const cookieConsentGateProps =
    videosCount > 1
      ? ({
          variant: 'multiple',
        } as const)
      : ({
          variant: 'single',
          contentUrl: filteredVideos[0]?.url,
        } as const)

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-8">
        <SectionHeader title={title} titleLevel={titleLevel} text={subtitle} />

        <CookieConsentGate {...cookieConsentGateProps}>
          {/* Using carousel for simplicity, it'll "behave as carousel" on desktop only if there is more than 4 videos  */}
          <ResponsiveCarousel
            hasVerticalPadding={false}
            items={filteredVideos.map((video) => (
              <VideoCard key={video.id} cardTitleLevel={getCardTitleLevel(titleLevel)} {...video} />
            ))}
            desktop={videosCount > 0 && videosCount <= 4 ? (videosCount as AllowedVisibleCount) : 4}
          />
        </CookieConsentGate>
      </div>
    </SectionContainer>
  )
}

export default VideosSection
