import { VideoBlockFragment, VideosSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { HorizontalScrollWrapper } from '@bratislava/ui-bratislava'
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
    <div className="w-66 xl:w-88">
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
      {title && <h2 className="text-h4">{title}</h2>}
      {subtitle && <div className="md:text-large-respo mb-10 mt-5">{subtitle}</div>}

      {/* Mobile */}
      <HorizontalScrollWrapper className="flex gap-x-5 lg:hidden">
        {videos.filter(isPresent).map((video) => (
          <Video key={video.url} size="small" {...video} />
        ))}
      </HorizontalScrollWrapper>

      {/* Desktop */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-3">
        {videos.filter(isPresent).map((video) => (
          <Video key={video.url} {...video} />
        ))}
      </div>
    </div>
  )
}
