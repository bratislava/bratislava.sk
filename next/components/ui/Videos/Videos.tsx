import { VideoBlockFragment, VideosSectionFragment } from '@backend/graphql'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import { isPresent } from '@utils/utils'
import cx from 'classnames'
import React from 'react'

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
    <div className="mb-8 w-66 lg:mb-0 xl:w-88">
      <iframe
        className={cx('rounded-5 shadow-sm', {
          'animate-pulse bg-gray-300': !isLoaded,
        })}
        title={title ?? undefined}
        width={size === 'default' ? '350' : '280'}
        height={size === 'default' ? '196' : '157'}
        src={embedUrl}
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
      <a href={url ?? undefined} target="_blank" rel="noreferrer">
        <h5 className="md:text-h5 mt-8 cursor-pointer hover:underline">{title}</h5>
      </a>
      <p className="mt-5">{speaker}</p>
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
            {title && <h2 className="text-h4">{title}</h2>}
            {subtitle && <div>{subtitle}</div>}
          </div>
        ) : null}
      </div>

      {/* Mobile */}
      <ResponsiveCarousel
        className="lg:hidden"
        noYListSpacing
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
