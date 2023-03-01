import parse from 'html-react-parser'
import { useTranslation } from 'next-i18next'

const TaxFooter = () => {
  const { t } = useTranslation('forms')
  return (
    <div className="lg:text-20 text-16 lg:px-0 px-4 md:whitespace-normal whitespace-pre-line">
      {parse(t('tax_footer_description'))}
    </div>
  )
}

export default TaxFooter
