import LibraryIcon from '@assets/images/account/municipal-services/library-icon.svg'
import ParkingIcon from '@assets/images/account/municipal-services/parking-icon.svg'
import TaxesIcon from '@assets/images/account/municipal-services/taxes-icon.svg'
import TreeIcon from '@assets/images/account/municipal-services/tree-icon.svg'
import PlatbaDaneImg from '@assets/images/platba-dane2.png'
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
            imagePath={PlatbaDaneImg}
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
              title={t('account_section_services.cards.1.title')}
              description={t('account_section_services.cards.1.description')}
              icon={<TaxesIcon className="w-10 h-10 lg:w-12 lg:h-12" />}
              buttonText={t('account_section_services.cards.1.buttonText')}
              href="/account/taxes-and-fees"
            />
            <ServiceCard
              title={t('account_section_services.cards.4.title')}
              description={t('account_section_services.cards.4.description')}
              icon={<ParkingIcon className="w-10 h-10 lg:w-12 lg:h-12" />}
              buttonText={t('account_section_services.cards.4.buttonText')}
              href="https://api.parkdots.com/auth/realms/parkingrealm/protocol/openid-connect/registrations?client_id=parkingclient&redirect_uri=https%3A%2F%2Fpermits.parkdots.com%2Fwizard%2Fuser%3FprojectId%3D08b21098-3df8-4a0f-9e5c-75a21711aef7&state=f7127136-6bbf-4325-b603-5623cd086c3f&response_mode=fragment&response_type=code&scope=openid&nonce=33fa1798-098a-4ed6-89d8-7dc464bf5e30&kc_locale=sk"
            />
            <ServiceCard
              title={t('account_section_services.cards.5.title')}
              description={t('account_section_services.cards.5.description')}
              icon={<LibraryIcon className="w-10 h-10 lg:w-12 lg:h-12" />}
              buttonText={t('account_section_services.cards.5.buttonText')}
              href="https://mestskakniznica.sk/sluzby/citanie/ako-sa-prihlasit-do-kniznice"
            />
            <ServiceCard
              title={t('account_section_services.cards.15.title')}
              description={t('account_section_services.cards.15.description')}
              icon={<TreeIcon className="w-10 h-10 lg:w-12 lg:h-12" />}
              buttonText={t('account_section_services.cards.15.buttonText')}
              href="https://10000stromov.sk/zapojit-sa"
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
