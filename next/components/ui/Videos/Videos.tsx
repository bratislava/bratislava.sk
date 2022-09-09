import { HorizontalScrollWrapper } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React from 'react'

interface IVideo {
  title?: string
  speaker?: string
  url?: string
  size?: 'default' | 'small'
}

export interface VideosProps {
  id?: string
  className?: string
  title?: string
  subtitle?: string
  videos?: IVideo[]
}

const Video = ({ title, speaker, url, size = 'default' }: IVideo) => {
  const [embedUrl, setEmbedUrl] = React.useState('')
  const [isLoaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    const parseYoutubeUrl = async () => {
      if (url.includes('fb.watch')) {
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

    parseYoutubeUrl().then(data => console.log(data)).catch(error => console.log(error))
  }, [url])

  return (
    <div className="w-70 xl:w-87">
      <iframe
        className={cx('rounded-5 shadow-xs', {
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
        <h5 className="mt-8 cursor-pointer font-semibold hover:underline md:text-default">{title}</h5>
      </a>
      <p className="mt-5">{speaker}</p>
    </div>
  )
}

export const Videos = ({ id, className, title, subtitle, videos }: VideosProps) => {
  const videosCount = 3;
  return (
    <div key={id} className={className}>
      <h4 className="text-default font-semibold md:text-md">{title}</h4>
      <p className="mt-5 mb-10 md:text-default">{subtitle}</p>

      {/* Mobile */}
      <HorizontalScrollWrapper className="flex gap-x-5 lg:hidden">
        {videos.map((video) => (
          <Video key={video.url} size="small" {...video} />
        ))}
      </HorizontalScrollWrapper>

      {/* Desktop */}
      <div className="hidden gap-7.5 lg:grid lg:grid-cols-3">
        {videos.slice(0, videosCount).map((video) => (
          <Video key={video.url} {...video} />
        ))}
      </div>
      {/* {videosCount <= videos.length && (
        <div className="hidden lg:flex mt-14 justify-center">
          <Button
            className="text-default py-[13px] px-6 font-medium"
            icon={<ChevronRight />}
            onClick={() => setVideosCount((prev) => prev + 3)}
          >
            {buttonContent}
          </Button>
        </div>
      )} */}
    </div>
  )
}
