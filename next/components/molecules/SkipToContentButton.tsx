import Button from 'components/forms/simple-components/Button'
import { useTranslations } from 'next-intl';


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
  const t = useTranslations()

  return (
    <Button
      onPress={handleSkip}
      variant="black"
      className="fixed left-2 top-14 z-50 -translate-x-100 transition-transform focus:translate-x-0 md:top-16"
    >
      {t('skipNavigation')}
    </Button>
  )
}

export default SkipToContentButton
