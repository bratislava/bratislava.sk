import { Typography } from '@bratislava/component-library'
import React from 'react'

import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import MLink from '@/src/components/common/MLink/MLink'
import { VideoBlockFragment, VideosSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isPresent } from '@/src/utils/utils'

// TODO split into separate components

const Video = ({
  title,
  speaker,
  url,
  size = 'default',
}: VideoBlockFragment & { size?: 'default' | 'small' }) => {
  const [embedUrl, setEmbedUrl] = React.useState('')
  const [isLoaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
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
    <div className="mb-8 w-full lg:mb-0 xl:w-88">
      <iframe
        className={cn('w-full rounded-5', {
          'animate-pulse bg-grey-300': !isLoaded,
        })}
        title={title ?? undefined}
        // width={size === 'default' ? '350' : '280'}
        height={size === 'default' ? '196' : '157'}
        src={embedUrl}
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
      <MLink href={url ?? '#'} variant="underlineOnHover" target="_blank" rel="noreferrer">
        <Typography type="h5" className="mt-8 cursor-pointer hover:underline">
          {title}
        </Typography>
      </MLink>
      <Typography type="p" className="mt-5">
        {speaker}
      </Typography>
    </div>
  )
}

export const Videos = ({ title, subtitle, videos }: VideosSectionFragment) => {
  if (!videos) {
    return null
  }

  return (
    <div>
      <div className="py-8 md:pt-0">
        {title || subtitle ? (
          <div className="flex flex-col gap-2">
            {title && (
              <Typography type="h2" size="h4">
                {title}
              </Typography>
            )}
            {subtitle && <Typography type="p">{subtitle}</Typography>}
          </div>
        ) : null}
      </div>

      {/* Mobile */}
      <ResponsiveCarousel
        className="lg:hidden"
        hasVerticalPadding={false}
        items={videos.filter(isPresent).map((video) => (
          <Video key={video.url} size="small" {...video} />
        ))}
      />

      {/* Desktop */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-3">
        {videos.filter(isPresent).map((video) => (
          <Video key={video.url} {...video} />
        ))}
      </div>
    </div>
  )
}
