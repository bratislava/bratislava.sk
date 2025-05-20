import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import { ChevronUpIcon } from '@/src/assets/ui-icons'
import Button from '@/src/components/common/Button/Button'

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

// Copied from OLO project: https://github.com/bratislava/olo.sk/blob/6cb3565b42f46aeb7f88a1ac4d7184a56cd66812/next/src/components/lib/ScrollToTopButton/ScrollToTopButton.tsx

const ScrollToTopButton = () => {
  const { t } = useTranslation()

  const [visible, setVisible] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEventListener('scroll', handleScroll)

  return (
    <Button
      variant="icon-wrapped"
      aria-label={t('ScrollToTopButton.ariaLabel')}
      id="scrollToTopButton"
      // z-index is here to display over mapbox info-button
      className={`fixed right-5 bottom-5 z-30 rounded-full border bg-white md:right-10 md:bottom-10 ${
        visible ? 'visible' : 'invisible'
      }`}
      onPress={handleScrollToTop}
      icon={<ChevronUpIcon />}
    />
  )
}

export default ScrollToTopButton
