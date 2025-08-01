import { useEffect, useRef, useState } from 'react'

import { SectionTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import SectionHeader from '@/src/components/layouts/SectionHeader'

export type IframeProps = {
  title?: string | null | undefined
  text?: string | null | undefined
  url?: string
  iframeWidth: 'container' | 'full'
  iframeHeight: string
  fullHeight: boolean
  allowFullscreen: boolean
  allowGeolocation?: boolean | null
  css?: string | null
  titleLevel?: SectionTitleLevel | null | undefined
}

const Iframe = ({
  title,
  text,
  url,
  iframeWidth,
  iframeHeight,
  fullHeight,
  allowFullscreen,
  allowGeolocation = false,
  css,
  titleLevel,
}: IframeProps) => {
  const ref = useRef<HTMLIFrameElement>(null)

  const [height, setHeight] = useState(iframeHeight)

  useEffect(() => {
    if (css) {
      ref.current?.setAttribute('style', css)
    }
  }, [ref, css])

  useEffect(() => {
    if (fullHeight) {
      const navbarHeight =
        (document.querySelector('#desktop-navbar')?.getBoundingClientRect().height ?? 0) +
        (document.querySelector('#mobile-navbar')?.getBoundingClientRect().height ?? 0) +
        (document.querySelector('#sticky-menu')?.getBoundingClientRect().height ?? 0)
      setHeight(`${window.innerHeight - navbarHeight}px`)
    } else {
      setHeight(iframeHeight)
    }
  }, [fullHeight, iframeHeight])

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <SectionHeader title={title} titleLevel={titleLevel} text={text} />
      <div
        style={{ height }}
        className={iframeWidth === 'container' ? 'w-full' : 'absolute inset-x-0'}
      >
        <iframe
          title={url}
          ref={ref}
          src={url}
          className="w-full border"
          height={height}
          allowFullScreen={allowFullscreen}
          allow={allowGeolocation ? 'geolocation *' : undefined}
          // This should prevent iframes to collect cookies. Otherwise, they collect their cookies we don't have consent for.
          // It may not work if the iframe needs some necessary cookies, or it may block some iframe to render at all.
          // But it seems to work for all of our iframes so far.
          // https://stackoverflow.com/questions/44837450/recommended-method-to-prevent-any-content-inside-iframe-from-setting-cookies
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms"
        />
      </div>
    </div>
  )
}
export default Iframe
