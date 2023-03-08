import BasketServiceIcon from '@assets/images/account/municipal-services/basket-icon.svg'
import CompassServiceIcon from '@assets/images/account/municipal-services/compass-icon.svg'
import MoneyServiceIcon from '@assets/images/account/municipal-services/money-icon.svg'
import PoolServiceIcon from '@assets/images/account/municipal-services/pool-icon.svg'
import { ROUTES } from '@utils/constants'
import useAccount from '@utils/useAccount'
import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import AnnouncementBlock from 'components/forms/segments/AccountSections/IntroSection/AnnouncementBlock'
import Banner from 'components/forms/simple-components/Banner'
import Button from 'components/forms/simple-components/Button'
import ServiceCard from 'components/forms/simple-components/ServiceCard'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { PhoneNumberData } from '../../PhoneNumberForm/PhoneNumberForm'
import PhoneNumberModal from '../../PhoneNumberModal/PhoneNumberModal'

const IntroSection = () => {
  const { t } = useTranslation('account')
  const { userData, updateUserData, error, resetError } = useAccount()
  const router = useRouter()
  const [phoneNumberModalShow, setPhoneNumberModalShow] = useState<boolean>(
    router.query.from === ROUTES.REGISTER,
  )

  const onSubmitPhoneNumber = async ({ data }: { data?: PhoneNumberData }) => {
    if (await updateUserData({ phone_number: data?.phone_number })) {
      setPhoneNumberModalShow(false)
    }
  }

  const bannerContent = `<span className='text-p2'>${t(
    'account_section_intro.banner_content',
  )}</span>`

  const announcementContent = `
<h4>${t('account_section_intro.announcement_card_title')}</h4><span>${t(
    'account_section_intro.announcement_card_text',
  )}</span>`

  return (
    <>
      {userData && (
        <PhoneNumberModal
          show={phoneNumberModalShow}
          onClose={() => setPhoneNumberModalShow(false)}
          onSubmit={onSubmitPhoneNumber}
          error={error}
          onHideError={resetError}
          defaultValues={{ phone_number: userData?.phone_number }}
        />
      )}
      <div className="flex flex-col">
        <AccountSectionHeader
          title={`${t('account_section_intro.header_title')} ${userData?.given_name || ''}.`}
          text={t('account_section_intro.header_text')}
        />
        <div className="w-full max-w-screen-lg m-auto py-6 lg:py-16">
          <AnnouncementBlock
            announcementContent={announcementContent}
            buttonTitle={t('account_section_intro.announcement_card_action')}
            imagePath="/img/platba_dane2.png"
            onPress={() => alert('Actual')}
          />
          <div className="w-full flex items-center justify-between mb-8 px-4 lg:px-0">
            <h2 className="text-h2">{t('account_section_services.navigation')}</h2>
            <Button
              size="sm"
              className="sm:flex hidden pt-4 pl-4"
              label={t('account_section_intro.all_services')}
              variant="link-category"
              href="/account/municipal-services"
            />
          </div>
          <div className="flex gap-3 lg:gap-8 overflow-x-scroll scrollbar-hide px-4 lg:px-0">
            <ServiceCard
              title="Záväzné stanovisko k investičnej činnosti"
              description="Záväzné stanovisko slúži ako podklad pre konanie vedené na príslušnom stavebnom úrade."
              icon={<CompassServiceIcon className="w-10 h-10 lg:w-12 lg:h-12" />}
              buttonText="Prejsť na žiadosť"
            />
            <ServiceCard
              title="Dotácia na kontajnerové stanovištia"
              description="Žiadosť o dotáciu na kontajnerové stanovište alebo o nájom mestského pozemku."
              icon={<BasketServiceIcon className="w-10 h-10 lg:w-12 lg:h-12" />}
              buttonText="Prejsť na žiadosť"
            />
            <ServiceCard
              title="Digitálna platba dane z nehnuteľností"
              description="Digitálna platba dane z nehnuteľnosti, pohodlne a online."
              icon={<MoneyServiceIcon className="w-10 h-10 lg:w-12 lg:h-12" />}
              buttonText="Zaplatiť daň digitálne"
            />
            <ServiceCard
              title="Online lístky na kúpaliská"
              description="Kúpa online lístku alebo permanentky na všetky mestské kúpalíská v Bratislave."
              icon={<PoolServiceIcon className="w-10 h-10 lg:w-12 lg:h-12" />}
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
        <div className="bg-gray-50 py-0 lg:py-16">
          <Banner
            title={t('account_section_intro.banner_title')}
            content={bannerContent}
            buttonText={t('account_section_intro.banner_button_text')}
            onPress={() => {
              alert('Button was pressed')
            }}
          />
        </div>
      </div>
    </>
  )
}

export default IntroSection
