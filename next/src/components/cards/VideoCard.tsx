import { Typography } from '@bratislava/component-library'
import React, { useEffect } from 'react'

import MLink from '@/src/components/common/MLink/MLink'
import { VideoBlockFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

/**
 * TODO revisit how url is handled
 * TODO figma link
 */

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
export default VideoCard
