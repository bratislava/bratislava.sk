import BasketServiceIcon from '@assets/images/account/municipal-services/basket-icon.svg'
import CompassServiceIcon from '@assets/images/account/municipal-services/compass-icon.svg'
import MoneyServiceIcon from '@assets/images/account/municipal-services/money-icon.svg'
import PoolServiceIcon from '@assets/images/account/municipal-services/pool-icon.svg'
import useAccount from '@utils/useAccount'
import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import AnnouncementBlock from 'components/forms/segments/AccountSections/IntroSection/AnnouncementBlock'
import Banner from 'components/forms/simple-components/Banner'
import Button from 'components/forms/simple-components/Button'
import ServiceCard from 'components/forms/simple-components/ServiceCard'
import { useTranslation } from 'next-i18next'

const IntroSection = () => {
  const { t } = useTranslation('account')
  const { userData } = useAccount()
  return (
    <div className="flex flex-col">
      <AccountSectionHeader
        title={`${t('account_section_intro.header_title')} ${userData?.given_name}.`}
        text={t('account_section_intro.header_text')}
      />
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="py-6 lg:py-16">
          <AnnouncementBlock
            title={t('account_section_intro.announcement_card_title')}
            text={t('account_section_intro.announcement_card_text')}
            buttonTitle={t('account_section_intro.announcement_card_action')}
            imagePath="/img/kpba.png"
            onPress={() => alert('Actual')}
          />
          <div className="w-full flex items-center justify-between mb-8 px-4 lg:px-0">
            <h2 className="text-h2">{t('account_section_services')}</h2>
            <Button
              className="hidden sm:flex"
              label={t('account_section_intro.all_services')}
              variant="link-category"
              href="/account/municipal-services"
            />
          </div>
          <div className="scrollbar-hide flex gap-3 lg:gap-8 overflow-x-scroll px-4 lg:px-0">
            <ServiceCard
              title="Záväzné stanovisko k investičnej činnosti"
              description="Záväzné stanovisko slúži ako podklad pre konanie vedené na príslušnom stavebnom úrade."
              icon={<CompassServiceIcon />}
              buttonText="Prejsť na žiadosť"
            />
            <ServiceCard
              title="Dotácia na kontajnerové stanovištia"
              description="Žiadosť o dotáciu na kontajnerové stanovište alebo o nájom mestského pozemku."
              icon={<BasketServiceIcon />}
              buttonText="Prejsť na žiadosť"
            />
            <ServiceCard
              title="Digitálna platba dane z nehnuteľností"
              description="Digitálna platba dane z nehnuteľnosti, pohodlne a online."
              icon={<MoneyServiceIcon />}
              buttonText="Zaplatiť daň digitálne"
            />
            <ServiceCard
              title="Online lístky na kúpaliská"
              description="Kúpa online lístku alebo permanentky na všetky mestské kúpalíská v Bratislave."
              icon={<PoolServiceIcon />}
              buttonText="Kúpiť lístok"
            />
          </div>

          <Button
            size="sm"
            className="flex sm:hidden pt-4 pl-4"
            label={t('account_section_intro.all_services')}
            variant="link-category"
            href="/account/municipal-services"
          />
        </div>
      </div>
      <div className="bg-gray-50 py-0 lg:py-16">
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
