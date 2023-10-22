import { CheckIcon } from '@assets/ui-icons'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Button as AriaButton } from 'react-aria-components'

import ModalV2, { ModalV2Props } from '../../simple-components/ModalV2'

const RegistrationModal = ({ ...rest }: ModalV2Props) => {
  const t = useTranslations('RegistrationModal')

  const bodyList = [
    'Vyplňte údaje len raz',
    'Používajte mestské konto aj na ostatné služby, ktoré mesto ponúka',
    'Majte všetky informácie o Vašich úkonoch pokope, na jednom mieste',
    'Sledujte akuálny stav Vašich podaní a čo sa s nimi deje v čase',
    'Majte prehľad o platbách a prevodoch',
  ]

  return (
    <ModalV2 modalClassname="md:max-w-[796px]" mobileFullScreen {...rest}>
      <div className="mb-6 flex flex-col gap-2">
        <h3 className="text-h3">{t('headerInitialTitle')}</h3>
        <p className="text-p1">{t('headerInitialSubtitle')}</p>
      </div>
      <div className="flex flex-col">
        <div className="rounded-t-lg bg-main-100 p-4 md:px-6 md:pb-6 md:pt-5">
          <h4 className="text-h4">{t('bodyTitle')}</h4>
          <ul className="mt-6 flex flex-col gap-2 sm:gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
            {bodyList.map((item, i) => (
              <li key={i} className="flex items-center gap-[18px]">
                <span className="flex h-5 w-5 min-w-[20px] items-center justify-center md:h-6 md:w-6 md:min-w-[24px]">
                  <CheckIcon className="h-7 w-7" />
                </span>
                <p className="text-p3 md:text-p1">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-b-lg bg-main-100 px-4 pb-4 md:px-0 md:pb-0">
          {/* Use ButtonNew */}
          <AriaButton
            onPress={() => {}}
            className="text-p1-semibold flex w-full justify-center rounded-lg bg-main-700 px-5 py-2 text-center leading-6 text-gray-0 hover:bg-main-600  md:rounded-b-lg md:rounded-t-none md:px-0 md:py-6"
          >
            {t('bodyAction')}
          </AriaButton>
        </div>

        <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-0 md:mt-6">
          <span className="text-p1-semibold">{t('bodyLoginDescription')}</span>
          {/* Use ButtonNew */}
          <AriaButton
            onPress={() => {}}
            className="text-p1-semibold text-main-700 underline hover:text-main-600"
          >
            {t('bodyLoginLink')}
          </AriaButton>
        </div>
      </div>
    </ModalV2>
  )
}

export default RegistrationModal
