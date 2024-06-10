import Button from '@/components/common/Button/Button'
import { useTranslation } from '@/utils/useTranslation'

/* Based on approach here: https://levelup.gitconnected.com/build-an-accessible-skip-to-content-anchor-link-with-react-140903f3bd7e */
const handleSkip = () => {
  const contentElement: HTMLElement | null = document.querySelector('main:first-of-type')
  if (contentElement) {
    contentElement.setAttribute('tabindex', '0')
    contentElement.focus()
    setTimeout(() => contentElement.removeAttribute('tabindex'), 1000)
  }
}

const SkipToContentButton = () => {
  const { t } = useTranslation()

  return (
    <Button
      onPress={handleSkip}
      variant="black-solid"
      className="fixed left-2 top-14 z-50 -translate-x-100 transition-transform focus:translate-x-0 md:top-16"
    >
      {t('skipNavigation')}
    </Button>
  )
}

export default SkipToContentButton
