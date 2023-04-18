import NewsLetterImage from '@assets/images/newsletter-image.png'
import { NewsLetter } from '@bratislava/ui-bratislava'
import { useTranslations } from 'next-intl'

const NewsletterSection = () => {
  const t = useTranslations('Newsletter')

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
