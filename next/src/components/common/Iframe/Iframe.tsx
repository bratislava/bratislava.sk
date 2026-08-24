import IframeResizer from '@iframe-resizer/react'
import { useRef } from 'react'

import CookieConsentGate from '@/src/components/common/CookieConsentGate/CookieConsentGate'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { IframeSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isCookieConsentNeededForUrl } from '@/src/utils/cookies/cookiePolicy'

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

  const allowDownloadsWhitelist = [
    'https://bloomberg-cities-dashboard-eu-eb6aebd069f7.herokuapp.com/',
  ]

  const allowDownloads = allowDownloadsWhitelist.some((allowedUrl) => url.startsWith(allowedUrl))

  const trimmedUrl = url.trim()

  const iframe = (
    <IframeResizer
      license="GPLv3"
      title={iframeTitle ?? undefined}
      forwardRef={iframeRef}
      src={trimmedUrl}
      className={cn('w-full', {
        border: hasBorder,
      })}
      style={{ height: iframeHeight }}
      // See docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy#iframes
      allow={`fullscreen; ${allowGeolocation ? 'geolocation *' : ''}`} // TODO consider narrowing geolocation, and specifying other attributes
      // Hardening only - this does not stop the iframe collecting cookies, so it is
      // not what keeps us consent-compliant - we use CookieConsentGate for that.
      // Omitting allow-same-origin puts the frame in an opaque origin, which blocks its
      // JavaScript from reaching document.cookie and localStorage, but most
      // third-party cookies arrive as HttpOnly Set-Cookie response headers that
      // JavaScript never touches and sandbox has no say over.
      // https://stackoverflow.com/questions/44837450/recommended-method-to-prevent-any-content-inside-iframe-from-setting-cookies
      sandbox={`allow-scripts allow-popups allow-forms ${allowDownloads ? 'allow-downloads' : ''}`}
    />
  )

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <SectionHeader title={title} titleLevel={titleLevel} text={text} />
      {isCookieConsentNeededForUrl(trimmedUrl) ? (
        <CookieConsentGate contentUrl={trimmedUrl} style={{ minHeight: iframeHeight }}>
          {iframe}
        </CookieConsentGate>
      ) : (
        iframe
      )}
    </div>
  )
}
export default Iframe
