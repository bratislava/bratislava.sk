import SearchIcon from '@assets/images/search-icon.svg'
import { SectionContainer } from '@bratislava/ui-bratislava'
import { Brand } from '@bratislava/ui-bratislava/Brand/Brand'
import Button from '@components/forms/simple-components/Button'
import MLink from '@components/forms/simple-components/MLink'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { useGeneralContext } from '@utils/generalContext'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { isDefined } from '@utils/isDefined'
import { isExternalLink } from '@utils/isExternalLink'
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
    <SectionContainer
      className="relative z-[31] bg-white"
      style={getCategoryColorLocalStyle({ category: 'main' })}
    >
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
              // TODO better approach to links
              const pageSlug = link.page?.data?.attributes?.slug
              if (pageSlug || link.url) {
                return (
                  <MLink
                    variant="navBarHeader"
                    href={pageSlug ? `/${pageSlug}` : link.url ?? '#'}
                    target={link.url && isExternalLink(link.url) ? '_blank' : undefined}
                  >
                    {link.label}
                  </MLink>
                )
              }
              return null
            })}

          {accountLink ? (
            <Button size="sm" variant="category" {...getCommonLinkProps(accountLink)} />
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
