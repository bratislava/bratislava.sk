import { useTranslation } from 'next-i18next'

const TaxFooter = () => {
  const { t } = useTranslation('forms')
  return (
    <div className="lg:text-20 text-16 lg:px-0 px-4 md:whitespace-normal whitespace-pre-line mt-6">
      <div className="inline-block">{t('tax_footer.maybe_questions')}</div>
      {'\n\n'}
      <div className="inline-block">{t('tax_footer.see_answers')}</div>{' '}
      <a
        href="https://bratislava-next.staging.bratislava.sk/account/i-have-a-problem"
        className="underline underline-offset-4"
      >
        {t('tax_footer.frequently_asked')}
      </a>
      {'\n\n'}
      <div>
        {t('tax_footer.contact_us_at')}{' '}
        <a
          href={`mailto:${t('tax_footer.mail_to_contact')}`}
          className="lg:text-20-medium text-16-medium underline-offset-4 underline"
        >
          {t('tax_footer.mail_to_contact')}
        </a>
      </div>
    </div>
  )
}

export default TaxFooter
