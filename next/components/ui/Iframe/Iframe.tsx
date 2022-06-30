import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import { useEffect, useRef, useState } from 'react'
export interface IframeProps {
  url?: string
  iframeWidth: 'container' | 'full'
  iframeHeight: string
  fullHeight: boolean
  allowFullscreen: boolean
  css?: string
}
export const Iframe = ({ url, iframeWidth, iframeHeight, fullHeight, allowFullscreen, css }: IframeProps) => {
  const ref = useRef<HTMLIFrameElement>()

  const [height, setHeight] = useState('0')

  useEffect(() => {
    ref.current?.setAttribute('style', css)
  }, [ref, css])

  useEffect(() => {
    if (fullHeight) {
      const navbarHeight =
        document.getElementById('desktop-navbar')?.getBoundingClientRect().height ||
        document.getElementById('mobile-navbar')?.getBoundingClientRect().height
      setHeight(`${window.innerHeight - navbarHeight}px`)
    } else {
      setHeight(iframeHeight)
    }
  }, [fullHeight, iframeHeight])

  return (
    <div
      style={{
        height: height,
      }}
    >
      <div
        style={{
          height: height,
        }}
        className={iframeWidth === 'container' ? 'w-full' : 'absolute left-0 right-0'}
      >
        <iframe
          ref={ref}
          src={url}
          className="w-full"
          height={height}
          allowFullScreen={allowFullscreen}
          scrolling="no"
        ></iframe>
      </div>
    </div>
  )
}
export default Iframe
