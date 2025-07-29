import { Typography } from '@bratislava/component-library'
import React, { useState } from 'react'

import MLink from '@/src/components/common/MLink/MLink'
import { VideoBlockFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

/**
 * TODO figma link
 *
 * Based on AI suggestions.
 */

const VideoCard = ({ title, speaker, url: untrimmedUrl }: VideoBlockFragment) => {
  const [isLoaded, setLoaded] = useState(false)

  const url = untrimmedUrl.trim()

  const detectPlatform = () => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube'
    }
    if (url.includes('vimeo.com')) {
      return 'vimeo'
    }
    if (url.includes('facebook.com') || url.includes('fb.watch')) {
      return 'facebook'
    }

    return 'unknown'
  }

  const getVideoId = (platform: string) => {
    if (platform === 'youtube') {
      const youtubeRegex =
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[&?]v=)|youtu\.be\/)([^\s"&/?]{11})/
      const youtubeMatch = url.match(youtubeRegex)

      return youtubeMatch ? youtubeMatch[1] : null
    }

    if (platform === 'vimeo') {
      const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/
      const vimeoMatch = url.match(vimeoRegex)

      return vimeoMatch ? vimeoMatch[1] : null
    }

    if (platform === 'facebook') {
      // Facebook videos have different URL patterns, we'll use the full URL
      return url
    }

    return null
  }

  const platform = detectPlatform()
  const videoId = getVideoId(platform)

  if (platform === 'unknown' || !videoId) {
    // eslint-disable-next-line i18next/no-literal-string
    return <div>Unsupported url.</div>
  }

  const renderEmbed = () => {
    const commonProps = {
      width: '100%',
      height: '100%',
      allowFullScreen: true,
      className: cn('absolute top-0 left-0 size-full border-0', {
        'animate-pulse bg-grey-300': !isLoaded,
      }),
      onLoad: () => setLoaded(true),
    }

    switch (platform) {
      case 'youtube':
        return (
          <iframe
            {...commonProps}
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        )

      case 'vimeo':
        return (
          <iframe
            {...commonProps}
            src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
            title="Vimeo video player"
            allow="autoplay; fullscreen; picture-in-picture"
          />
        )

      case 'facebook':
        return (
          <iframe
            {...commonProps}
            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
              videoId,
            )}&show_text=false&width=560&height=315&t=0`}
            title="Facebook video player"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            style={{ border: 'none', overflow: 'hidden' }}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">{renderEmbed()}</div>

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
export default VideoCard
