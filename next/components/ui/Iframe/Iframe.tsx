// @ts-strict-ignore
import { useEffect, useRef, useState } from 'react'

export interface IframeProps {
  url?: string
  iframeWidth: 'container' | 'full'
  iframeHeight: string
  fullHeight: boolean
  allowFullscreen: boolean
  allowGeolocation: boolean
  css?: string
}
export const Iframe = ({
  url,
  iframeWidth,
  iframeHeight,
  fullHeight,
  allowFullscreen,
  allowGeolocation,
  css,
}: IframeProps) => {
  const ref = useRef<HTMLIFrameElement>()

  const [height, setHeight] = useState('0')

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
          className="w-full"
          height={height}
          allowFullScreen={allowFullscreen}
          allow={allowGeolocation ? 'geolocation *' : undefined}
          scrolling="no"
        />
      </div>
    </div>
  )
}
export default Iframe
