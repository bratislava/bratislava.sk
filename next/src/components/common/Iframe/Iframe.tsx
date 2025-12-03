import IframeResizer from '@iframe-resizer/react'
import { useRef } from 'react'

import SectionHeader from '@/src/components/layouts/SectionHeader'
import { IframeSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

type Props = IframeSectionFragment

const Iframe = ({
  title,
  text,
  url,
  iframeTitle,
  iframeHeight,
  hasBorder = true,
  allowGeolocation = false,
  titleLevelIframeSection: titleLevel,
}: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // TODO Prepare for "Innovate iframe"
  // useEffect(() => {
  //   const handleMessage = (event: any) => {
  //     console.log('Received message:', event.data)
  //
  //     if (event.data && typeof event.data === 'object' && event.data.type === 'setHeight') {
  //       const newHeight = `${event.data.height}px`
  //       console.log('Updating iframe height to:', newHeight)
  //
  //       if (iframeRef.current) {
  //         iframeRef.current.style.height = newHeight
  //       }
  //     }
  //   }
  //
  //   window.addEventListener('message', handleMessage)
  //
  //   return () => {
  //     window.removeEventListener('message', handleMessage)
  //   }
  // }, [])

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <SectionHeader title={title} titleLevel={titleLevel} text={text} />
      <IframeResizer
        license="GPLv3"
        title={iframeTitle ?? undefined}
        ref={iframeRef}
        src={url}
        className={cn('w-full', {
          border: hasBorder,
        })}
        style={{ height: iframeHeight }}
        // See docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy#iframes
        allow={`fullscreen; ${allowGeolocation ? 'geolocation *' : ''}`} // TODO consider narrowing geolocation, and specifying other attributes
        // This should prevent iframes to collect cookies. Otherwise, they collect their cookies we don't have consent for.
        // It may not work if the iframe needs some necessary cookies, or it may block some iframe to render at all.
        // But it seems to work for all of our iframes so far.
        // https://stackoverflow.com/questions/44837450/recommended-method-to-prevent-any-content-inside-iframe-from-setting-cookies
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms"
      />
    </div>
  )
}
export default Iframe
