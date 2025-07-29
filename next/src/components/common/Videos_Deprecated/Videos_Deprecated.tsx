import { Typography } from '@bratislava/component-library'
import React, { useEffect } from 'react'

import { AllowedVisibleCount } from '@/src/components/common/Carousel/Carousel'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import MLink from '@/src/components/common/MLink/MLink'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { VideoBlockFragment, VideosSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isDefined } from '@/src/utils/isDefined'

// TODO split into separate components

const VideoCard = ({ title, speaker, url }: VideoBlockFragment) => {
  const [embedUrl, setEmbedUrl] = React.useState('')
  const [isLoaded, setLoaded] = React.useState(false)

  useEffect(() => {
    const parseYoutubeUrl = async () => {
      if (url?.includes('fb.watch')) {
        const fembedUrl = `https://www.facebook.com/plugins/video.php?href=${url}`
        setEmbedUrl(fembedUrl)
      } else {
        const oembedUrl = `https://www.youtube.com/oembed?url=${url}&format=json`
        const res = await fetch(oembedUrl)
        const { html }: { html: string } = await res.json()

        const substrStart = html.indexOf('src="') + 5
        const substrEnd = html.indexOf('oembed') + 6
        const embededUrl = html.slice(substrStart, substrEnd)

        setEmbedUrl(embededUrl)
      }
    }

    parseYoutubeUrl()
  }, [url])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          width="100%"
          height="100%"
          title={title ?? undefined}
          src={embedUrl}
          allow="accelerometer; encrypted-media; gyroscope; web-share"
          className={cn('absolute top-0 left-0 size-full border-0', {
            'animate-pulse bg-grey-300': !isLoaded,
          })}
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>

      <div className="relative flex grow flex-col gap-1">
        <MLink
          href={url ?? '#'}
          variant="underlineOnHover"
          target="_blank"
          rel="noreferrer"
          stretched
        >
          <Typography variant="h5" as="h3">
            {title}
          </Typography>
        </MLink>
        <Typography variant="p-default">{speaker}</Typography>
      </div>
    </div>
  )
}

/**
 * TODO Figma link
 */

export const Videos = ({ title, subtitle, videos }: VideosSectionFragment) => {
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
