import Button from 'components/forms/simple-components/Button'
import { useTranslation } from 'next-i18next'

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
  const { t } = useTranslation(['common'])

  return (
    <Button
      onPress={handleSkip}
      className="bg-button-dark text-base top-15 -translate-x-100 z-50 fixed left-0 text-white transition-transform focus:translate-x-0 md:top-8"
      text={t('skipNavigation')}
    />
  )
}

export default SkipToContentButton
