import NewsLetterImage from '@assets/images/newsletter-image.png'
import { NewsLetter } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'

const NewsletterSection = () => {
  const { t } = useTranslation('common', { keyPrefix: 'Newsletter' })

  return (
    <div className="flex w-full justify-center">
      <NewsLetter
        imageSrc={NewsLetterImage}
        checkBoxContent={t('newsletterCheckboxContent')}
        newsLetterContent={t('newsletterContent')}
        buttonLabel={t('newsletterButtonContent')}
      />
    </div>
  )
}

export default NewsletterSection
