import BratislavaIcon from '@assets/images/account/bratislava-footer.svg'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import ThankYouCard from 'components/forms/segments/AccountSections/ThankYouSection/ThankYouCard'
import Button from 'components/forms/simple-components/Button'
import { useTranslation } from 'next-i18next'

const ThankYouFormSection = () => {
  const { t } = useTranslation('account')

  return (
    <div className="h-screen bg-gray-0 md:bg-gray-50 pt-16 md:pt-28 flex flex-col justify-between">
      <div className="flex flex-col">
        <ThankYouCard
          status="success"
          title={t('thank_you.form_submit.title')}
          content={t('thank_you.form_submit.content')}
        />
        <div className="max-w-[734px] lg:max-w-[800px] w-full mx-auto mt-0 md:mt-10 px-4 md:px-0">
          <span className="text-p2 flex">
            <AccountMarkdown
              variant="sm"
              content={`<span className='text-p2'>V prípade akýchkoľvek otázok nás neváhajte kontaktovať na adrese:</span> <span className="text-p2-semibold underline">info@bratislava.sk</span>`}
            />
          </span>
          <div className="flex flex-col gap-3 mt-4 md:mt-6">
            <Button
              label="Často kladené otázky"
              href="/account/i-have-a-problem"
              variant="link-black"
              size="sm"
            />
            <Button
              label="Ochrana osobných údajov"
              href="/ochrana-osobnych-udajov"
              variant="link-black"
              size="sm"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-lg mx-auto hidden lg:flex flex-col items-center gap-6 pb-6">
        <BratislavaIcon />
        <p className="text-p2">{t('thank_you.footer_text')}</p>
      </div>
    </div>
  )
}

export default ThankYouFormSection
