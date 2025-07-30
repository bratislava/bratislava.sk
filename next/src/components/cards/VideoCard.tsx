import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import MLink from '@/src/components/common/MLink/MLink'
import { VideoBlockFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getVideoIframeSrc } from '@/src/utils/videoEmbedUtils'

/**
 * TODO figma link
 */

const VideoCard = ({ title, speaker, url: untrimmedUrl }: VideoBlockFragment) => {
  const { t } = useTranslation()
  const [isLoaded, setLoaded] = useState(false)

  const url = untrimmedUrl.trim()
  const src = getVideoIframeSrc(url)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        {src ? (
          <iframe
            src={src}
            title={title ?? t('VideoCard.videoPlayer')}
            onLoad={() => setLoaded(true)}
            width="100%"
            height="100%"
            className={cn('absolute top-0 left-0 size-full border-0', {
              'animate-pulse bg-grey-300': !isLoaded,
            })}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <Typography>{t('VideoCard.unsupportedVideo')}</Typography>
        )}
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
