import useAccount from '@utils/useAccount'
import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import Banner from 'components/forms/simple-components/Banner'
import Button from 'components/forms/simple-components/Button'
import ServiceCard from 'components/forms/simple-components/ServiceCard'
import { useTranslation } from 'next-i18next'

import ContainerLogoIcon from '../../../icon-components/ContainerLogoIcon'
import InvestmentLogoIcon from '../../../icon-components/InvestmentLogoIcon'
import PropertyLogoIcon from '../../../icon-components/PropertyTaxLogoIcon'
import SwimmingPoolsLogoIcon from '../../../icon-components/SwimmingPoolsLogoIcon'

const IntroSection = () => {
  const { t } = useTranslation('account')
  const { userData } = useAccount()
  return (
    <div className="flex flex-col">
      <AccountSectionHeader
        title={`${t('account_section_intro.header_title')} ${userData?.given_name}.`}
        text={t('account_section_intro.header_text')}
      />
      <div className="w-full max-w-screen-1.5lg m-auto py-16">
        <div className="w-full flex items-center justify-between mb-8">
          <h2 className="text-h2">{t('account_section_services')}</h2>
          <Button
            label={t('account_section_intro.all_services')}
            variant="link-category"
            href="/account/municipal-services"
          />
        </div>
        <div className="flex justify-between">
          <ServiceCard
            title="Záväzné stanovisko k investičnej činnosti"
            description="Záväzné stanovisko slúži ako podklad pre konanie vedené na príslušnom stavebnom úrade."
            Logo={InvestmentLogoIcon}
            buttonText="Prejsť na žiadosť"
            iconFill="#C4EFCE"
          />
          <ServiceCard
            title="Dotácia na kontajnerové stanovištia"
            description="Žiadosť o dotáciu na kontajnerové stanovište alebo o nájom mestského pozemku."
            Logo={ContainerLogoIcon}
            buttonText="Prejsť na žiadosť"
            iconFill="#C4EFCE"
          />
          <ServiceCard
            title="Digitálna platba dane z nehnuteľností"
            description="Digitálna platba dane z nehnuteľnosti, pohodlne a online."
            Logo={PropertyLogoIcon}
            buttonText="Zaplatiť daň digitálne"
            iconFill="#F8D7D4"
          />
          <ServiceCard
            title="Online lístky na kúpaliská"
            description="Kúpa online lístku alebo permanentky na všetky mestské kúpalíská v Bratislave."
            Logo={SwimmingPoolsLogoIcon}
            buttonText="Kúpiť lístok"
            iconFill="#D9D9D9"
          />
        </div>
      </div>
      <div className="bg-gray-50 py-16">
        <Banner
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          title="Banner Headline"
          onPress={() => {
            alert('Button was pressed')
          }}
        />
      </div>
    </div>
  )
}

export default IntroSection
