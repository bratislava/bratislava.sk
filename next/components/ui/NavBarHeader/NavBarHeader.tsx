import SearchIcon from '@assets/images/search-icon.svg'
import { isItExternal } from '@bratislava/ui-bratislava/BAStickyMenu/external-link'
import { useGeneralContext } from '@utils/generalContext'
import { isDefined } from '@utils/isDefined'
import SkipToContentButton from 'components/molecules/SkipToContentButton'
import CookieConsent from 'components/organisms/CookieConsent'
import { useTranslation } from 'next-i18next'
import React from 'react'

import Button from '../../forms/simple-components/Button'
import MLink from '../../forms/simple-components/MLink'
import { Brand } from '../Brand/Brand'

type NavBarProps = { className?: string } & LanguageSelectProps

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`border-r h-6 ${className}`} />
}

export const NavBarHeader = ({ className, ...languageSelectProps }: NavBarProps) => {
  const { t, i18n } = useTranslation(['common'])

  const { general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { links, accountLink } = header ?? {}

  const otherLanguage = languageSelectProps.languages?.find((l) => l.key !== i18n.language)

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white z-40">
        <div className="flex max-w-screen-lg m-auto h-[57px] w-full items-center justify-between border-b border-gray-200">
          <SkipToContentButton />
          <Brand
            className="group"
            url="/"
            title={
              <div className="text-p2 text-font group-hover:text-gray-600">
                {i18n.language === 'en' && <span className="font-semibold">Bratislava </span>}
                {t('capitalCity')}
                {i18n.language !== 'en' && <span className="font-semibold"> Bratislava</span>}
              </div>
            }
          />

          <nav className="flex gap-x-6 h-full items-center">
            {links
              ?.filter(isDefined)
              .filter((link) => link.showOnDesktop)
              .map((link) => {
                if (link.page?.data?.attributes?.slug || link.url) {
                  return (
                    <MLink
                      variant="navBarHeader"
                      href={link.page?.data?.attributes?.slug ?? link.url ?? ''}
                      target={link.url && isItExternal(link.url) ? '_blank' : undefined}
                    >
                      {link.label}
                    </MLink>
                  )
                }
                return null
              })}

            {/* TODO replace by button, remove Dividers */}
            {accountLink?.url && (
              <>
                <Divider />
                <MLink variant="navBarHeader" href={accountLink.url} target="_blank">
                  {accountLink.label}
                </MLink>
                <Divider />
              </>
            )}

            <MLink href={t('searchLink')}>
              <SearchIcon />
            </MLink>

            <Divider />

            {otherLanguage && (
              <Button
                size="sm"
                className="underline underline-offset-4"
                variant="link-black"
                onPress={() => languageSelectProps.onLanguageChange?.(otherLanguage)}
                text={otherLanguage?.title}
              />
            )}
          </nav>
        </div>
      </div>

      <CookieConsent />
    </>
  )
}

interface LanguageSelectProps {
  className?: string
  languages?: LanguageOption[]
  currentLanguage?: string
  onLanguageChange?: (language: LanguageOption) => void
}

interface LanguageOption {
  key: string
  title: string
}

export default NavBarHeader
