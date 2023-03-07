import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import Accordion from 'components/forms/simple-components/Accordion'
import Banner from 'components/forms/simple-components/Banner'
import { useTranslation } from 'next-i18next'

const accordionContent =
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>'

const HelpSection = () => {
  const { t } = useTranslation('account')

  const bannerContent = `<span className='text-p2'>${t(
    'account_section_help.banner_content',
  )}</span>`
  return (
    <div className="flex flex-col">
      <AccountSectionHeader title={t('account_section_help.navigation')} />
      <div className="w-full max-w-screen-lg mx-auto">
        <h2 className="text-h2 justify-center hidden md:flex mt-8">Často kladené otázky</h2>
        <div className="flex flex-col gap-2 md:gap-3 px-4 lg:px-0 my-4 md:my-6">
          <Accordion title="Headline" size="md" content={accordionContent} />
          <Accordion title="Headline" size="md" content={accordionContent} />
          <Accordion title="Headline" size="md" content={accordionContent} />
          <Accordion title="Headline" size="md" content={accordionContent} />
          <Accordion title="Headline" size="md" content={accordionContent} />
          <Accordion title="Headline" size="md" content={accordionContent} />
          <Accordion title="Headline" size="md" content={accordionContent} />
          <Accordion title="Headline" size="md" content={accordionContent} />
        </div>
      </div>
      <div className="bg-gray-50 py-0 lg:py-16">
        <Banner
          title="Nenašli ste odpoveď na vašu otázku?"
          content={bannerContent}
          buttonText={t('account_section_help.banner_button_text')}
          mobileNumber="+421 XXX XXX XXX"
          onPress={() => {
            alert('Button was pressed')
          }}
        />
      </div>
    </div>
  )
}

export default HelpSection
