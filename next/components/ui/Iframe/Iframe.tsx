// @ts-strict-ignore
import { useEffect, useRef, useState } from 'react'

export interface IframeProps {
  url?: string
  iframeWidth: 'container' | 'full'
  iframeHeight: string
  fullHeight: boolean
  allowFullscreen: boolean
  allowGeolocation?: boolean | null
  css?: string | null
}

export const Iframe = ({
  url,
  iframeWidth,
  iframeHeight,
  fullHeight,
  allowFullscreen,
  allowGeolocation = false,
  css,
}: IframeProps) => {
  const ref = useRef<HTMLIFrameElement>()

  const [height, setHeight] = useState(iframeHeight)

  useEffect(() => {
    ref.current?.setAttribute('style', css)
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
    <div
      style={{
        height,
      }}
    >
      <div
        style={{
          height,
        }}
        className={iframeWidth === 'container' ? 'w-full' : 'absolute inset-x-0'}
      >
        <iframe
          title={url}
          ref={ref}
          src={url}
          className="w-full shadow"
          height={height}
          allowFullScreen={allowFullscreen}
          allow={allowGeolocation ? 'geolocation *' : undefined}
          // This should prevent iframes to collect cookies. Otherwise, they collect their cookies we don't have consent for.
          // It may not work if the iframe needs some necessary cookies, or it may block some iframe to render at all.
          // But it seems to work for all of our iframes so far.
          // https://stackoverflow.com/questions/44837450/recommended-method-to-prevent-any-content-inside-iframe-from-setting-cookies
          sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  )
}
export default Iframe
