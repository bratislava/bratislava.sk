import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next/pages'
import { useState } from 'react'

import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import CookieConsentGate from '@/src/components/common/CookieConsentGate/CookieConsentGate'
import MLink from '@/src/components/common/MLink/MLink'
import { VideoBlockFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { detectVideoPlatform, getVideoIframeSrc } from '@/src/utils/videoEmbedUtils'

/**
 * TODO figma link
 */

type Props = {
  cardTitleLevel?: CardTitleLevel
} & VideoBlockFragment

const VideoCard = ({ title, speaker, url: untrimmedUrl, cardTitleLevel = 'h3' }: Props) => {
  const { t } = useTranslation()
  const [isLoaded, setLoaded] = useState(false)

  const url = untrimmedUrl.trim()
  const src = getVideoIframeSrc(url)
  const platform = detectVideoPlatform(url)

  return (
    <div className="flex flex-col gap-4 rounded-lg wrapper-focus-ring">
      <CookieConsentGate contentUrl={url} providerName={platform}>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          {src ? (
            <iframe
              src={src}
              title={title ?? t('VideoCard.videoPlayer')}
              onLoad={() => {
                setLoaded(true)
              }}
              width="100%"
              height="100%"
              className={cn('absolute top-0 left-0 size-full border-0', {
                'animate-pulse bg-background-passive-tertiary': !isLoaded,
              })}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <Typography>{t('VideoCard.unsupportedVideo')}</Typography>
          )}
        </div>
      </CookieConsentGate>

      <div className="relative flex grow flex-col gap-1">
        <MLink
          href={url ?? '#'}
          variant="underlineOnHover"
          target="_blank"
          rel="noreferrer"
          stretched
        >
          <Typography variant="h5" as={cardTitleLevel}>
            {title}
          </Typography>
        </MLink>
        <Typography variant="p-default">{speaker}</Typography>
      </div>
    </div>
  )
}
export default VideoCard
