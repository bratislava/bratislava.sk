import SearchIcon from '@assets/images/search-icon.svg'
import { CommonLinkFragment } from '@bratislava/strapi-sdk-homepage'
import { SectionContainer } from '@bratislava/ui-bratislava'
import { Brand } from '@bratislava/ui-bratislava/Brand/Brand'
import Button from '@components/forms/simple-components/Button'
import MLink from '@components/forms/simple-components/MLink'
import { useGeneralContext } from '@utils/generalContext'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { isDefined } from '@utils/isDefined'
import SkipToContentButton from 'components/molecules/SkipToContentButton'
import { useTranslation } from 'next-i18next'
import React from 'react'

type NavBarProps = { className?: string } & LanguageSelectProps

const Divider = ({ className }: { className?: string }) => {
  return <div aria-hidden className={`h-6 border-r ${className}`} />
}

export const NavBarHeader = ({ className, ...languageSelectProps }: NavBarProps) => {
  const { t, i18n } = useTranslation(['common'])

  const { general } = useGeneralContext()
  const { header } = general?.data?.attributes ?? {}
  const { links, accountLink } = header ?? {}

  const otherLanguage = languageSelectProps.languages?.find((l) => l.key !== i18n.language)

  return (
    <SectionContainer className="relative z-[31] bg-white">
      <nav className="flex w-full items-center justify-between border-b border-gray-200">
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

        <div className="flex h-full items-center gap-x-6">
          {links
            ?.filter(isDefined)
            .filter((link) => link.showOnDesktop)
            .map((link) => {
              if (link.page?.data?.attributes?.slug || link.url) {
                const linkProps = getCommonLinkProps(link as CommonLinkFragment)
                // TODO getLinkProps return label instead of children - make Button and MLink
                return (
                  <MLink variant="navBarHeader" href={linkProps.href} target={linkProps.target}>
                    {linkProps.label}
                  </MLink>
                )
              }
              return null
            })}

          {accountLink ? (
            <Button size="sm" variant="negative" {...getCommonLinkProps(accountLink)} />
          ) : (
            <Divider />
          )}

          <MLink href={t('searchLink')} className="-mx-4 p-4">
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
        </div>
      </nav>
    </SectionContainer>
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
