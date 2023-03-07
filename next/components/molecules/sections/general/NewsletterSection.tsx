import { NewsLetter } from '@bratislava/ui-bratislava'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next'

import NewsLetterImage from '../../../../assets/images/newsletter-image.png'

const NewsletterSection = () => {
  const { t } = useTranslation('newsletter')

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
