import { ChevronRight } from '@assets/images'
import { ComponentSectionsVideos } from '@bratislava/strapi-sdk-homepage'
import { Button, HorizontalScrollWrapper } from '@bratislava/ui-bratislava'
import { shouldShowButtonContent, VideoAttribute } from '@bratislava/ui-bratislava/Videos/VideosService'
import cx from 'classnames'
import React from 'react'

export interface VideosProps extends ComponentSectionsVideos {
  id: string
  className?: string
  title?: string
  subtitle?: string
  videos?: VideoAttribute[] | null
}

const Video = ({ title, speaker, url, size = 'default' }: VideoAttribute) => {
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
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }, [url])

  return (
    <div className="w-66 xl:w-88">
      <iframe
        className={cx('rounded-5 shadow-sm', {
          'animate-pulse bg-gray-300': !isLoaded,
        })}
        title={title}
        width={size === 'default' ? '350' : '280'}
        height={size === 'default' ? '196' : '157'}
        src={embedUrl}
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
      <a href={url} target="_blank" rel="noreferrer">
        <h5 className="md:text-h5 mt-8 cursor-pointer hover:underline">{title}</h5>
      </a>
      <p className="mt-5">{speaker}</p>
    </div>
  )
}

export const Videos = ({ id, className, title, subtitle, videos, buttonContent }: VideosProps) => {
  if (!videos) {
    return null
  }

  const videosCount = 3
  return (
    <div key={id} className={className}>
      <h4 className="text-h4">{title}</h4>
      <p className="md:text-p1 mt-5 mb-10">{subtitle}</p>

      {/* Mobile */}
      <HorizontalScrollWrapper className="flex gap-x-5 lg:hidden">
        {videos.map((video) => (
          <Video key={video.url} size="small" {...video} />
        ))}
      </HorizontalScrollWrapper>

      {/* Desktop */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-3">
        {videos.slice(0, videosCount).map((video) => (
          <Video key={video.url} {...video} />
        ))}
        {shouldShowButtonContent(videos, buttonContent) && (
          <Button iconPosition="right" variant="secondary-dark-text" icon={<ChevronRight />} className="text-20 py-2">
            {buttonContent}
          </Button>
        )}
      </div>
    </div>
  )
}
